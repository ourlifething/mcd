import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/banner.module.css"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
export default function  Banner () {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {} }
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={styles['banner_root']}
    >
      <Link
          href={'/banner'}
          prefetch={false}
      >
        <Image
          src={'/images/banner/banner-portfolio-navi-town.webp'}
          alt="バナー画像"
          width={350}
          height={250}
          className={styles['banner_image']}
        />
      </Link>
    </motion.div>
  );
};
