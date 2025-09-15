/** @type {import('next').NextConfig} */
const nextConfig = {
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
          // 캐시 설정으로 응답 속도 개선
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
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
