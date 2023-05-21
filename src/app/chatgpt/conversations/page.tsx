import EmptyState from '@/app/chatgpt/conversations/components/EmptyState'

const ConversationsPage = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState/>
    </div>
  )
}

export default ConversationsPage
