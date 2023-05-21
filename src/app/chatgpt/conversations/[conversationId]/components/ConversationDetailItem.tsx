import {useSession} from 'next-auth/react'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'

import Avatar from '@/app/chatgpt/conversations/components/Avatar'
import {ConversationMapping} from '@/app/chatgpt/conversations/components/conversation/ConversationList'
import {formatTime} from '@/app/utils/formatter'

const ConversationDetailItem = (
  {
    message,
  }: ConversationMapping
) => {
  const user = useSession().data?.user

  const isOwn = message.author?.role === 'user'
  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end')
  const avatar = clsx(isOwn && 'order-2')
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
  const messageCSS = clsx(
    'text-sm w-fit overflow-hidden rounded-md rounded-full py-2 px-3',
    isOwn ? 'bg-sky-500 text-white ' : 'bg-sky-100'
  )

  return (
    <div className={container}>
      <div className={avatar}>
        {isOwn ? <Avatar imageUrl={user?.image!}/> : <Avatar/>}
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            <div className="text-xs text-gray-400">
              {formatTime(message.create_time)}
            </div>
          </div>
        </div>
        <div className={messageCSS}>
          <ReactMarkdown>{message.content.parts[0]}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default ConversationDetailItem
