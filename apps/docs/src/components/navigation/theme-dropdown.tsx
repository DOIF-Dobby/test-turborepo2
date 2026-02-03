'use client'

import { type ThemeMode, useThemeStore } from '@/theme/theme-store'
import { Button } from '@repo/ui/components/button'
import {
  Dropdown,
  DropdownContent,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
} from '@repo/ui/components/dropdown'
import { capitalize } from '@repo/utils/string'
import { Laptop, Moon, Sun } from 'lucide-react'

export function ThemeDropdown() {
  const { mode, setTheme } = useThemeStore()

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
