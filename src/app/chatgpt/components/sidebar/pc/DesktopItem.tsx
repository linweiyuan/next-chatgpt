'use client'

import Link from 'next/link'
import clsx from 'clsx'

interface DesktopItemProps {
  href: string
  icon: any
  active?: boolean
}

const DesktopItem = (
  {
    icon: Icon,
    href,
    active,
  }: DesktopItemProps
) => {
  // noinspection SpellCheckingInspection
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100',
          active && 'bg-gray-100 text-black'
        )}
      >
        <Icon className="h-6 w-6 shrink-0"/>
      </Link>
    </li>
  )
}

export default DesktopItem
