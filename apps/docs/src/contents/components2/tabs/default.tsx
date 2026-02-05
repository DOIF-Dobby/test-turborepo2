'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs'
import { useState } from 'react'

export default function Default() {
  const [tab, setTab] = useState('tab1')

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">탭1</TabsContent>
      <TabsContent value="tab2">탭2</TabsContent>
      <TabsContent value="tab3">탭3</TabsContent>
    </Tabs>
  )
}
