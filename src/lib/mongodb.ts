import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_DB_URL as string;
const dbName = process.env.AUTH_DB_NAME as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// In dev, reuse the connection across hot-reloads so we don't
// open a new MongoClient on every file change / route hit.
if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
    const connectedClient = await clientPromise;
    return connectedClient.db(dbName);
}