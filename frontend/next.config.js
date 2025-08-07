/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: '*.clerk.accounts.dev' },
    ],
  },
  // Server Actions are available by default in Next.js 14.0.3
  // Add Clerk domains to allowed list
  serverExternalPackages: ['@clerk/nextjs']
};

module.exports = nextConfig