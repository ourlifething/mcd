import { getMongoClient } from "./mongodb";

export type StationItem = {
  _id: string;
  name: string;
  text: string;
  imageUrl?: string;
  rating?: string;
  station?: string;
};

export type StationMaster = {
  slug: string;
  name: string;
  line?: string;
  order?: number;
};

export async function getStationMaster(): Promise<StationMaster[]> {
  try {
    const client = await getMongoClient();
    const db = client.db("portfolioDB");
    const collection = db.collection("station_master");

    // station_master が空の場合は初期4駅を自動シード（重複登録防止）
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany([
        { slug: "meguro", name: "目黒駅", line: "山手線・目黒線・南北線・三田線", order: 1, createdAt: new Date(), updatedAt: new Date() },
        { slug: "fudoumae", name: "不動前駅", line: "目黒線", order: 2, createdAt: new Date(), updatedAt: new Date() },
        { slug: "musashikoyama", name: "武蔵小山駅", line: "目黒線", order: 3, createdAt: new Date(), updatedAt: new Date() },
        { slug: "nishikoyama", name: "西小山駅", line: "目黒線", order: 4, createdAt: new Date(), updatedAt: new Date() },
      ]);
    }

    const data = await collection.find({}).sort({ order: 1 }).toArray();
    return data.map((item) => ({
      slug: item.slug,
      name: item.name,
      line: item.line,
      order: item.order,
    }));
  } catch (error) {
    console.error("Failed to fetch station master:", error);
    return [];
  }
}

export async function getStationMasterBySlug(
  slug: string,
): Promise<StationMaster | null> {
  try {
    const client = await getMongoClient();
    const db = client.db("portfolioDB");
    const collection = db.collection("station_master");
    const item = await collection.findOne({ slug });
    if (!item) return null;
    return {
      slug: item.slug,
      name: item.name,
      line: item.line,
      order: item.order,
    };
  } catch (error) {
    console.error("Failed to fetch station master by slug:", error);
    return null;
  }
}

export async function getAllowedStations(): Promise<string[]> {
  const stations = await getStationMaster();
  return stations.map((s) => s.slug);
}

export async function getStationsBySlug(
  stationSlug: string,
): Promise<StationItem[]> {
  const allowedStations = await getAllowedStations();
  if (!stationSlug || !allowedStations.includes(stationSlug)) {
    return [];
  }
  try {
    const client = await getMongoClient();
    const db = client.db("portfolioDB");
    const collection = db.collection("stations");
    const data = await collection.find({ station: stationSlug }).toArray();
    return data.map((item) => ({
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
