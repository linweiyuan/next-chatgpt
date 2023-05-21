import React from 'react'
import clsx from 'clsx'
import {FieldValues, UseFormRegister} from 'react-hook-form'

interface InputFieldProps {
  id: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  register: UseFormRegister<FieldValues>
  disabled: boolean
}

const InputField = (
  {
    id,
    label,
    type,
    required,
    placeholder,
    register,
    disabled,
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
            'form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6',
            disabled && 'opacity-50 cursor-default',
          )}
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          {...register(id, {required})}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default InputField
