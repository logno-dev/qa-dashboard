import { getSortedArticleData } from "../../../lib/articles"
import Layout from '../../../components/layout'
import WikiWrapper from "../../../components/wiki/wikiWrapper"
import Nav from "../../../components/wiki/nav"
import Link from "next/link"
import { useEffect, useState } from "react"
import InfoWidget from "../../../components/infoWidget"
import SampleWidget from "../../../components/widgets/sampleWidget"
import { useRouter } from "next/router"

export async function getStaticProps() {
  const allArticleData = getSortedArticleData()
  return {
    props: {
      allArticleData,
    }
  }
}


export default function Wiki({ allArticleData }) {

  const route = useRouter()
  const [query, setQuery] = useState("")
  const [filteredArticles, setFilteredArticles] = useState([])

  useEffect(() => {
    setQuery(String(route.query.item))
  }, [route.query.item])

  useEffect(() => {
    setFilteredArticles(allArticleData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.meta.toLowerCase().replace(',', '').replace(' ', '').includes(query.toLowerCase())))
  }, [query])



  return (
    <Layout>
      <WikiWrapper>
        <Nav articles={allArticleData} />
        <div className="flex-grow p-4 body-wrapper overflow-y-scroll flex justify-center">
          <div className="mx-auto max-w-3xl flex flex-col items-center">
            <h1>Articles related to:</h1>
            <h2 className="italic">{query}</h2>
            <ul>
              {filteredArticles.length === 0 ? (
                <li>No matching articles</li>
              )
                :
                (
                  <>
                    {filteredArticles.map((article) => (
                      <li key={article.id}>
                        <Link href={'/wiki/articles/' + article.id} className="text-lg font-semibold text-gray-600 no-underline hover:text-gray-800 hover:font-bold ml-1">{article.title}</Link>
                      </li>
                    ))}
                  </>
                )}
            </ul>
          </div>
        </div>
        <InfoWidget>
          <SampleWidget />
        </InfoWidget>
      </WikiWrapper>
    </Layout>
  )
}
