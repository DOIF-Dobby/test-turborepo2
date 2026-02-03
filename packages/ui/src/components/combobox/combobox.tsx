'use client'

import { Command } from 'cmdk'
import type { ComboboxVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof Command>,
  keyof ComboboxVariants
> &
  ComboboxVariants

export interface ComboboxProps extends Props {}

export function Combobox(props: ComboboxProps) {
  const { ...otherProps } = props
  return (
    <Command {...otherProps}>
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Letters">
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item>
      </Command.List>
    </Command>
  )
}
