// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function POST(request: Request) {
//   try {
//     // リクエストのボディを取得
//     const data = await request.json();
    
//     const { name, email, message } = data;

//     // 保存するファイルのパスを指定（プロジェクトのルートディレクトリに保存）
//     const filePath = path.join(process.cwd(), 'data', 'contact_form.txt');

//     // ファイルに書き込む内容を整形
//     const content = `名前: ${name}\nメールアドレス: ${email}\nメッセージ: ${message}\n\n`;

//     // ファイルが存在しない場合は新しく作成、存在する場合は追記
//     fs.appendFileSync(filePath, content, 'utf8');

//     // 成功レスポンスを返す
//     return NextResponse.json({ message: 'メッセージが送信されました' }, { status: 200 });
//   } catch (error) {
//     console.error('Error processing contact form:', error);
//     return NextResponse.json({ message: '送信中にエラーが発生しました' }, { status: 500 });
//   }
// }
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;
    console.log('logout====',name,email,message)

    // Nodemailerの設定
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gmailを利用
      auth: {
        user: process.env.EMAIL_USER, // Gmailアカウントのメールアドレス
        pass: process.env.EMAIL_PASS, // Gmailアカウントのアプリパスワード
      },
    });

    // メールオプション設定
    const mailOptions = {
      from: process.env.EMAIL_USER, // 送信元アドレス
      to: 'vervewearage@gmail.com', // 受信先のメールアドレス
      subject: '新しいメッセージが届きました', // 件名
      text: `名前: ${name}\nメールアドレス: ${email}\nメッセージ: ${message}`, // 本文
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'メッセージが送信されました' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('送信エラー:', error);
    return new Response(
      JSON.stringify({ message: '送信中にエラーが発生しました' }),
      { status: 500 }
    );
  }
}
