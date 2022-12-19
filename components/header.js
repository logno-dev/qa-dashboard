import Link from "next/link";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from "next/image";
import logo from '../public/fp_logo_white.svg'
import { signOut } from 'next-auth/react'

export default function Header() {

  const router = useRouter()
  const [currentPath, setCurrentPath] = useState(router.pathname)

  return (
    <header className="flex justify-start items-center p-4 bg-gray-900 text-white">
      <div>
        <Link href="/" className="text-3xl">
          <Image src={logo} width={logo.width / 3} heigh={logo.height / 3} alt="Forager Project" />
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="flex gap-4 justify-center">
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
        </ul>
      </nav>
      <div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </header>
  );
}
