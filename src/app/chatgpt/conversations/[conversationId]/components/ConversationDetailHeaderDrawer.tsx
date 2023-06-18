'use client'

import {Fragment, useCallback, useState} from 'react'
import {useRouter} from 'next/navigation'
import {IoClose, IoTrash} from 'react-icons/io5'

import ConfirmDialog from '@/app/chatgpt/conversations/components/ConfirmDialog'
import {Conversation} from '@/app/chatgpt/conversations/components/conversation/ConversationList'
import useConversation from '@/app/hooks/useConversation'
import {axios} from '@/app/utils/axios'
import {formatTime} from '@/app/utils/formatter'
import {Dialog, Transition} from '@headlessui/react'

interface ProfileDrawerProps {
  isOpen: boolean
  onClose: () => void
  conversation: Conversation
}

const ConversationDetailHeaderDrawer = (
  {
    isOpen,
    onClose,
    conversation,
  }: ProfileDrawerProps
) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const router = useRouter()
  const {conversationId} = useConversation()

  const onDelete = useCallback(() => {
    axios.patch(`/chatgpt/backend-api/conversation/${conversationId}`, {
      'is_visible': false,
    }).then(() => {
      onClose()
      router.push('/chatgpt/conversations')
    }).finally(() => {
      // // a wired way to force it to reload data instead of useEffect
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    })
  }, [router, conversationId, onClose])

  return (
    <>
      <ConfirmDialog
        title={'Delete conversation'}
        content={'Are you sure you want to delete this conversation?'}
        isOpen={confirmOpen}
        onYes={onDelete}
        onNo={() => setConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={onClose}>
                              <IoClose size={24} aria-hidden="true"/>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center space-y-10">
                          <div>{conversation.title}</div>
                          <div>{formatTime(conversation.create_time)}</div>
                          {/*remove one empty message and one system messages*/}
                          <div>Total {Object.keys(conversation.mapping).length - 2} messages</div>
                          <div className="flex gap-10 my-8">
                            <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                                 onClick={() => setConfirmOpen(true)}>
                              <div
                                className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                <IoTrash size={20}/>
                              </div>
                              <div className="text-sm font-light text-neutral-600">
                                Delete
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ConversationDetailHeaderDrawer
