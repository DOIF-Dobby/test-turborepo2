import { TextField } from '@repo/ui/components/text-field'
import { FuelIcon } from 'lucide-react'

export default function StartEndContent() {
  return (
    <div className="gap-sw-2xs flex">
      <TextField label="Start content" startContent={<FuelIcon />} />
      <TextField label="End content" endContent={<FuelIcon />} />
      <TextField
        label="End content clearable false"
        endContent={<FuelIcon />}
        isClearable={false}
      />
      <TextField
        label="Start and end content"
        startContent={<FuelIcon />}
        endContent={<FuelIcon />}
      />
    </div>
  )
}
