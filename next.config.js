/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
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
    // 로컬 이미지 최적화 설정
    unoptimized: false,
  },
  // Playwright 설정 파일을 빌드에서 제외
  // 특정 파일들을 빌드에서 제외
};

module.exports = nextConfig;
