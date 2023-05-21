import Image from 'next/image'

interface AvatarProps {
  imageUrl?: string
}

const Avatar = ({imageUrl}: AvatarProps) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image alt="Avatar" src={imageUrl || '/images/logo.png'} fill/>
      </div>
    </div>
  )
}

export default Avatar
