'use client'

import { useState, useEffect } from 'react';
import styles from "@/styles/station.module.css"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import EditModal from '@/app/station/components/EditModal'
import InputModal from './InputModal';
import { StationItem, StationMaster } from '@/lib/stations';
/**
 * 入力フォーム
 */
type Props = {
  stationName: string;
  stationSlug: string;
  initialList: StationItem[];
  stationsList: StationMaster[];
}
export default function StationForm ({ stationName, stationSlug, initialList, stationsList }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputModal, setIsInputModal] = useState(false)
  const [currentEdit, setCurrentEdit] = useState<StationItem | null>(null)
  const [lists, setList] = useState<StationItem[]>(initialList)
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [likingId, setLikingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('likedStationPosts');
      if (saved) {
        setLikedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load liked posts from localStorage:', e);
    }
  }, []);

  const handleLike = async (id: string) => {
    if (likedIds.includes(id) || likingId === id) return;

    setLikingId(id);
    try {
      const res = await fetch(`/api/stations/${id}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        setLikingId(null);
        return;
      }

      const data = await res.json();
      const newLikes = data.likes;

      // listsの該当アイテムのlikesを更新
      setList(prev => prev.map(item => item._id === id ? { ...item, likes: newLikes } : item));

      // localStorage更新
      const updatedLiked = [...likedIds, id];
      setLikedIds(updatedLiked);
      localStorage.setItem('likedStationPosts', JSON.stringify(updatedLiked));
    } catch (error) {
      console.error('Like request failed:', error);
    } finally {
      setLikingId(null);
    }
  };

  const renderTextWithLinks = (text: string, links?: StationLink[]) => {
    if (!links || links.length === 0) {
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
              style={{ color: '#111', textDecoration: 'underline', wordBreak: 'break-all' }}
            >
              {part}
            </a>
          );
        }
        return part;
      });
    }

    let elements: (string | React.ReactNode)[] = [text];

    for (const link of links) {
      const newElements: (string | React.ReactNode)[] = [];
      for (const el of elements) {
        if (typeof el === 'string') {
          const index = el.indexOf(link.text);
          if (index !== -1) {
            const before = el.substring(0, index);
            const match = el.substring(index, index + link.text.length);
            const after = el.substring(index + link.text.length);

            if (before) newElements.push(before);
            newElements.push(
              <a
                key={link.url + '-' + index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#111', textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                {match}
              </a>
            );
            if (after) newElements.push(after);
          } else {
            newElements.push(el);
          }
        } else {
          newElements.push(el);
        }
      }
      elements = newElements;
    }

    return elements.map((el, idx) => {
      if (typeof el === 'string') {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = el.split(urlRegex);
        return parts.map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={`auto-${idx}-${i}`}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#111', textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                {part}
              </a>
            );
          }
          return part;
        });
      }
      return el;
    });
  };

  return (
    <>
      <div className={styles['station_wrapper']}>
        <div className={styles['station_header_top']}>
          <Link href="/guide" className={styles['back_link']}>
            &larr; GUIDE
          </Link>
          <button 
            onClick={()=> setIsInputModal(true)}
            className={styles['station_input_btn']}
          >
              + ADD
          </button>
        </div>

        <InputModal
          isOpen={isInputModal}
          onClose={()=> setIsInputModal(false)}
          stationSlug={stationSlug}
          stationsList={stationsList}
          onSuccess={async (targetStation) => {
            setIsInputModal(false);
            if (targetStation === stationSlug) {
              const res = await fetch(`/api/stations?station=${stationSlug}`);
              const data = await res.json();
              setList(data);
            } else {
              router.refresh();
              router.push(`/station/${targetStation}`);
            }
          }}
        />

        <div className={styles['station_hero']}>
          <h1 className={styles['station_slug_title']}>{stationSlug}</h1>
          <div className={styles['station_name_sub']}>{stationName}</div>
          <p className={styles['station_archive_label']}>TOKYO / LOCAL ARCHIVE</p>
        </div>

        <div className={styles['station_divider']}></div>
      </div>

      <section>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
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
                <div className={styles['entry_number']}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {list.imageUrl && (
                  <div className={styles['image_container']}>
                    <Image 
                      src={list.imageUrl} 
                      alt={list.name} 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      priority={index < 3}
                      className={styles['station_image']}
                    />
                  </div>
                )}
                {list.rating && (
                  <div className={styles['station_rating']}>
                    ★ {list.rating}
                  </div>
                )}
                <div className={styles['station_list_name']}>
                  {list.name}
                </div>
                <div className={styles['station_list_text']}>
                  {renderTextWithLinks(list.text, list.links)}
                </div>
                
                <div className={styles['station_card_footer']}>
                  <button 
                    onClick={()=> { setCurrentEdit(list), setIsModalOpen(true) }}
                    className={styles['station_edit_button']}
                  >
                    EDIT
                  </button>

                  <button
                    onClick={() => handleLike(list._id)}
                    disabled={likingId === list._id}
                    className={styles['like_button']}
                    title={likedIds.includes(list._id) ? "いいね済み" : "いいねする"}
                  >
                    {likedIds.includes(list._id) ? (
                      <AiFillHeart className={`${styles['heart_icon']} ${styles['liked']}`} />
                    ) : (
                      <AiOutlineHeart className={styles['heart_icon']} />
                    )}
                    <span className={styles['like_count']}>{list.likes ?? 0}</span>
                  </button>
                </div>
              </li>
            ))}
            {/** modal */}
            <EditModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              currentEdit={currentEdit}
              setCurrentEdit={setCurrentEdit}
              onSave={async () => {
                const res = await fetch(`/api/stations?station=${stationSlug}`);
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

