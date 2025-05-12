'use client'
import { useEffect, useState } from 'react';
/**
 * 入力フォーム
 */
type Stations = {
  _id: string;
  name: string;
  text: string;
}[]
export default function StationForm () {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  // const [responseData, setResData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/stations', {
      method: 'POST',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({ name, text })
    })
    const data = await res.json();
    console.log('登録成功:', data)
    // setResData(data)
  }
  const [lists, setList] = useState<Stations>([])
  useEffect(() => {
    fetch('/api/stations')
    .then(res => res.json())
    .then(data => setList(data))
    .catch(err => console.error('データ取得失敗:', err))
  }, [])
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
          {lists.map((list, index) => (
            <>
              <li key={list._id || index}>
                {list.name} {list.text}
              </li>
            </>
          ))}
        </ul>
  
      </section>
      {/* <p>{responseData ? responseData : ''}</p> */}
    </>
  );
};
