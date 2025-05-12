'use client'
import { span } from 'framer-motion/client';
import { useEffect, useState } from 'react';
import styles from '@/styles/station.module.css';
/**
 * 入力フォーム
 */
type Stations = {
  _id: string;
  name: string;
  text: string;
}
export default function StationForm () {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [editName, setEditName] = useState<string>('')
  const [editText, setEditText] = useState<string>('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<Stations | null>(null)

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
      <form onSubmit={handleSubmit}>
        <h3>名称・店舗名など</h3>
        <input type="text" placeholder='名称・店舗の名前などを入力' value={name} onChange={(e) => setName(e.target.value)} />
        <h3>コメント</h3>
        <input type="text" placeholder='コメントを入力' value={text} onChange={(e) => setText(e.target.value) } />
        <button type="submit">登録</button>
      </form>
      <section>
        <h2>目黒駅のおすすめ</h2>
        <ul>
          {lists.map((list) => (
            <li key={list._id }>
              {list.name} {list.text}
              <button onClick={()=> {
                setCurrentEdit(list)
                setIsModalOpen(true)
              }}>
                編集
              </button>
              
            </li>
          ))}
          {/** modal */}
          {isModalOpen && currentEdit && (
            <div className={styles['modal']}>
              <h3>編集モーダル</h3>
              <input value={currentEdit.name} onChange={(e) => setCurrentEdit({...currentEdit, name: e.target.value})} />
              <input value={currentEdit.text} onChange={(e)=> setCurrentEdit({...currentEdit, text:e.target.value})} />
              <button onClick={async ()=> {
                await fetch(`/api/stations/${currentEdit._id}`, {
                  method: 'PUT',
                  headers: { 'COntent-Type': 'application/json'},
                  body: JSON.stringify({
                    name: currentEdit.name,
                    text: currentEdit.text,
                  }),
                });
                // リストを更新
                const res = await fetch('/api/stations')
                const data = await res.json();
                setList(data)

                setIsModalOpen(false);
              }}>
                保存
              </button>
              <button onClick={()=> setIsModalOpen(false)}>キャンセル</button>
              <button onClick={async ()=>{
                const confirmed = confirm('本当に削除しますか？');
                if (!confirmed) return;
                await fetch(`/api/stations/${currentEdit._id}`,{
                  method: 'DELETE',
                }) 
                // リストを更新
                const res = await fetch('/api/stations')
                const data = await res.json();
                setList(data)

                setIsModalOpen(false);
                
              }}>削除</button>
            </div>
          )}
        </ul>
      </section>
    </>
  );
};
