import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
import { getStationsBySlug } from "@/lib/stations";

export const dynamic = 'force-dynamic';

export default async function NishikoyamaStation() {
  const initialList = await getStationsBySlug("nishikoyama");

  return (
    <div className={styles["station_root"]}>
      <StationForm stationName="西小山駅" stationSlug="nishikoyama" initialList={initialList} />
    </div>
  );
}

