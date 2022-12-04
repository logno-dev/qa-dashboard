import clientPromise from "../lib/mongodb";
import Layout from '../components/layout'
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
        <h2>Date</h2>
        <ul>
          {data.map((product) => (
            <li key={product._id}>{product.productType}</li>
          ))}
        </ul>
      </Layout>
    </>
  );
}
