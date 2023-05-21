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

  return useMemo(
    () => ({
      conversationId,
    }),
    [conversationId]
  )
}

export default useConversation
