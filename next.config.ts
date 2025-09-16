import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.univervideo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'univer-prod.cloud.seachange.com',
        port: '',
        pathname: '/**',
      }


    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
