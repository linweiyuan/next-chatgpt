'use client'

import {useCallback} from 'react'
import {useRouter} from 'next/navigation'
import clsx from 'clsx'

import {Conversation} from '@/app/chatgpt/conversations/components/conversation/ConversationList'

interface ConversationItemProps {
  data: Conversation
  selected?: boolean
}

const ConversationListItem = (
  {
    data,
    selected,
  }: ConversationItemProps
) => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push(`/chatgpt/conversations/${data.id}`)
  }, [data.id, router])

  return (
    <div className={clsx(
      'w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3',
      selected ? 'bg-neutral-100' : 'bg-white'
    )} onClick={handleClick}
    >
      {data.title}
    </div>
  )
}

export default ConversationListItem
