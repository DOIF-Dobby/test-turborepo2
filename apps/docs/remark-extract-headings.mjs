import { valueToEstree } from 'estree-util-value-to-estree'
import { toString } from 'mdast-util-to-string'
import { define } from 'unist-util-mdx-define'
import { visit } from 'unist-util-visit'

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export default function remarkExtractHeadings() {
  return (tree, file) => {
    const headings = []

    visit(tree, 'heading', (node) => {
      if (node.depth < 2 || node.depth > 5) return

      const text = toString(node)
      const id = text
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/(^-|-$)/g, '')

      headings.push({ depth: node.depth, text, id })
    })

    // 1) file.data에 여전히 저장
    file.data.headings = headings

    // 2) headings 배열을 ESTree Expression으로 변환
    const headingsEstree = valueToEstree(headings)

    // 3) AST 최상단에 `export const headings = [...]` 삽입
    define(tree, file, {
      headings: headingsEstree,
    })
  }
}
