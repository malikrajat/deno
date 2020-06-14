// importing the deno_mongo package from url
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

// Create client
const client = new MongoClient();

// Connect to mongodb
client.connectWithUri(
  "mongodb+srv://test:k3WWEzVovPYpQg8g@place-demo-vmmnt.mongodb.net/test?retryWrites=true&w=majority",
);

// Specifying the database name
const db = client.database("test");
export default db;
// const testCollection = db.collection("test");
// testCollection.insertOne({ name: "confident" });
