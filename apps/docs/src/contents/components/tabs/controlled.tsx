'use client'

import { Tabs } from '@repo/ui/components/tabs'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('tab2')

  return (
    <div>
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1">탭1</Tabs.Panel>
        <Tabs.Panel value="tab2">탭2</Tabs.Panel>
        <Tabs.Panel value="tab3">탭3</Tabs.Panel>
      </Tabs>

      <div>선택된 탭: {value}</div>
    </div>
  )
}
