import Link from "next/link"

export default function AdminNav() {
  return (
    <div className="w-full p-4 bg-gray-300 flex justify-center gap-4 relative top-0 z-50">
      <ul className="flex text-lg gap-4">
        <li><Link href="/admin/">Home</Link></li>
        <li><Link href="/admin/product-specs/">Product Specs</Link></li>
      </ul>
    </div>
  )
}
