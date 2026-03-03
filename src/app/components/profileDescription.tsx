import styles from '@/styles/home.module.css'
export function ProfileDescription () {
  return (
    <div className={styles['profile-text']}>
      <p className={styles['header-text']}><b>ご覧いただきありがとうございます。</b>
      こちらのポートフォリオサイトでは、制作物の一部を公開しております。<br/>本サイトはNext.js、React、MongoDBを使用して制作しております。現在も制作途中ではありますが、ぜひご覧いただけますと幸いです。
      </p>
    </div>
  )
};
