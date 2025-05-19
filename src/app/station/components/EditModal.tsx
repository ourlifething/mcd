'use client'

import { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/station.module.css'

type Props = {
  isOpen: boolean;
  currentEdit: { _id: string; name: string; text: string } | null;
  setCurrentEdit: Dispatch<SetStateAction<{ _id: string; name: string; text: string } | null>>;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function EditModal({ isOpen, currentEdit, setCurrentEdit, onClose, onSave }: Props) {
  if (!isOpen || !currentEdit) return null;

  const handleSave = async () => {
    await fetch(`/api/stations/${currentEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: currentEdit.name,
        text: currentEdit.text,
      }),
    });

    await onSave(); // ← 親がリスト更新して閉じる
  };

  const handleDelete = async () => {
    const confirmed = confirm('本当に削除しますか？');
    if (!confirmed) return;

    await fetch(`/api/stations/${currentEdit._id}`, {
      method: 'DELETE',
    });

    await onSave();
  };

  return (
    <div className={styles.modal}>
      <h3>編集モーダル</h3>
      <input
        value={currentEdit.name}
        onChange={(e) =>
          setCurrentEdit({ ...currentEdit, name: e.target.value })
        }
      />
      <input
        value={currentEdit.text}
        onChange={(e) =>
          setCurrentEdit({ ...currentEdit, text: e.target.value })
        }
      />
      <button onClick={handleSave}>保存</button>
      <button onClick={onClose}>キャンセル</button>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
}
