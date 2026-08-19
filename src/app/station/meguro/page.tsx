import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
import { getStationsBySlug } from "@/lib/stations";

export const dynamic = 'force-dynamic';

export default async function MeguroStation() {
  const initialList = await getStationsBySlug("meguro");

  return (
    <div className={styles["station_root"]}>
      <StationForm stationName="目黒駅" stationSlug="meguro" initialList={initialList} />
    </div>
  );
}
