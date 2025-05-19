/**mongoDBの接続を確認するためのコンポーネント初期の接続確認のためだけのコンポーネント */
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return NextResponse.json({ message: "成功！！Pinged your deployment. You successfully connected to MongoDB!" });
  } catch (error: any) {
    console.error("MongoDB接続失敗:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}