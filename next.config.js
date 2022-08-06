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
      'cdn.cnn.com',
    ],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    scope: '/app',

    disable: process.env.NODE_ENV === 'development',
    fallbackL: {
      document: '/_offline.js',
      video: '/video.mp4',
    },
  },
});

module.exports = nextConfig;
