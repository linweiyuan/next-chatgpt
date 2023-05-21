/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },
  env: {
    GO_CHATGPT_API_URL: process.env.GO_CHATGPT_API_URL,
  },
}

module.exports = nextConfig

