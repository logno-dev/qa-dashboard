import Head from 'next/head'
import Header from '../components/header'
// import Sidebar from './productSelect'

export default function Layout({ children, title}) {
  return (
    <>
      <Head>
        <title>QA Data Entry</title>
      </Head>
      <Header />

      <div className="flex flex-col justify-center items-stretch">
          { children }
      </div>
    </>
  );
}
