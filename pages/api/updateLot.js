import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("products")
  if (req.method === 'POST') {
    let bodyObject = JSON.parse(req.body)
    console.log(bodyObject)
    let myUpdate = await db.collection('fermented').insertOne(bodyObject)
    res.json(myUpdate.ops[0])
  }
}
