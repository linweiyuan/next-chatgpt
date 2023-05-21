'use client'

import React from 'react'
import {useSession} from 'next-auth/react'

import Loading from '@/app/chatgpt/conversations/components/Loading'
import MobileFooter from '@/app/chatgpt/conversations/components/sidebar/mobile/MobileFooter'
import DesktopSidebar from '@/app/chatgpt/conversations/components/sidebar/pc/DesktopSidebar'

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar = (
  {
    children,
  }: SidebarProps
) => {
  const {data, status} = useSession()

  if (status === 'loading') {
    return <Loading/>
  }

  return (
    <div className="h-full">
      <DesktopSidebar user={data?.user!}/>

      <MobileFooter/>

      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  )
}

export default Sidebar
