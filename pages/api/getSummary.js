import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {

  const client = await clientPromise
  const db = client.db('products')
  const start = new Date(req.query.start)
  const end = new Date(req.query.end)


  if (req.method === "GET") {
    const data = await db.collection(req.query.collection).find({ dateAdded: { $gte: start, $lt: end } }).toArray()
    res.status(200).json(data)
  }

}
