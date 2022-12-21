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
          <div className="min-h-[calc(100vh - 80px)] relative">
            <Head>
              <title>QA Data Entry</title>
            </Head>

            <div className="flex flex-col justify-center items-stretch">
              {children}
            </div>
            <div className="absolute bottom-0 right-0 p-4">v{info.version}</div>
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
