import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
import { getStationsBySlug } from "@/lib/stations";

export const dynamic = 'force-dynamic';

export default async function FudoumaeStation() {
  const initialList = await getStationsBySlug("fudoumae");

  return (
    <div className={styles["station_root"]}>
      <StationForm stationName="不動前駅" stationSlug="fudoumae" initialList={initialList} />
    </div>
  );
}

