'use client'

import {useEffect, useRef} from 'react'

import ConversationDetailItem from '@/app/chatgpt/conversations/[conversationId]/components/ConversationDetailItem'
import {Message} from '@/app/chatgpt/conversations/components/conversation/ConversationList'
import useConversation from '@/app/hooks/useConversation'

interface ConversationDetailBodyProps {
  messages: Message[]
}

const ConversationDetailBody = (
  {
    messages,
  }: ConversationDetailBodyProps
) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  const {conversationId} = useConversation()

  useEffect(() => {
    if (messages) {
      bottomRef?.current?.scrollIntoView()
    }
  }, [conversationId, messages])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((item) => (
        <ConversationDetailItem
          key={item.id}
          message={item}
        />
      ))}
      <div className="pt-24" ref={bottomRef}/>
    </div>
  )
}

export default ConversationDetailBody
