import Head from 'next/head'
import clientPromise from '../lib/mongodb'

 export async function getServerSideProps(){
  try {
    const client = await clientPromise
    const db = client.db("products")

    const data = await db
      .collection('fermented')
      .find({})
      .toArray()

      return {
        props: {data: JSON.parse(JSON.stringify(data))}
      }
  } catch (e) {
    console.log(e)
    return {
      props: {data: "error loading data"}
    }
  }
}



export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>QA Data Entry</title>
      </Head>
      <header className="flex justify-between items-center p-4 bg-slate-600 text-white">
        <div>
          <a href="/" className="text-3xl">Forager</a>
        </div>
        <nav>
          <ul className="flex gap-2">
            <li>Dashboard</li>
            <li>Entry</li>
            <li>Reports</li>
          </ul>
        </nav>
      </header>
      <main className="flex h-max items-stretch">
        <div className="w-40 p-4  bg-slate-300">
          <ul>
            <li>Fermented</li>
            <li>ESL</li>
            <li>Cheese</li>
          </ul>
        </div>
        <div className="max-w-[calc(100%-20rem)] mx-auto overflow-auto">
          <h2>Date</h2>
          <ul>
            {data.map((product)=>(
              <li key={product._id}>{product.type}</li>
            ))}
          </ul>
        </div>

      </main>
    </>
  )
}