'use client'

import React from 'react'
import {useSession} from 'next-auth/react'

import Loading from '@/app/chatgpt/components/Loading'
import MobileFooter from '@/app/chatgpt/components/sidebar/MobileFooter'
import DesktopSidebar from '@/app/chatgpt/components/sidebar/pc/DesktopSidebar'

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
