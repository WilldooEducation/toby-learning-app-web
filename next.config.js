/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'develop--aquamarine-yeot-40d1c4.netlify.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
