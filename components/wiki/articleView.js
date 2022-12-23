import Link from "next/link"

export default function ArticleView({ article }) {
  return (
    <div className="flex-grow p-4 h-[calc(100vh-80px)] overflow-y-scroll">
      <div className="mx-auto max-w-3xl">
        <p className="text-5xl font-bold">{article.title}</p>
        <p className="text-sm text-gray-600 pl-3">Author: {article.author}</p>
        <p className="text-sm text-gray-600 pl-3">Updated: {article.date}</p>
        <p className="text-md text-gray-600 italic">keywords:&nbsp;
          {article.meta.replace(' ', '').split(',').map(link => (<span key={link}><Link href={'/wiki/keyword?item=' + link}>{link}</Link>&nbsp;&nbsp;</span>))}
        </p>
        <div className="markdown | py-4 text-lg" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        <p className="text-center italic text-gray-500 p-12">Information on this page is proprietary and confidential for internal Forager Project use only.</p>
      </div>
    </div>
  )
}
