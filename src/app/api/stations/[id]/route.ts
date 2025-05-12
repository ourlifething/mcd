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