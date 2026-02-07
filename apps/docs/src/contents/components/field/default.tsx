import { Field } from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'
import { swClsx } from '@repo/ui/utils/clsx'

export default function Default() {
  return (
    <Field>
      <Field.Label>Label</Field.Label>
      <Input
        className={swClsx(
          'h-10',
          'w-full',
          'rounded-md',
          'border',
          'border-gray-200',
          'pl-3.5',
          'text-base',
          'text-gray-900',
          'data-focused:outline-none',
          'data-focused:ring-2',
          'data-focused:ring-cta1-hover',
          'data-focused:ring-offset-2',
        )}
      />
      <Field.Error>Error</Field.Error>
      <Field.Description>Description</Field.Description>
    </Field>
  )
}
