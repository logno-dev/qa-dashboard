// import clientPromise from "../lib/mongodb";
import Layout from '../components/layout'
import Link from "next/link";
import { useSession } from 'next-auth/react'

// export async function getServerSideProps() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("authenticate");

//     const data = await db.collection("users").find({}).toArray();

//     return {
//       props: { data: JSON.parse(JSON.stringify(data)) },
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       props: { data: "error loading data" },
//     };
//   }
// }

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <> <Layout title="Home">
      <div className="flex justify-center p-12">
        <div className="max-w-3xl text-lg leading-8">
          <h1 className="text-5xl">Welcome!</h1>
          <p className="text-xl">This project is currently under construction.</p>
          <br /><br />
          <h2>Introduction</h2>
          <p>The purpose of this project is to ease the entry of data, to reduce errors in our records, and to provide quick access to the information entered.</p>
          <p>Currently, this system has the ability to receive data, store it in a secure database, and generate reports for batched and finished products.</p>
          <p>Over time, more features will be added to ease the use of the system.</p>
          <br />
          <h3>How to use:</h3>
          <h4>Batching:</h4>
          <ul className="list-disc [&>li]:ml-6">
            <li>Data entry begins with batching. Select the <Link href="/batching">Batching</Link> page and create a lot based on the product that is currently being batched by selecting the product type from the dropdown menu on the left side of the screen.</li>
            <li>Fermented products will prompt you to add a tank number associated with this lot, this will be the fermentation tank and this will be how the lot is identified a long with the product type.</li>
            <li>ESL type products will simply prompt you for a product sub type.</li>
            <li>All fields should be filled out as information becomes available and promptly saved after any changes are made.</li>
          </ul>
          <h4>Finished Product</h4>
          <ul className="list-disc [&>li]:ml-6">
            <li>Select the <Link href="/finished_product">Finished Product</Link> page and create an item based on the product that is currently in production.</li>
            <li>The form will update and promt you based on the items you select guiding you to a unique product, flavor and size.</li>
            <li>The first items that should be filled out for a new finished product are the &quot;enjoy by date&quot; and the &quot;label code&quot;. This information should be retrieved from documentation and not for the product on the line.</li>
          </ul>
          <p>{status === "authenticated" ? session.user.email : null}</p>
        </div>
      </div>
    </Layout>
    </>
  );
}
