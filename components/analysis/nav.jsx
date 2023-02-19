import Link from "next/link"

export default function AnalNav() {
  return (
    <div className="w-full p-4 bg-gray-300 flex justify-center gap-4 relative top-0 z-50">
      <ul className="flex text-lg gap-4">
        <li><Link href="/analysis/">Summary</Link></li>
        <li><Link href="/analysis/spreadsheet_view/">Spreadsheet View</Link></li>
        <li><Link href="/analysis/fermentation/">Fermentation</Link></li>
      </ul>
    </div>
  )
}
