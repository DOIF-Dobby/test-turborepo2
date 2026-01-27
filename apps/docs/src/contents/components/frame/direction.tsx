import { Frame } from '@repo/ui/components/frame'

const items = ['안녕하세요.', '반갑습니다.', '또 만나요.']

export default function Direction() {
  return (
    <div>
      <Frame direction="col">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Frame>

      <Frame direction="row">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Frame>
    </div>
  )
}
