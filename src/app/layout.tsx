import React from 'react'
import {Inter} from 'next/font/google'

import AuthContext from '@/app/context/AuthContext'
import ToasterContext from '@/app/context/ToasterContext'

import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Next ChatGPT',
  description: 'ChatGPT in Next.js',
}

const LoginLayout = (
  {
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <html lang="en">
    <body className={inter.className}>
    <AuthContext>
      <ToasterContext/>
      {children}
    </AuthContext>
    </body>
    </html>
  )
}

export default LoginLayout
