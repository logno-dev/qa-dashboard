import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("authenticate")

  const users = db.collection("users")

  if (req.method === "PUT") {
    const request = JSON.parse(req.body)
    const query = { email: request.email }
    const password = bcrypt.hash(request.password, 10, function(err, hash) {
      const updatePassword = { $set: { password: hash } }
      let update = users.updateOne(query, updatePassword, { upsert: false })
    })
    res.json({ message: ok })
  }
}
