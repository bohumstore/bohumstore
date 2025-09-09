import type { Metadata, Viewport } from "next";
import "./globals.css";
import ContentProtection from "./components/ContentProtection";
import BodyClassManager from "./components/BodyClassManager";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "보험스토어 | 연금보험, 종신보험, 저축보험 비교 및 상담",
  description: "연금보험, 종신보험, 저축보험 비교 및 전문 상담 플랫폼",
  keywords: "보험, 보험비교, 보험상담, 맞춤형보험, 온라인보험, 보험가입, 보험추천, 연금보험, 변액연금보험, 확정형연금보험, 보증형연금보험, 8%연금보험, 7%연금보험, 고이율연금보험, 세제혜택연금보험, 단기납연금보험, 종신보험, 고환급종신보험, 저해지환급형종신보험, 간편가입종신보험, 단기납종신보험, 10년환급형종신보험, 15년환급형종신보험, 저축보험, 고이율저축보험, 세제혜택저축보험, 변액저축보험, 해약환급금, 환급률, 보험환급률, 납입기간, 납입완료보너스, 장기유지보너스, 암보험, 유사암보험, 고진단비암보험, 무해지암보험, 치매보험, 간병보험, 노후간병보험, 어린이보험, 태아보험, 자녀보험, 생명보험, 손해보험, 변액보험, 재테크보험, 노후대비보험, 절세보험",
  authors: [{ name: "보험스토어" }],
  creator: "보험스토어",
  publisher: "보험스토어",
  robots: "index, follow",
      openGraph: {
      title: "보험스토어 | Bohumstore",
      description: "연금보험, 종신보험, 저축보험 비교 및 상담",
    url: "https://bohumstore.net",
    siteName: "보험스토어",
          images: [
        {
          url: "https://bohumstore.net/kakao-img.png",
          width: 1000,
          height: 500,
          alt: "보험스토어 - 연금보험, 종신보험, 저축보험 비교 및 상담",
        },
      ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "보험스토어 | Bohumstore",
    description: "연금보험, 종신보험, 저축보험 비교 및 상담",
    images: ["https://bohumstore.net/kakao-img.png"],
  },
  // manifest: "/manifest.json", // PWA 앱 설치 버튼 비활성화
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://bohumstore.net",
  },
  category: "insurance",
  classification: "insurance comparison platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="format-detection" content="telephone=no" />
        {/* PWA 관련 메타태그들 - 앱 설치 버튼 비활성화를 위해 주석처리 */}
        {/* <meta name="mobile-web-app-capable" content="yes" /> */}
        {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
        {/* <meta name="apple-mobile-web-app-status-bar-style" content="default" /> */}
        {/* <meta name="apple-mobile-web-app-title" content="보험스토어" /> */}
        
        {/* 파비콘 설정 - 네이버 파워링크 광고용 */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Self-hosted Pretendard preload */}
        <link rel="preload" href="/fonts/Pretendard-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Pretendard-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Pretendard-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* 네이버 앱 웹뷰 보정 (경량) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() { return; /* disabled heavy override; using self-hosted fonts and CSS fixes */
                // 네이버 앱 웹뷰만 간단히 감지
                var isNaverApp = /NAVER/i.test(navigator.userAgent) || 
                                navigator.userAgent.includes('NAVER(inapp');
                
                if (isNaverApp) {
                  // 네이버 앱 웹뷰에서 시스템 폰트 강제 적용
                  
                  // 1. 네이버 앱 웹뷰 전용 극강 스타일 적용
                  var naverAppStyle = document.createElement('style');
                  naverAppStyle.id = 'naver-app-font-override';
                  naverAppStyle.textContent = \`
                    /* 네이버 앱 웹뷰 전용 극강 폰트 강제 적용 */
                    *, *::before, *::after {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif !important;
                      -webkit-font-smoothing: antialiased !important;
                      -moz-osx-font-smoothing: grayscale !important;
                    }
                    
                    /* 슬로건 영역 핵심 요소들 강제 적용 */
                    h1, h2, h3, h4, h5, h6 {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif !important;
                      font-weight: 700 !important;
                    }
                    
                    .font-bold, strong, b, [class*="font-bold"] {
                      font-weight: 700 !important;
                    }
                    
                    .font-semibold, [class*="font-semibold"] {
                      font-weight: 600 !important;
                    }
                    
                    .font-medium, [class*="font-medium"] {
                      font-weight: 500 !important;
                    }
                    
                    /* Tailwind 텍스트 크기별 굵기 강제 */
                    .text-3xl, .text-4xl, .text-5xl, [class*="text-3xl"], [class*="text-4xl"], [class*="text-5xl"] {
                      font-weight: 700 !important;
                    }
                    
                    .text-2xl, [class*="text-2xl"] {
                      font-weight: 600 !important;
                    }
                    
                    .text-lg, .text-xl, [class*="text-lg"], [class*="text-xl"] {
                      font-weight: 500 !important;
                    }
                    
                    /* 회사명, 상품명, 설명 문구 특별 강화 */
                    span, p, div, li {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif !important;
                    }
                    
                    .text-gray-800, .text-gray-900, [class*="text-gray-800"], [class*="text-gray-900"] {
                      font-weight: 500 !important;
                    }
                  \`;
                  document.head.appendChild(naverAppStyle);
                  
                  // 2. 네이버 앱에서는 외부 폰트 차단되므로 시스템 폰트만 사용
                  // (외부 폰트 로딩 시도하지 않음)
                  
                  // 3. DOM 로드 후 한 번만 적용 (성능 최적화)
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                      // body 스타일 적용
                      document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif';
                      
                      // 한 번만 모든 요소에 적용
                      var allElements = document.querySelectorAll('*');
                      for (var i = 0; i < allElements.length; i++) {
                        var element = allElements[i];
                        element.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif';
                        
                        // 슬로건 영역 핵심 요소 굵기 강제 적용
                        var className = element.className || '';
                        var tagName = element.tagName;
                        
                        // 제목들 (h1, h2 등) - 가장 굵게
                        if (tagName && tagName.match(/^H[1-6]$/)) {
                          element.style.fontWeight = '700';
                        }
                        // font-bold 클래스
                        else if (className.includes('font-bold')) {
                          element.style.fontWeight = '700';
                        }
                        // 큰 텍스트들
                        else if (className.includes('text-3xl') || className.includes('text-4xl') || className.includes('text-5xl')) {
                          element.style.fontWeight = '700';
                        }
                        // 중간 텍스트들
                        else if (className.includes('text-2xl')) {
                          element.style.fontWeight = '600';
                        }
                        // 설명 문구들
                        else if (className.includes('text-lg') || className.includes('text-xl')) {
                          element.style.fontWeight = '500';
                        }
                        // 회사명, 상품 설명 등
                        else if (className.includes('text-gray-800') || className.includes('text-gray-900')) {
                          element.style.fontWeight = '500';
                        }
                        // font-medium, font-semibold
                        else if (className.includes('font-semibold')) {
                          element.style.fontWeight = '600';
                        }
                        else if (className.includes('font-medium')) {
                          element.style.fontWeight = '500';
                        }
                      }
                    }, 200);
                  });
                }
              })();
            `
          }}
        />
      </head>
      <body className="antialiased">
        <BodyClassManager />
        <ContentProtection />
        {children}
        {/* Smartlog */}
        <script
          dangerouslySetInnerHTML={{
            __html: "var hpt_info={'_account':'UHPT-72306', '_server': 'a72'};",
          }}
        />
        <script src="//cdn.smlog.co.kr/core/smart.js" charSet="utf-8" />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img src="//a72.smlog.co.kr/smart_bda.php?_account=72306" style="display:none;width:0;height:0;" border="0"/>',
          }}
        />
      </body>
    </html>
  );
}

