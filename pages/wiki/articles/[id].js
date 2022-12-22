import { getAllArticleIds, getArticleData, getSortedArticleData } from "../../../lib/articles"
import Layout from "../../../components/layout"
import WikiWrapper from "../../../components/wiki/wikiWrapper"
import Nav from "../../../components/wiki/nav"
import ArticleView from "../../../components/wiki/articleView"
import InfoWidget from "../../../components/infoWidget"
import SampleWidget from "../../../components/widgets/sampleWidget"

export async function getStaticProps({ params }) {
  const articleData = await getArticleData(params.id)
  const allArticleData = getSortedArticleData()
  return {
    props: {
      articleData,
      allArticleData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllArticleIds()

  return {
    paths,
    fallback: false,
  }
}

export default function Article({ articleData, allArticleData }) {
  return (
    <Layout>
      <WikiWrapper>
        <Nav articles={allArticleData} />
        <ArticleView article={articleData} />
        <InfoWidget>
          <SampleWidget />
        </InfoWidget>     </WikiWrapper>
    </Layout>

  )
}
