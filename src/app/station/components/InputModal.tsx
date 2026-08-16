'use client'
import { useState } from 'react';

type Props = { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess?: () => void;
}

export default function InputModal ({ isOpen, onClose, onSuccess }: Props) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [rating, setRating] = useState<'おすすめ' | 'かなりおすすめ'>('おすすめ');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    formData.append('rating', rating);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const res = await fetch('/api/stations', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || '投稿に失敗しました');
        return;
      }

      const data = await res.json();
      console.log('登録成功:', data);

      // 成功時のみ状態をリセットしてモーダルを閉じる
      setName(''); 
      setText(''); 
      setSelectedImage(null); 
      setImagePreview(null); 
      setRating('おすすめ');
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('通信エラー:', error);
      alert('通信エラーが発生しました');
    }
  };

  const s = {
    overlay: { position: 'fixed' as const, top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' },
    modal: { backgroundColor: '#fff', color: '#111', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' as const, borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', padding: '32px', position: 'relative' as const, fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
    title: { fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#666', fontWeight: '500' },
    close: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#111', padding: '4px' },
    form: { display: 'flex', flexDirection: 'column' as const, gap: '24px' },
    label: { display: 'block', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '8px', color: '#333' },
    dropzone: { display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'center', width: '100%', height: '180px', border: '1px dashed #ccc', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fafafa', overflow: 'hidden', position: 'relative' as const },
    input: { width: '100%', padding: '12px 14px', fontSize: '14px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#fff', color: '#111', outline: 'none', boxSizing: 'border-box' as const },
    textarea: { width: '100%', padding: '12px 14px', fontSize: '14px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#fff', color: '#111', outline: 'none', resize: 'none' as const, boxSizing: 'border-box' as const },
    btnGroup: { display: 'flex', gap: '12px' },
    rateBtn: (active: boolean) => ({ flex: 1, padding: '12px', fontSize: '13px', letterSpacing: '0.05em', borderRadius: '4px', cursor: 'pointer', border: active ? '1px solid #111' : '1px solid #e0e0e0', backgroundColor: active ? '#111' : '#fff', color: active ? '#fff' : '#111', transition: 'all 0.2s' }),
    submit: { width: '100%', padding: '14px', fontSize: '14px', letterSpacing: '0.1em', fontWeight: '500', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '8px' }
  };

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={s.header}>
          <span style={s.title}>VISIT</span>
          <button onClick={onClose} style={s.close}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          <div>
            <label style={s.label}>店舗写真</label>
            <label style={s.dropzone}>
              {imagePreview ? (
                <img src={imagePreview} alt="プレビュー" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '13px', color: '#666', letterSpacing: '0.05em' }}>写真を追加</span>
              )}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          </div>

          <div>
            <label style={s.label}>店舗名</label>
            <input type="text" placeholder="店舗名を入力" value={name} onChange={(e) => setName(e.target.value)} style={s.input} />
          </div>

          <div>
            <label style={s.label}>評価</label>
            <div style={s.btnGroup}>
              <button type="button" onClick={() => setRating('おすすめ')} style={s.rateBtn(rating === 'おすすめ')}>おすすめ</button>
              <button type="button" onClick={() => setRating('かなりおすすめ')} style={s.rateBtn(rating === 'かなりおすすめ')}>かなりおすすめ</button>
            </div>
          </div>

          <div>
            <label style={s.label}>コメント</label>
            <textarea placeholder="コメントを入力" value={text} onChange={(e) => setText(e.target.value)} rows={4} style={s.textarea} />
          </div>

          <button type="submit" style={s.submit}>投稿する</button>
        </form>
      </div>
    </div>
  );
};



