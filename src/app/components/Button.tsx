'use client'

import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
}

const Button = (
  {
    children,
  }: ButtonProps
) => {
  // noinspection SpellCheckingInspection
  return (
    <button
      className={clsx(
        'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600',
      )}
    >
      {children}
    </button>
  )
}

export default Button
