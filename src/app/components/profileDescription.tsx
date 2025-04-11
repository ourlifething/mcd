import styles from '@/styles/home.module.css'
export function ProfileDescription () {
  return (
    <div className={styles['profile-text']}>
      <p className={styles['header-text']}><b>ご覧いただきありがとうございます。</b>こちらは、MCDESIGNのポートフォリオサイトです。<br/>主にパッケージデザインやロゴデザインの制作実績をご紹介しております。また、このページのコーディングもすべて個人で制作しております。<br/>丁寧なヒアリングを心がけ、コンセプトに基づいたデザインで、お客様のブランド価値向上に貢献できるよう努めております。<br/>特に、食品関連のデザインや、ブランドイメージを刷新するロゴ・Tシャツのプリントデザインを得意としております。<br/>また、HTML・CSS・JavaScript・TypeScript・React を用いたフロントエンド開発にも対応可能です。
      </p>
    </div>
  )
};
