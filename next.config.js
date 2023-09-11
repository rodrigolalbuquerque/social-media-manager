/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["images.pexels.com", "gipxfbdqcjrzcpmcfxoq.supabase.co"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
