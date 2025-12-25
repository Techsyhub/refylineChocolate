import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'], // add your Cloudinary domain here
     remotePatterns: [
    { protocol: 'https', hostname: '**' }
  ]
  },
};

export default nextConfig;
