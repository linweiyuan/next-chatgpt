import NextAuth, {AuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import {axios} from '@/app/utils/axios'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {label: 'Username', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        return axios.post('/chatgpt/login', credentials).then((res: any) => {
          const data = res.data
          const user = data.user
          user.accessToken = data.accessToken
          return user
        }).catch((err: any) => {
          throw new Error(err.response.data.errorMessage)
        })
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({token, user}) => {
      if (user) {
        token.accessToken = user.accessToken
        token.id = user.id
        return token
      }
      return token
    },

    async session({session, token}) {
      session.user.accessToken = token.accessToken as string
      session.user.id = token.id as string
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
