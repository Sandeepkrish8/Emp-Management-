/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache to avoid ENOSPC errors on low-disk systems
      config.cache = { type: 'memory' }
    }
    return config
  },
}

module.exports = nextConfig
