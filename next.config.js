/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // deprecated: domains: ['via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',       // 빈 문자열이면 모든 포트 허용
        pathname: '/**' // 모든 경로 허용
      },
    ],
  },
};

module.exports = nextConfig;
