'use client'

import {FieldValues, UseFormRegister} from 'react-hook-form'

interface ConversationDetailInputProps {
  id: string
  required?: boolean
  placeholder?: string
  register: UseFormRegister<FieldValues>,
  disabled: boolean
}

const ConversationDetailInput = (
  {
    id,
    required,
    placeholder,
    register,
    disabled,
  }: ConversationDetailInputProps
) => {
  return (
    <div className="relative w-full">
      <input
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
        id={id}
        required={required}
        placeholder={placeholder}
        {...register(id, {required})}
        disabled={disabled}
      />
    </div>
  )
}

export default ConversationDetailInput
