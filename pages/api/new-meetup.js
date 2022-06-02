import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://imrantahir16:o7amo9Jy5LYDrygx@cluster0.g5cf3rs.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup is inserted!" });
  }
}
