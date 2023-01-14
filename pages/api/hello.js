// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { method } = req
  if (method === "GET") {
    res.status(200).json({ message: "hello" })
  }
}
