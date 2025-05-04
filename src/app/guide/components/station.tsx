'use client'
import styles from '@/styles/guide.module.css'
import Link from 'next/link';
import Image from 'next/image';


type Props = {
  stationName: string;
  stationLine: string;
  stationDescription: string;
  imageSrc: string;
  stationPathName: string;
}
export default function Station ({ stationName, stationLine, stationDescription, imageSrc, stationPathName }: Props) {

  return (
    <>
      <div className={styles['guide_station_description']}>
        <dl>
          <span className={styles['guide_station_title_block']}>
            <dt>駅名</dt>
            <dd><span>{ stationName }</span></dd>
          </span>
          <span className={styles['guide_station_title_block']}>
            <dt>路線名</dt>
            <dd><span>{ stationLine }</span></dd>
          </span>
        </dl>
        <p>{stationDescription}</p>
        <Link
          href={stationPathName}
          className={styles['guide_link']}
        >
          見にいく
        </Link>
      </div>
      <div className={styles['station_image_block']}>
        <span className={styles['station_image_title']}>{stationName}</span>
        <Image 
          src={imageSrc}
          alt="駅画像"
          width={640}
          height={427}
          className={styles['guide_station_image']}
        />
      </div>
    </>
  );
};