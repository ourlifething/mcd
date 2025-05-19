/**メールを受け取るためのAPI */
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;
    // 環境変数をログ出力
    // console.log('環境変数 EMAIL_USER:', process.env.EMAIL_USER);
    // console.log('環境変数 EMAIL_PASS:', process.env.EMAIL_PASS);

    // リクエストから取得したデータをログに出力
    // console.log('ログ出力: name:', name, 'email:', email, 'message:', message);

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
