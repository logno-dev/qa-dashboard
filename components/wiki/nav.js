import Link from "next/link"

export default function Nav({ articles }) {
  return (
    <ul className="max-w-md min-w-sm overflow-x-auto flex flex-col items-start p-8 border-r-4 border-gray-300">
      <li className="text-3xl font-bold underline underline-offset-8 my-4">Articles</li>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={'/wiki/articles/' + article.id} className="text-lg font-semibold text-gray-600 hover:text-gray-800 hover:font-bold ml-1">{article.title}</Link>
        </li>
      ))}
    </ul>
  )
}
