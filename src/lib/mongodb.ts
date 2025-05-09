import { MongoClient, ServerApiVersion } from 'mongodb';

const DB_PASS = process.env.TEST_MONGODB_PASS;
const USER_NAME = process.env.TEST_MONGODB_USERNAME;
const uri = `mongodb+srv://${USER_NAME}:${DB_PASS}@cluster0.g9vipia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// グローバル変数を使ってホットリロード時の再接続を防止（開発時に重要）
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;