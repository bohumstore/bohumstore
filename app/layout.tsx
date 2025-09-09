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
        
        {/* 네이버 파워링크 강제 폰트 로딩 - 다중 CDN 및 로컬 폴백 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 1차: Pretendard via jsDelivr */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          media="all"
        />
        
        {/* 2차: Google Fonts 폴백 */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          media="all"
        />
        
        {/* 모바일 네이버 파워링크 전용 강력 대응 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 모바일 네이버 환경 정밀 감지
                var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                var isNaver = /naver/i.test(navigator.userAgent) || 
                             /NAVER/i.test(navigator.userAgent) ||
                             /naver/i.test(document.referrer) ||
                             window.location.search.includes('naver') ||
                             document.referrer.includes('naver.com') ||
                             document.referrer.includes('m.naver.com');
                
                var isMobileNaver = isMobile && isNaver;
                
                if (isMobileNaver) {
                  console.log('[FONT] 모바일 네이버 환경 감지 - 강제 폰트 적용');
                  
                  // 1. 즉시 스타일 강제 적용
                  var style = document.createElement('style');
                  style.textContent = \`
                    * {
                      font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', sans-serif !important;
                      font-weight: inherit !important;
                    }
                    body, html {
                      font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', sans-serif !important;
                    }
                    h1, h2, h3, h4, h5, h6 {
                      font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', sans-serif !important;
                      font-weight: 700 !important;
                    }
                    .font-bold {
                      font-weight: 700 !important;
                    }
                    .font-semibold {
                      font-weight: 600 !important;
                    }
                    .font-medium {
                      font-weight: 500 !important;
                    }
                  \`;
                  document.head.appendChild(style);
                  
                  // 2. 폰트 다중 로딩
                  var fonts = [
                    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css',
                    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
                  ];
                  
                  fonts.forEach(function(url) {
                    var link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = url;
                    link.type = 'text/css';
                    link.media = 'all';
                    document.head.appendChild(link);
                  });
                  
                  // 3. DOM 로드 후 재적용
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                      document.body.style.cssText += 'font-family: Pretendard, "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", sans-serif !important;';
                      
                      // 모든 요소에 강제 적용
                      var allElements = document.querySelectorAll('*');
                      for (var i = 0; i < allElements.length; i++) {
                        allElements[i].style.fontFamily = 'Pretendard, "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", sans-serif';
                      }
                    }, 200);
                  });
                  
                  // 4. 지속적인 감시 및 재적용
                  setInterval(function() {
                    if (document.body && document.body.style.fontFamily.indexOf('Pretendard') === -1) {
                      document.body.style.fontFamily = 'Pretendard, "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", sans-serif';
                    }
                  }, 1000);
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
