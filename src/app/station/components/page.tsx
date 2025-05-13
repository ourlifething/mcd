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
export default function StationForm () {
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
      <button onClick={()=> setIsInputModal(true)}>入力</button>
      <InputModal
        isOpen={isInputModal}
        onClose={()=> setIsInputModal(false)}
      />

      <section>
        <h2>目黒駅のおすすめ</h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles['motion-div']}
        >
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
