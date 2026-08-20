export const dynamic = 'force-dynamic';

import { getMongoClient } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
  try {
    const body = await req.json();
    const { name, slug, line, order, password } = body;

    // パスワード検証
    if (!password || password !== process.env.POST_PASSWORD) {
      return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
    }

    // バリデーション
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "駅名は必須です" }, { status: 400 });
    }
    if (!slug || !slug.trim()) {
      return NextResponse.json({ error: "slugは必須です" }, { status: 400 });
    }

    const cleanSlug = slug.trim().toLowerCase();
    // slugの形式チェック (半角英数字とハイフンのみ)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(cleanSlug)) {
      return NextResponse.json({ error: "slugは半角英数字とハイフンのみ使用できます" }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('portfolioDB');
    const collection = db.collection('station_master');

    // 重複チェック
    const existing = await collection.findOne({ slug: cleanSlug });
    if (existing) {
      return NextResponse.json({ error: "すでに存在するslugです" }, { status: 400 });
    }

    // orderの決定 (指定がなければ最大値 + 1)
    let assignedOrder = order ? Number(order) : 1;
    if (!order) {
      const maxOrderDoc = await collection.find({}).sort({ order: -1 }).limit(1).toArray();
      if (maxOrderDoc.length > 0 && typeof maxOrderDoc[0].order === 'number') {
        assignedOrder = maxOrderDoc[0].order + 1;
      }
    }

    const newStation = {
      slug: cleanSlug,
      name: name.trim(),
      line: line ? line.trim() : "",
      order: assignedOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newStation);
    return NextResponse.json({ insertedId: result.insertedId, ...newStation });
  } catch (error: any) {
    console.error("POST station master error:", error);
    return NextResponse.json({ error: error.message || "サーバーエラーが発生しました" }, { status: 500 });
  }
}