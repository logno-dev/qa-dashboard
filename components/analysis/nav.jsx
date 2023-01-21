import Link from "next/link"

export default function AnalNav() {
  return (
    <div className="flex flex-grow p-4 bg-gray-300 justify-center gap-4">
      <ul className="flex text-lg gap-4">
        <li><Link href="/analysis/">Summary</Link></li>
        <li><Link href="/analysis/spreadsheet_view/">Spreadsheet View</Link></li>
      </ul>
    </div>
  )
}
