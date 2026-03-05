import { Paragraph1, Paragraph2 } from '@repo/ui/components/typography'

interface SectionValueProps {
  title: React.ReactNode
  value: React.ReactNode
}

export function SectionItem({ title, value }: SectionValueProps) {
  return (
    <div className="flex items-center gap-sw-2xs">
      <Paragraph1>{title}</Paragraph1>
      <Paragraph2>{value}</Paragraph2>
    </div>
  )
}
