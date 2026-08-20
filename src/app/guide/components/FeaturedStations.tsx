'use client'

import { useState } from 'react';
import Link from 'next/link';
import { StationMaster } from '@/lib/stations';
import AddStationModal from './AddStationModal';

type Props = {
  stations: StationMaster[];
}

export default function FeaturedStations({ stations }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        padding: '0 2% 60px 2%',
        maxWidth: '1180px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {stations.map((st) => {
          const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.name + ' 駅')}`;
          
          return (
            <div 
              key={st.slug}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => {
                window.location.href = `/station/${st.slug}`;
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '8px', fontWeight: '500' }}>
                  {st.slug}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#111', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                  {st.name}
                </h3>
                {st.line && (
                  <p style={{ fontSize: '13px', color: '#666', letterSpacing: '0.03em', margin: 0, lineHeight: '1.4' }}>
                    {st.line}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                <a 
                  href={googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#38C2C2', textDecoration: 'none', fontWeight: '500' }}
                >
                  MAP →
                </a>
                <span style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#111', fontWeight: '500' }}>
                  VIEW →
                </span>
              </div>
            </div>
          );
        })}

        {/* ＋ ADD STATION カード */}
        <div 
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#fafafa',
            border: '1px dashed #cccccc',
            borderRadius: '4px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '180px',
            cursor: 'pointer',
            transition: 'border-color 0.2s, background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#111';
            e.currentTarget.style.backgroundColor = '#f2f2f2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#cccccc';
            e.currentTarget.style.backgroundColor = '#fafafa';
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: '300', color: '#666', marginBottom: '8px' }}>+</span>
          <span style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', fontWeight: '500' }}>
            ADD STATION
          </span>
        </div>
      </div>

      <AddStationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  );
}
