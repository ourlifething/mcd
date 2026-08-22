'use client'
import React from 'react'
import styles from '@/styles/graphic.module.css'
import Image from 'next/image'
import Modal from '@/app/components/modal';
import { useState } from 'react'
import ContactForm from '@/app/components/contactForm';

type Works = { img: string; w: number; h: number };

const garlic: Works = { img: '/images/chiaki.jpg', w: 3508, h: 2481 };
const lettuce: Works = { img: '/images/mj.png', w: 2514, h: 1746 };
const lettucePop: Works = { img: '/images/mizulettuce.png', w: 2272, h: 1548 };
const karashinaPop: Works = { img: '/images/karashinalettuce.png', w: 2118, h: 1500 };
const karashinaDescription: Works = { img: '/images/karashinadescript.png', w: 2211, h: 1500 };
const mizulettucesalad: Works = { img: '/images/mizulettucesald.png', w: 2213, h: 1500 };
const mizulettucesaldDesc: Works = { img: '/images/mizulettucesalddesc.png', w: 2125, h: 1500 };
const whiteserurisald: Works = { img: '/images/whiteserurisald.png', w: 2203, h: 1500 };
const whiteserurisoup: Works = { img: '/images/whitesrurisoup.png', w: 2071, h: 1500 };
const lettucePopWide: Works = { img: '/images/mizulettucewide.png', w: 2274, h: 798 };
const surfKing: Works = { img: '/images/surf_king.png', w: 2100, h: 1500 };
const completefinesse: Works = { img: '/images/cf_camo.png', w: 2100, h: 1500 };
const godVerve: Works = { img: '/images/armyway.png', w: 2100, h: 1500 };
const kungfu: Works = { img: '/images/kungfu.png', w: 2100, h: 1500 };
const cmyktee: Works = { img: '/images/cmyktee.png', w: 2100, h: 1500 };
const menu: Works = { img: '/images/menu.png', w: 2100, h: 1500 };
const fuji: Works = { img: '/images/shirofujipr.png', w: 2397, h: 165 };
const greenWalker: Works = { img: '/images/gw.png', w: 2393, h: 1461 };
const rita: Works = { img: '/images/ritapr.png', w: 2396, h: 1459 };
const akn: Works = { img: '/images/aknpr.png', w: 2396, h: 1461 };
const junk: Works = { img: '/images/junka.png', w: 2250, h: 1459 };
const treat: Works = { img: '/images/dtreat.png', w: 2335, h: 1459 };
const clAndK: Works = { img: '/images/clandkrush.png', w: 2276, h: 1552 };
const bAndM: Works = { img: '/images/bakumurofivedeez.png', w: 2275, h: 1553 };
const myMy: Works = { img: '/images/mymy.png', w: 2267, h: 1594 };
const osaka: Works = { img: '/images/osakacollection.png', w: 588, h: 441 };

const RITA_INSTA = 'https://www.instagram.com/rita_jeans_tokyo/?hl=ja';

