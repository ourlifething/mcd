import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db('portfolioDB')
  const collection = db.collection('stations')

  const result = await collection.insertOne(data);
  return NextResponse.json({ insertedId: result.insertedId });
}

export async function GET () {
  const client = await clientPromise; 
  const db = client.db('portfolioDB');
  const collection = db.collection('stations');

  const data = await collection.find({}).toArray();
  return NextResponse.json(data);
}
