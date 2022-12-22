import clientPromise from "../../lib/mongodb";
import Layout from '../../components/layout'
import FinishedProductSelector from "../../components/finishedProductSelector";
import InfoWidget from "../../components/infoWidget";
import SampleWidget from "../../components/widgets/sampleWidget";
import Link from "next/link";

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("products");

    const data = await db.collection("finishedProduct").find({}).toArray();

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

export default function Home({ data }) {
  return (
    <>
      <Layout title="Batching">
        <div className="two-column flex">
          <FinishedProductSelector data={data} />
          <div className="body-wrapper overflow-y-scroll data-entry flex-grow p-4 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold">Add or select product</h1>
          </div>
          <InfoWidget>
            <SampleWidget />
          </InfoWidget>
        </div>
      </Layout>
    </>
  )
}
