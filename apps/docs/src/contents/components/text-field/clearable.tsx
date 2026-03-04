import { TextField } from '@repo/ui/components/text-field'

export default function Clearable() {
  return (
    <div className="flex gap-sw-md">
      <TextField label="Clearable" isClearable />
      <TextField label="Clearable False" isClearable={false} />
    </div>
  )
}
