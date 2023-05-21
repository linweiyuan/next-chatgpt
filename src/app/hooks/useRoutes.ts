'use client'

import {useMemo} from 'react'
import {usePathname} from 'next/navigation'
import {HiChat} from 'react-icons/hi'

import useConversation from '@/app/hooks/useConversation'

const useRoutes = () => {
  const pathname = usePathname()
  const {conversationId} = useConversation()

  return useMemo(
    () => [
      {
        id: 'chatgpt-conversations',
        icon: HiChat,
        href: '/chatgpt/conversations',
        active: pathname === '/chatgpt/conversations' || !!conversationId,
      },
    ],
    [pathname, conversationId]
  )
}

export default useRoutes
