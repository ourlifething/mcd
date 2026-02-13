import styles from '@/styles/home.module.css'
export function ProfileDescription () {
  return (
    <div className={styles['profile-text']}>
      <p className={styles['header-text']}><b>ご覧いただきありがとうございます。</b>こちらは、葉山竜二のポートフォリオサイトです。<br/>制作物の一部を公開しております。Next.js,React,MongoDB<br/>
      </p>
    </div>
  )
};
