import {
  Heading0,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from '@repo/ui/components/typography'

const headingMap = {
  H0: (content: React.ReactNode) => <Heading0>{content}</Heading0>,
  H1: (content: React.ReactNode) => <Heading1>{content}</Heading1>,
  H2: (content: React.ReactNode) => <Heading2>{content}</Heading2>,
  H3: (content: React.ReactNode) => <Heading3>{content}</Heading3>,
  H4: (content: React.ReactNode) => <Heading4>{content}</Heading4>,
  H5: (content: React.ReactNode) => <Heading5>{content}</Heading5>,
  H6: (content: React.ReactNode) => <Heading6>{content}</Heading6>,
} satisfies Record<string, (content: React.ReactNode) => React.ReactNode>

export function Headings() {
  const content = '가장 쉽고 투명한 환테크 플랫폼'
  return (
    <div className="not-prose flex flex-col gap-6">
      {Object.entries(headingMap).map(([key, value]) => (
        <div key={key}>{value(`${key}, ${content}`)}</div>
      ))}
    </div>
  )
}
