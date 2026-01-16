import { Flex } from '@repo/ui/components/flex'

const items = ['안녕하세요.', '반갑습니다.', '또 만나요.']

export default function Direction() {
  return (
    <div>
      <Flex direction="col">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Flex>

      <Flex direction="row">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Flex>
    </div>
  )
}
