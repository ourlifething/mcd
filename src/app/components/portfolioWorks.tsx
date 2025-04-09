'use client'
import styles from '@/styles/home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './modal';
import { useState } from 'react'
export default function PortfolioWorks () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>('');
  const openModal = (imageSrc: string) => {
    setModalImageSrc(imageSrc);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  }
  const chiaki = '/images/chiaki.jpg'
  return (
    <section className={styles['portfolios']}>
      <div className={styles['pict-block-wrapper']}>
        <div className={styles['pict-block']}>
          <h3>ちあきの黒にんにくのラベルデザイン</h3>
          <Image 
            src={chiaki} 
            alt="ちあきの黒ニンニク"
            className={styles['images-size']}
            width={3508}
            height={2481}
            onClick={() => openModal(chiaki)}
          />
          <Modal
            imageSrc={chiaki}
            width={3508}
            height={2481}
            isVisible={isModalVisible}
            onClose={closeModal}
          />
          <div className={styles['description-wrapper']}>
            <p>「ちあきファームの黒忍辱（にんにく）」、オーガニック黒にんにくのパッケージデザインがコンペにて採用されました。
              高級感を意識しつつ、海外のお客様にも好まれるような洗練されたデザインを心がけて制作いたしました。</p>
          </div>
        </div>
        <div className={styles['pict-block']}>
          <h3>水レタスのラベルデザイン</h3>
          <Link href="/images/mj.png" target="_blank" prefetch={false}>
            <Image 
              src="/images/mj.png" 
              alt="水レタス"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>水耕栽培で育てられた「水レタス」のラベルデザインを制作いたしました。
              葉先が丸く、やわらかな食感が特徴で、太陽光を活用したハウスで丁寧に栽培されています。
              高品質で取り扱いやすく、食卓に彩りを添えるような瑞々しいイメージを表現することを意識してデザインしました。
            </p>
          </div>
        </div>
      </div>
      <div className={styles['pict-block-wrapper']}>
        <div className={styles['pict-block']}>
          <h3>水レタスの販売促進用店頭ポップ</h3>
          <Link href="/images/mizulettuce.png" target="_blank" prefetch={false}>
            <Image
              src="/images/mizulettuce.png" 
              alt="水レタスポップ"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>店舗での掲示用として商品POPを制作いたしました。
              また、こちらは商品の提案時にも使用し、視覚的にわかりやすく魅力を伝えるツールとして活用いたしました。</p>
          </div>
        </div>
        <div className={styles['pict-block']}>
          <h3>水レタスの販売促進用店頭ポップ（横長）</h3>
          <Link href="/images/mizulettucewide.png" target="_blank" prefetch={false}>
            <Image
              src="/images/mizulettucewide.png" 
              alt="水レタス"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>店舗で使用する商品POPを制作いたしました。
              陳列スペースが冷ケースであることを想定し、値札の横に配置できるよう横長のレイアウトでデザインいたしました。</p>
          </div>
        </div>
      </div>
      <div className={styles['pict-block-wrapper']}>
        <div className={styles['pict-block']}>
          <h3>白富士マーケットのロゴデザイン提案</h3>
          <Link href="/images/shirofujipr.png" target="_blank" prefetch={false}>
            <Image 
              src="/images/shirofujipr.png" 
              alt="白富士マーケット提案"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>ターゲット層がネット販売を利用する方々であり、主に家電やスマートフォンを取り扱う点を踏まえ、「白富士」「富士山」「日本一」「家電」「先進的」「電脳」「商店」「マーケット」「お客様に届ける」といったキーワードを軸にロゴを提案いたしました。
              お店のイメージカラーである「白と青」は、白富士のイメージから着想を得ており、清潔感・信頼感・先進性を表現しています。視認性と印象に残るデザインを意識し、親しみやすさと未来感を兼ね備えたロゴに仕上げました。</p>
          </div>
        </div>
        <div className={styles['pict-block']}>
          <h3>Green Walker ロゴデザイン提案</h3>
          <Link href="/images/gw.png" target="_blank" prefetch={false}>
            <Image 
              src="/images/gw.png" 
              alt="グリーンワーカーロゴ"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>登山やキャンプなどのアウトドア用品を取り扱うブランド「GreenWalker（グリーンウォーカー）」のロゴデザインを提案いたしました。
              ロゴは、ブランド名の文字列とシンボルマークを組み合わせた構成で、商品パッケージやウェブサイトなど幅広い用途での使用を想定して制作しております。
              自然との共生や、歩みを進める楽しさ・力強さを感じさせるデザインを意識し、アウトドアブランドとしての信頼感と親しみやすさを表現しました。
            </p>
          </div>
        </div>
      </div>
      <div className={styles['pict-block-wrapper']}>
        <div className={styles['pict-block']}>
          <h3>RITAのグラフィック</h3>
          <Link href="/images/ritapr.png" target="_blank" prefetch={false}>
            <Image 
              src="/images/ritapr.png" 
              alt="リタ"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>30代〜40代をターゲットとした大人なカジュアルを提案するブランド、<Link href="https://www.instagram.com/rita_jeans_tokyo/?hl=ja" target="_blank" prefetch={false}>RITA</Link>の2024年以前までのグラッフィックを全て制作しておりました。</p>
          </div>
        </div>
        <div className={styles['pict-block']}>
          <h3>高柳明音さんコラボ</h3>
          <Link href="/images/aknpr.png" target="_blank" prefetch={false}>
            <Image 
              src="/images/aknpr.png" 
              alt="高柳明音さん"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>元SKE48の高柳明音さんとRITAのコラボレーションによるTシャツおよびジャケットのグラフィックデザインを担当いたしました。
              ジャケットのバックプリントは「ゲーム」をテーマに、遊び心とクールさを兼ね備えたデザインに仕上げています。
              また、Tシャツのグラフィックは、高柳明音さんがバスケットボールのPR活動を行っていた当時、架空のバスケットボールチームを想定し、そのチームロゴをデザインしたものです。
              アパレルとしての完成度を意識しながら、コンセプトやストーリー性も大切に制作いたしました。</p>
          </div>
        </div>
      </div>
      <div className={styles['pict-block-wrapper']}>
        <div className={styles['pict-block']}>
          <h3>メキシカンレストランJunkadelicステッカー、ポスター</h3>
          <Link href="/images/junka.png" target="_blank" prefetch={false}>
            <Image
              src="/images/junka.png" 
              alt="ジャンカデリック"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>メキシカンレストラン「ジャンカデリック」のポスター、ステッカー、メニューなど各種デザインを担当いたしました。
              また、10周年の記念ノベルティとして、オリジナルデザインの手拭いやステッカーも制作いたしました。
              ブランドイメージや店舗の雰囲気を大切にしながら、記念の節目にふさわしいデザインをご提案・作成いたしました。</p>
          </div>
        </div>
        <div className={styles['pict-block']}>
          <h3>D.treatのパッケージデザイン</h3>
          <Link href="/images/dtreat.png" target="_blank" prefetch={false}>
            <Image
              src="/images/dtreat.png" 
              alt="D.treat"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>D.TREAT オールインワン メンズ美容液のパッケージデザインを制作いたしました。
              シンプルで清潔感のあるデザインを心がけ、男性向けスキンケア商品としての上質さや信頼感が伝わるよう意識して仕上げております。</p>
          </div>
        </div>
      </div>
      <div className={styles['pict-block-wrapper']}>
        <div className={styles['pict-block']}>
          <h3>Flyer & Poster</h3>
          <Link href="/images/clandkrush.png" target="_blank" prefetch={false}>
            <Image
              src="/images/clandkrush.png" 
              alt="poster"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>Carhartt主催のイベント「Bathroom」のフライヤーおよびポスターを制作いたしました。
              Photoshopを使用して画像を加工し、ペンキ画像を取り込んでレイヤーを分けて配置。さらに、Illustratorでロゴを重ねるなどしてデザインを完成させました。
              裏面では限られたスペースに文字情報を整然と配置し、視認性を高めるように注意して作成しています。</p>
          </div>
        </div>
        <div className={styles['pict-block']}>
          <h3>Flyer & Poster</h3>
          <Link href="/images/bakumurofivedeez.png" target="_blank" prefetch={false}>
            <Image 
              src="/images/bakumurofivedeez.png" 
              alt="D.treat"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>Carhartt主催のイベント「Bathroom」のフライヤーおよびポスターを制作しました。
              Photoshopを使用して人物をトレースする際、境目が不自然にならないよう細心の注意を払いながら作成しました。</p>
          </div>
        </div>
      </div>
      <div className={styles['pict-block-wrapper']}>
        <div className={styles['pict-block']}>
          <h3>Flyer & Poster</h3>
          <Link href="/images/mymy.png" target="_blank" prefetch={false}>
            <Image
              src="/images/mymy.png" 
              alt="poster"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>代官山UNITでのイベントフライヤーおよびポスターを制作しました。
              人物をトレースする際、不自然にならないように細心の注意を払い、背景に迷彩柄を加えることで奥行きを持たせるなど、デザインに工夫を凝らしました。</p>
          </div>
        </div>
        <div className={styles['pict-block']}>
          <h3>Flyer & Poster</h3>
          <Link href="/images/osakacollection.png" target="_blank" prefetch={false}>
            <Image 
              src="/images/osakacollection.png" 
              alt="D.treat"
              className={styles['images-size']}
              width={600}
              height={400}
            />
          </Link>
          <div className={styles['description-wrapper']}>
            <p>大阪インポートコレクションのフライヤーおよびポスターを制作しました。
              靴の画像を複数集め、配色を変更してポップなイメージを演出するよう工夫しました。</p>
          </div>
        </div>
      </div>
    </section>
  );
};
