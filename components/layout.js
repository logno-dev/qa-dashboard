import Head from 'next/head'
import Header from '../components/header'
import { useSession } from 'next-auth/react'
// import Sidebar from './productSelect'
import info from '../info.json'

export default function Layout({ children, title }) {
  const { data: session, status } = useSession()
  return (
    <>
      {status === "authenticated" ? (
        <div className="min-h-screen relative">
          <Head>
            <title>QA Data Entry</title>
          </Head>
          <Header />

          <div className="flex flex-col justify-center items-stretch">
            {children}
          </div>
          <div className="absolute bottom-0 right-0 p-4">v{info.version}</div>
        </div>
      ) :
        <>
          <div className="flex h-screen justify-center items-center">
            <a className="text-3xl text-white p-4 bg-blue-700 rounded-md hover:scale-110 hover:shadow-md" href="/api/auth/signin">Please sign in</a>
          </div>
        </>
      }
    </>
  );
}
