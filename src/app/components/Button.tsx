'use client'

import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  danger?: boolean
  secondary?: boolean
}

const Button = (
  {
    children,
    onClick,
    disabled,
    danger,
    secondary,
  }: ButtonProps
) => {
  // noinspection SpellCheckingInspection
  return (
    <button
      className={clsx(
        'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full text-white',
        disabled && 'opacity-50 cursor-default',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 ml-1 mr-1',
        secondary && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 ml-1 mr-1',
        !danger && !secondary && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
