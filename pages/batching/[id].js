import Layout from '../../components/layout'
import BatchLotSelector from '../../components/batchLotSelector'
import clientPromise from '../../lib/mongodb'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("products");

    const data = await db.collection("fermented").find({}).toArray();

    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: { data: "error loading data" },
    };
  }
}


export default function BatchLot({ data }) {

  const router = useRouter()
  const { id } = router.query
  const [selectedLot, setSelectedLot] = useState(data[data.findIndex(e => e.lot === id)])

  useEffect(() => {
    setSelectedLot(data[data.findIndex(e=> e.lot === id)])
  }, [id])


  return (
    <>
      <Layout title="Batching">
        <div className="two-column flex">
          <BatchLotSelector data={data} />
          <div className="data-entry flex flex-col items-center flex-grow border-slate-500 border-4 p-4">
            <div className="flex justify-evenly gap-8 text-3xl font-bold text-blue-800 p-4">
              <h2>Product Type: <span className="text-orange-800">{selectedLot.productType}</span></h2>
              <h2> Lot: <span className="text-orange-800">{selectedLot.lot}</span></h2>
            </div>
            <table>
              <thead>
                <th>
                  Ferm Tank Start Weight
                </th>
                <th>
                  Agitation Start
                </th>
                <th>
                  Innoc Time
                </th>
                <th>
                  Innoc By
                </th>
                <th>
                  Flash Psi
                </th>
                <th>
                  Agitation End
                </th>
              </thead>
              <tr>
                <td><input type="text"></input></td>
                <td><input type="time"></input></td>
                <td><input type="time"></input></td>
                <td><input type="text"></input></td>
                <td><input type="text"></input></td>
                <td><input type="time"></input></td>
              </tr>
            </table>
          </div>
          <div className="flex-grow"></div>
        </div>
      </Layout>
    </>
  )
}
