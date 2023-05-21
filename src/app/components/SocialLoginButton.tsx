import {IconType} from 'react-icons'

interface SocialLoginButtonProps {
  icon: IconType
}

const SocialButton = (
  {
    icon: Icon,
  }: SocialLoginButtonProps
) => {
  return (
    <button
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:outline-offset-0"
    >
      <Icon/>
    </button>
  )
}

export default SocialButton
