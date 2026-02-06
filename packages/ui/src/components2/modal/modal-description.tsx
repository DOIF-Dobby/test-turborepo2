'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Paragraph2 } from '../../components/typography'
import { swClsx } from '../../utils/clsx'
import {
  modalDescriptionVariants,
  type ModalDescriptionVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof DialogPrimitive.Description>,
  keyof ModalDescriptionVariants
> &
  ModalDescriptionVariants

export interface ModalDescriptionProps extends Props {}

export function ModalDescription(props: ModalDescriptionProps) {
  const { children, render, ...otherProps } = props

  return (
    <DialogPrimitive.Description
      {...otherProps}
      suppressHydrationWarning
      render={
        render
          ? render
          : (props) => {
              const styles = modalDescriptionVariants({
                className: props.className,
              })
              return (
                <Paragraph2 {...props} className={swClsx(styles)}>
                  {children}
                </Paragraph2>
              )
            }
      }
    />
  )
}
