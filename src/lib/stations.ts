import { getMongoClient } from "./mongodb";

export type StationItem = {
  _id: string;
  name: string;
  text: string;
  imageUrl?: string;
  rating?: string;
  station?: string;
};

const allowedStations = ['meguro', 'musashikoyama', 'fudoumae', 'nishikoyama'];

export async function getStationsBySlug(stationSlug: string): Promise<StationItem[]> {
  if (!stationSlug || !allowedStations.includes(stationSlug)) {
    return [];
  }
  try {
    const client = await getMongoClient();
    const db = client.db('portfolioDB');
    const collection = db.collection('stations');
    const data = await collection.find({ station: stationSlug }).toArray();
    return data.map(item => ({
      _id: item._id.toString(),
      name: item.name,
      text: item.text,
      imageUrl: item.imageUrl,
      rating: item.rating,
      station: item.station,
    }));
  } catch (error) {
    console.error("Failed to fetch stations:", error);
    return [];
  }
}