import StationForm from "../components/StationForm";
import styles from "@/styles/station.module.css";
import { getStationsBySlug, getStationMasterBySlug, getStationMaster } from "@/lib/stations";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    station: string;
  };
}

export default async function StationPage({ params }: Props) {
  const stationSlug = params.station;
  const stationInfo = await getStationMasterBySlug(stationSlug);

  if (!stationInfo) {
    notFound();
  }

  const initialList = await getStationsBySlug(stationSlug);
  const stationsList = await getStationMaster();

  return (
    <div className={styles["station_root"]}>
      <StationForm 
        stationName={stationInfo.name} 
        stationSlug={stationSlug} 
        initialList={initialList}
        stationsList={stationsList}
      />
    </div>
  );
}