import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {

  const client = await clientPromise
  const db = client.db('products')
  const start = new Date(req.query.start)
  let end = new Date(req.query.end)

  end.setDate(end.getDate() + 1)


  if (req.method === "GET") {
    const data = await db.collection('batching').find({ dateAdded: { $gte: start, $lte: end } }).toArray()
    res.status(200).json(data)
  }

}
