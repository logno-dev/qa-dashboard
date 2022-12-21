import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'


const articleDirectory = path.join(process.cwd(), 'articles')

export function getSortedArticleData() {

  const fileNames = fs.readdirSync(articleDirectory)
  const allArticleData = fileNames.map((fileName) => {

    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(articleDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data,
    }
  })

  return allArticleData.sort((a, b) => {
    const titleA = a.title.toUpperCase().replace(' ', '')
    const titleB = b.title.toUpperCase().replace(' ', '')
    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }

    return 0
  })

}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articleDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      }
    }
  })
}

export async function getArticleData(id) {
  const fullPath = path.join(articleDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()


  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
