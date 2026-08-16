export const dynamic = 'force-dynamic';

import { getMongoClient } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { put } from '@vercel/blob';
import sharp from 'sharp';

export async function POST (req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const text = formData.get('text') as string;
    const rating = formData.get('rating') as string;
    const imageFile = formData.get('image') as File | null;

    // バリデーション
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "店舗名は必須です" }, { status: 400 });
    }
    if (!text || !text.trim()) {
      return NextResponse.json({ error: "コメントは必須です" }, { status: 400 });
    }
    if (rating !== 'おすすめ' && rating !== 'かなりおすすめ') {
      return NextResponse.json({ error: "不正な評価値です" }, { status: 400 });
    }

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json({ error: "サポートされていない画像形式です（JPEG, PNG, WebPのみ）" }, { status: 400 });
      }

      const filename = `${Date.now()}-${imageFile.name || 'upload.jpg'}`;
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const resizedBuffer = await sharp(buffer)
        .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
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
    };

    const result = await collection.insertOne(newData);
    return NextResponse.json({ insertedId: result.insertedId, ...newData });
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json({ error: error.message || "サーバーエラーが発生しました" }, { status: 500 });
  }
}

export async function GET () {
  const client = await getMongoClient();
  const db = client.db('portfolioDB');
  const collection = db.collection('stations');

  const data = await collection.find({}).toArray();
  return NextResponse.json(data);
}

