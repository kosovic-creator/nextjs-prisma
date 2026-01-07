import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {
    authInterrupts: true, // Omogućava forbidden()
  },

// async redirects() {
//   return [
//     {
//       source: '/posts',
//       destination: '/',
//       permanent: true, // 301 trajna redirekcija
//     },
//   ]
// },

  compiler: {
    styledComponents: true,
  },
  cacheComponents: true,
  cacheLife: {
    // Override the 'days' profile
    days: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
  },
  async rewrites() {
    return [
      {
        source: '/posts/trans',
        destination: '/posts',
      },
    ]
  },
  env: {
    customKey: 'my-value',
  },
  /* config options here */
};

export default nextConfig;
