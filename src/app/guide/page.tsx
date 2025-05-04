import styles from '@/styles/guide.module.css'
import Link from 'next/link';
import { FaAngleRight } from "react-icons/fa6";
import Station from './components/station';
import descriptionStation from '@/app/guide/components/descriptionStations.json'


export default function Guide () {
  const imageSrcMeguro = '/images/station/meguro.webp'
  const imageSrcFudoumae = '/images/station/fudoumae.webp'
  const imageSrcMusashikoyama = '/images/station/musashikoyama.webp'
  const imageSrcNishikoyama = '/images/station/nishikoyama.webp'

  return (
    <div className={styles['guide_root']}>
      <h2 className={styles['guide_h2']}>目黒　武蔵小山　西小山ローカルガイド</h2>
      <p className={styles['guide_description']}>目黒、不動前、武蔵小山、西小山には魅力的なスポットがたくさん。おすすめのレストランや商店を訪れて、街の新たな魅力を発見しよう！</p>
      <nav className='bread'>
        <Link 
          className='back_home'
          href={'/'}>Home<FaAngleRight />
        </Link>
        <Link
        className='back_home'
        href={'banner'}
        >banner</Link>
      </nav>
      <section className={styles['guide_block']}>
        <ul className={styles['guide_container']}>
          <li className={styles['guide_station_wrapper']}>

            <Station
              stationName={'目黒駅'}
              stationLine={'山手線・目黒線・南北線・三田線'}
              stationDescription={descriptionStation.meguro}
              imageSrc={imageSrcMeguro}
              stationPathName='/station/meguro'
            />
          </li>
          <li className={styles['guide_station_wrapper_odd']}>
            <Station
              stationName={'不動前駅'}
              stationLine={'目黒線'}
              stationDescription={descriptionStation.fudoumae}
              imageSrc={imageSrcFudoumae}
              stationPathName='/station/fudoumae'
            />
          </li>
          <li className={styles['guide_station_wrapper']}>
            <Station
              stationName={'武蔵小山駅'}
              stationLine={'目黒線'}
              stationDescription={descriptionStation.musashikoyama}
              imageSrc={imageSrcMusashikoyama}
              stationPathName='/station/musashikoyama'
            />
          </li>
          <li className={styles['guide_station_wrapper_odd']}>
            <Station
              stationName={'西小山駅'}
              stationLine={'目黒線'}
              stationDescription={descriptionStation.nishikoyama}
              imageSrc={imageSrcNishikoyama}
              stationPathName='/station/nishikoyama'
            />
          </li>
        </ul>
      </section>

    </div>
  );
};