export default function PortfolioGrid() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>('');
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);

  const openModal = (imageSrc: string, width: number, height: number) => {
    setModalImageSrc(imageSrc);
    setModalWidth(width);
    setModalHeight(height);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setModalImageSrc('');
  };

  const spread = (variant: string, number: string, note: string, children: React.ReactNode) => (
    <section className={styles.spread + ' ' + (styles[variant] || '')}>
      <div className={styles.number}>{number}</div>
      <div className={styles.note}><span>{note}</span></div>
      {children}
    </section>
  );

  return (
<>
<section className={styles.document}>
{spread('spreadHero', '01', 'Label', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Label</h3>
            <div className={styles.figure}>
              <Image src={garlic.img} alt="ちあきの黒ニンニク" className={styles.img} width={garlic.w} height={garlic.h} priority onClick={() => openModal(garlic.img, garlic.w, garlic.h)} />
            </div>
            <p className={styles.caption}>「ちあきファームの黒忍辱（にんにく）」、オーガニック黒にんにくのロゴデザインがコンペにて採用されました。高級感を意識しつつ、にんにくのイラストを家紋のように見立てブランド感をつくり、海外のお客様にも好まれるよう洗練されたデザインにしました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Label</h3>
            <div className={styles.figure}>
              <Image src={lettuce.img} alt="水レタス" className={styles.img} width={lettuce.w} height={lettuce.h} priority onClick={() => openModal(lettuce.img, lettuce.w, lettuce.h)} />
            </div>
            <p className={styles.caption}>水耕栽培で育てられた「水レタス」のラベルデザインを制作しました。葉先が丸く柔らかな食感が特徴で、高品質で取り扱いやすく、食卓に彩りを添える瑞々しいイメージを表現しました。</p>
          </div>
        </>))}
        {spread('spreadCinema', '02', 'Pop', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Pop</h3>
            <div className={styles.figure}>
              <Image src={lettucePopWide.img} alt="水レタス" className={styles.img} width={lettucePopWide.w} height={lettucePopWide.h} onClick={() => openModal(lettucePopWide.img, lettucePopWide.w, lettucePopWide.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>陳列スペースが冷ケースであることを想定し、値札の横に配置できるよう横長のレイアウトでデザインしました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Pop</h3>
            <div className={styles.figure}>
              <Image src={lettucePop.img} alt="水レタスポップ" className={styles.img} width={lettucePop.w} height={lettucePop.h} onClick={() => openModal(lettucePop.img, lettucePop.w, lettucePop.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>店舗掲示用の販促POPとして制作しました。クリスマスリースをサラダで表現したビジュアルを制作し、スタイリングや撮影も含めて担当しています。</p>
          </div>
        </>))}
{spread('spreadSplit', '03', 'Pop', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Pop</h3>
            <div className={styles.figure}>
              <Image src={karashinaPop.img} alt="からし菜レタスポップ" className={styles.img} width={karashinaPop.w} height={karashinaPop.h} onClick={() => openModal(karashinaPop.img, karashinaPop.w, karashinaPop.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>店舗掲示用の販促POPとして制作しました。4種の野菜がミックスされた商品であるため、実際にどのようなサラダになるのかイメージできるよう、サラダ写真をメインビジュアルとして使用しています。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Sales Presentation</h3>
            <div className={styles.figure}>
              <Image src={karashinaDescription.img} alt="からし菜レタスプレゼン資料" className={styles.img} width={karashinaDescription.w} height={karashinaDescription.h} onClick={() => openModal(karashinaDescription.img, karashinaDescription.w, karashinaDescription.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>「からし菜レタス」という商品のプレゼン用資料として作成しました。</p>
          </div>
        </>))}
        {spread('spreadSplitRev', '04', 'Green', (<>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Pop</h3>
            <div className={styles.figure}>
              <Image src={mizulettucesalad.img} alt="水レタスのサラダポップ" className={styles.img} width={mizulettucesalad.w} height={mizulettucesalad.h} onClick={() => openModal(mizulettucesalad.img, mizulettucesalad.w, mizulettucesalad.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>店舗掲示用の販促POPとして制作しました。商品のラベルデザインと共通した配色やモチーフを使用し、視覚的に商品と関連付けられるように設計しました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Sales Presentation</h3>
            <div className={styles.figure}>
              <Image src={mizulettucesaldDesc.img} alt="水レタスのサラダプレゼン資料" className={styles.img} width={mizulettucesaldDesc.w} height={mizulettucesaldDesc.h} onClick={() => openModal(mizulettucesaldDesc.img, mizulettucesaldDesc.w, mizulettucesaldDesc.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>「水レタスのサラダ」という商品のプレゼン用資料として作成しました。</p>
          </div>
        </>))}
        {spread('spreadStagger', '05', 'Soup', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Pop</h3>
            <div className={styles.figure}>
              <Image src={whiteserurisoup.img} alt="ホワイトセルリ販促" className={styles.img} width={whiteserurisoup.w} height={whiteserurisoup.h} onClick={() => openModal(whiteserurisoup.img, whiteserurisoup.w, whiteserurisoup.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>ホワイトセルリの販促物として食べ方の提案用に作成しました。料理の準備や撮影も行っております。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Pop</h3>
            <div className={styles.figure}>
              <Image src={whiteserurisald.img} alt="ホワイトセルリ販促" className={styles.img} width={whiteserurisald.w} height={whiteserurisald.h} onClick={() => openModal(whiteserurisald.img, whiteserurisald.w, whiteserurisald.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>ホワイトセルリの販促物として食べ方の提案用に作成しました。サラダの準備や撮影も行っております。</p>
          </div>
        </>))}
{spread('spreadBand', '06', 'Logo Graphic', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Logo Graphic</h3>
            <div className={styles.figure}>
              <Image src={fuji.img} alt="白富士マーケット提案" className={styles.img} width={fuji.w} height={fuji.h} onClick={() => openModal(fuji.img, fuji.w, fuji.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>白富士マーケットのロゴデザイン提案。「白富士」「富士山」「日本一」「家電」「先進的」といったキーワードを軸にロゴを提案しました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Logo Graphic</h3>
            <div className={styles.figure}>
              <Image src={greenWalker.img} alt="グリーンワーカーロゴ" className={styles.img} width={greenWalker.w} height={greenWalker.h} onClick={() => openModal(greenWalker.img, greenWalker.w, greenWalker.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>アウトドア用品ブランド「GreenWalker」のロゴデザイン提案。自然との共生や歩みを進める楽しさ・力強さを感じさせるデザインを意識しました。</p>
          </div>
        </>))}
        {spread('spreadFlow', '07', 'Tee', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>T-shirts Print Graphic</h3>
            <div className={styles.figure}>
              <Image src={rita.img} alt="リタ" className={styles.img} width={rita.w} height={rita.h} onClick={() => openModal(rita.img, rita.w, rita.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>30代〜40代をターゲットとした大人なカジュアルを提案するブランドRITAの2024年以前までのグラフィックを全て制作しておりました。</p>
            <small className={styles.credit}>画像出典:<a href={RITA_INSTA} target="_blank" rel="noopener noreferrer">rita_jeans_tokyo</a></small>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>T-shirts Print Graphic</h3>
            <div className={styles.figure}>
              <Image src={akn.img} alt="高柳明音さん" className={styles.img} width={akn.w} height={akn.h} onClick={() => openModal(akn.img, akn.w, akn.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>元SKE48の高柳明音さんとRITAのコラボTシャツ・ジャケットのグラフィックデザインを担当しました。</p>
            <small className={styles.credit}>画像出典:<a href={RITA_INSTA} target="_blank" rel="noopener noreferrer">rita_jeans_tokyo</a></small>
          </div>
        </>))}
        {spread('spreadFlowRev', '08', 'Tee', (<>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>T-shirts Print Graphic</h3>
            <div className={styles.figure}>
              <Image src={kungfu.img} alt="sindee" className={styles.img} width={kungfu.w} height={kungfu.h} onClick={() => openModal(kungfu.img, kungfu.w, kungfu.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>架空のカレッジTシャツを作成しました。古着のようなダメージをロゴに加え、ヴィンテージ感を出してあります。</p>
            <small className={styles.credit}>画像出典:<a href="https://www.grailed.com/listings/81848008-japanese-brand-sindee-05-spring-summer-kungfu-university-tee" rel="noopener noreferrer" target="_blank">grailed.com</a></small>
          </div>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>T-shirts Print Graphic</h3>
            <div className={styles.figure}>
              <Image src={godVerve.img} alt="GOD/VerveWearage" className={styles.img} width={godVerve.w} height={godVerve.h} onClick={() => openModal(godVerve.img, godVerve.w, godVerve.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>BEAMS-T向けに手書きのラフなタッチを活かしたグラフィックデザインを制作しました。あえて擦れや歪みを残すことでストリート感と抜け感のある表現に仕上げています。</p>
            <small className={styles.credit}>画像出典:<a href='https://www.carousell.com.my/p/beams-japanese-brand-army-way-emoticon-graphic-tee-1268264616/?srsltid=AfmBOorVQb1xVXZZD9c_l8lu4uEGRKCAWHrxwld7WdLJp7xihs_9BjYK' rel="noopener noreferrer" target="_blank">carousell.com</a></small>
          </div>
        </>))}
        {spread('spreadDetach', '09', 'Camo', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Logo Tee / Tote Bag</h3>
            <div className={styles.figure}>
              <Image src={surfKing.img} alt="リタジーンズトーキョー" className={styles.img} width={surfKing.w} height={surfKing.h} onClick={() => openModal(surfKing.img, surfKing.w, surfKing.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>文字間や文字サイズを意識した女性らしいカレッジロゴを作成し、プリントTシャツとトートバッグに展開しました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Camo pattern</h3>
            <div className={styles.figure}>
              <Image src={completefinesse.img} alt="completefinesse" className={styles.img} width={completefinesse.w} height={completefinesse.h} onClick={() => openModal(completefinesse.img, completefinesse.w, completefinesse.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>メンズカジュアルブランド「Complete Finesse」の迷彩パターンをIllustratorで制作し、トートバッグやバックパックなどのアイテムに展開しました。</p>
          </div>
        </>))}
{spread('spreadContrast', '10', 'Menu', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>T-shirts Print Graphic</h3>
            <div className={styles.figure}>
              <Image src={cmyktee.img} alt="complete finesse" className={styles.img} width={cmyktee.w} height={cmyktee.h} onClick={() => openModal(cmyktee.img, cmyktee.w, cmyktee.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>CMYKカラーの重なりやズレを活かした、視覚的なインパクトと動きを感じさせる抽象的なロゴデザインに仕上げました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Menu</h3>
            <div className={styles.figure}>
              <Image src={menu.img} alt="junkadelic menu" className={styles.img} width={menu.w} height={menu.h} onClick={() => openModal(menu.img, menu.w, menu.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>メキシコ料理店のメニュー表を制作しました。ヴィンテージ感のある質感と配色を取り入れ、現地の雰囲気を感じられるデザインに仕上げました。</p>
          </div>
        </>))}
        {spread('spreadPackage', '11', 'Package', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Package</h3>
            <div className={styles.figure}>
              <Image src={treat.img} alt="D.treat" className={styles.img} width={treat.w} height={treat.h} onClick={() => openModal(treat.img, treat.w, treat.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>D.TREAT オールインワン メンズ美容液のパッケージデザインを制作しました。シンプルで清潔感のあるデザインを心がけ、男性向けスキンケアとしての上質さや信頼感が伝わるよう意識しました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Sticker & Poster</h3>
            <div className={styles.figure}>
              <Image src={junk.img} alt="ジャンカデリック" className={styles.img} width={junk.w} height={junk.h} onClick={() => openModal(junk.img, junk.w, junk.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>メキシカンレストラン「ジャンカデリック」のポスター、ステッカー、メニューなど各種デザインを担当しました。</p>
          </div>
        </>))}
        {spread('spreadFlow', '12', 'Flyer & Poster', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Flyer & Poster</h3>
            <div className={styles.figure}>
              <Image src={clAndK.img} alt="poster" className={styles.img} width={clAndK.w} height={clAndK.h} onClick={() => openModal(clAndK.img, clAndK.w, clAndK.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>Carhartt主催のイベント「Bathroom」のフライヤーおよびポスターを制作しました。ペンキ画像を取り込んでレイヤー分けし、ロゴを重ねて仕上げました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Flyer & Poster</h3>
            <div className={styles.figure}>
              <Image src={bAndM.img} alt="D.treat" className={styles.img} width={bAndM.w} height={bAndM.h} onClick={() => openModal(bAndM.img, bAndM.w, bAndM.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>Carhartt主催のイベント「Bathroom」のフライヤーおよびポスターを制作しました。人物をトレースする際、不自然にならないよう細心の注意を払って作成しました。</p>
          </div>
        </>))}
        {spread('spreadFinale', '13', 'Flyer & Poster', (<>
          <div className={styles.item + ' ' + styles.sizeL}>
            <h3 className={styles.tag}>Flyer & Poster</h3>
            <div className={styles.figure}>
              <Image src={myMy.img} alt="poster" className={styles.img} width={myMy.w} height={myMy.h} onClick={() => openModal(myMy.img, myMy.w, myMy.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>代官山UNITでのイベントフライヤーおよびポスターを制作しました。背景に迷彩柄を加えることで奥行きを持たせました。</p>
          </div>
          <div className={styles.item + ' ' + styles.sizeS}>
            <h3 className={styles.tag}>Flyer & Poster</h3>
            <div className={styles.figure}>
              <Image src={osaka.img} alt="D.treat" className={styles.img} width={osaka.w} height={osaka.h} onClick={() => openModal(osaka.img, osaka.w, osaka.h)} loading='lazy' />
            </div>
            <p className={styles.caption}>大阪インポートコレクションのフライヤーおよびポスターを制作しました。靴の画像を複数集め、配色を変更してポップなイメージを演出しました。</p>
          </div>
        </>))}
        <Modal
          imageSrc={modalImageSrc}
          width={modalWidth}
          height={modalHeight}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      </section>
      <section className={styles.contact}>
        <ContactForm />
      </section>
      </>
    );
  }