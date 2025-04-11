import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // リクエストのボディを取得
    const data = await request.json();
    
    const { name, email, message } = data;

    // 保存するファイルのパスを指定（プロジェクトのルートディレクトリに保存）
    const filePath = path.join(process.cwd(), 'data', 'contact_form.txt');

    // ファイルに書き込む内容を整形
    const content = `名前: ${name}\nメールアドレス: ${email}\nメッセージ: ${message}\n\n`;

    // ファイルが存在しない場合は新しく作成、存在する場合は追記
    fs.appendFileSync(filePath, content, 'utf8');

    // 成功レスポンスを返す
    return NextResponse.json({ message: 'メッセージが送信されました' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ message: '送信中にエラーが発生しました' }, { status: 500 });
  }
}
