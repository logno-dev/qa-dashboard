import Head from 'next/head'
import Header from '../components/header'
import { useSession } from 'next-auth/react'
// import Sidebar from './productSelect'
import info from '../info.json'
import Link from 'next/link'

export default function Layout({ children }) {
  const { status } = useSession()
  return (
    <>
      {status === "authenticated" ? (
        <>
          <Header />
          <div className="w-full h-20"></div>
          <div className="body-wrapper relative overflow-y-scroll">
            <Head>
              <title>QA Data Entry</title>
            </Head>

            <div className="flex flex-col justify-center items-stretch">
              {children}
            </div>
            <div className="fixed bottom-0 right-0 px-4 py-2 m-4 bg-gray-700 rounded-3xl shadow-md shadow-slate-500 text-gray-100">v{info.version}</div>
          </div>
        </>
      ) :
        <>
          <div className="flex h-screen justify-center items-center">
            <Link className="text-3xl text-white p-4 bg-blue-700 rounded-md hover:scale-110 hover:shadow-md" href="/api/auth/signin">Please sign in</Link>
          </div>
        </>
      }
    </>
  );
}
