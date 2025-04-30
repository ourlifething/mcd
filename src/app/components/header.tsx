'use client'
import styles from "@/styles/home.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Header () {
  return (
    <div className={styles["header-title-wrapper"]}>
      <Link 
        href={'/'}
        className={styles['my-img']}
      >
        <Image src='/images/8cat.png' alt='プロフ画像' className={styles['my-img']} width={100} height={100}/>
      </Link>
      <div className={styles['header-title']}>
        <h1>Portfolios</h1>
        <h2>製作者：葉山　竜二</h2>
        <p className={styles['mail-add']}>
          連絡先：
          <a href="mailto:vervewearage@gmail.com" target="_blank" rel="noopener noreferrer">vervewearage@gmail.com</a>
        </p>
      </div>
      <div className={styles['icon-block']}>
        <Image src='/images/illustlator.webp' alt='イラレロゴ' className={styles['icon-ai']} width={173} height={173} />
        <Image src='/images/ps.png' alt='psロゴ' className={styles['iconps']} width={225} height={225}/>
        <Image src='/images/html-css.png' alt='htmlロゴ' className={styles['icon-html']} width={792} height={612}/>
        <Image src='/images/react.png' alt='reactロゴ' className={styles['icon']} width={1000} height={1000}/>
      </div>
    </div>
  )
};
