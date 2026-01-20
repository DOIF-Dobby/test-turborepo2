import { Select, SelectItem } from '@repo/ui/components/select'

export default function Clearable() {
  return (
    <div className="gap-sw-2xs flex">
      <Select
        label="Clearable"
        isClearable
        classNames={{
          container: 'w-1/2',
        }}
      >
        <SelectItem value="value1">value1</SelectItem>
        <SelectItem value="value2">value2</SelectItem>
        <SelectItem value="value3">value3</SelectItem>
      </Select>

      <Select
        label="Clearable False"
        isClearable={false}
        classNames={{
          container: 'w-1/2',
        }}
      >
        <SelectItem value="value1">value1</SelectItem>
        <SelectItem value="value2">value2</SelectItem>
        <SelectItem value="value3">value3</SelectItem>
      </Select>
    </div>
  )
}
