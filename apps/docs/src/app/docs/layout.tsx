import { DocsHeader } from '@/components/navigation/docs-header'
import { DocsMenus } from '@/components/navigation/docs-menus'
import { gatherContentsSlugs } from '@/utils/gather-slugs'

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contentPathArrays = await gatherContentsSlugs()

  return (
    <>
      <div className="flex">
        <DocsMenus contentPathArrays={contentPathArrays} />
        <div className="w-full">
          <DocsHeader />
          <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
