import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();
client.connectWithUri(
  "mongodb+srv://test:k3WWEzVovPYpQg8g@place-demo-vmmnt.mongodb.net/test?retryWrites=true&w=majority",
);
const db = client.database("test");
export default db;
// const testCollection = db.collection("test");
// testCollection.insertOne({ name: "confident" });
