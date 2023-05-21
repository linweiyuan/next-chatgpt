'use client'

import React, {useCallback, useEffect, useState} from 'react'

import ConversationDetailBody from '@/app/chatgpt/conversations/[conversationId]/components/ConversationDetailBody'
import ConversationDetailHeader from '@/app/chatgpt/conversations/[conversationId]/components/ConversationDetailHeader'
import {ConversationMapping, Message} from '@/app/chatgpt/conversations/components/conversation/ConversationList'
import Loading from '@/app/chatgpt/conversations/components/Loading'
import useConversation from '@/app/hooks/useConversation'
import {useAxios} from '@/app/utils/axios'

const ConversationIdPage = () => {
  const {conversationId} = useConversation()
  const [messages, setMessages] = useState<Message[]>([])

  const handleConversationDetail = useCallback((mapping: Record<string, ConversationMapping>, id: string) => {
      const conversationMapping = mapping[id]
      const parentId = conversationMapping?.parent
      if (parentId) {
        handleConversationDetail(mapping, parentId)
      }

      const message = conversationMapping.message
      if (message && message.author?.role !== 'system') {
        setMessages((oldMessages) => [...oldMessages, message])
      }
    },
    []
  )

  const [{data, loading, error}] = useAxios(
    `/chatgpt/conversation/${conversationId}`
  )

  useEffect(() => {
    if (!loading && data) {
      const mapping: Record<string, ConversationMapping> = data.mapping
      const currentNode: string = data.current_node
      handleConversationDetail(mapping, currentNode)
    }
  }, [loading, data, handleConversationDetail])

  if (loading) {
    return (
      <div className="lg:pl-80">
        <Loading/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="lg:pl-80">
        {error.message}
      </div>
    )
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ConversationDetailHeader conversation={data}/>
        <ConversationDetailBody messages={messages}/>
      </div>
    </div>
  )
}

export default ConversationIdPage
