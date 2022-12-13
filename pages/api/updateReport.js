import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("products")
  if (req.method === 'PUT') {
    let bodyObject = req.body
    bodyObject = JSON.parse(bodyObject)
    let query = { reportId: bodyObject.reportId }
    let myUpdate = await db.collection('report').replaceOne(query, bodyObject, { upsert: false })
    bodyObject.contents.forEach(async (item) => {
      let collection = bodyObject.type
      let query
      if (bodyObject.type === 'batching') {
        query = { lot: item.lot }
      } else if (bodyObject.type === 'finishedProduct') {
        query = { id: item.id }
      }
      let finalizedLot = await db.collection(collection).updateOne(query, { $set: { finalized: true } }, { upsert: false })
    })
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

