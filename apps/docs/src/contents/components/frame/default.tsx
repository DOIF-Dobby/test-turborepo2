import { Frame } from '@repo/ui/components/frame'

const items = ['안녕하세요.', '반갑습니다.', '또 만나요.']

export default function Default() {
  return (
    <Frame>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Frame>
  )
}
