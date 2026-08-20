'use client'
import { useState } from 'react';
import { StationMaster } from '@/lib/stations';
import { useRouter } from 'next/navigation';

type Props = { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess?: (targetStation: string) => void;
  stationSlug: string;
  stationsList: StationMaster[];
}

export default function InputModal ({ isOpen, onClose, onSuccess, stationSlug, stationsList }: Props) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [selectedStation, setSelectedStation] = useState(stationSlug);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [rating, setRating] = useState<'おすすめ' | 'かなりおすすめ'>('おすすめ');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimizeMessage, setOptimizeMessage] = useState('');
  const router = useRouter();

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.8;
          const tryCompress = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(file);
                  return;
                }
                if (blob.size > 1 * 1024 * 1024 && quality > 0.4) {
                  quality -= 0.1;
                  tryCompress();
                } else {
                  const newName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
                  const compressedFile = new File([blob], newName, {
                    type: 'image/webp',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                }
              },
              'image/webp',
              quality
            );
          };
          tryCompress();
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSubmitting(true);
      setOptimizeMessage('画像を最適化しています…');
      try {
        const compressedFile = await compressImage(file);
        setSelectedImage(compressedFile);
        setImagePreview(URL.createObjectURL(compressedFile));
      } catch (err) {
        console.error('画像圧縮エラー:', err);
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
      } finally {
        setIsSubmitting(false);
        setOptimizeMessage('');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!password || !password.trim()) {
      alert('パスワードを入力してください');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    formData.append('rating', rating);
    formData.append('password', password);
    formData.append('station', selectedStation);
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
        setIsSubmitting(false);
        return;
      }

      const data = await res.json();
      console.log('登録成功:', data);

      // 成功時のみ状態をリセットしてモーダルを閉じる
      setName(''); 
      setText(''); 
      setPassword('');
      setSelectedImage(null); 
      setImagePreview(null); 
      setRating('おすすめ');
      if (onSuccess) {
        onSuccess(selectedStation);
      }
      onClose();
    } catch (error) {
      console.error('通信エラー:', error);
      alert('通信エラーが発生しました');
      setIsSubmitting(false);
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
            <label style={s.label}>駅</label>
            <select 
              value={selectedStation} 
              onChange={(e) => setSelectedStation(e.target.value)} 
              style={s.input}
            >
              {stationsList.map((st) => (
                <option key={st.slug} value={st.slug}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={s.label}>評価</label>
            <div style={s.btnGroup}>
              <button type="button" onClick={() => setRating('おすすめ')} style={s.rateBtn(rating === 'おすすめ')}>おすすめ</button>
              <button type="button" onClick={() => setRating('かなりおすすめ')} style={s.rateBtn(rating === 'かなりおすすめ')}>かなりおすすめ</button>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ ...s.label, marginBottom: 0 }}>コメント</label>
              <span style={{ fontSize: '11px', color: '#666' }}>{text.length} / 100</span>
            </div>
            <textarea 
              placeholder="コメントを入力（100文字まで）" 
              value={text} 
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setText(e.target.value);
                }
              }} 
              rows={4} 
              style={s.textarea} 
            />
          </div>

          <div>
            <label style={s.label}>パスワード</label>
            <input type="password" placeholder="パスワードを入力" value={password} onChange={(e) => setPassword(e.target.value)} style={s.input} />
          </div>

          <button type="submit" disabled={isSubmitting} style={{ ...s.submit, opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'アップロード中…' : '投稿する'}
          </button>
        </form>
      </div>
    </div>
  );
};



