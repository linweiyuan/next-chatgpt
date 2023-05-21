'use client'

import MobileItem from '@/app/chatgpt/components/sidebar/MobileItem'
import useRoutes from '@/app/hooks/useRoutes'

const MobileFooter = () => {
  const routes = useRoutes()

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.id}
          href={item.href}
          icon={item.icon}
          active={item.active}
        />
      ))}
    </div>
  )
}

export default MobileFooter
