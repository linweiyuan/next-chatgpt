'use client'

import {useSession} from 'next-auth/react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {HiPaperAirplane} from 'react-icons/hi2'
import {v4 as uuidv4} from 'uuid'

import ConversationDetailInput from '@/app/chatgpt/conversations/[conversationId]/components/ConversationDetailInput'
import {Message} from '@/app/chatgpt/conversations/components/conversation/ConversationList'
import useConversation from '@/app/hooks/useConversation'

export interface MessageResponse {
  message: Message
  conversation_id: string
  error: null
}

interface ConversationDetailSubmitFormProps {
  currentNode: string
  setCurrentNode: (id: string) => void
  addMessage: (message: Message) => void
  updateLastMessage: (message: Message) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const ConversationDetailSubmitForm = (
  {
    currentNode,
    setCurrentNode,
    addMessage,
    updateLastMessage,
    isLoading,
    setIsLoading,
  }: ConversationDetailSubmitFormProps
) => {
  const {conversationId} = useConversation()

  const session = useSession()
  const accessToken = session.data?.user.accessToken

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    const requestBody = {
      action: 'next',
      messages: [
        {
          id: uuidv4(),
          author: {role: 'user'},
          content: {content_type: 'text', parts: [data.message]},
        },
      ],
      conversation_id: conversationId,
      parent_message_id: currentNode,
      model: 'text-davinci-002-render-sha-mobile',
      timezone_offset_min: -480,
      history_and_training_disabled: true,
    }

    setValue('message', '', {shouldValidate: true})

    const controller = new AbortController()
    const message = {
      id: uuidv4(),
      author: {
        role: 'user',
      },
      create_time: Date.now() / 1000,
      content: {
        parts: [data.message],
      },
    }
    addMessage(message)

    const responseMessageTemplate = {
      id: uuidv4(),
      author: {
        role: 'assistant',
      },
      create_time: Date.now() / 1000, // time will be a little different
      content: {
        parts: ['...'],
      },
    }
    addMessage(responseMessageTemplate)

    fetch(`${process.env.GO_CHATGPT_API_URL}/chatgpt/conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken!,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    }).then((response) => {
      if (!response.ok) {
        toast.error('Failed to handle response: ' + response.statusText)
        return
      }

      const reader = response.body?.getReader()

      function readStream() {
        reader?.read().then(({done, value}) => {
          if (!done) {
            const receivedData = new TextDecoder('UTF-8').decode(value)
            const dataArray = receivedData.split('\n\n')
            dataArray.pop()
            if (dataArray.length) {
              let data = dataArray.pop()
              if (data && data !== 'data: [DONE]') {
                const messageResponse = JSON.parse(data!.substring(6)) as MessageResponse
                if (currentNode != messageResponse.message.id) {
                  setCurrentNode(messageResponse.message.id)
                }
                updateLastMessage(messageResponse.message)
              }
            }

            readStream()
          } else {
            reader.cancel()
            setIsLoading(false)
          }
        }).catch(() => {
          controller.abort()
          toast.error('Failed to handle response.')
        })
      }

      readStream()
    })
  }

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <form className="flex items-center gap-2 lg:gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <ConversationDetailInput
          id="message"
          required
          placeholder="Write something..."
          register={register}
          disabled={isLoading}
        />
        <button
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
          type="submit"
          disabled={isLoading}
        >
          <HiPaperAirplane size={18} className="text-white"/>
        </button>
      </form>
    </div>
  )
}

export default ConversationDetailSubmitForm
