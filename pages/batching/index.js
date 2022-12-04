import Layout from '../../components/layout'
import clientPromise from '../../lib/mongodb'
import BatchLotSelector from '../../components/batchLotSelector'
// import { useEffect, useState } from "react"

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("products");

    const data = await db.collection("batching").find({}).sort({dateAdded:-1}).toArray();

    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    console.log(e);
    return {
      props: { data: "error loading data" },
    };
  }
}


export default function Batching({ data }) {

  return (
    <>
      <Layout title="Batching">
        <div className="two-column flex">
          <BatchLotSelector data={ data } />
          <div className="data-entry flex-grow border-slate-500 border-4 p-4 flex justify-center items-center">
            <h1 className="text-4xl font-bold">Add or select lot</h1>
          </div>
        </div>
      </Layout>
    </>
  )
}
