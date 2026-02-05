import { Select } from '@repo/ui/components2/select'

export default function Clearable() {
  return (
    <div className="gap-sw-2xs flex">
      <Select
        isClearable
        classNames={{
          container: 'w-1/2',
        }}
      >
        <Select.Item value="value1">value1</Select.Item>
        <Select.Item value="value2">value2</Select.Item>
        <Select.Item value="value3">value3</Select.Item>
      </Select>

      <Select
        isClearable={false}
        classNames={{
          container: 'w-1/2',
        }}
      >
        <Select.Item value="value1">value1</Select.Item>
        <Select.Item value="value2">value2</Select.Item>
        <Select.Item value="value3">value3</Select.Item>
      </Select>
    </div>
  )
}
