import Link from "next/link"

export default function Nav({ articles }) {
  return (
    <ul className="min-w-sm overflow-y-auto body-wrapper flex-grow flex flex-col items-end p-8 border-r-4 border-gray-300">
      <li className="text-3xl font-bold underline underline-offset-8 my-4">Articles</li>
      <li><Link href="/wiki" className="text-lg font-semibold text-gray-600 no-underline hover:text-gray-800 hover:font-bold ml-1">Home</Link></li>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={'/wiki/articles/' + article.id} className="text-lg font-semibold text-gray-600 no-underline hover:text-gray-800 hover:font-bold ml-1">{article.title}</Link>
        </li>
      ))}
    </ul>
  )
}
