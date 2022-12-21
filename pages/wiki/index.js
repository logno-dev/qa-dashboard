import { getSortedArticleData } from "../../lib/articles"
import Layout from '../../components/layout'
import WikiWrapper from "../../components/wiki/wikiWrapper"
import Nav from "../../components/wiki/nav"
import Link from "next/link"
import { useEffect } from "react"

export async function getStaticProps() {
  const allArticleData = getSortedArticleData()
  return {
    props: {
      allArticleData,
    }
  }
}

export default function Wiki({ allArticleData }) {

  useEffect(() => {
    console.log(allArticleData)
  }, [])

  return (
    <Layout>
      <WikiWrapper>
        <Nav articles={allArticleData} />
        <div className="max-w-3xl p-4">
          <h1> Welcome to the QA wiki</h1><br />
          <h2>Here you should find answers to all your questions related to Forager QA</h2><br />
          <h3>This section is still under construction, but I will be adding articles as quickly as I can write them. Feel free to read through some of the articles listed to the left</h3>
        </div>
        <div className="min-w-sm max-w-md">
        </div>
      </WikiWrapper>
    </Layout>
  )
}
