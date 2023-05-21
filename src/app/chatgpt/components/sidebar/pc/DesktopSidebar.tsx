'use client'

import {User} from 'next-auth'

import Avatar from '@/app/chatgpt/components/Avatar'
import Logout from '@/app/chatgpt/components/Logout'
import DesktopItem from '@/app/chatgpt/components/sidebar/pc/DesktopItem'
import useRoutes from '@/app/hooks/useRoutes'


interface DesktopSidebarProps {
  user: User
}

const DesktopSidebar = (
  {
    user,
  }: DesktopSidebarProps
) => {
  const routes = useRoutes()

  return (
    <>
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.id}
                href={item.href}
                icon={item.icon}
                active={item.active}
              />
            ))}

            <li><Logout/></li>
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div className="cursor-pointer hover:opcity-50 transition">
            <Avatar imageUrl={user.image!}/>
          </div>
        </nav>
      </div>
    </>
  )
}

export default DesktopSidebar
