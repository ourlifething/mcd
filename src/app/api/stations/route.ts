export const dynamic = 'force-dynamic';

import { getMongoClient } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { getAllowedStations } from "@/lib/stations";

export async function POST (req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const text = formData.get('text') as string;
    const rating = formData.get('rating') as string;
    const password = formData.get('password') as string;
    const station = formData.get('station') as string;
    const imageFile = formData.get('image') as File | null;

    // パスワード検証
    if (!password || password !== process.env.POST_PASSWORD) {
      return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
    }

    // 駅情報のバリデーション
    const allowedStations = await getAllowedStations();
    if (!station || !allowedStations.includes(station)) {
      return NextResponse.json({ error: "不正な駅情報です" }, { status: 400 });
    }

    // バリデーション
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "店舗名は必須です" }, { status: 400 });
    }
    if (!text || !text.trim()) {
      return NextResponse.json({ error: "コメントは必須です" }, { status: 400 });
    }
    if (text.trim().length > 100) {
      return NextResponse.json({ error: "コメントは100文字以内で入力してください" }, { status: 400 });
    }
    if (rating !== 'おすすめ' && rating !== 'かなりおすすめ') {
      return NextResponse.json({ error: "不正な評価値です" }, { status: 400 });
    }

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      // 5MB制限 (5 * 1024 * 1024 bytes)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "画像サイズが大きすぎます。5MB以下の画像を選択してください。" }, { status: 400 });
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json({ error: "サポートされていない画像形式です（JPEG, PNG, WebPのみ）" }, { status: 400 });
      }

      // 新規ファイル名は .webp に統一
      const filename = `${Date.now()}-upload.webp`;
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 画像のメタデータを取得して幅を確認
      const metadata = await sharp(buffer).metadata();
      let sharpInstance = sharp(buffer);

      if (metadata.width && metadata.width > 800) {
        sharpInstance = sharpInstance.resize(800, null, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // WebPへ変換 (品質80)
      const resizedBuffer = await sharpInstance
        .webp({ quality: 80 })
        .toBuffer();

      const blob = await put(filename, resizedBuffer, { access: 'public' });
      imageUrl = blob.url;
    }

    const client = await getMongoClient();
    const db = client.db('portfolioDB');
    const collection = db.collection('stations');

    const newData = {
      name: name.trim(),
      text: text.trim(),
      rating,
      imageUrl,
      station,
    };

    const result = await collection.insertOne(newData);
    return NextResponse.json({ insertedId: result.insertedId, ...newData });
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json({ error: error.message || "サーバーエラーが発生しました" }, { status: 500 });
  }
}

export async function GET (req: Request) {
  const { searchParams } = new URL(req.url);
  const station = searchParams.get('station');

  const allowedStations = await getAllowedStations();
  if (!station || !allowedStations.includes(station)) {
    return NextResponse.json([], { status: 200 });
  }

  const client = await getMongoClient();
  const db = client.db('portfolioDB');
  const collection = db.collection('stations');

  const data = await collection.find({ station }).toArray();
  return NextResponse.json(data);
}

