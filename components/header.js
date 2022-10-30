import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-slate-600 text-white">
      <div>
        <Link href="/" className="text-3xl">
          Forager
        </Link>
      </div>
      <nav>
        <ul className="flex gap-2">
          <li><Link href="/">Dashboard</Link></li>
          <li><Link href="/entry">Entry</Link></li>
          <li>Reports</li>
        </ul>
      </nav>
    </header>
  );
}
