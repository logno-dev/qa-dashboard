import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('communication')

  if (req.method === "POST") {
    const insertObject = JSON.parse(req.body)
    const myInsert = await db.collection('messages').insertOne({ ...insertObject, dateAdded: new Date() })
  }
  res.json({ message: 'ok' })
}
