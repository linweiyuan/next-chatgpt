import {useMemo} from 'react'
import {useParams} from 'next/navigation'

const useConversation = () => {
  const params = useParams()

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return ''
    }

    return params.conversationId as string
  }, [params?.conversationId])

  const isConversationOpened = useMemo(() => !!conversationId, [conversationId])

  return useMemo(
    () => ({
      conversationId,
      isConversationOpened,
    }),
    [conversationId, isConversationOpened]
  )
}

export default useConversation
