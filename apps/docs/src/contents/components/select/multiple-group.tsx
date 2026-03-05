'use client'

import { Select } from '@repo/ui/components/select'
import { groupBy } from '@repo/utils/array'
import { capitalize } from '@repo/utils/string'
import { useState } from 'react'

const items = [
  { label: '사과', value: 'apple', group: 'fruits' },
  { label: '바나나', value: 'banana', group: 'fruits' },
  { label: '오렌지', value: 'orange', group: 'citrus' },
  { label: '레몬', value: 'lemon', group: 'citrus' },
]

const grouped = groupBy(items, (item) => item.group)

export default function MultipleGroup() {
  const [values, setValues] = useState<string[]>([])

  return (
    <div>
      <Select
        items={items}
        multiple
        value={values}
        onValueChange={setValues}
        renderList={() => (
          <>
            {Object.entries(grouped).map(([group, groupItems]) => (
              <Select.Group key={group} label={capitalize(group)}>
                {groupItems?.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
          </>
        )}
      />

      <p>입력한 값: {values.join(', ')}</p>
    </div>
  )
}
