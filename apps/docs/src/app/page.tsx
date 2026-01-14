import Button from '@repo/ui/components/button'
import {
  Heading0,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
  Paragraph5,
  Paragraph6,
} from '@repo/ui/components/typography'

export default function Home() {
  return (
    <div>
      <h1>안녕하세요</h1>
      <Button className="bg-red-500">버튼</Button>
      <Heading0>Heading0</Heading0>
      <Heading1>Heading1</Heading1>
      <Heading2>Heading2</Heading2>
      <Heading3>Heading3</Heading3>
      <Heading4>Heading4</Heading4>
      <Heading5>Heading5</Heading5>
      <Heading6>Heading6</Heading6>

      <Paragraph1>Paragraph1</Paragraph1>
      <Paragraph2>Paragraph2</Paragraph2>
      <Paragraph3>Paragraph3</Paragraph3>
      <Paragraph4>Paragraph4</Paragraph4>
      <Paragraph5>Paragraph5</Paragraph5>
      <Paragraph6>Paragraph6</Paragraph6>
    </div>
  )
}
