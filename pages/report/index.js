import clientPromise from "../../lib/mongodb";
import Layout from '../../components/layout'
import Link from "next/link";

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("products");

    const data = await db.collection("batching").find({}).toArray();

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
        <div className="flex justify-center p-12">
          <div>
            <h1 className="text-5xl">Welcome!</h1>
            <p className="text-xl">This project is currently under construction. At this time, the batching data entry page is fully functional. Finished Product page and Reports page coming soon.</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
