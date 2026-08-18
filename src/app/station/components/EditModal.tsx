'use client'

import { Dispatch, SetStateAction, useState } from 'react';
import styles from '@/styles/modal.module.css';

type Props = {
  isOpen: boolean;
  currentEdit: { _id: string; name: string; text: string } | null;
  setCurrentEdit: Dispatch<SetStateAction<{ _id: string; name: string; text: string } | null>>;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function EditModal({ isOpen, currentEdit, setCurrentEdit, onClose, onSave }: Props) {
  if (!isOpen || !currentEdit) return null;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!currentEdit.name?.trim() || !currentEdit.text?.trim()) {
      alert('店舗名とコメントは必須です');
      return;
    }
    if (currentEdit.text.trim().length > 100) {
      alert('コメントは100文字以内で入力してください');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/stations/${currentEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentEdit.name.trim(), text: currentEdit.text.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || '更新に失敗しました');
        setIsSubmitting(false);
        return;
      }
      await onSave();
    } catch {
      alert('通信エラーが発生しました');
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？') || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/stations/${currentEdit._id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('削除に失敗しました');
        setIsSubmitting(false);
        return;
      }
      await onSave();
    } catch {
      alert('通信エラーが発生しました');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.title}>EDIT</span>
          <button onClick={onClose} className={styles.close}>×</button>
        </div>

        <form onSubmit={handleSave} className={styles.form}>
          <div>
            <label className={styles.label}>店舗名</label>
            <input 
              type="text" 
              value={currentEdit.name} 
              onChange={(e) => setCurrentEdit({ ...currentEdit, name: e.target.value })} 
              className={styles.input} 
            />
          </div>

          <div>
            <div className={styles.charCountHeader}>
              <label className={styles.label} style={{ marginBottom: 0 }}>コメント</label>
              <span className={styles.charCount}>{currentEdit.text.length} / 100</span>
            </div>
            <textarea 
              value={currentEdit.text} 
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setCurrentEdit({ ...currentEdit, text: e.target.value });
                }
              }} 
              rows={4} 
              className={styles.textarea} 
            />
          </div>

          <div className={styles.btnGroup}>
            <button type="button" onClick={onClose} disabled={isSubmitting} className={styles.cancel}>
              キャンセル
            </button>
            <button type="submit" disabled={isSubmitting} className={styles.saveButton}>
              {isSubmitting ? '保存中...' : '保存'}
            </button>
          </div>

          <button type="button" onClick={handleDelete} disabled={isSubmitting} className={styles.delete}>
            削除する
          </button>
        </form>
      </div>
    </div>
  );
}
