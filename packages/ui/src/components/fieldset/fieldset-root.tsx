import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset'

type Props = React.ComponentProps<typeof FieldsetPrimitive.Root>

export interface FieldsetRootProps extends Props {}

export function FieldsetRoot(props: FieldsetRootProps) {
  return <FieldsetPrimitive.Root suppressHydrationWarning {...props} />
}
