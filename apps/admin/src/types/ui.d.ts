import type { UseDisclosureReturn } from '@repo/hooks/use-disclosure'

type PropsWithDisclosure<P = unknown> = P & { disclosure: UseDisclosureReturn }
