import { swClsx } from '@repo/ui/utils/clsx'

interface ColorBoxProps {
  children: React.ReactNode
  className: string
}

function ColorBox({ children, className }: ColorBoxProps) {
  return (
    <div>
      <div
        className={swClsx(
          'flex size-32 items-center justify-center rounded-lg p-6',
          className,
        )}
      ></div>
      <div className="text-base-content">{children}</div>
    </div>
  )
}

export function Cta1() {
  return (
    <div className="flex flex-wrap gap-4">
      <ColorBox className="bg-cta1">Default</ColorBox>
      <ColorBox className="bg-cta1-hover">Hover</ColorBox>
      <ColorBox className="bg-cta1-pressed">Pressed</ColorBox>
      <ColorBox className="bg-cta1-disabled">Disabled</ColorBox>
      <ColorBox className="bg-cta1-secondary-hover">Secondary Hover</ColorBox>
      <ColorBox className="bg-cta1-secondary-pressed">
        Secondary Pressed
      </ColorBox>
    </div>
  )
}

export function Cta2() {
  return (
    <div className="flex flex-wrap gap-4">
      <ColorBox className="bg-cta2">Default</ColorBox>
      <ColorBox className="bg-cta2-hover">Hover</ColorBox>
      <ColorBox className="bg-cta2-pressed">Pressed</ColorBox>
      <ColorBox className="bg-cta2-disabled">Disabled</ColorBox>
      <ColorBox className="bg-cta2-secondary-hover">Secondary Hover</ColorBox>
      <ColorBox className="bg-cta2-secondary-pressed">
        Secondary Pressed
      </ColorBox>
    </div>
  )
}

export function Desctructive() {
  return (
    <div className="flex flex-wrap gap-4">
      <ColorBox className="bg-destructive">Default</ColorBox>
      <ColorBox className="bg-destructive-hover">Hover</ColorBox>
      <ColorBox className="bg-destructive-pressed">Pressed</ColorBox>
      <ColorBox className="bg-destructive-disabled">Disabled</ColorBox>
      <ColorBox className="bg-destructive-secondary-hover">
        Secondary Hover
      </ColorBox>
      <ColorBox className="bg-destructive-secondary-pressed">
        Secondary Pressed
      </ColorBox>
    </div>
  )
}

export function Base() {
  return (
    <div className="flex flex-wrap gap-4">
      <ColorBox className="bg-background">Background</ColorBox>
      <ColorBox className="bg-base-0">Base 0</ColorBox>
      <ColorBox className="bg-base-100">Base 100</ColorBox>
      <ColorBox className="bg-base-200">Base 200</ColorBox>
      <ColorBox className="bg-base-300">Base 300</ColorBox>
      <ColorBox className="bg-base-400">Base 400</ColorBox>
      <ColorBox className="bg-base-500">Base 500</ColorBox>
      <ColorBox className="bg-base-600">Base 600</ColorBox>
      <ColorBox className="bg-base-700">Base 700</ColorBox>
      <ColorBox className="bg-base-800">Base 800</ColorBox>
      <ColorBox className="bg-base-900">Base 900</ColorBox>
    </div>
  )
}

export function Status() {
  return (
    <div className="flex flex-wrap gap-4">
      <ColorBox className="bg-status-good">Good</ColorBox>
      <ColorBox className="bg-status-fair">Fair</ColorBox>
      <ColorBox className="bg-status-poor">Poor</ColorBox>
    </div>
  )
}
