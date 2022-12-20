import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("authenticate")

  const users = db.collection("users")

  if (req.method === "PUT") {
    const request = JSON.parse(req.body)
    const query = { email: request.email }
    const updatePassword = { $set: { password: request.password } }
    let update = await users.updateOne(query, updatePassword, { upsert: false })
    res.json({ message: ok })
  }
}
