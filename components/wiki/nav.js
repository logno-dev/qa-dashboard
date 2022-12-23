import Link from "next/link"
import { useEffect, useState } from "react"

export default function Nav({ articles }) {
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let tempArray
    if (query.length !== 0) {
      setFilteredArticles(articles.filter(article => {
        return article.title.toLowerCase().includes(query.toLowerCase()) || article.meta.toLowerCase().replace(',', '').replace(' ', '').includes(query.toLowerCase())
      }))
    } else {
      setFilteredArticles(articles)
    }
  }, [query])

  return (
    <div className="body-wrapper flex flex-col items-end border-r-4 border-gray-300">
      <div className="text-3xl font-bold underline underline-offset-8 mx-4 my-2">Articles</div>
      <div><input type="text" placeholder="search..." value={query} onChange={e => setQuery(e.target.value)} className="rounded-3xl  px-2 border-0 search mx-4 my-2" /></div>
      <ul className="w-56 md overflow-y-auto flex-grow flex flex-col items-end p-8 pt-2 ">
        <li><Link href="/wiki" className="text-lg font-semibold text-gray-600 no-underline hover:text-gray-800 hover:font-bold ml-1">Home</Link></li>
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <Link href={'/wiki/articles/' + article.id} className="text-lg font-semibold text-gray-600 no-underline hover:text-gray-800 hover:font-bold ml-1">{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
