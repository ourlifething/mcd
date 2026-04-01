'use client'
import styles from '@/styles/home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './modal';
import { useState } from 'react'
import ContactForm from './contactForm';
import Banner from "@/app/components/banners";
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
  const karashinaPop = {img:'/images/karashinalettuce.png', w:2118, h:1500};
  const karashinaDescription = {img:'/images/karashinadescript.png', w:2211, h:1500};
  const mizulettucesalad = {img:'/images/mizulettucesald.png', w:2213, h:1500};
  const mizulettucesaldDesc = {img:'/images/mizulettucesalddesc.png', w:2125, h:1500};
  const whiteserurisald = {img:'/images/whiteserurisald.png', w:2203, h:1500};
  const whiteserurisoup = {img:'/images/whitesrurisoup.png', w:2071, h:1500};
  const lettucePopWide = {img:'/images/mizulettucewide.png', w:2274, h:798};
  const surfKing = {img:'/images/surf_king.png', w:2100, h:1500};
  const completefinesse = {img:'/images/cf_camo.png', w:2100, h:1500};
  const godVerve = {img:'/images/armyway.png', w:2100, h:1500};
  const kungfu = {img:'/images/kungfu.png', w:2100, h:1500};
  const cmyktee = {img:'/images/cmyktee.png', w:2100, h:1500};
  const menu = {img:'/images/menu.png', w:2100, h:1500};
  const fuji = {img:'/images/shirofujipr.png', w:2397, h:165};
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
              <p>「ちあきファームの黒忍辱（にんにく）」、オーガニック黒にんにくのロゴデザインがコンペにて採用されました。 
              高級感を意識しつつ、にんにくのイラストを家紋のように見立てブランド感をつくり、海外のお客様にも好まれるような洗練されたデザインを心がけて制作いたしました。</p>
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
              <p>店舗掲示用の販促POPとして制作しました。
                クリスマスは販売機会が高まる時期であるため、見た人が「作ってみたい」と感じるような提案を意識し、クリスマスリースをサラダで表現したビジュアルを制作しました。
                サラダの準備、スタイリング、撮影も含めて担当しています。
                また、本POPは商品提案時の資料としても使用し、商品の魅力を視覚的にわかりやすく伝えるツールとして活用しました。</p>
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
              <p>陳列スペースが冷ケースであることを想定し、値札の横に配置できるよう横長のレイアウトでデザインいたしました。</p>
            </div>
          </div>
        </div>

        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Pop</h3>
            <Image
              src={karashinaPop.img}
              alt="からし菜レタスポップ"
              className={styles['images-size']}
              width={karashinaPop.w}
              height={karashinaPop.h}
              onClick={() => openModal(karashinaPop.img, karashinaPop.w, karashinaPop.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>店舗掲示用の販促POPとして制作しました。
                サラダの調理、スタイリング、撮影も含めて担当しています。
                また、商品提案時の資料としても使用し、商品の魅力を視覚的に分かりやすく伝えるツールとして活用しました。
                4種の野菜がミックスされた商品であるため、実際にどのようなサラダになるのかイメージできるよう、サラダ写真をメインビジュアルとして使用しています。
                価格帯が198円の商品であるため、店頭で手に取りやすい価格でありながら、料理の写真やレイアウトによって品質の高さが伝わるよう上質感のあるデザインを意識しました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Sales Presentation</h3>
            <Image
              src={karashinaDescription.img}
              alt="からし菜レタスプレゼン資料"
              className={styles['images-size']}
              width={karashinaDescription.w}
              height={karashinaDescription.h}
              onClick={() => openModal(karashinaDescription.img, karashinaDescription.w, karashinaDescription.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>「からし菜レタス」という商品のプレゼン用資料として作成しました。商品を売り込む際に現物とこの資料を持って提案することで、商品の魅力を伝えることができます。</p>
            </div>
          </div>
        </div>

        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Pop</h3>
            <Image
              src={mizulettucesalad.img}
              alt="水レタスのサラダポップ"
              className={styles['images-size']}
              width={mizulettucesalad.w}
              height={mizulettucesalad.h}
              onClick={() => openModal(mizulettucesalad.img, mizulettucesalad.w, mizulettucesalad.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>店舗掲示用の販促POPとして制作しました。
                サラダの調理、スタイリング、撮影も含めて担当しています。
                売り場で商品の横に掲示されることを想定し、商品のラベルデザインと共通した配色やモチーフを使用することで、視覚的に商品と関連付けられるように設計しました。
                また、完成したサラダのイメージを大きく掲載することで、
                “どのように食べる商品か”を直感的に伝え、購買意欲を高めることを目的としています。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Sales Presentation</h3>
            <Image
              src={mizulettucesaldDesc.img}
              alt="水レタスのサラダプレゼン資料"
              className={styles['images-size']}
              width={mizulettucesaldDesc.w}
              height={mizulettucesaldDesc.h}
              onClick={() => openModal(mizulettucesaldDesc.img, mizulettucesaldDesc.w, mizulettucesaldDesc.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>「水レタスのサラダ」という商品のプレゼン用資料として作成しました。商品を売り込む際に現物と資料を持って提案することで、商品の魅力を伝えることができます。</p>
            </div>
          </div>
        </div>

        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Pop</h3>
            <Image
              src={whiteserurisoup.img}
              alt="ホワイトセルリ販促"
              className={styles['images-size']}
              width={whiteserurisoup.w}
              height={whiteserurisoup.h}
              onClick={() => openModal(whiteserurisoup.img, whiteserurisoup.w, whiteserurisoup.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>ホワイトセルリの販促物として食べ方の提案用に作成しました。料理の準備や撮影も行っております。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Pop</h3>
            <Image
              src={whiteserurisald.img}
              alt="ホワイトセルリ販促"
              className={styles['images-size']}
              width={whiteserurisald.w}
              height={whiteserurisald.h}
              onClick={() => openModal(whiteserurisald.img, whiteserurisald.w, whiteserurisald.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <p>ホワイトセルリの販促物として食べ方の提案用に作成しました。サラダの準備や撮影も行っております。
              </p>
            </div>
          </div>
        </div>

        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Logo Graphic</h3>
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
              <p>白富士マーケットのロゴデザイン提案:ターゲット層がネット販売を利用する方々であり、主に家電やスマートフォンを取り扱う点を踏まえ、「白富士」「富士山」「日本一」「家電」「先進的」「電脳」「商店」「マーケット」「お客様に届ける」といったキーワードを軸にロゴを提案いたしました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Logo Graphic</h3>
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
              <p>Green Walker ロゴデザイン提案:登山やキャンプなどのアウトドア用品を取り扱うブランド「GreenWalker（グリーンウォーカー）」のロゴデザインを提案いたしました。 ロゴは、ブランド名の文字列とシンボルマークを組み合わせた構成で、商品パッケージやウェブサイトなど幅広い用途での使用を想定して制作しております。 
              自然との共生や、歩みを進める楽しさ・力強さを感じさせるデザインを意識し、アウトドアブランドとしての信頼感と親しみやすさを表現しました。
              </p>
            </div>
          </div>
        </div>
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>T-shirts Print Graphic</h3>
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
              <small>画像出典:<a href='https://www.instagram.com/rita_jeans_tokyo/?hl=ja' target='_blank' style={{color:'blue'}}>rita_jeans_tokyo</a></small>
              <p>30代〜40代をターゲットとした大人なカジュアルを提案するブランド、
                <Link
                  className={styles['rita-link']}
                  href="https://www.instagram.com/rita_jeans_tokyo/?hl=ja" 
                  target="_blank" 
                  prefetch={false}
                >
                  RITA
                </Link>
                の2024年以前までのグラッフィックを全て制作しておりました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>T-shirts Print Graphic</h3>
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
            <small>画像出典:<a href='https://www.instagram.com/rita_jeans_tokyo/?hl=ja' target='_blank' style={{color:'blue'}}>rita_jeans_tokyo</a></small>
              <p>元SKE48の高柳明音さんとRITAのコラボレーションによるTシャツおよびジャケットのグラフィックデザインを担当いたしました。
                ジャケットのバックプリントは「ゲーム」をテーマに、遊び心とクールさを兼ね備えたデザインに仕上げています。
                また、Tシャツのグラフィックは、高柳明音さんがバスケットボールのPR活動を行っていた当時、架空のバスケットボールチームを想定し、そのチームロゴをデザインしたものです。
                アパレルとしての完成度を意識しながら、コンセプトやストーリー性も大切に制作いたしました。</p>
                <a 
                  href="https://www.instagram.com/reels/CFeSN9THQvn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{color : 'blue'}}
                >
                  <small>第一弾のコラボはこちら</small>
                </a>
            </div>
          </div>
        </div>
        {/* tee */}
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>T-shirts Print Graphic</h3>
            <Image
              src={godVerve.img}
              alt="GOD/VerveWearage"
              className={styles['images-size']}
              width={godVerve.w}
              height={godVerve.h}
              onClick={() => openModal(godVerve.img, godVerve.w, godVerve.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
            <small>画像出典:<a href='https://www.carousell.com.my/p/beams-japanese-brand-army-way-emoticon-graphic-tee-1268264616/?srsltid=AfmBOorVQb1xVXZZD9c_l8lu4uEGRKCAWHrxwld7WdLJp7xihs_9BjYK' rel="noopener noreferrer" target='_blank' style={{color:'blue'} }>carousell.com</a></small>
              <p>BEAMS-T向けに、手書きのラフなタッチを活かしたグラフィックデザインを制作しました。あえて擦れや歪みを残すことで、ストリート感と抜け感のある表現に仕上げています。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>T-shirts Print Graphic</h3>
            <Image
              src={kungfu.img}
              alt="sindee"
              className={styles['images-size']}
              width={kungfu.w}
              height={kungfu.h}
              onClick={() => openModal(kungfu.img, kungfu.w, kungfu.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <small>画像出典:<a href='https://www.grailed.com/listings/81848008-japanese-brand-sindee-05-spring-summer-kungfu-university-tee' target='_blank' style={{color: 'blue'}}>grailed.com</a></small>
              <p>架空のカレッジTシャツを作成しました。古着のようなダメージをロゴに加えビンテージ感を出してあります。</p>
            </div>
          </div>
        </div>
        {/* bagなど */}
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>Logo Tee / Tote Bag</h3>
            <Image
              src={surfKing.img}
              alt="リタジーンズトーキョー"
              className={styles['images-size']}
              width={surfKing.w}
              height={surfKing.h}
              onClick={() => openModal(surfKing.img, surfKing.w, surfKing.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
            <small>画像出典:<a href='https://www.instagram.com/rita_jeans_tokyo/?hl=ja' target='_blank' style={{color:'blue'}}>rita_jeans_tokyo</a></small>
              <p>文字間や文字サイズを意識し女性らしいカレッジロゴを作成しプリントTシャツを作成しました、同じ製版をトートバックにも使用してます</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>Camo pattern</h3>
            <Image
              src={completefinesse.img}
              alt="completefinesse"
              className={styles['images-size']}
              width={completefinesse.w}
              height={completefinesse.h}
              onClick={() => openModal(completefinesse.img, completefinesse.w, completefinesse.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <small>画像出典:<a href='https://blue-room.jp/product/complete-finesse-tote-bag' target='_blank' style={{color: 'blue'}}>blue-room.jp</a></small>
              <p>メンズカジュアルブランド「Complete Finesse」の迷彩パターンをIllustratorで制作し、生地として展開しました。トートバッグやバックパックなどのアイテムに落とし込み、実寸を意識したパターン設計と色の濃淡バランスにこだわって制作しています。</p>
            </div>
          </div>
        </div>
        {/* menu,tee */}
        <div className={styles['pict-block-wrapper']}>
          <div className={styles['pict-block']}>
            <h3>T-shirts Print Graphic</h3>
            <Image
              src={cmyktee.img}
              alt="complete finesse"
              className={styles['images-size']}
              width={cmyktee.w}
              height={cmyktee.h}
              onClick={() => openModal(cmyktee.img, cmyktee.w, cmyktee.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
            <small>画像出典:<a href='https://antiknovum.official.ec/items/63827497' target='_blank' style={{color:'blue'}}>antiknovum</a></small>
              <p>CMYKカラーの重なりやズレを活かし、視覚的なインパクトと動きを感じさせる抽象的なロゴデザインに仕上げました。</p>
            </div>
          </div>
          <div className={styles['pict-block']}>
            <h3>menu</h3>
            <Image
              src={menu.img}
              alt="junkadelic menu"
              className={styles['images-size']}
              width={menu.w}
              height={menu.h}
              onClick={() => openModal(menu.img, menu.w, menu.h)}
              loading='lazy'
            />
            <div className={styles['description-wrapper']}>
              <small>画像出典:<a href='https://www.yelp.com/biz/junkadelic-%E7%9B%AE%E9%BB%92%E5%8C%BA-2?osq=Mexican' target='_blank' style={{color: 'blue'}}>yelp.com</a></small>
              <p>メキシコ料理店のメニュー表を制作しました。ヴィンテージ感のある質感と配色を取り入れ、現地の雰囲気を感じられるデザインに仕上げました。</p>
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
              <small>画像出典:<a href='https://www.amazon.co.jp/dp/B0C4PRRXTC?ref=cm_sw_r_cso_cp_apin_dp_1RD6WBX4ZSYNVEXSJ67W&ref_=cm_sw_r_cso_cp_apin_dp_1RD6WBX4ZSYNVEXSJ67W&social_share=cm_sw_r_cso_cp_apin_dp_1RD6WBX4ZSYNVEXSJ67W&starsLeft=1&skipTwisterOG=1&newOGT=1&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1nUakDGHmiLuj1h4o23PfuYzYpdmVX6bDepk7Z5HijU6qJcyQIRcAP3Noos_aem_eykTKoOhEgvWTw91V3LwfQ&utm_content=link_in_bio&utm_medium=social&utm_source=ig&th=1' target='_blank' style={{color: 'blue'}}>D-Treat</a></small>
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
      <section className={styles['banners']}>
        <Banner/>
      </section>
      <section className={styles['contact-form']}>
        <ContactForm/>
      </section>
    </>
  );
};
