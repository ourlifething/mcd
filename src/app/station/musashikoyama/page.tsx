import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
import { getStationsBySlug } from "@/lib/stations";

export const dynamic = 'force-dynamic';

export default async function MusashikoyamaStation() {
  const initialList = await getStationsBySlug("musashikoyama");

  return (
    <div className={styles["station_root"]}>
      <StationForm stationName="武蔵小山駅" stationSlug="musashikoyama" initialList={initialList} />
    </div>
  );
}
