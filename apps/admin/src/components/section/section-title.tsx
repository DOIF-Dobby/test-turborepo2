import { swClsx } from '@repo/ui/utils/clsx'

export function SectionTitle({
  children,
  className,
  ...props
}: React.ComponentProps<'h4'>) {
  return (
    <h4
      className={swClsx(
        'text-[18px] leading-[133%] font-normal text-base-600',
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  )
}
