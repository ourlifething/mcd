import { getMongoClient } from "./mongodb";

const allowedStations = ['meguro', 'musashikoyama', 'fudoumae', 'nishikoyama'];

export async function getStationsBySlug(stationSlug: string) {
  if (!stationSlug || !allowedStations.includes(stationSlug)) {
    return [];
  }
  try {
    const client = await getMongoClient();
    const db = client.db('portfolioDB');
    const collection = db.collection('stations');
    const data = await collection.find({ station: stationSlug }).toArray();
    return data.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch stations:", error);
    return [];
  }
}