export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function PUT (request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, text, password } = body;

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

    const client = await getMongoClient();
    const db = client.db('portfolioDB');
    const collection = db.collection('stations')

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { name: name.trim(), text: text.trim() } }
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
