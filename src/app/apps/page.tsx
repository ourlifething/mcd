'use client'

import styles from "@/styles/apps.module.css"
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AppItem = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  href: string;
  featured?: boolean;
}

const appsData: AppItem[] = [
  {
    id: 'guide',
    number: '01',
    title: '目黒・不動前・武蔵小山・西小山ガイド',
    category: 'LOCAL GUIDE & MAP',
    description: '目黒、不動前、武蔵小山、西小山の魅力的なスポットやレストランを網羅したローカルガイド。駅ごとの店舗一覧や検索、投稿機能を提供しています。',
    image: '/images/banner/navigate.webp',
    href: '/guide',
    featured: true,
  },
  {
    id: 'sample-01',
    number: '02',
    title: 'Design System Experiment',
    category: 'UI / EXPERIMENT',
    description: 'FigmaとNext.jsを活用したミニマルなデザインシステムとコンポーネントライブラリの実験的プロジェクト。',
    image: '/images/banner/sample.webp',
    href: '#',
  },
  {
    id: 'sample-02',
    number: '03',
    title: 'Typography Layout Tool',
    category: 'TOOL',
    description: 'エディトリアルデザインにおけるグリッドシステムとタイポグラフィのスケールを検証するための社内用ツール。',
    image: '/images/banner/sample.webp',
    href: '#',
  },
];

export default function AppsPage () {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredApp = appsData.find(app => app.featured) || appsData[0];
  const otherApps = appsData.filter(app => app.id !== featuredApp.id);

  return (
    <main className={styles.apps_root}>
      <header className={styles.header}>
        <h1 className={styles.header_title}>APPS</h1>
        <Link href="/" className={styles.top_link}>
          TOP
        </Link>
      </header>

      <div className={styles.container}>
        <h2 className={styles.page_title}>Web Apps & Tools</h2>
        <p className={styles.page_subtitle}>Portfolio Experiments & Applications</p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Featured App */}
          {featuredApp && (
            <Link href={featuredApp.href} className={styles.featured_card}>
              <div className={styles.featured_content}>
                <div>
                  <div className={styles.number_label}>{featuredApp.number} / FEATURED</div>
                  <span className={styles.category_badge}>{featuredApp.category}</span>
                  <h3 className={styles.featured_title}>{featuredApp.title}</h3>
                  <p className={styles.featured_description}>{featuredApp.description}</p>
                </div>
                <div className={styles.action_link}>
                  OPEN APP →
                </div>
              </div>
              {featuredApp.image && (
                <div className={styles.image_wrapper}>
                  <Image
                    src={featuredApp.image}
                    alt={featuredApp.title}
                    fill
                    className={styles.app_image}
                    priority
                  />
                </div>
              )}
            </Link>
          )}

          {/* Grid for other apps */}
          {otherApps.length > 0 && (
            <div className={styles.grid_section}>
              {otherApps.map((app) => (
                <Link key={app.id} href={app.href} className={styles.grid_card}>
                  <div className={styles.grid_card_content}>
                    <div className={styles.number_label}>{app.number}</div>
                    <span className={styles.category_badge}>{app.category}</span>
                    <h4 className={styles.grid_title}>{app.title}</h4>
                    <p className={styles.grid_description}>{app.description}</p>
                  </div>
                  <div className={styles.action_link}>
                    OPEN APP →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
};
