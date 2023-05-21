'use client'

import clsx from 'clsx'

import {Conversation} from '@/app/chatgpt/conversations/components/conversation/ConversationList'

interface ConversationBoxProps {
  data: Conversation
}

const ConversationBox = (
  {
    data,
  }: ConversationBoxProps
) => {
  return (
    <div className={clsx(
      'w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3',
    )}
    >
      {data.title}
    </div>
  )
}

export default ConversationBox
