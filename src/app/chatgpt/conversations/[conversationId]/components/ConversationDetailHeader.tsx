'use client'

import Link from 'next/link'
import {HiChevronLeft} from 'react-icons/hi2'

import {Conversation} from '@/app/chatgpt/conversations/components/conversation/ConversationList'

interface ConversationDetailHeaderProps {
  conversation: Conversation
}

const ConversationDetailHeader = (
  {
    conversation,
  }: ConversationDetailHeaderProps
) => {
  const iconSize = 32

  return (
    <div
      className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
              href={'/chatgpt/conversations'}
        >
          <HiChevronLeft size={iconSize}/>
        </Link>
        <div className="flex flex-col">
          <div>{conversation.title}</div>
        </div>
      </div>
    </div>
  )
}

export default ConversationDetailHeader
