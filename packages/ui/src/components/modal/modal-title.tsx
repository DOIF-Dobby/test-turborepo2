'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Heading2 } from '../../components/typography'
import { swClsx } from '../../utils/clsx'
import { modalTitleVariants, type ModalTitleVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof DialogPrimitive.Title>,
  keyof ModalTitleVariants
> &
  ModalTitleVariants

export interface ModalTitleProps extends Props {}

export function ModalTitle(props: ModalTitleProps) {
  const { children, render, ...otherProps } = props

  return (
    <DialogPrimitive.Title
      {...otherProps}
      suppressHydrationWarning
      render={
        render
          ? render
          : (props) => {
              const styles = modalTitleVariants({ className: props.className })
              return (
                <Heading2 {...props} className={swClsx(styles)}>
                  {children}
                </Heading2>
              )
            }
      }
    />
  )
}
