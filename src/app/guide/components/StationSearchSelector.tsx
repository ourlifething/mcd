'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StationMaster } from '@/lib/stations';
import styles from './StationSearchSelector.module.css';

type Props = {
  stations: StationMaster[];
}

export default function StationSearchSelector({ stations }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredStations = stations.filter(st => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    const nameMatch = st.name.toLowerCase().includes(q);
    const lineMatch = st.line ? st.line.toLowerCase().includes(q) : false;
    const slugMatch = st.slug.toLowerCase().includes(q);
    return nameMatch || lineMatch || slugMatch;
  });

  const handleSelect = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/station/${slug}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.selector_container} ref={wrapperRef}>
      <label className={styles.search_label}>駅を探す</label>
      <input
        type="text"
        placeholder="駅名・路線名を検索 (例: 目黒、山手線)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim()) setIsOpen(true);
        }}
        className={styles.search_input}
      />

      {isOpen && query.trim() !== '' && (
        <div className={styles.dropdown}>
          {filteredStations.length > 0 ? (
            filteredStations.map((st) => (
              <div
                key={st.slug}
                className={styles.item}
                onClick={() => handleSelect(st.slug)}
              >
                <span className={styles.station_name}>{st.name}</span>
                {st.line && <span className={styles.station_line}>{st.line}</span>}
              </div>
            ))
          ) : (
            <div className={styles.no_result}>該当する駅がありません</div>
          )}
        </div>
      )}
    </div>
  );
}
