import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("products")
  if (req.method === 'PUT') {
    let bodyObject = req.body
    bodyObject = JSON.parse(bodyObject)
    let query = { id: bodyObject.id }
    let myUpdate = await db.collection('finishedProduct').replaceOne(query, { ...bodyObject, dateAdded: new Date(bodyObject.dateAdded) }, { upsert: false })
    res.json({ message: 'ok' })
    // let bodyObject = JSON.parse(req.body)
    // let query = { lot: bodyObject.lot }
    // try {
    //   db.collections('batching').replaceOne(query, bodyObject, { upsert: true })
    // } catch (e) {
    //   console.log(e)
    // }
  }
}

