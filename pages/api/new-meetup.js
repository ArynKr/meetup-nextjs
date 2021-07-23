import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://arynkr:aryn123@cluster0.tu0kh.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup Inserted Successfully!' });
  }
}
