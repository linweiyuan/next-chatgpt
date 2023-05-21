import React from 'react'
import Image from 'next/image'

import LoginForm from '@/app/components/LoginForm'

const LoginPage = () => {
  const logoSize = 80

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto w-auto"
          alt="Logo"
          width={logoSize}
          height={logoSize}
          src="/images/logo.png"
        />

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Login to Next ChatGPT
        </h2>
      </div>

      <LoginForm/>
    </div>
  )
}

export default LoginPage
