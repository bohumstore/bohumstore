"use client";
import { useState } from "react";
import Image from "next/image";
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { coverageData } from '../data/coverageData';

export default function HelloPage() {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState('상품정보');
  const [showNotice, setShowNotice] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const validateForm = () => {
    if (!gender) {
      alert("성별을 선택해주세요.");
      return false;
    }
    if (!name) {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (!birth) {
      alert("생년월일을 입력해주세요.");
      return false;
    }
    if (!phone) {
      alert("연락처를 입력해주세요.");
      return false;
    }
    if (!/^010\d{8}$/.test(phone)) {
      alert("올바른 휴대폰 번호를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // 폼이 유효한 경우의 처리
      console.log("Form submitted:", { gender, name, birth, phone });
    }
  };

  const handleConsult = () => {
    if (validateForm()) {
      // 상담신청 처리
      console.log("Consultation requested:", { gender, name, birth, phone });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');
    
    // 11자리로 제한하고 010으로 시작하도록
    if (numbers.length <= 11) {
      if (numbers.length === 0) {
        setPhone('010');
      } else if (numbers.length <= 3) {
        setPhone('010');
      } else {
        // 010이 아닌 다른 번호로 시작하려고 할 경우 010으로 강제
        const validNumber = '010' + numbers.slice(3);
        setPhone(validNumber);
      }
    }
  };

  return (
    <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
      {/* 상단 네비 - 로고만 가운데, 배경색 #f8f8f8, 연회색 경계선 */}
      <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-[#f8f8f8] border-b border-gray-200">
        <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority />
      </header>

      {/* 브랜드 슬로건/보험료 확인 영역 (이미지 스타일) */}
      <section className="w-full bg-[#ffe15a] py-4 md:py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 md:gap-12 px-4 md:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-sm text-gray-500 mb-2">무배당 KB 연금보험2501(맞춤플랜)</div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">KB 연금보험<br />노후를 위한 든든한 선택</h1>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>월납 연금보험, 중도인출/추가납입 가능</li>
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>다양한 연금 지급 옵션, 맞춤형 설계</li>
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>가입/상담 간편 신청</li>
            </ul>
            <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-full bg-[#ffe1e1] opacity-80" />
              <img
                src="https://via.placeholder.com/300x300.png?text=연금보험"
                alt="연금보험 일러스트"
                className="relative rounded-full w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover border-8 border-white shadow-lg"
              />
            </div>
            <div className="text-xs text-gray-400 mt-4">준법감시인 심의필 제2025-광고-1168호(2025.06.05~2026.06.04)</div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex-1 flex justify-center md:justify-end w-full md:ml-8 md:self-end">
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#3a8094] shadow-xl p-8 relative flex flex-col">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="bg-[#3a8094] text-white text-base font-bold rounded-full px-6 py-2 shadow-lg">간편 계산</div>
              </div>
              <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
                <div className="flex gap-4 items-center">
                  <span className="text-base font-bold text-gray-700">성별</span>
                  <label className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-[#3a8094] w-5 h-5 cursor-pointer" 
                    /> 남자
                  </label>
                  <label className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-[#3a8094] w-5 h-5 cursor-pointer" 
                    /> 여자
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">이름</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요." 
                    className="border rounded px-3 py-2 text-base" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">생년월일</label>
                  <input 
                    type="text" 
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                    placeholder="예) 900101" 
                    maxLength={6} 
                    className="border rounded px-3 py-2 text-base" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">연락처</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="010으로 시작하는 11자리" 
                    className="border rounded px-3 py-2 text-base"
                    maxLength={11}
                    onFocus={(e) => {
                      if (!phone) {
                        setPhone('010');
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="agree" 
                    className="w-4 h-4 cursor-pointer accent-gray-200" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="agree" className="text-sm text-gray-700 select-none">
                    개인정보수집 및 활용동의
                  </label>
                  <button type="button" className="ml-2 text-sm text-[#fa5a5a] underline hover:opacity-80 cursor-pointer">보기</button>
                </div>
                <button type="submit" className="w-full bg-[#3a8094] text-white font-bold rounded-xl py-4 text-lg hover:opacity-90 transition flex items-center justify-center gap-2 mt-2 cursor-pointer">
                  <CalculatorIcon className="w-6 h-6" />
                  보험료 확인하기
                </button>
                <div className="flex flex-row gap-2 mt-2">
                  <button 
                    type="button" 
                    onClick={handleConsult}
                    className="flex-1 bg-[#fa5a5a] text-white font-bold rounded-xl py-4 text-lg flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer"
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z' /></svg>
                    상담신청
                  </button>
                  <button type="button" className="flex-1 bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-4 text-lg flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer">
                    <ChatBubbleLeftRightIcon className="w-6 h-6" />
                    채팅 상담하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 상세 영역 (탭/강조타이틀/설명/특약/일러스트/하단버튼) */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* 탭 네비게이션 */}
          <div className="flex border-b border-gray-200 mb-10">
            {['상품정보', '보장 내용'].map(tab => (
              <button
                key={tab}
                className={`flex-1 text-2xl md:text-3xl font-extrabold pb-4 border-b-4 transition-colors duration-200 ${activeTab === tab ? 'border-[#3a8094] text-[#3a8094]' : 'border-transparent text-[#333] hover:text-[#3a8094]'} cursor-pointer`}
                onClick={() => setActiveTab(tab)}
                style={{ minWidth: 0 }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 탭별 내용 */}
          {activeTab === '상품정보' && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-1">
                <div className="text-2xl md:text-3xl font-bold text-[#3a8094] mb-4">곧 만날 우리 아이를 위한 신생아플랜, 출생부터 100세까지</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">성장단계별 발생할 수 있는<br />상해사고, 질병에 대비하세요.</div>
                <div className="text-lg text-gray-700 mb-2">(특약)</div>
                <div className="text-base text-gray-500 mb-6">성인 암 진단비, 뇌혈관질환진단비, 심장질환진단비, 각종 수술비 보장 (특약)</div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <img src="https://via.placeholder.com/240x180.png?text=일러스트" alt="특약 일러스트" className="w-[240px] h-[180px] object-contain" />
              </div>
            </div>
          )}
          {activeTab === '보장 내용' && (
            <div className="space-y-12 px-4">
              {/* 기본계약 */}
              <div>
                <div>
                  <h3 className="text-2xl font-bold pb-4">{coverageData.basic.title}</h3>
                </div>
                <div className="mt-6">
                  <div className="flex border-y-2 border-gray-400 py-4">
                    <div className="w-1/4 font-bold">담보명</div>
                    <div className="w-1/2 font-bold">보장내용</div>
                    <div className="w-1/4 text-right font-bold">지급금액</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {coverageData.basic.items.map((item, index) => (
                      <div key={index} className={`flex py-8 ${item.name === "일반상해사망" ? "border-b-2 border-gray-400" : ""}`}>
                        <div className="w-1/4 text-lg">{item.name}</div>
                        <div className="w-1/2 text-base text-gray-600">
                          {item.description}
                          {item.details && (
                            <ul className="mt-2 space-y-1">
                              {item.details.map((detail, idx) => (
                                <li key={idx} className="text-sm text-gray-500">{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="w-1/4 text-lg text-right">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 선택계약 */}
              <div>
                <div>
                  <h3 className="text-2xl font-bold pb-4">{coverageData.optional.title}</h3>
                </div>
                <div className="mt-6">
                  <div className="flex border-y-2 border-gray-400 py-4">
                    <div className="w-1/4 font-bold">담보명</div>
                    <div className="w-1/2 font-bold">보장내용</div>
                    <div className="w-1/4 text-right font-bold">지급금액</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {coverageData.optional.items.map((item, index) => (
                      <div key={index} className={`flex py-8 ${item.name === "뇌혈관질환진단비" ? "border-b-2 border-gray-400" : ""}`}>
                        <div className="w-1/4 text-lg">{item.name}</div>
                        <div className="w-1/2 text-base text-gray-600">{item.description}</div>
                        <div className="w-1/4 text-lg text-right">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 안내문구 */}
                <div className="space-y-4 text-sm text-gray-500 mt-8">
                  <p>※ 일반보험(무)와(과제4)에서 암(무)와(과제4)하면 약관에서 정한 각종 신생물로 분류되는 기타 파부의 각삭신생물, 비침윤의 각삭신생물을 제외한 모든 분야며, 암주장까지는 제포 포함계극물부터 90일이 되는 날의 다음 날 입니다.</p>
                  <p>※ 상기 가입예시는 이해를 돕기 위한 것으로, 성별, 연령별로 가입 가능한 담보 및 가입금액은 달라질 수 있습니다. 예시된 담보 외에 가입 가능한 담보들은 전문 상담원을 통해 자세히 안내 받으실 수 있습니다.</p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mt-8">
                    <div className="flex items-center gap-2 text-gray-700 font-medium mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <span className="text-lg">알아두실 사항</span>
                    </div>
                    <ul className="space-y-2">
                      <li>• 상기 가입예시는 이해를 돕기 위한 것으로, 성별, 연령별로 가입 가능한 담보 및 가입금액은 달라질 수 있습니다. 예시된 담보 외에 가입 가능한 담보들은 전문 상담원을 통해 자세히 안내 받으실 수 있습니다.</li>
                      <li>• 자세한 설명은 약관 및 상품설명서를 참조하시기 바랍니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <a href="/product-guide.pdf" download className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition text-center cursor-pointer">
              상품안내장
            </a>
            <a href="/terms.pdf" download className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition text-center cursor-pointer">
              약관
            </a>
            <button type="button" onClick={() => setShowNotice(true)} className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">꼭 알아두실 사항</button>
          </div>
        </div>
      </section>

      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col relative">
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-200">
              <div className="text-xl font-bold">꼭 알아두실 사항</div>
              <button onClick={() => setShowNotice(false)} className="p-1 text-gray-400 hover:text-gray-700"><XMarkIcon className="w-7 h-7" /></button>
            </div>
            <div className="overflow-y-auto px-6 py-4 text-[15px] leading-relaxed" style={{maxHeight:'60vh'}}>
              <div className="mb-4">
                <div className="text-[#d32f2f]">보험계약자는 회사 등으로부터 상품에 대해 충분한 설명을 받을 권리가 있으며, 가입에 앞서 그 설명을 이해한 후 거래하시기 바랍니다.</div>
                <div className="text-[#d32f2f]">이 자료는 요약된 내용으로 자세한 사항은 상품설명서 및 약관을 통해 반드시 확인하시기 바랍니다.</div>
                <div className="text-[#d32f2f]">연금보험은 은행의 예·적금 및 펀드등과 다른 상품입니다. 계약자가 납입한 보험료 중 일부는 불의의 사고를 당한 가입자에게 보험금으로 지급되며, 또 다른 일부는 보험회사의 운영에 필요한 경비로 사용되는 상품으로 중도해지시 납입한 보험료보다 환급금이 매우 적거나 없을 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">기존계약 해지 후 신규 계약 가입에 관한 사항</div>
                <div>보험계약자가 기존 보험계약을 해지하고, 새로운 보험계약을 체결할 경우 인수거절, 보험료 인상, 보장내용 축소 등 불이익이 생길 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">기존계약 이동에 따른 비교안내에 관한 사항</div>
                <div>보험계약 이동시 나이, 위험률의 증가 등에 따라 보험료가 인상되거나, 계약 초기 사업비 공제로 인하여 해약환급금이 과소지급 될 수 있으니 반드시 비교설명을 받으시기 바랍니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">가입자의 계약 전 알릴의무에 관한 사항</div>
                <div>계약을 청약할 때는 과거의 병력과 현재의 건강상태, 신체의 장해상태, 종사하는 직업 및 환경 등 청약서 상의 질문사항에 대하여 사실대로 회사에 알려야만 보험금 지급이 보장됩니다. 만일 사실대로 알리지 않았을 경우에는 계약이 해지되거나 회사가 별도로 정하는 방법에 따라 보장이 제한될 수 있으며 구두로 알리신 것은 효력이 없습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">보험 가입의 제한 등에 관한 사항</div>
                <div>과거의 병력과 현재의 건강상태, 연령, 직업, 운전, 취미 등에 따라 가입이 제한되거나 보장금액 등이 제한될 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">보험금 지급의 제한에 관한 사항</div>
                <div>회사는 다음 중 어느 한 가지로 보험금 지급사유가 발생한 때에는 보험금을 지급하지 않거나 보험료의 납입을 면제하지 않습니다.</div>
                <div className="mt-2">
                  1. 피보험자가 고의로 자신을 해친 경우. 다만, 다음 중 어느 하나에 해당하면 보험금을 지급하거나 보험료의 납입을 면제합니다.<br/>
                  가. 피보험자가 심신상실 등으로 자유로운 의사결정을 할 수 없는 상태에서 자신을 해친 경우<br/>
                  나. 계약의 보장개시일(부활(효력회복)계약의 경우는 부활(효력회복)청약일)부터 2년이 경과된 후에 자살한 경우<br/>
                  2. 보험수익자가 고의로 피보험자를 해친 경우. 다만, 그 보험수익자가 보험금의 일부 보험수익자인 경우에는 다른 보험수익자에 대한 보험금은 지급합니다.<br/>
                  3. 계약자가 고의로 피보험자를 해친 경우
                </div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">청약 철회에 관한 사항</div>
                <div>보험계약자는 보험증권을 받은 날부터 15일 이내에 청약을 철회할 수 있으며, 청약의 철회를 접수한 날부터 3영업일 이내에 보험료를 돌려드립니다. 단, 회사가 건강상태 진단을 지원하는 계약, 보험기간이 90일 이내인 계약 또는 전문금융소비자가 체결한 계약이거나, 청약을 한 날부터 30일(다만, 청약시점에 만 65세 이상인 보험계약자가 전화를 이용하여 계약을 체결한 경우 청약한 날부터 45일)을 초과한 경우는 청약철회가 제한됩니다.</div>
              </div>
              <div className="mb-4">
                <div className="mb-1">[일반금융소비자] 전문금융소비자가 아닌 보험계약자를 말합니다.</div>
                <div className="mb-1">[전문금융소비자] 보험계약에 관한 전문성, 자산규모 등에 비추어 보험계약에 따른 위험감수 능력이 있는 자로서, 국가, 지방자치단체, 한국은행, 금융회사, 주권상장법인 등을 포함하며,「금융소비자보호에 관한 법률」 제2호제9호에서 정하는 전문금융소비자인 보험계약자를 말합니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">보험계약 품질보증에 관한 사항</div>
                <div>아래 3가지 중 1개라도 해당하는 경우 계약자는 계약이 성립한 날부터 3개월 이내에 계약을 취소할 수 있으며 이 경우 회사는 계약자에게 납입한 보험료 전액과 정해진 이자를 지급하여 드립니다.</div>
                <div className="mt-2">
                  약관 및 청약서를 받지 못한 경우<br/>
                  청약시 약관의 중요내용을 설명받지 못한 경우<br/>
                  청약서에 자필서명(전자서명 포함)이 없는 경우
                </div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">위법계약의 해지에 관한 사항</div>
                <div>계약자는 금융소비자보호에 관한 법률 제47조 및 관련 규정이 정하는바에 따라 계약체결일부터 5년을 초과하지 않는 범위내에서 계약체결에 대한 위반사항을 안날부터 1년 이내에 서면 등으로 해당 계약의 해지를 요구 할 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">해약환급금에 관한 사항</div>
                <div>보험계약을 중도 해지 시 해약환급금은 이미 납입한 보험료보다 적거나 없을 수 있습니다. 그 이유는 납입한 보험료 중 위험보장을 위한 보험료, 사업비를 차감한 후 운용ㆍ적립되고, 해지 시에는 계약자적립액에서 이미 지출한 사업비 해당액을 차감하는 경우가 있기 때문입니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">예금자보호에 관한 사항</div>
                <div>이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "5천만원까지"(본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "5천만원까지" 보호됩니다.<br/>단, 보험계약자 및 보험료 납부자가 법인인 보험계약 등은 예금자보호법에 의해 보호되지 않습니다.</div>
              </div>
            </div>
            <div className="flex border-t border-gray-200">
              <button onClick={() => setShowNotice(false)} className="flex-1 py-4 text-lg font-bold bg-[#ffe15a] text-gray-900 border-r border-gray-200 hover:bg-yellow-200 transition">확인</button>
              <button onClick={() => setShowNotice(false)} className="flex-1 py-4 text-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="w-full bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4">
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