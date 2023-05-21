'use client'

import React from 'react'
import clsx from 'clsx'

import ConversationBox from '@/app/chatgpt/conversations/components/conversation/ConversationBox'
import Loading from '@/app/chatgpt/conversations/components/Loading'
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
  const [{data, loading, error}] = useAxios('/chatgpt/conversations?limit=100')
  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <aside className={clsx(
      'fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',
    )}
    >
      <div className='px-5'>
        <div className='text-2xl font-semibold text-neutral-800 p-2'>
          Conversations
        </div>
        {data.items.map((item: Conversation) => (
          <ConversationBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  )
}

export default ConversationList
