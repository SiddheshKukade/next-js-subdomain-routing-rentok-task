/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'rentok-marketplace.s3.ap-south-1.amazonaws.com',
          port: '',
          pathname: '/account123/**',
        },
      ],
    },
  }