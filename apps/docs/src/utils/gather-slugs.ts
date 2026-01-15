import fs from 'fs/promises'
import { join } from 'path'

export async function gatherContentsSlugs(
  dir: string = join(process.cwd(), 'src', 'contents'),
  base: string[] = [],
) {
  const result: string[][] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const newBase = [...base, entry.name]
    const subdir = join(dir, entry.name)

    // 이 폴더에 index.mdx가 있으면 페이지로 인정
    try {
      await fs.access(join(subdir, 'index.mdx'))
      result.push(newBase)
    } catch {
      // index.mdx 없으면 무시
    }

    // 하위 폴더도 계속 탐색
    const deeper = await gatherContentsSlugs(subdir, newBase)
    result.push(...deeper)
  }

  return result
}
