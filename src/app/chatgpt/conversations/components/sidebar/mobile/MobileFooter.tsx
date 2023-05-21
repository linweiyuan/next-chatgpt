'use client'

import Logout from '@/app/chatgpt/conversations/components/Logout'
import MobileItem from '@/app/chatgpt/conversations/components/sidebar/mobile/MobileItem'
import useConversation from '@/app/hooks/useConversation'
import useRoutes from '@/app/hooks/useRoutes'

const MobileFooter = () => {
  const routes = useRoutes()
  const {isConversationOpened} = useConversation()

  if (isConversationOpened) {
    return null
  }

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

      <Logout/>
    </div>
  )
}

export default MobileFooter
