export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function POST (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await getMongoClient();
    const db = client.db('portfolioDB');
    const collection = db.collection('stations');

    const updatedDoc = await collection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $inc: { likes: 1 } },
      { returnDocument: 'after' }
    );

    if (!updatedDoc) {
      return NextResponse.json({ error: '投稿が見つかりません' }, { status: 404 });
    }

    const currentLikes = updatedDoc.likes ?? 1;
    return NextResponse.json({ likes: currentLikes });
  } catch (error: any) {
    console.error("Like error:", error);
    return NextResponse.json({ error: error.message || "サーバーエラーが発生しました" }, { status: 500 });
  }
}