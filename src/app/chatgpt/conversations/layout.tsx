import React from 'react'

import ConversationList from '@/app/chatgpt/conversations/components/conversation/ConversationList'
import Sidebar from '@/app/chatgpt/conversations/components/sidebar/pc/Sidebar'

interface ConversationsLayoutProps {
  children: React.ReactNode
}

const ConversationsLayout = (
  {
    children,
  }: ConversationsLayoutProps
) => {
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList/>
        {children}
      </div>
    </Sidebar>
  )
}

export default ConversationsLayout
