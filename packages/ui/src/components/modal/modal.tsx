import { motion, type HTMLMotionProps } from 'motion/react'
import { Dialog as DialogPrimitive, VisuallyHidden } from 'radix-ui'
import { useUIContext } from '../../providers'
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
  disableAnimation?: boolean
  motionProps?: HTMLMotionProps<'section'>
  onEscapeKeyDown?: DialogPrimitive.DialogContentProps['onEscapeKeyDown']
  onPointerDownOutside?: DialogPrimitive.DialogContentProps['onPointerDownOutside']
}

// ✨ 애니메이션 상수는 컴포넌트 외부로 분리하여 가독성을 높입니다.
const DROP_IN_ANIMATION = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
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
    disableAnimation = false,
    closeButton = <DefaultModalCloseButton />,
    motionProps,
    onEscapeKeyDown,
    onPointerDownOutside,
    ...otherProps
  } = props

  const { disableAnimation: globalDisableAnimation } = useUIContext()
  const shouldDisableAnimation = disableAnimation || globalDisableAnimation

  const finalMotionProps: HTMLMotionProps<'section'> = {
    ...DROP_IN_ANIMATION,
    ...(shouldDisableAnimation ? { transition: { duration: 0 } } : {}),
    ...motionProps,
  }

  const slots = modalVariants({ size })

  return (
    <DialogPrimitive.Root {...otherProps} modal>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={swClsx(slots.overlay({ className: classNames?.overlay }))}
        />
        <DialogPrimitive.Content
          asChild
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
          <motion.section {...finalMotionProps}>
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
          </motion.section>
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
