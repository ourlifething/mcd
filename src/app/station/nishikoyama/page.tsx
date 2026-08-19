import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
export default function NishikoyamaStation() {
  return (
    <div className={styles["station_root"]}>
      <StationForm stationName="西小山駅" stationSlug="nishikoyama" />
    </div>
  );
}

