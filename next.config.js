/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'img.freepik.com',
      'static01.nyt.com',
      'newsmedia.tasnimnews.com',
      'www.tasnimnews.com',
    ],
  },
  pwa: {
    dest: 'public',
    register: true,
    scope: '/app',
    sw: '/sw.js',
    cacheStartUrl: false,
    disable: process.env.NODE_ENV === 'development',
  },
});

module.exports = nextConfig;
