export default function ArticleView({ article }) {
  return (
    <div className="max-w-3xl p-4">
      <p className="text-5xl font-bold">{article.title}</p>
      <p className="pl-3">updated:{article.date}</p>
      <div className="markdown | py-4 text-lg" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </div>
  )
}
