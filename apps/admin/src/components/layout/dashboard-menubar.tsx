'use client'

import { Menu } from '@repo/ui/components/menu'
import { Menubar } from '@repo/ui/components/menubar'
import { swTwVariants } from '@repo/ui/utils/tw-variants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type DashboardMenuItem = {
  type: 'item'
  name: string
  href: string
  items?: never
}

type DashboardSubMenu = {
  type: 'menu'
  name: string
  items: DashboardMenuProps[]
  href?: never
}

type DashboardMenuProps = DashboardMenuItem | DashboardSubMenu

const menus: DashboardMenuProps[] = [
  {
    type: 'item',
    href: '/algorithms',
    name: '알고리즘 관리',
  },
  {
    type: 'menu',
    name: '자동 거래',
    items: [
      {
        type: 'item',
        href: '/trading/settings',
        name: '자동 거래 관리',
      },
      {
        type: 'item',
        href: '/trading/history',
        name: '거래 내역',
      },
    ],
  },
  {
    type: 'item',
    href: '/trade-limit',
    name: '거래 제한',
  },
  {
    type: 'item',
    href: '/futures',
    name: '해외선물 관리',
  },
]

export function DashboardMenubar() {
  return (
    <Menubar className="flex items-center gap-sw-xl">
      {menus.map((menu) => (
        <DashboardMenu key={menu.name} {...menu} />
      ))}
    </Menubar>
  )
}

const dashboardMenuVariants = swTwVariants({
  slots: {
    item: [
      'text-base-600',
      'font-medium',
      'cursor-pointer',
      'hover:text-base-700',
    ],
  },
  variants: {
    isSelected: {
      true: {
        item: ['text-base-900', 'font-semibold'],
      },
    },
  },
})

function DashboardMenu(props: DashboardMenuProps) {
  const { type, href, name, items } = props
  const pathname = usePathname()

  const slots = dashboardMenuVariants({})

  if (type === 'menu') {
    const isSelected = items.some(
      (item) =>
        item.href &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`)),
    )
    return (
      <Menu>
        <Menu.Trigger className={slots.item({ isSelected })}>
          {name}
        </Menu.Trigger>
        <Menu.Content disableAnimation showArrow={false}>
          {items.map((item) => {
            if (item.type === 'item') {
              return (
                <Menu.Item key={item.href}>
                  <Link href={item.href}>{item.name}</Link>
                </Menu.Item>
              )
            }

            return (
              <Menu.Sub key={item.name}>
                <DashboardMenu {...item} />
              </Menu.Sub>
            )
          })}
        </Menu.Content>
      </Menu>
    )
  }

  return (
    <Link
      href={href}
      className={slots.item({
        isSelected: pathname === href || pathname.startsWith(`${href}/`),
      })}
    >
      {name}
    </Link>
  )
}
