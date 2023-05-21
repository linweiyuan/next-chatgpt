'use client'

import React, {useCallback, useEffect, useState} from 'react'

import ConversationDetailBody from '@/app/chatgpt/conversations/[conversationId]/components/ConversationDetailBody'
import ConversationDetailHeader from '@/app/chatgpt/conversations/[conversationId]/components/ConversationDetailHeader'
import ConversationDetailSubmitForm
  from '@/app/chatgpt/conversations/[conversationId]/components/ConversationDetailSubmitForm'
import {ConversationMapping, Message} from '@/app/chatgpt/conversations/components/conversation/ConversationList'
import Loading from '@/app/chatgpt/conversations/components/Loading'
import useConversation from '@/app/hooks/useConversation'
import {useAxios} from '@/app/utils/axios'
import hljs from '@/app/utils/highlight'

const ConversationIdPage = () => {
  const {conversationId} = useConversation()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentNode, setCurrentNode] = useState('')

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

  const addMessage = (message: Message) => {
    setMessages((oldMessages) => [...oldMessages, message])
  }

  const updateLastMessage = (message: Message) => {
    setMessages((oldMessages) => {
      const lastMessage = oldMessages[oldMessages.length - 1]
      lastMessage.content.parts[0] = message.content.parts[0]
      lastMessage.create_time = message.create_time

      return [...oldMessages]
    })
  }

  useEffect(() => {
    if (!isLoading) {
      hljs.highlightAll()
    }
  }, [isLoading])

  const [{data, loading, error}] = useAxios(
    `/chatgpt/conversation/${conversationId}`
  )

  useEffect(() => {
    if (!loading && data) {
      const mapping: Record<string, ConversationMapping> = data.mapping
      const currentNode: string = data.current_node
      setCurrentNode(currentNode)
      handleConversationDetail(mapping, currentNode)
      setIsLoading(false)
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
        <ConversationDetailSubmitForm
          currentNode={currentNode}
          setCurrentNode={setCurrentNode}
          addMessage={addMessage}
          updateLastMessage={updateLastMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  )
}

export default ConversationIdPage
