
import { MongoClient } from "mongodb";
import dotevn from "dotenv";
dotevn.config();

let db = null;

const url = process.env.DATABASE_URL;
const client = new MongoClient(url)

export const connectDatabase = async () => {
    await client.connect();
    db = client.db("app");
};

export function getDb(){
    if (!db) {
        throw new Error("Database not connected");
    }
    return db;
}
