import clsx from 'clsx'
import {IconType} from 'react-icons'

interface SocialLoginButtonProps {
  icon: IconType
  onClick: () => void
  disabled: boolean
}

const SocialButton = (
  {
    icon: Icon,
    onClick,
    disabled,
  }: SocialLoginButtonProps
) => {
  return (
    <button
      className={clsx('inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:outline-offset-0',
        disabled && 'opacity-50 cursor-default',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon/>
    </button>
  )
}

export default SocialButton
