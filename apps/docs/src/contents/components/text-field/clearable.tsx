import { TextField } from '@repo/ui/components/text-field'

export default function Clearable() {
  return (
    <div className="gap-sw-md flex">
      <TextField label="Clearable" isClearable />
      <TextField label="Clearable False" isClearable={false} />
    </div>
  )
}
