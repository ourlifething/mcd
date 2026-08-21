'use client'
import { useState, useRef } from 'react';
import { StationMaster, StationLink } from '@/lib/stations';
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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [rating, setRating] = useState<'おすすめ' | 'かなりおすすめ'>('おすすめ');
  const [links, setLinks] = useState<StationLink[]>([]);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkError, setLinkError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleOpenLinkModal = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      alert('リンクを設定する文字列を選択してください');
      return;
    }
    const selected = text.substring(start, end);
    if (!selected.trim()) {
      alert('有効な文字列を選択してください');
      return;
    }
    setLinkText(selected);
    setLinkUrl('');
    setLinkError('');
    setLinkModalOpen(true);
  };

  const handleAddLink = () => {
    const trimmedUrl = linkUrl.trim();
    if (!trimmedUrl) {
      setLinkError('URLを入力してください');
      return;
    }
    try {
      const parsed = new URL(trimmedUrl);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        setLinkError('http:// または https:// のみを許可しています');
        return;
      }
    } catch {
      setLinkError('有効なURLを入力してください');
      return;
    }

    setLinks(prev => [...prev.filter(l => l.text !== linkText), { text: linkText, url: trimmedUrl }]);
    setLinkModalOpen(false);
  };

  const handleRemoveLink = (targetText: string) => {
    setLinks(prev => prev.filter(l => l.text !== targetText));
  };
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
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      if (selectedImages.length + fileList.length > 3) {
        alert('最大3枚までです');
        return;
      }

      setIsSubmitting(true);
      setOptimizeMessage('画像を最適化しています…');
      try {
        const newSelectedImages = [...selectedImages];
        const newImagePreviews = [...imagePreviews];
        
        for (const file of fileList) {
          try {
            const compressedFile = await compressImage(file);
            newSelectedImages.push(compressedFile);
            newImagePreviews.push(URL.createObjectURL(compressedFile));
          } catch (err) {
            console.error('画像圧縮エラー:', err);
            newSelectedImages.push(file);
            newImagePreviews.push(URL.createObjectURL(file));
          }
        }
        setSelectedImages(newSelectedImages);
        setImagePreviews(newImagePreviews);
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
    formData.append('links', JSON.stringify(links));
    for (const img of selectedImages) {
      formData.append('images', img);
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
      setSelectedImages([]); 
      setImagePreviews([]); 
      setRating('おすすめ');
      setLinks([]);
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
          <div>
            <label style={s.label}>店舗写真 ({selectedImages.length}/3)</label>
            
            {/* プレビュー表示エリア */}
            {imagePreviews.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
                    <img
                      src={preview}
                      alt="プレビュー"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = selectedImages.filter((_, i) => i !== index);
                        const newPreviews = imagePreviews.filter((_, i) => i !== index);
                        setSelectedImages(newImages);
                        setImagePreviews(newPreviews);
                      }}
                      style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#333', color: '#fff', borderRadius: '50%', border: 'none', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 画像追加ボタン */}
            {selectedImages.length < 3 && (
              <label style={{ 
                width: '100%', 
                height: '60px', 
                border: '1px dashed #ccc', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                fontSize: '13px', 
                color: '#666', 
                letterSpacing: '0.1em', 
                borderRadius: '4px',
                backgroundColor: '#fafafa',
                transition: 'border-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#111'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#ccc'}
              >
                INPUT IMAGE
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
            )}
          </div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleOpenLinkModal}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    color: '#333',
                    letterSpacing: '0.05em'
                  }}
                >
                  🔗 LINK
                </button>
                <span style={{ fontSize: '11px', color: '#666' }}>{text.length} / 100</span>
              </div>
            </div>
            <textarea 
              ref={textareaRef}
              placeholder="コメントを入力（100文字まで）" 
              value={text} 
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 100) {
                  setText(val);
                  setLinks(prev => prev.filter(l => val.includes(l.text)));
                }
              }} 
              rows={4} 
              style={s.textarea} 
            />
            {links.length > 0 && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#555' }}>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>設定されたリンク:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {links.map((l, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', padding: '4px 8px', borderRadius: '3px', border: '1px solid #eee' }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                        「{l.text}」 → {l.url}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(l.text)}
                        style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {linkModalOpen && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
            }}>
              <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '4px', width: '90%', maxWidth: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', letterSpacing: '0.05em' }}>リンクを設定</h3>
                <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
                  選択文字列: <strong style={{ color: '#111' }}>「{linkText}」</strong>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#333' }}>URL (https:// または http://)</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box' }}
                  />
                  {linkError && <div style={{ fontSize: '11px', color: '#c00', marginTop: '4px' }}>{linkError}</div>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setLinkModalOpen(false)}
                    style={{ padding: '6px 12px', fontSize: '12px', background: 'none', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    リンクを設定
                  </button>
                </div>
              </div>
            </div>
          )}

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



