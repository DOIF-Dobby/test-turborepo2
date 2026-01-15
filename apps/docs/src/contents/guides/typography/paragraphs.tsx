import {
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
  Paragraph5,
  Paragraph6,
} from '@repo/ui/components/typography'

const headingMap = {
  P1: (content: React.ReactNode) => <Paragraph1>{content}</Paragraph1>,
  P2: (content: React.ReactNode) => <Paragraph2>{content}</Paragraph2>,
  P3: (content: React.ReactNode) => <Paragraph3>{content}</Paragraph3>,
  P4: (content: React.ReactNode) => <Paragraph4>{content}</Paragraph4>,
  P5: (content: React.ReactNode) => <Paragraph5>{content}</Paragraph5>,
  P6: (content: React.ReactNode) => <Paragraph6>{content}</Paragraph6>,
} satisfies Record<string, (content: React.ReactNode) => React.ReactNode>

export function Paragraphs() {
  const content = '글로벌 금융의 혜택을 모두가 누릴 수 있는 세상을 만들자'
  return (
    <div className="not-prose flex flex-col gap-6">
      {Object.entries(headingMap).map(([key, value]) => (
        <div key={key}>{value(`${key}, ${content}`)}</div>
      ))}
    </div>
  )
}
