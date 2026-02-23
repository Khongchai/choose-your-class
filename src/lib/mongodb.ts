import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "chanita-research";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDb() {
  const client: MongoClient = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
}
