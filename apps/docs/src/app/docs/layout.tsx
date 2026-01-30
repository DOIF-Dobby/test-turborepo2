import { DocsHeader } from '@/components/navigation/docs-header'
import { DocsMenus } from '@/components/navigation/docs-menus'
import { DocsProviders, DocsUIProviderWrapper } from '@/providers/docs-provider'
import { gatherContentsSlugs } from '@/utils/gather-slugs'

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contentPathArrays = await gatherContentsSlugs()

  return (
    <DocsProviders>
      <DocsHeader />
      <div className="mx-auto flex max-w-400">
        <DocsMenus contentPathArrays={contentPathArrays} />
        <div className="w-full">
          <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
            <DocsUIProviderWrapper>{children}</DocsUIProviderWrapper>
          </div>
        </div>
      </div>
    </DocsProviders>
  )
}
