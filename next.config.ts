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
