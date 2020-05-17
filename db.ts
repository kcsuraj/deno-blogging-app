import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

// Initialize the plugin
await init();

const dbName = Deno.env.get("DB_NAME") || "deno_app";
const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";

const client = new MongoClient();
client.connectWithUri(dbHostUrl);

const db = client.database(dbName);
const blogs = db.collection("blogs");

export default blogs;
