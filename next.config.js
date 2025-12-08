/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone 모드 활성화 (도커/EC2 배포 시 필수 최적화)
  // 필요한 파일만 추려서 실행하므로 가볍고 빠름
  output: 'standalone',
  
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Permissions-Policy', value: 'geolocation=()' },
          // 네이버 검색로봇 접근 허용을 위한 헤더 설정
          { key: 'X-Robots-Tag', value: 'index, follow' },
          // 캐시 설정: 개발 환경에서는 짧게, 프로덕션에서는 길게
          { 
            key: 'Cache-Control', 
            value: process.env.NODE_ENV === 'development' 
              ? 'no-cache, no-store, must-revalidate' 
              : 'public, max-age=3600, s-maxage=86400'
          },
        ],
      },
      // robots.txt 파일에 대한 특별 헤더
      {
        source: '/robots.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      // 사이트맵에 대한 특별 헤더
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },
  // Playwright 설정 파일을 빌드에서 제외
  // 특정 파일들을 빌드에서 제외
};

module.exports = nextConfig;
