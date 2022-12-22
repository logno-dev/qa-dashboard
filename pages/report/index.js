import clientPromise from "../../lib/mongodb";
import Layout from '../../components/layout'
import ReportLotSelector from "../../components/reportLotSelector";
import Link from "next/link";
import InfoWidget from "../../components/infoWidget";
import SampleWidget from "../../components/widgets/sampleWidget";

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("products");

    const data = await db.collection("report").find({}).toArray();

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
      <Layout title="Home">
        <div className="flex">
          <ReportLotSelector data={data} />
          <div className="body-wrapper overflow-y-scroll p-4 flex-grow flex flex-col items-center justify-center">
            <h1 className="text-4xl">Add or select report</h1>
          </div>
          <InfoWidget>
            <SampleWidget />
          </InfoWidget>
        </div>
      </Layout>
    </>
  );
}
