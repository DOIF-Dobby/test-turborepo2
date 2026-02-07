import { Tabs } from '@repo/ui/components/tabs'

const variants = ['solid', 'underlined'] as const

export default function Variants() {
  return (
    <div className="gap-sw-md flex">
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">탭1</Tabs.Panel>
          <Tabs.Panel value="tab2">탭2</Tabs.Panel>
          <Tabs.Panel value="tab3">탭3</Tabs.Panel>
        </Tabs>
      ))}
    </div>
  )
}
