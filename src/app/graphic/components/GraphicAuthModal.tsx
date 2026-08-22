'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './GraphicAuthModal.module.css';

export default function GraphicAuthModal() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!password || !password.trim()) {
      setError('パスワードを入力してください');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/graphic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'パスワードが正しくありません');
        setIsLoading(false);
        return;
      }

      // 認証成功時はページをリロードしてServer ComponentのCookieチェックを通過させる
      router.refresh();
    } catch (err) {
      setError('通信エラーが発生しました');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>GRAPHIC</h2>
          <p className={styles.message}>
            閲覧をご希望の方は、<br />
            <Link href="/contact" className={styles.contactLink}>お問い合わせ</Link>よりメッセージをお送りください。
          </p>
          <p className={styles.subMessage}>閲覧にはパスワードが必要です。</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <input 
              type="password" 
              placeholder="パスワードを入力" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input}
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className={styles.button}
          >
            {isLoading ? '認証中...' : 'ENTER'}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/" className={styles.homeLink}>HOME</Link>
        </div>
      </div>
    </div>
  );
}