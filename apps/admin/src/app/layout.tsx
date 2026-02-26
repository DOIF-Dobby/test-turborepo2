import '@/styles/app.css'
import { swClsx } from '@repo/ui/utils/clsx'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

const pretendard = localFont({
  src: '../../../../assets/fonts/PretendardVariable.woff2',
  display: 'auto',
  weight: '45 920',
  variable: '--font-pretendard',
  preload: true,
})

export const metadata: Metadata = {
  title: 'STS Admin',
  description: 'STS Admin',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${pretendard.variable}`}
    >
      <body
        className={swClsx([
          pretendard.className,
          'text-base-content',
          'bg-background',
        ])}
      >
        {children}
      </body>
    </html>
  )
}
