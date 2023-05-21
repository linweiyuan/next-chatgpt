'use client'

import React, {useState} from 'react'
import {signIn} from 'next-auth/react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {BsGoogle, BsMicrosoft} from 'react-icons/all'

import Button from '@/app/components/Button'
import InputField from '@/app/components/InputField'
import SocialLoginButton from '@/app/components/SocialLoginButton'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const login: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    setError('')

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        setError(callback.error)
        return
      }

      if (callback?.ok) {
        setError('')
        toast.success('Logged in.')
      }
    }).finally(() => setIsLoading(false))
  }

  const socialLogin = (action: string) => {
    setIsLoading(true)
    toast.error(action + ' login is currently not supported.')
    setIsLoading(false)
  }

  return (
    <div className="mt-8 mx-auto w-full max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(login)}>
          <InputField
            label="Username"
            id="username"
            type="text"
            required={true}
            placeholder="Email address"
            register={register}
            disabled={isLoading}
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            required={true}
            register={register}
            disabled={isLoading}
          />

          <Button
            onClick={handleSubmit(login)}
            disabled={isLoading}
          >
            {isLoading ? 'Login ......' : 'Login'}
          </Button>

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {error}
            </div>
          )}
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
              onClick={() => socialLogin('Google')}
              disabled={isLoading}
            />

            <SocialLoginButton
              icon={BsMicrosoft}
              onClick={() => socialLogin('Microsoft')}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
