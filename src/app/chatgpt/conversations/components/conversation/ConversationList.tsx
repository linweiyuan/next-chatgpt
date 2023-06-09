'use client'

import React from 'react'
import clsx from 'clsx'
import {toast} from 'react-hot-toast'
import {MdAdd} from 'react-icons/md'

import ConversationListItem from '@/app/chatgpt/conversations/components/conversation/ConversationListItem'
import Loading from '@/app/chatgpt/conversations/components/Loading'
import useConversation from '@/app/hooks/useConversation'
import {useAxios} from '@/app/utils/axios'

export interface Conversation {
  id: string
  title: string
  create_time: number
  update_time: string
  mapping: Mapping
  current_node: string
}

export interface Mapping {
  [key: string]: ConversationMapping
}

export interface ConversationMapping {
  id?: string
  message: Message
  parent?: string
  children?: string[]
}

export interface Message {
  id: string
  author: Author
  create_time: number
  content: Content
}

export interface Author {
  role: string
}

export interface Content {
  parts: string[]
}

const ConversationList = () => {
  const {conversationId, isConversationOpened} = useConversation()

  const [{data, loading, error}] = useAxios('/chatgpt/backend-api/conversations?limit=100')
  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const createNewConversation = () => {
    toast.error('Create new conversation is currently not supported.')
  }

  return (
    <aside className={clsx(
      'fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',
      isConversationOpened ? 'hidden' : 'block w-full left-0'
    )}
    >
      <div className='px-5'>
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Conversations
          </div>
          <div
            className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            onClick={createNewConversation}
          >
            <MdAdd size={20}/>
          </div>
        </div>
        {data.items.map((item: Conversation) => (
          <ConversationListItem
            key={item.id}
            data={item}
            selected={item.id === conversationId}
          />
        ))}
      </div>
    </aside>
  )
}

export default ConversationList
