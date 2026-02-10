'use client'

import { Combobox } from '@repo/ui/components/combobox'

type Fruit = {
  label: string
  value: string
}

const items: Fruit[] = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '오렌지', value: 'orange' },
  { label: '파인애플', value: 'pineapple' },
  { label: '포도', value: 'grape' },
  { label: '망고', value: 'mango' },
  { label: '딸기', value: 'strawberry' },
  { label: '블루베리', value: 'blueberry' },
  { label: '라즈베리', value: 'raspberry' },
  { label: '블랙베리', value: 'blackberry' },
  { label: '체리', value: 'cherry' },
  { label: '복숭아', value: 'peach' },
  { label: '배', value: 'pear' },
  { label: '자두', value: 'plum' },
  { label: '키위', value: 'kiwi' },
  { label: '수박', value: 'watermelon' },
  { label: '칸탈루프', value: 'cantaloupe' },
  { label: '허니듀', value: 'honeydew' },
  { label: '파파야', value: 'papaya' },
  { label: '구아바', value: 'guava' },
  { label: '리치', value: 'lychee' },
  { label: '석류', value: 'pomegranate' },
  { label: '살구', value: 'apricot' },
  { label: '자몽', value: 'grapefruit' },
  { label: '패션프루트', value: 'passionfruit' },
]

export default function Default() {
  return (
    <Combobox
      items={items}
      label="과일"
      // multiple
      // defaultValue={['apple', 'banana']}
    />
  )
}
