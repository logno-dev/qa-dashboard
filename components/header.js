import Link from "next/link";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from "next/image";
import logo from '../public/fp_logo_white.svg'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {

  const router = useRouter()
  const currentPath = router.pathname
  const { data: session, status } = useSession()


  return (
    <div className="fixed top-0 w-full z-10">
      <header className="grid grid-rows-1 items-center p-4 bg-gray-900 text-white h-20">
        <div className="justify-self-start row-start-1 z-20">
          <Link href="/" className="text-3xl">
            <Image src={logo} width={logo.width / 3} heigh={logo.height / 3} alt="Forager Project" />
          </Link>
        </div>
        <div className="justify-self-end row-start-1 z-20">
          <span className="font-semibold">Signed in as</span> {session.user.username}
          <button className="font-semibold mx-2 py-2 px-4 bg-gray-700 rounded-3xl hover:text-gray-900 hover:bg-gray-50" onClick={() => signOut()}>Logout</button>
        </div>
        <nav className="fixed top-5 left-0 right-0 w-full flex justify-center">
          <ul className="flex gap-4 justify-center [&>li]:bg-gray-900">
            <li>
              {(currentPath === '/') ?
                <Link href="/" className="underline">Dashboard</Link>
                :
                <Link href="/">Dashboard</Link>
              }
            </li>
            <li>
              {(currentPath.includes('batching')) ?
                <Link href="/batching" className="underline">Batching</Link>
                :
                <Link href="/batching">Batching</Link>
              }
            </li>
            <li>
              {(currentPath.includes('finished')) ?
                <Link href="/finished_product" className="underline">Finished Product</Link>
                :
                <Link href="/finished_product">Finished Product</Link>
              }
            </li>
            <li>
              {(currentPath.includes('report')) ?
                <Link href="/report" className="underline">Reports</Link>
                :
                <Link href="/report">Reports</Link>
              }
            </li>
            <li>
              {(currentPath.includes('analysis')) ?
                <Link href="/analysis" className="underline">Analysis</Link>
                :
                <Link href="/analysis">Analysis</Link>
              }
            </li>
            <li>
              {(currentPath.includes('wiki')) ?
                <Link href="/wiki" className="underline">Wiki</Link>
                :
                <Link href="/wiki">Wiki</Link>
              }
            </li>
            {session.user.role === "admin" ? (
              <li>
                {(currentPath.includes('admin')) ?
                  <Link href="/admin" className="underline">Admin</Link>
                  :
                  <Link href="/admin">Admin</Link>
                }
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
    </div>
  );
}
