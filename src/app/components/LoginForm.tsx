import React from 'react'
import {BsGoogle, BsMicrosoft} from 'react-icons/all'

import Button from '@/app/components/Button'
import InputField from '@/app/components/InputField'
import SocialLoginButton from '@/app/components/SocialLoginButton'

const LoginForm = () => {
  return (
    <div className="mt-8 mx-auto w-full max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <InputField
            label="Username"
            id="username"
            type="text"
            required={true}
            placeholder="Email address"
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            required={true}
          />

          <Button>Login</Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"/>
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <SocialLoginButton
              icon={BsGoogle}
            />

            <SocialLoginButton
              icon={BsMicrosoft}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
