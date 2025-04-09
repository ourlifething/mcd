'use client'
import styles from "@/styles/home.module.css"
import Image from "next/image"

export default function Header () {
  return (
    <div className={styles["header-title-wrapper"]}>
      <Image src='/images/8cat.png' alt='プロフ画像' className={styles['my-img']} width={100} height={100}/>
      <div className={styles['header-title']}>
        <h1>Portfolios</h1>
        <h2>製作者：MCGDESIGN</h2>
        <p className={styles['mail-add']}>
          連絡先：
          <a href="mailto:vervewearage@gmail.com" target="_blank" rel="noopener noreferrer">vervewearage@gmail.com</a>
        </p>
      </div>
      <div className={styles['icon-block']}>
        <Image src='/images/llustrator.png' alt='イラレロゴ' className={styles['icon-ai']} width={43} height={42}/>
        <Image src='/images/ps.png' alt='psロゴ' className={styles['iconps']} width={40} height={40}/>
        <Image src='/images/html-css.png' alt='htmlロゴ' className={styles['icon-html']} width={90} height={65}/>
        <Image src='/images/react.png' alt='reactロゴ' className={styles['icon']} width={50} height={48}/>
      </div>
    </div>
  )
};
