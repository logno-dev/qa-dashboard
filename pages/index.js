import clientPromise from "../lib/mongodb";
import Layout from '../components/layout'
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client'

export async function getServerSideProps() {
  try {
    const role = await fetch('https://dev-l8b7q7zqt5e0h0s0.us.auth0.com/api/v2/users/auth0%7C639b9bd718d75cfb75482fb2/permissions')
  } catch (e) {
    console.log(e)
  }
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
  const { user, error, isLoading } = useUser()
  return (
    <>
      <Layout title="Home">
        <div className="flex justify-center p-12">
          <div>
            <h1 className="text-5xl">Welcome!</h1>
            <p className="text-xl">This project is currently under construction. At this time, the batching data entry page is fully functional. Finished Product page and Reports page coming soon.</p>
            {user ? (
              <>
                <p>{JSON.stringify(user)}</p>
                <a href="/api/auth/logout" className="button m-2">Logout</a>
              </>
            ) : (
              <a href="/api/auth/login" className="button m-2">Login</a>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
