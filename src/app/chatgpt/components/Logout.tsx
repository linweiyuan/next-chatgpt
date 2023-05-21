import {useState} from 'react'
import {signOut} from 'next-auth/react'
import clsx from 'clsx'
import {HiArrowLeftOnRectangle} from 'react-icons/hi2'

import ConfirmDialog from '@/app/chatgpt/components/ConfirmDialog'

const Logout = () => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  // noinspection SpellCheckingInspection
  return (
    <>
      <ConfirmDialog
        title="Logout"
        content="Are you sure you want to logout?"
        isOpen={confirmDialogOpen}
        onNo={() => setConfirmDialogOpen(false)}
        onYes={signOut}
      />

      <div
        className={clsx('group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 cursor-pointer')}
        onClick={() => setConfirmDialogOpen(true)}
      >
        <HiArrowLeftOnRectangle className="h-6 w-6"/>
      </div>
    </>
  )
}

export default Logout
