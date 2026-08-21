'use client'

import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import styles from '@/styles/modal.module.css';
import { StationLink } from '@/lib/stations';

type EI = { _id: string; name: string; text: string; links?: StationLink[]; imageUrl?: string; imageUrls?: string[]; };
type Props = {
  isOpen: boolean; currentEdit: EI | null;
  setCurrentEdit: Dispatch<SetStateAction<EI | null>>;
  onClose: () => void; onSave: () => Promise<void>;
};

export default function EditModal({ isOpen, currentEdit, setCurrentEdit, onClose, onSave }: Props) {
  if (!isOpen || !currentEdit) return null;

  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [links, setLinks] = useState<StationLink[]>(currentEdit.links ?? []);
  const [mOpen, setMOpen] = useState(false);
  const [lText, setLText] = useState('');
  const [lUrl, setLUrl] = useState('');
  const [lErr, setLErr] = useState('');
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setLinks(currentEdit.links ?? []); }, [currentEdit]);

  const openModal = () => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    if (s === e) { alert('リンクを設定する文字列を選択してください'); return; }
    const sel = currentEdit.text.substring(s, e);
    if (!sel.trim()) { alert('有効な文字列を選択してください'); return; }
    setLText(sel); setLUrl(''); setLErr(''); setMOpen(true);
  };

  const addL = () => {
    const u = lUrl.trim();
    if (!u) { setLErr('URLを入力してください'); return; }
    try {
      const p = new URL(u);
      if (p.protocol !== 'http:' && p.protocol !== 'https:') { setLErr('http/httpsのみ許可'); return; }
    } catch { setLErr('無効なURL形式'); return; }
    setLinks(prev => [...prev.filter(l => l.text !== lText), { text: lText, url: u }]);
    setMOpen(false);
  };

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
    if (!password || !password.trim()) {
      alert('パスワードを入力してください');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/stations/${currentEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: currentEdit.name.trim(), 
          text: currentEdit.text.trim(),
          links,
          password 
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || '更新に失敗しました');
        setIsSubmitting(false);
        return;
      }
      setPassword('');
      await onSave();
    } catch {
      alert('通信エラーが発生しました');
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？') || isSubmitting) return;

    if (!password || !password.trim()) {
      alert('パスワードを入力してください');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/stations/${currentEdit._id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || '削除に失敗しました');
        setIsSubmitting(false);
        return;
      }
      setPassword('');
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className={styles.label} style={{ marginBottom: 0 }}>コメント</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button type="button" onClick={openModal} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer', color: '#333' }}>🔗 LINK</button>
                <span className={styles.charCount}>{currentEdit.text.length} / 100</span>
              </div>
            </div>
            <textarea 
              ref={taRef}
              value={currentEdit.text} 
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 100) {
                  setCurrentEdit({ ...currentEdit, text: val });
                  setLinks(prev => prev.filter(l => val.includes(l.text)));
                }
              }} 
              rows={4} 
              className={styles.textarea} 
            />
            {links.length > 0 && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#555' }}>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>設定されたリンク:</div>
                {links.map((l, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', padding: '4px 8px', borderRadius: '3px', border: '1px solid #eee', marginBottom: '4px' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>「{l.text}」 → {l.url}</span>
                    <button type="button" onClick={() => setLinks(prev => prev.filter(x => x.text !== l.text))} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className={styles.label}>パスワード</label>
            <input 
              type="password" 
              placeholder="パスワードを入力" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input} 
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

        {mOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1200 }}>
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '4px', width: '90%', maxWidth: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>リンクを設定</h3>
              <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>選択文字列: <strong style={{ color: '#111' }}>「{lText}」</strong></div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#333' }}>URL (https:// または http://)</label>
                <input type="text" placeholder="https://example.com" value={lUrl} onChange={(e) => setLUrl(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box' }} />
                {lErr && <div style={{ fontSize: '11px', color: '#c00', marginTop: '4px' }}>{lErr}</div>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setMOpen(false)} style={{ padding: '6px 12px', fontSize: '12px', background: 'none', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}>キャンセル</button>
                <button type="button" onClick={addL} style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>リンクを設定</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
