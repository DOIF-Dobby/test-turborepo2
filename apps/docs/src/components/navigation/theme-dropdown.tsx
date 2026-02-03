'use client'

import { useMounted } from '@repo/hooks/use-mounted'
import { Button } from '@repo/ui/components/button'
import {
  Dropdown,
  DropdownContent,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
} from '@repo/ui/components/dropdown'
import { Skeleton } from '@repo/ui/components/skeleton'
import { useTheme, type ThemeMode } from '@repo/ui/theme'
import { capitalize } from '@repo/utils/string'
import { Laptop, Moon, Sun } from 'lucide-react'

export function ThemeDropdown() {
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
    <Dropdown>
      <DropdownTrigger>
        <Button size="sm" variant="light">
          {mode === 'light' && <Sun className="size-4" />}
          {mode === 'dark' && <Moon className="size-4" />}
          {mode === 'system' && <Laptop className="size-4" />}
          {capitalize(mode)}
        </Button>
      </DropdownTrigger>

      <DropdownContent align="end">
        <DropdownRadioGroup
          value={mode}
          onValueChange={(val) => setTheme(val as ThemeMode)}
        >
          <DropdownRadioItem value="light">
            <Sun className="mr-2 size-4" /> Light
          </DropdownRadioItem>
          <DropdownRadioItem value="dark">
            <Moon className="mr-2 size-4" /> Dark
          </DropdownRadioItem>
          <DropdownRadioItem value="system">
            <Laptop className="mr-2 size-4" /> System
          </DropdownRadioItem>
        </DropdownRadioGroup>
      </DropdownContent>
    </Dropdown>
  )
}
