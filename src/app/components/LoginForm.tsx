import React from 'react'

import Button from '@/app/components/Button'
import InputField from '@/app/components/InputField'

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
      </div>
    </div>
  )
}

export default LoginForm
