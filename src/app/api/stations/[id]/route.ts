import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function PUT (request: NextRequest, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db('portfolioDB');
  const collection = db.collection('stations')
  
  const body = await request.json();
  const { name, text } = body;

  const result = await collection.updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { name, text } }
  );
  return NextResponse.json({ message: '更新完了', result });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const Client = await clientPromise;
    const db = Client.db('portfolioDB')

    const result = await db.collection('stations').deleteOne({
      _id: new ObjectId(params.id),
    });

    if ( result.deletedCount === 0 ) {
      return NextResponse.json({ error: 'データが見つかりません' }, { status: 404 })
    }
    return NextResponse.json({ message: '削除成功' });
  } catch (error) {
    return NextResponse.json({ error: 'サーバーエラー' }, {status: 500});
  }
}
