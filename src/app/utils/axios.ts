import {getSession} from 'next-auth/react'
import Axios from 'axios'
import {makeUseAxios} from 'axios-hooks'

export const axios = Axios.create({
  baseURL: process.env.GO_CHATGPT_API_URL,
})

axios.interceptors.request.use(async (config) => {
    const session = await getSession()
    const accessToken = session?.user.accessToken

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    config.headers['Content-Type'] = 'application/json'

    return config
  }
)

export const useAxios = makeUseAxios({
  axios,
})
