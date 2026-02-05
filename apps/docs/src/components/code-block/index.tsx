import { Tabs } from '@repo/ui/components2/tabs'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  preview: React.ReactElement
  code: string
}

export function CodeBlock({ preview, code }: Props) {
  return (
    <Tabs defaultValue="preview" variant="underlined">
      <Tabs.List>
        <Tabs.Tab value="preview">Preview</Tabs.Tab>
        <Tabs.Tab value="code">Code</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="preview">
        <div className="border-base-200 not-prose overflow-x-auto rounded-lg border p-4">
          {preview}
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="code">
        <SyntaxHighlighter
          language="tsx"
          customStyle={{
            margin: 0,
          }}
          style={style}
        >
          {code}
        </SyntaxHighlighter>
      </Tabs.Panel>
    </Tabs>
  )
}
