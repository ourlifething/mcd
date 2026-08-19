'use client'

import { useEffect, useState } from 'react';
import styles from "@/styles/station.module.css"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import EditModal from '@/app/station/components/EditModal'
import InputModal from './InputModal';
/**
 * 入力フォーム
 */
type Stations = {
  _id: string;
  name: string;
  text: string;
  imageUrl?: string;
  rating?: string;
}
type Props = {
  stationName: string;
}
export default function StationForm ({ stationName }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputModal, setIsInputModal] = useState(false)
  const [currentEdit, setCurrentEdit] = useState<Stations | null>(null)

  const [lists, setList] = useState<Stations[]>([])
  useEffect(() => {
    fetch('/api/stations')
    .then(res => res.json())
    .then(data => setList(data))
    .catch(err => console.error('データ取得失敗:', err))
  }, [lists])

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#38C2C2', textDecoration: 'underline', wordBreak: 'break-all' }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      <div className={styles['station_wrapper']}>
        <button 
          onClick={()=> setIsInputModal(true)}
          className={styles['station_input_btn']}
        >
            訪問情報を入力する
        </button>
        <InputModal
          isOpen={isInputModal}
          onClose={()=> setIsInputModal(false)}
          onSuccess={async () => {
            const res = await fetch('/api/stations');
            const data = await res.json();
            setList(data);
            setIsInputModal(false);
          }}
        />
        <h2 className={styles['station_title']}>{stationName}のおすすめ</h2>
      </div>

      <section>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles['motion-div']}
        >
          <ul className={styles['station_list']}>
            {lists.map((list, index) => (
              <li 
                key={list._id }
                className={styles['station_list_block']}
              >
                {list.imageUrl && (
                  <div style={{ width: '100%', aspectRatio: '4 / 5', marginBottom: '12px', overflow: 'hidden', borderRadius: '4px', position: 'relative' }}>
                    <Image 
                      src={list.imageUrl} 
                      alt={list.name} 
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 240px"
                      priority={index < 3}
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                )}
                {list.rating && (
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: '500', letterSpacing: '0.05em' }}>
                    ★ {list.rating}
                  </div>
                )}
                <div className={styles['station_list_name']}>
                  {list.name}
                </div>
                <div className={styles['station_list_text']}>
                  {renderTextWithLinks(list.text)}
                </div>
                <button 
                  onClick={()=> { setCurrentEdit(list), setIsModalOpen(true) }}
                  className={styles['station_edit_button']}
                >
                  編集
                </button>
              </li>
            ))}
            {/** modal */}
            <EditModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              currentEdit={currentEdit}
              setCurrentEdit={setCurrentEdit}
              onSave={async () => {
                const res = await fetch('/api/stations');
                const data = await res.json();
                setList(data);
                setIsModalOpen(false);
              }}
            />
          </ul>
        </motion.div>
      </section>
    </>
  );
};

