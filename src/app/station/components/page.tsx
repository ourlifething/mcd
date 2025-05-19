'use client'

import { useEffect, useState } from 'react';
import EditModal from '@/app/station/components/EditModal'
import styles from "@/styles/station.module.css"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InputModal from './InputModal';
/**
 * 入力フォーム
 */
type Stations = {
  _id: string;
  name: string;
  text: string;
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
            {lists.map((list) => (
              <li 
                key={list._id }
                className={styles['station_list_block']}
              >
                <div className={styles['station_list_name']}>
                  {list.name}
                </div>
                <div className={styles['station_list_text']}>
                  {list.text}
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
