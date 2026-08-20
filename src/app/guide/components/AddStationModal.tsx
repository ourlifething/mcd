'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AddStationModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStationModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [line, setLine] = useState('');
  const [order, setOrder] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim() || !slug.trim() || !password.trim()) {
      setError('駅名、slug、パスワードは必須です');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/stations/master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          line: line.trim(),
          order: order ? Number(order) : undefined,
          password: password.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || '駅の追加に失敗しました');
        setIsSubmitting(false);
        return;
      }

      setName('');
      setSlug('');
      setLine('');
      setOrder('');
      setPassword('');
      setIsSubmitting(false);
      onClose();
      router.refresh();
    } catch (err) {
      console.error('Add station error:', err);
      setError('通信エラーが発生しました');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.title}>ADD STATION</span>
          <button onClick={onClose} disabled={isSubmitting} className={styles.close}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>駅名</label>
            <input 
              type="text" 
              placeholder="例: 渋谷駅" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>URL slug</label>
            <input 
              type="text" 
              placeholder="例: shibuya (半角英数字・ハイフン)" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>路線情報（任意）</label>
            <input 
              type="text" 
              placeholder="例: 山手線・銀座線・半蔵門線" 
              value={line} 
              onChange={(e) => setLine(e.target.value)} 
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>表示順（任意）</label>
            <input 
              type="number" 
              placeholder="例: 5" 
              value={order} 
              onChange={(e) => setOrder(e.target.value)} 
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>管理パスワード</label>
            <input 
              type="password" 
              placeholder="パスワードを入力" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.btnGroup}>
            <button type="button" onClick={onClose} disabled={isSubmitting} className={styles.cancel}>
              キャンセル
            </button>
            <button type="submit" disabled={isSubmitting} className={styles.submit}>
              {isSubmitting ? '追加中...' : 'ADD STATION'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
