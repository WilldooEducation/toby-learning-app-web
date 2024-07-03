/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'develop--aquamarine-yeot-40d1c4.netlify.app',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'toby-app-dev-ui.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
