'use client'
import styles from "@/styles/banner.module.css"
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AppsPage () {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#111", fontFamily: "sans-serif" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "30px 40px",
        borderBottom: "1px solid #eaeaea"
      }}>
        <h1 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "0.1em", margin: 0 }}>APPS</h1>
        <Link 
          href="/" 
          style={{ fontSize: "14px", letterSpacing: "0.1em", color: "#111", textDecoration: "none" }}
        >
          TOP
        </Link>
      </header>

      <div className={styles['navigation_root']} style={{ padding: "40px 20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "400", marginBottom: "30px", letterSpacing: "0.05em" }}>Design a layout using Figma</h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles['navigation_root']}
        >
          <ul className={styles['navigation_list_block']}>
            <li className={styles['navigation_list']}>
              <p className={styles['navigation_title']}>目黒・不動前・武蔵小山・西小山ガイド</p>

              <Image
                src={'/images/banner/navigate.webp'}
                alt="画面見本画像"
                width={350}
                height={400}
              />
              <Link 
                href={'/guide'}
                prefetch={false}
                className={styles['navigation_link']}
              >
                <span className={styles['navigation_text']}>見に行く</span>
              </Link>
            </li>
            <li className={styles['navigation_list']}>
              <Image
                src={'/images/banner/sample.webp'}
                alt="画面見本画像"
                width={350}
                height={400}
              />
            </li>
            <li className={styles['navigation_list']}>
              <Image
                src={'/images/banner/sample.webp'}
                alt="画面見本画像"
                width={350}
                height={400}
              />
            </li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
};
