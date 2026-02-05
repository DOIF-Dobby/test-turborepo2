import { Tabs } from '@repo/ui/components2/tabs'

export default function Default() {
  return (
    <Tabs defaultValue="tab2">
      <Tabs.List>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="tab1">탭1</Tabs.Panel>
      <Tabs.Panel value="tab2">탭2</Tabs.Panel>
      <Tabs.Panel value="tab3">탭3</Tabs.Panel>
    </Tabs>
  )
}
