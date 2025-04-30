'use client'
import styles from "@/styles/banner.module.css"
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function NavigateTown () {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div className={styles['navigation_root']}>
      <nav>
        <Link 
          className={styles['back_home']}
          href={'/'}>Homeへ戻る<FaAngleRight />
        </Link>
      </nav>
      <h2>Design a layout using Figma</h2>
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
  );
};
