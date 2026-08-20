import styles from '@/styles/guide.module.css'
import Link from 'next/link';
import { FaAngleRight } from "react-icons/fa6";
import StationSearchSelector from './components/StationSearchSelector';
import FeaturedStations from './components/FeaturedStations';
import { getStationMaster } from '@/lib/stations';

export const dynamic = 'force-dynamic';

export default async function Guide () {
  const stations = await getStationMaster();

  return (
    <div className={styles['guide_root']} style={{ backgroundColor: '#fff', color: '#111' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 40px', borderBottom: '1px solid #eaeaea' }}>
        <h1 style={{ fontSize: '16px', fontWeight: '500', letterSpacing: '0.1em', margin: 0 }}>LOCAL GUIDE</h1>
        <Link 
          href="/" 
          style={{ fontSize: '14px', letterSpacing: '0.1em', color: '#111', textDecoration: 'none' }}
        >
          HOME
        </Link>
      </header>

      <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto', padding: '60px 20px 20px 20px', boxSizing: 'border-box' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '300', letterSpacing: '0.08em', margin: '0 0 16px 0', color: '#111' }}>
          街を探す。
        </h2>
        <p style={{ fontSize: '15px', color: '#666', letterSpacing: '0.05em', margin: '0 0 40px 0', lineHeight: '1.6' }}>
          目黒・不動前・武蔵小山・西小山周辺のショップやスポットを網羅したローカルガイド。
        </p>

        <StationSearchSelector stations={stations} />
      </div>

      <section style={{ padding: '40px 0 80px 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 20px 24px 20px' }}>
          <h3 style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', fontWeight: '500', margin: 0 }}>
            FEATURED STATIONS
          </h3>
        </div>

        <FeaturedStations stations={stations} />
      </section>
    </div>
  );
};
