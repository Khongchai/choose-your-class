import { attachDatabasePool } from "@vercel/functions";
import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.VERCEL_MONGODB_MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "chanita-research";

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000,
};
const client = new MongoClient(uri, options);

// Attach the client to ensure proper cleanup on function suspension
attachDatabasePool(client);

// Export a module-scoped MongoClient to ensure the client can be shared across functions.
export default client;

export function getDb() {
  return client.db(dbName);
}
