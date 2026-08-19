import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
export default function FudoumaeStation() {
  return (
    <div className={styles["station_root"]}>
      <StationForm stationName="不動前駅" stationSlug="fudoumae" />
    </div>
  );
}

