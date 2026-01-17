import type { DefaultThemeGroupIds } from 'tailwind-merge'

const textGroups = [
  'button-2xs',
  'button-xs',
  'button-sm',
  'button-md',
  'heading-0',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
  'paragraph-1',
  'paragraph-2',
  'paragraph-3',
  'paragraph-4',
  'paragraph-5',
  'paragraph-6',
]

const fontWeightGroups = [
  'heading-0',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
  'paragraph-1',
  'paragraph-2',
  'paragraph-3',
  'paragraph-4',
  'paragraph-5',
  'paragraph-6',
]

const leadingGroups = [
  'heading-0',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
  'paragraph-1',
  'paragraph-2',
  'paragraph-3',
  'paragraph-4',
  'paragraph-5',
  'paragraph-6',
]

const colorGroups = [
  'base-content',
  'cta1',
  'cta2',
  'destructive',
  'cta1-content',
  'cta2-content',
  'destructive-content',
  'status-good',
  'status-fair',
  'status-poor',
]

const radiusGroups = [
  'input-xs',
  'input-sm',
  'input-md',
  'card-sm',
  'card-md',
  'card-lg',
]

const spacingGroups = [
  'sw-4xs',
  'sw-3xs',
  'sw-2xs',
  'sw-xs',
  'sw-sm',
  'sw-ms',
  'sw-md',
  'sw-ml',
  'sw-lg',
  'sw-xl',
  'sw-2xl',
  'sw-3xl',
  'sw-4xl',
  'page-without-nav',
  'page-with-nav',
  'sw-btn-md',
  'sw-btn-sm',
  'sw-btn-xs',
  'sw-btn-2xs',
  'sw-btn-3xs',
]

export const swTheme: Partial<ThemeObject<DefaultThemeGroupIds>> = {
  color: colorGroups,
  spacing: spacingGroups,
  radius: radiusGroups,
  leading: leadingGroups,
  'font-weight': fontWeightGroups,
  text: textGroups,
}

type ThemeObject<ThemeGroupIds extends string> = Record<
  ThemeGroupIds,
  ClassGroup<ThemeGroupIds>
>
type ClassGroup<ThemeGroupIds extends string> =
  readonly ClassDefinition<ThemeGroupIds>[]
type ClassDefinition<ThemeGroupIds extends string> =
  | string
  | ClassValidator
  | ThemeGetter
  | ClassObject<ThemeGroupIds>
type ClassValidator = (classPart: string) => boolean
interface ThemeGetter {
  (theme: ThemeObject<AnyThemeGroupIds>): ClassGroup<AnyClassGroupIds>
  isThemeGetter: true
}
type ClassObject<ThemeGroupIds extends string> = Record<
  string,
  readonly ClassDefinition<ThemeGroupIds>[]
>
type AnyClassGroupIds = string
type AnyThemeGroupIds = string
