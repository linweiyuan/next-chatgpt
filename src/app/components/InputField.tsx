import React from 'react'
import clsx from 'clsx'

interface InputFieldProps {
  id: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
}

const InputField = (
  {
    id,
    label,
    type,
    required,
    placeholder,
  }: InputFieldProps
) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          className={clsx(
            'form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6'
          )}
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default InputField
