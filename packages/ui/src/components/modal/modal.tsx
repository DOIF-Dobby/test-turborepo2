import { Dialog as DialogPrimitive, VisuallyHidden } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Frame } from '../frame'
import { Heading2, Paragraph2 } from '../typography'
import { DefaultModalCloseButton } from './default-modal-close-button'
import { modalVariants, type ModalSlots, type ModalVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof DialogPrimitive.Root>,
  keyof ModalVariants
> &
  ModalVariants

export interface ModalProps extends Props {
  classNames?: SlotsToClasses<ModalSlots>
  title?: React.ReactNode
  description?: React.ReactNode
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  showCloseButton?: boolean
  closeButton?: React.ReactNode
  onEscapeKeyDown?: DialogPrimitive.DialogContentProps['onEscapeKeyDown']
  onPointerDownOutside?: DialogPrimitive.DialogContentProps['onPointerDownOutside']
}

export function Modal(props: ModalProps) {
  const {
    children,
    size,
    classNames,
    title,
    description,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    showCloseButton = true,
    closeButton = <DefaultModalCloseButton />,
    onEscapeKeyDown,
    onPointerDownOutside,
    ...otherProps
  } = props

  const slots = modalVariants({ size })

  return (
    <DialogPrimitive.Root {...otherProps} modal>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={swClsx(slots.overlay({ className: classNames?.overlay }))}
        />
        <DialogPrimitive.Content
          onEscapeKeyDown={(event) => {
            onEscapeKeyDown?.(event)
            if (closeOnEscape === false) {
              event.preventDefault()
            }
          }}
          onPointerDownOutside={(event) => {
            onPointerDownOutside?.(event)
            if (closeOnOutsideClick === false) {
              event.preventDefault()
            }
          }}
          className={swClsx(slots.content({ className: classNames?.content }))}
        >
          {showCloseButton && (
            <DialogPrimitive.Close
              asChild
              className={swClsx(
                slots.closeButton({
                  className: classNames?.closeButton,
                }),
              )}
            >
              {closeButton}
            </DialogPrimitive.Close>
          )}
          <ModalHeader title={title} description={description} />
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function ModalHeader({
  title,
  description,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
}) {
  const hasContent = title || description

  if (!hasContent) {
    return (
      <>
        <VisuallyHidden.Root>
          <DialogPrimitive.Title />
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogPrimitive.Description />
        </VisuallyHidden.Root>
      </>
    )
  }

  return (
    <Frame>
      {title ? (
        <DialogPrimitive.Title asChild>
          {typeof title === 'string' ? (
            <Heading2 className="text-base-900">{title}</Heading2>
          ) : (
            title
          )}
        </DialogPrimitive.Title>
      ) : (
        <VisuallyHidden.Root>
          <DialogPrimitive.Title />
        </VisuallyHidden.Root>
      )}

      {description ? (
        <DialogPrimitive.Description asChild>
          {typeof description === 'string' ? (
            <Paragraph2>{description}</Paragraph2>
          ) : (
            description
          )}
        </DialogPrimitive.Description>
      ) : (
        <VisuallyHidden.Root>
          <DialogPrimitive.Description />
        </VisuallyHidden.Root>
      )}
    </Frame>
  )
}
