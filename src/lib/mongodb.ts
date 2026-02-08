import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.TEST_MONGODB_USERNAME}:${process.env.TEST_MONGODB_PASS}@cluster0.g9vipia.mongodb.net/?retryWrites=true&w=majority`;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export function getMongoClient() {
  if (!clientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    clientPromise = client.connect();
  }
  return clientPromise;
}
