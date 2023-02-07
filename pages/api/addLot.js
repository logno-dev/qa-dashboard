import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("products")
  let bodyObject
  if (req.method === 'POST') {
    bodyObject = JSON.parse(req.body)
    let myInsert = await db.collection('batching').insertOne({ ...bodyObject, dateAdded: new Date(bodyObject.dateAdded) })
    res.json({ message: 'ok' })
  }
}
