import { Flex } from '@repo/ui/components/flex'

const items = ['안녕하세요.', '반갑습니다.', '또 만나요.']

export default function Default() {
  return (
    <Flex>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Flex>
  )
}
