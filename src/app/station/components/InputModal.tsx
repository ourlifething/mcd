'useClient'
import styles from '@/styles/station.module.css';
import { useState, useEffect } from 'react';

type Stations = {
  _id: string;
  name: string;
  text: string;
}
type Props = {
  isOpen: boolean;
  onClose:()=> void;
}
export default function InputModal ({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/stations', {
      method: 'POST',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({ name, text })
    })
    const data = await res.json();
    console.log('登録成功:', data)
    setName('')
    setText('')
  }
  const [lists, setList] = useState<Stations[]>([])
  useEffect(() => {
    fetch('/api/stations')
    .then(res => res.json())
    .then(data => setList(data))
    .catch(err => console.error('データ取得失敗:', err))
  }, [lists])
  
  return (
    <>
      <div className={styles['modal']}>
        <h2>入力モーダル</h2>
        <form onSubmit={handleSubmit}>
          <h3>名称・店舗名など</h3>
          <input type="text" placeholder='名称・店舗の名前などを入力' value={name} onChange={(e) => setName(e.target.value)} />
          <h3>コメント</h3>
          <input type="text" placeholder='コメントを入力' value={text} onChange={(e) => setText(e.target.value) } />
          <button type="submit">登録</button>
        </form>
        <button onClick={onClose}>閉じる</button>
      </div>
    </>

  );
};