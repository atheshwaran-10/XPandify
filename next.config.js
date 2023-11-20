/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions: true,
  },
  images: {
    domains: [
      "utfs.io",
      "res.cloudinary.com",
      "i.pinimg.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "t3.ftcdn.net"
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
