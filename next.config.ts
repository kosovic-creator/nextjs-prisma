import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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

  /* config options here */
};

export default nextConfig;
