import React from 'react'

import Sidebar from '@/app/chatgpt/components/sidebar/pc/Sidebar'

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
        {children}
      </div>
    </Sidebar>
  )
}

export default ConversationsLayout
