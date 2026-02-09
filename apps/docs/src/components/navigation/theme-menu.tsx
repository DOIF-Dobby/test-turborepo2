'use client'

import { useMounted } from '@repo/hooks/use-mounted'
import { Button } from '@repo/ui/components/button'
import { Menu } from '@repo/ui/components/menu'
import { Skeleton } from '@repo/ui/components/skeleton'
import { Paragraph1 } from '@repo/ui/components/typography'
import { useTheme, type ThemeMode } from '@repo/ui/theme'
import { capitalize } from '@repo/utils/string'
import { Laptop, Moon, Sun } from 'lucide-react'

export function ThemeMenu() {
  const { mode, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return (
      <div className="h-sw-btn-sm flex w-28 items-center justify-center gap-2">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="h-8 w-12 rounded-md" />
      </div>
    )
  }

  return (
    <Menu>
      <Menu.Trigger>
        <Button size="xs" variant="light">
          {mode === 'light' && <Sun className="size-4" />}
          {mode === 'dark' && <Moon className="size-4" />}
          {mode === 'system' && <Laptop className="size-4" />}
          {capitalize(mode)}
        </Button>
      </Menu.Trigger>

      <Menu.Content align="end" showArrow={false}>
        <Menu.RadioGroup
          value={mode}
          onValueChange={(val) => setTheme(val as ThemeMode)}
        >
          <Menu.RadioItem value="light">
            <Sun className="mr-2 size-4" />
            <Paragraph1>Light</Paragraph1>
          </Menu.RadioItem>
          <Menu.RadioItem value="dark">
            <Moon className="mr-2 size-4" />
            <Paragraph1>Dark</Paragraph1>
          </Menu.RadioItem>
          <Menu.RadioItem value="system">
            <Laptop className="mr-2 size-4" />
            <Paragraph1>System</Paragraph1>
          </Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  )
}
