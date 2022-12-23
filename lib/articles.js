import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutoLinksHeadings from 'rehype-autolink-headings'

import { read } from 'to-vfile'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkFrontMatter from 'remark-frontmatter'



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

  const behaviors = ['prepend']

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontMatter, ['yaml'])
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutoLinksHeadings, behaviors)
    .process(await read(fullPath))
  const contentHtml = String(processedContent)


  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
