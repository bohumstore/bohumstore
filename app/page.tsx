"use client";
import Image from "next/image";
import React from "react";

const navItems = [
  { label: "종합", icon: "🔷", subItems: ["실손의료보험", "질병보험", "상해보험", "입원보험"] },
  { label: "어린이", icon: "👶", subItems: ["어린이보험", "교육보험", "어린이실손보험"] },
  { label: "암·뇌·심장", icon: "🔥", subItems: ["화재보험", "재물보험", "배상책임보험"] },
  { label: "수술비", icon: "❤️", subItems: ["암보험", "뇌혈관보험", "심장질환보험"] },
  { label: "유병자", icon: "💚", subItems: ["정기보험", "종신보험", "연금보험"] },
  { label: "간병인", icon: "🚗", subItems: ["운전자보험", "자동차보험", "교통사고보험"] },
  { label: "종신", icon: "🦷", subItems: ["치아보험", "치과보험", "치아교정보험"] },
  { label: "연금", icon: "👨‍👩‍👧", subItems: ["유병자보험", "만성질환보험", "장애인보험"] },
  { label: "배상책임", icon: "🐾", subItems: ["반려동물보험", "애완동물보험", "수의사비용보험"] },
  { label: "보장분석", icon: "📊", subItems: ["보험료계산", "보장내용분석", "보험가입가이드"] }
];

const mainCategories = [
  { icon: "🔷", label: "종합" },
  { icon: "⚙️", label: "어린이" },
  { icon: "❤️", label: "암" },
  { icon: "🛞", label: "수술비" },
  { icon: "👨‍👩‍👧", label: "유병자" },
  { icon: "💚", label: "간병인" },
  { icon: "🦷", label: "종신" },
  { icon: "🔥", label: "연금" },
  { icon: "🚗", label: "배상책임" },
];

export default function Home() {
  const [hoveredMenu, setHoveredMenu] = React.useState<number | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);

  // 메뉴에 마우스 올리면 메가메뉴 열림, 나가면 닫힘
  const handleMenuEnter = (idx: number) => {
    setHoveredMenu(idx);
    setIsMegaMenuOpen(true);
  };
  const handleMenuLeave = () => {
    setHoveredMenu(null);
    setIsMegaMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* 상단 네비게이션 */}
      <header className={`relative bg-white border-b border-gray-200 ${isMegaMenuOpen ? "shadow-lg" : ""}`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 py-6 border-b border-gray-200">
          <div className="flex items-center justify-center w-full">
            <Image src="/bohumstore-logo.png" alt="보험스토어 로고" height={60} width={220} priority />
          </div>
        </div>
        <nav
          className="max-w-7xl mx-auto flex gap-4 md:gap-12 px-4 py-3 font-semibold text-gray-800 justify-center"
          onMouseLeave={handleMenuLeave}
        >
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => handleMenuEnter(idx)}
            >
              <a
                href="#"
                className={`px-4 py-2 rounded transition-colors duration-150 whitespace-nowrap text-base md:text-lg border-b-2 border-transparent hover:border-[#3a8094] ${
                  hoveredMenu === idx && isMegaMenuOpen
                    ? "text-[#3a8094] font-bold border-[#3a8094]"
                    : "hover:text-[#3a8094]"
                }`}
              >
                {item.label}
                {hoveredMenu === idx && <span className="ml-1 text-base md:text-lg">{item.icon}</span>}
              </a>
            </div>
          ))}
        </nav>

        {/* 메가 메뉴 */}
        {isMegaMenuOpen && (
          <div
            className="absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-xl z-50 px-0 py-4 animate-fadeIn"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={handleMenuLeave}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {navItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={`px-3 py-2 transition-colors h-full border border-gray-200 rounded-md ${
                    hoveredMenu === idx
                      ? "bg-blue-50 border-blue-200 z-10"
                      : ""}
                  }`}
                >
                  <div
                    className={`font-bold mb-1 text-sm md:text-base flex items-center gap-1 ${
                      hoveredMenu === idx ? "text-[#3a8094]" : "text-gray-800"
                    }`}
                  >
                    {item.icon} {item.label}
                  </div>
                  <ul className="space-y-0.5">
                    {item.subItems.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <a
                          href="#"
                          className={`block px-1 py-0.5 rounded text-gray-700 text-xs md:text-sm hover:bg-blue-50 hover:text-blue-700 ${
                            hoveredMenu === idx ? "font-semibold" : ""
                          }`}
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 메인 프로모션 & 폼 영역 */}
      <main className="bg-[#4ba1b7] w-full py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          {/* 상품 검색/상담 폼 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md z-10">
            <h2 className="text-lg font-bold mb-4 text-gray-800">어떤 상품을 찾으세요?</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-[#4ba1b7] text-white px-3 py-1 rounded-full text-xs font-semibold">암보험</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">종합보험</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">어린이보험</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">치아보험</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">태아보험</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">운전자보험</button>
            </div>
            <form className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-700">성별</span>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="gender" className="accent-[#4ba1b7]" /> 남자
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="gender" className="accent-[#4ba1b7]" /> 여자
                </label>
              </div>
              <input type="text" placeholder="생년월일 (6자리)" className="border rounded px-3 py-2 text-sm" maxLength={6} />
              <input type="text" placeholder="연락처 - 없이 입력하세요." className="border rounded px-3 py-2 text-sm" />
              <input type="text" placeholder="이름을 입력하세요." className="border rounded px-3 py-2 text-sm" />
              <button type="submit" className="bg-[#4ba1b7] text-white font-bold rounded-full py-3 mt-2 text-base hover:bg-[#3a8094] transition">보험료 확인하기</button>
            </form>
          </div>
          {/* 프로모션 텍스트 & 이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-start text-white z-10">
            <div className="text-lg md:text-xl font-semibold mb-2">치아보험</div>
            <div className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              아말감, 레진, 인레이, 금, 세라믹<br />
              충전치료 개수 제한없는 치아보험
            </div>
            <ul className="mb-4 text-base md:text-lg font-medium list-disc list-inside">
              <li>유치부터 영구치까지 각종 치과 치료비를 치아보험 하나로 (특약)</li>
              <li>2세부터 60세까지 우리 가족 치과치료 파트너</li>
            </ul>
            {/* 이미지 대체: 치아+캐릭터+쉴드 */}
            <div className="flex items-end gap-4 mt-4">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-6xl">🦷</span>
              </div>
              <div className="w-20 h-20 bg-[#e6f7fa] rounded-full flex items-center justify-center shadow">
                <span className="text-4xl">🧑‍🎤</span>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow">
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-4 text-gray-600 text-sm whitespace-nowrap">보험스토어, 공식 보험상품몰</div>
      </main>

      {/* 하단 주요 상품 아이콘 메뉴 */}
      <section className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-nowrap justify-center gap-8 px-4 md:flex-row md:justify-center">
          {mainCategories.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2 w-24 flex-shrink-0">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-3xl mb-1">
                {cat.icon}
              </div>
              <span className="text-base font-semibold text-gray-700 whitespace-nowrap">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>
      {/* 푸터 */}
      <footer className="bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm flex flex-col gap-2">
          <div className="font-bold text-gray-700">보험스토어</div>
          <div>대표: 홍길동 | 사업자등록번호: 123-45-67890 | 이메일: info@bohumstore.com</div>
          <div>주소: 서울특별시 강남구 테헤란로 123, 10층</div>
          <div className="mt-2">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
