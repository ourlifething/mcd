'use client'
import styles from '@/styles/home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './modal';
import { useState } from 'react'
import ContactForm from './contactForm';
export default function PortfolioWorks () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>('');
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const openModal = (imageSrc: string, width:number, height:number) => {
    setModalImageSrc(imageSrc);
    setModalWidth(width);
    setModalHeight(height);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setModalImageSrc('')
  }
  const garlic = {img:'/images/chiaki.jpg', w:3508, h:2481};
  const lettuce = {img:'/images/mj.png', w:2514, h:1746};
  const lettucePop = {img:'/images/mizulettuce.png', w:2272, h:1548};
  const lettucePopWide = {img:'/images/mizulettucewide.png', w:2274, h:798};
  const fuji = {img:'/images/shirofujipr.png', w:2397, h:1465};
  const greenWalker = {img:'/images/gw.png', w:2393, h:1461};
  const rita = {img:'/images/ritapr.png', w:2396, h:1459};
  const akn = { img:'/images/aknpr.png', w:2396 , h:1461 }
  const junk = { img:'/images/junka.png', w:2250 , h:1459 }
  const treat = { img:'/images/dtreat.png', w:2335 , h:1459 }
  const clAndK = { img:'/images/clandkrush.png', w:2276 , h:1552 }
  const bAndM = { img:'/images/bakumurofivedeez.png', w:2275 , h:1553 }
  const myMy = { img:'/images/mymy.png', w:2267 , h:1594 }
  const osaka = { img:'/images/osakacollection.png', w:588 , h:441 }
  return (
    <>
      <section className={styles['portfolios']}>
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Label</h3>
            <Image 
              src={garlic.img} 
              alt="ちあきの黒ニンニク"
              className={styles['images-size']}
              width={garlic.w}
              height={garlic.h}
              priority
              onClick={() => openModal(garlic.img, garlic.w, garlic.h)}
            />
            <div className={styles['description-wrapper']}>
              <p>「ちあきファームの黒忍辱（にんにく）」、オーガニック黒にんにくのパッケージデザインがコンペにて採用されました。
                高級感を意識しつつ、海外のお客様にも好まれるような洗練されたデザインを心がけて制作いたしました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Label</h3>
            <Image 
              src={lettuce.img}
              alt="水レタス"
              className={styles['images-size']}
              width={lettuce.w}
              height={lettuce.h}
              priority
              onClick={() => openModal(lettuce.img,lettuce.w,lettuce.h)}
            />
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
            <h3>Pop</h3>
            <Image
              src={lettucePop.img}
              alt="水レタスポップ"
              className={styles['images-size']}
              width={lettucePop.w}
              height={lettucePop.h}
              onClick={() => openModal(lettucePop.img, lettucePop.w, lettucePop.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>店舗での掲示用として商品POPを制作いたしました。
                また、こちらは商品の提案時にも使用し、視覚的にわかりやすく魅力を伝えるツールとして活用いたしました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Pop</h3>
            <Image
              src={lettucePopWide.img}
              alt="水レタス"
              className={styles['images-size']}
              width={lettucePopWide.w}
              height={lettucePopWide.h}
              onClick={() => openModal(lettucePopWide.img, lettucePopWide.w, lettucePopWide.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>店舗で使用する商品POPを制作いたしました。
                陳列スペースが冷ケースであることを想定し、値札の横に配置できるよう横長のレイアウトでデザインいたしました。</p>
            </div>
          </div>
        </div>
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Logo</h3>
            <Image 
              src={fuji.img} 
              alt="白富士マーケット提案"
              className={styles['images-size']}
              width={fuji.w}
              height={fuji.h}
              onClick={() => openModal(fuji.img, fuji.w, fuji.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>白富士マーケットのロゴデザイン提案:ターゲット層がネット販売を利用する方々であり、主に家電やスマートフォンを取り扱う点を踏まえ、「白富士」「富士山」「日本一」「家電」「先進的」「電脳」「商店」「マーケット」「お客様に届ける」といったキーワードを軸にロゴを提案いたしました。
                お店のイメージカラーである「白と青」は、白富士のイメージから着想を得ており、清潔感・信頼感・先進性を表現しています。視認性と印象に残るデザインを意識し、親しみやすさと未来感を兼ね備えたロゴに仕上げました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Logo</h3>
            <Image 
              src={greenWalker.img}
              alt="グリーンワーカーロゴ"
              className={styles['images-size']}
              width={greenWalker.w}
              height={greenWalker.h}
              onClick={() => openModal(greenWalker.img, greenWalker.w, greenWalker.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>Green Walker ロゴデザイン提案:登山やキャンプなどのアウトドア用品を取り扱うブランド「GreenWalker（グリーンウォーカー）」のロゴデザインを提案いたしました。
                ロゴは、ブランド名の文字列とシンボルマークを組み合わせた構成で、商品パッケージやウェブサイトなど幅広い用途での使用を想定して制作しております。
                自然との共生や、歩みを進める楽しさ・力強さを感じさせるデザインを意識し、アウトドアブランドとしての信頼感と親しみやすさを表現しました。
              </p>
            </div>
          </div>
        </div>
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Graphic</h3>
            <Image 
              src={rita.img}
              alt="リタ"
              className={styles['images-size']}
              width={rita.w}
              height={rita.h}
              onClick={() => openModal(rita.img, rita.w, rita.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>30代〜40代をターゲットとした大人なカジュアルを提案するブランド、<Link href="https://www.instagram.com/rita_jeans_tokyo/?hl=ja" target="_blank" prefetch={false}>RITA</Link>の2024年以前までのグラッフィックを全て制作しておりました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Graphic</h3>
            <Image 
              src={akn.img} 
              alt="高柳明音さん"
              className={styles['images-size']}
              width={akn.w}
              height={akn.h}
              onClick={() => openModal(akn.img, akn.w, akn.h)}
              loading='lazy'
            />
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
            <h3>Sticker Poster</h3>
            <Image
              src={junk.img}
              alt="ジャンカデリック"
              className={styles['images-size']}
              width={junk.w}
              height={junk.h}
              onClick={() => openModal(junk.img, junk.w, junk.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>メキシカンレストラン「ジャンカデリック」のポスター、ステッカー、メニューなど各種デザインを担当いたしました。
                また、10周年の記念ノベルティとして、オリジナルデザインの手拭いやステッカーも制作いたしました。
                ブランドイメージや店舗の雰囲気を大切にしながら、記念の節目にふさわしいデザインをご提案・作成いたしました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Package</h3>
            <Image
              src={treat.img}
              alt="D.treat"
              className={styles['images-size']}
              width={treat.w}
              height={treat.h}
              onClick={() => openModal(treat.img, treat.w, treat.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>D.TREAT オールインワン メンズ美容液のパッケージデザインを制作いたしました。
                シンプルで清潔感のあるデザインを心がけ、男性向けスキンケア商品としての上質さや信頼感が伝わるよう意識して仕上げております。</p>
            </div>
          </div>
        </div>
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Flyer & Poster</h3>
            <Image
              src={clAndK.img} 
              alt="poster"
              className={styles['images-size']}
              width={clAndK.w}
              height={clAndK.h}
              onClick={() => openModal(clAndK.img, clAndK.w, clAndK.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>Carhartt主催のイベント「Bathroom」のフライヤーおよびポスターを制作いたしました。
                Photoshopを使用して画像を加工し、ペンキ画像を取り込んでレイヤーを分けて配置。さらに、Illustratorでロゴを重ねるなどしてデザインを完成させました。
                裏面では限られたスペースに文字情報を整然と配置し、視認性を高めるように注意して作成しています。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Flyer & Poster</h3>
            <Image 
              src={bAndM.img}
              alt="D.treat"
              className={styles['images-size']}
              width={bAndM.w}
              height={bAndM.h}
              onClick={() => openModal(bAndM.img, bAndM.w, bAndM.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>Carhartt主催のイベント「Bathroom」のフライヤーおよびポスターを制作しました。
                Photoshopを使用して人物をトレースする際、境目が不自然にならないよう細心の注意を払いながら作成しました。</p>
            </div>
          </div>
        </div>
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Flyer & Poster</h3>
            <Image
              src={myMy.img}
              alt="poster"
              className={styles['images-size']}
              width={myMy.w}
              height={myMy.h}
              onClick={() => openModal(myMy.img, myMy.w, myMy.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>代官山UNITでのイベントフライヤーおよびポスターを制作しました。
                人物をトレースする際、不自然にならないように細心の注意を払い、背景に迷彩柄を加えることで奥行きを持たせるなど、デザインに工夫を凝らしました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Flyer & Poster</h3>
            <Image 
              src={osaka.img} 
              alt="D.treat"
              className={styles['images-size']}
              width={osaka.w}
              height={osaka.h}
              onClick={() => openModal(osaka.img, osaka.w, osaka.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>大阪インポートコレクションのフライヤーおよびポスターを制作しました。
                靴の画像を複数集め、配色を変更してポップなイメージを演出するよう工夫しました。</p>
            </div>
          </div>
        </div>
        <Modal
          imageSrc={modalImageSrc}
          width={modalWidth}
          height={modalHeight}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      </section>
      <section className={styles['contact-form']}>
        <ContactForm/>
      </section>
    </>
  );
};
