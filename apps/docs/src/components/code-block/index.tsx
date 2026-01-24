'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  preview: React.ReactElement
  code: string
}

export function CodeBlock({ preview, code }: Props) {
  const [tab, setTab] = useState('preview')

  return (
    <Tabs value={tab} onValueChange={setTab} variant="underlined">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="border-base-200 not-prose overflow-x-auto rounded-lg border p-4">
          {preview}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <SyntaxHighlighter
          language="tsx"
          customStyle={{
            margin: 0,
          }}
          style={style}
        >
          {code}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  )
}
