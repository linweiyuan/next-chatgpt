import {DefaultSession, JWT} from 'next-auth'

declare module 'next-auth' {
  interface User {
    accessToken: string;
  }

  interface Session {
    user: {
      id: string;
      accessToken: string
    } & DefaultSession['user'];
  }
}
