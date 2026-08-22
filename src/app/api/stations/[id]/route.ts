export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';
import { put } from '@vercel/blob';
import sharp from 'sharp';

export async function PUT (request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const text = formData.get('text') as string;
    const password = formData.get('password') as string;
    const linksRaw = formData.get('links') as string;
    const existingUrlsRaw = formData.get('existingUrls') as string;
    const newImageFiles = formData.getAll('images') as File[];

    // パスワード検証
    if (!password || password !== process.env.POST_PASSWORD) {
      return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
    }

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "店舗名は必須です" }, { status: 400 });
    }
    if (!text || !text.trim()) {
      return NextResponse.json({ error: "コメントは必須です" }, { status: 400 });
    }
    if (text.trim().length > 100) {
      return NextResponse.json({ error: "コメントは100文字以内で入力してください" }, { status: 400 });
    }

    let links: { text: string; url: string; }[] = [];
    if (linksRaw) {
      try {
        const parsed = JSON.parse(linksRaw);
        if (Array.isArray(parsed)) {
          links = parsed.map((l: any) => ({
            text: String(l.text || '').trim(),
            url: String(l.url || '').trim(),
          })).filter(l => l.text && l.url);
        }
      } catch {}
    }

    // 画像関連のフィールドが今回のリクエストで明示的に送信されたかどうかを判定する。
    // existingUrls が送信されていない、かつ新規画像ファイルも存在しない場合は
    // 「画像を編集していないテキストのみの更新」とみなし、既存のDB画像データ
    // （imageUrl / imageUrls）には一切手を加えない。
    const hasNewImageFiles = newImageFiles.some((f) => f && f.size > 0);
    const isImageDataSubmitted = existingUrlsRaw !== null || hasNewImageFiles;

    const existingUrls: string[] = existingUrlsRaw ? JSON.parse(existingUrlsRaw) : [];

    if (existingUrls.length + newImageFiles.length > 3) {
        return NextResponse.json({ error: "画像は最大3枚までです" }, { status: 400 });
    }

    const imageUrls = [...existingUrls];
    for (const imageFile of newImageFiles) {
        if (imageFile.size > 0) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(imageFile.type)) continue;

            if (imageFile.size > 5 * 1024 * 1024) continue;

            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}-upload.webp`;
            const buffer = Buffer.from(await imageFile.arrayBuffer());

            const metadata = await sharp(buffer).metadata();
            let sharpInstance = sharp(buffer);
            if (metadata.width && metadata.width > 800) {
              sharpInstance = sharpInstance.resize(800, null, { fit: 'inside', withoutEnlargement: true });
            }
            const resizedBuffer = await sharpInstance.webp({ quality: 80 }).toBuffer();
            const blob = await put(filename, resizedBuffer, { access: 'public' });
            imageUrls.push(blob.url);
        }
    }

    const client = await getMongoClient();
    const db = client.db('portfolioDB');
    const collection = db.collection('stations')

    // 画像データが今回のリクエストで送信されていない場合は $set から
    // imageUrls を除外し、既存の imageUrl / imageUrls をそのまま維持する。
    const updateFields: Record<string, unknown> = {
      name: name.trim(),
      text: text.trim(),
      links,
    };
    if (isImageDataSubmitted) {
      updateFields.imageUrls = imageUrls;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateFields }
    );
    return NextResponse.json({ message: '更新完了', result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "サーバーエラーが発生しました" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json().catch(() => ({}));
    const { password } = body;

    // パスワード検証
    if (!password || password !== process.env.POST_PASSWORD) {
      return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
    }

    const client = await getMongoClient();
    const db = client.db('portfolioDB')

    const result = await db.collection('stations').deleteOne({
      _id: new ObjectId(params.id),
    });

    if ( result.deletedCount === 0 ) {
      return NextResponse.json({ error: 'データが見つかりません' }, { status: 404 })
    }
    return NextResponse.json({ message: '削除成功' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'サーバーエラー' }, {status: 500});
  }
}
