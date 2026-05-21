import { MongoClient, Db, Collection } from "mongodb";
import config from "../_config/mongodb";
import { isEnv } from "../_utils/isEnv";

const dbName = config.db || "test";

const uri = isEnv("github")
  ? "mongodb://root:edouard@mongodb:27017/test?authSource=admin"
  : config.uri || "mongodb://localhost:27017";

let client: MongoClient;
let db: Db;

export const connectToDatabase = async () => {
  if (db) return;
  client = new MongoClient(uri);
  if (process.env.NODE_ENV === "development") {
    const admin = client.db().admin();
    const result = await admin.command({ ping: 1 });

    console.log("dev mode. Mongo isConnection: " + result.ok);

    if (result.ok !== 1) {
      await client.connect();
    }
  } else {
    await client.connect();
  }

  db = client.db(dbName);
  return db;
};

export const closeDatabase = async () => {
  if (client) {
    await client.close();
  }
};

export const inCollection = async (collection: string) => {
  const list: Collection = await db.collection(collection);
  return list;
};

export const dbase = async () => {
  console.log(db);
  return db;
};
