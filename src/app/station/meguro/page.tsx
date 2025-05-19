import StationForm from "../components/page";
import styles from "@/styles/station.module.css"
export default function MeguroStation () {
  return (
    <div className={styles['station_root']}>
      <StationForm
        stationName="目黒駅"
      />
    </div>
  );
};
