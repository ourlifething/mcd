import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
export default function MeguroStation() {
  return (
    <div className={styles["station_root"]}>
      <StationForm stationName="武蔵小山駅" />
    </div>
  );
}
