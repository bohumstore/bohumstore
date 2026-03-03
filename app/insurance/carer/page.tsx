'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import CalculatorConsultModal from './components/CalculatorConsultModal';
import ProductHero from '@/components/product/ProductHero';
import Footer from '@/components/shared/Footer';
import Notice from './components/Notice';
import { trackPageVisit } from '@/lib/visitorTracking';

export default function CarerInsurancePage() {
  const [showNotice, setShowNotice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'calculate' | 'consult'>('calculate');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  useEffect(() => { trackPageVisit(); }, []);

  useEffect(() => {
    const handleMenuChange = (e: CustomEvent<{ isOpen: boolean }>) => {
      setIsHeaderMenuOpen(e.detail.isOpen);
    };
    window.addEventListener('headerMenuChange', handleMenuChange as EventListener);
    return () => window.removeEventListener('headerMenuChange', handleMenuChange as EventListener);
  }, []);

  const handleFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') setIsInputFocused(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      const active = document.activeElement as HTMLElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
      setIsInputFocused(false);
    }, 100);
  };

  return (
    <>
      <Notice open={showNotice} onClose={() => setShowNotice(false)} />
      <div
        className="flex min-h-screen w-full flex-col items-center bg-page-bg font-sans"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* ── Hero Section ── */}
        <ProductHero
          backgroundColor="#F0FDF4"
          featureCardColor="#DCFCE7"
          titleMobile={
            <>
              <span className="text-[#16a34a] font-bold text-[24px]">병원비가 아니라 간병비!</span>
              <br />
              <span className="text-text-primary">전문 간병인보험</span>
            </>
          }
          titleDesktop={
            <>
              <div className="heading-2 text-text-primary">
                병원비가 아니라 간병비!
              </div>
              <div className="heading-2 text-text-primary">
                전문 간병인보험
              </div>
            </>
          }
          productName="간병인보험"
          mainImageSrc="/svgs/slogan/main/slogan-care-heart.svg"
          mainImageAlt="간병인보험 일러스트"
          features={[
            {
              icon: '/svgs/slogan/slogan-guarantee.svg',
              title: '하루 최대 20만원',
              title_sub: '간병인 사용료 지급',
            },
            {
              icon: '/svgs/slogan/slogan-age-range.svg',
              title: '월 2~5만원',
              title_sub: '합리적인 보험료',
            },
            {
              icon: '/svgs/slogan/slogan-graph.svg',
              title: '가족간병',
              title_sub: '보험금 지급 가능',
            },
            {
              icon: '/svgs/slogan/slogan-tax-exempt.svg',
              title: '실손보험 보완',
              title_sub: '간병비 별도 보장',
            },
          ]}
          calculateButtonLabel="카카오톡 상담"
          calculateButtonVariant="kakao"
          onCalculateClick={() => {
            window.open('https://pf.kakao.com/_lrubxb/chat', '_blank');
          }}
          onConsultClick={() => {
            setModalType('consult');
            setIsModalOpen(true);
          }}
        />
        <CalculatorConsultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={modalType}
        />

        {/* ── Hero Image ── */}
        <div className="w-full md:px-6 md:py-12 lg:px-8 lg:py-12">
          <div className="mx-auto w-full md:max-w-4xl lg:max-w-5xl">
            <img
              src="/images/icons/img-carer-hero.png"
              alt="가족을 위한 든든한 지원군 - 전문 간병인 보험으로 안심을 선물하세요"
              className="h-auto w-full object-cover md:rounded-2xl md:shadow-xl"
            />
          </div>
        </div>

        {/* ── Body Content ── */}
        <section className="w-full bg-white py-10 sm:py-6 md:py-12 lg:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-4xl md:px-10 lg:max-w-5xl lg:px-16">

            {/* 간병인사용일당 */}
            <div className="mb-8 rounded-xl border-2 border-emerald-200 bg-[#F0FDF4] p-6">
              <div className="mb-6 text-center">
                <h3 className="heading-4 text-text-primary mb-2">🏥 간병인사용일당</h3>
                <p className="body-m text-text-secondary">
                  질병이나 상해 사고로 인하여 간병이 필요한 상황이 발생했을 때, 간병인을 먼저
                  고용하고 보험사에 청구하여 보상받는 보험입니다.
                </p>
                <p className="body-m font-medium text-emerald-600 mt-2">
                  질병이나 상해 사고로 인하여 간병이 필요한 상황이 발생했을 때, 간병인을 먼저
                  고용하고 보험사에 청구하여 보상받는 보험입니다.
                </p>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border-2 border-emerald-200 bg-white p-4">
                  <div className="mb-3 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <span className="text-2xl">👨‍⚕️</span>
                    </div>
                    <h4 className="heading-5 text-emerald-700">가족간병</h4>
                  </div>
                  <div className="body-s text-text-secondary">
                    <p className="mb-2">가족이 직접 간병하는 경우에도 보험금 지급</p>
                    <p className="caption-s text-text-muted">* 해당 내용은 보험사별, 상품별 상이할 수 있습니다.</p>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-border-default bg-white p-4">
                  <div className="mb-3 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h4 className="heading-5 text-text-secondary">청구 방식</h4>
                  </div>
                  <div className="body-s text-text-secondary">
                    <p className="mb-2">간병서비스 이용 후 영수증 등을 제출하여 보상</p>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-border-default bg-white p-4">
                  <div className="mb-3 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h4 className="heading-5 text-text-secondary">보장내용</h4>
                  </div>
                  <div className="body-s text-text-secondary">
                    <p className="mb-1">간병인사용일당<span className="caption-s">(요양병원제외)</span>{' '}<span className="font-semibold text-emerald-600">15~20만원</span></p>
                    <p className="mb-1">요양병원 <span className="font-semibold text-emerald-700">5~6만원</span></p>
                    <p className="mb-1">간호간병통합서비스병실{' '}<span className="font-semibold text-emerald-800">7만원</span></p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-emerald-300 bg-white p-4">
                <div className="text-center">
                  <h4 className="mb-2 heading-5 text-emerald-600">⭐ 핵심 포인트</h4>
                  <div className="grid gap-4 body-s md:grid-cols-2">
                    <div className="text-left">
                      <p className="text-text-primary">✓ <span className="font-semibold">가족간병시에도 보험금 지급</span></p>
                      <p className="text-text-primary">✓ <span className="font-semibold">실손보험 보완</span> 역할</p>
                    </div>
                    <div className="text-left">
                      <p className="text-text-primary">✓ <span className="font-semibold">하루 15~20만원</span> 보장</p>
                      <p className="text-text-primary">✓ <span className="font-semibold">영수증 제출</span>로 간편 청구</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 소중한 가족을 위한 준비 */}
            <div className="mb-8 rounded-2xl border border-emerald-100 bg-gradient-to-br from-[#F0FDF4] to-emerald-50 p-6 md:p-8">
              <div className="mb-6 text-center">
                <h3 className="heading-3 text-text-primary mb-3">💝 소중한 가족을 위한 준비</h3>
                <p className="body-l leading-relaxed text-text-secondary">
                  &ldquo;언젠가는 다가올 그 순간을 위해
                  <br />
                  <span className="font-semibold text-emerald-600">미리 준비하는 것이 진정한 사랑</span>입니다&rdquo;
                </p>
              </div>

              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <span className="text-xl">😔</span>
                    </div>
                    <h4 className="heading-5 text-text-primary">준비하지 않았을 때</h4>
                  </div>
                  <div className="space-y-2 body-s text-text-secondary">
                    <p>• 갑작스런 간병비 부담으로 가족 모두 힘들어해요</p>
                    <p>• 직장을 그만두고 간병해야 하는 상황</p>
                    <p>• 경제적 부담으로 인한 가족 갈등</p>
                    <p>• 충분한 간병 서비스를 받지 못하는 안타까움</p>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-emerald-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <span className="text-xl">😊</span>
                    </div>
                    <h4 className="heading-5 text-text-primary">미리 준비했을 때</h4>
                  </div>
                  <div className="space-y-2 body-s text-text-secondary">
                    <p>• 경제적 걱정 없이 최선의 간병 서비스 제공</p>
                    <p>• 가족들이 각자의 일상을 유지할 수 있어요</p>
                    <p>• 전문 간병인을 통한 체계적인 돌봄</p>
                    <p>• 온 가족이 안심하고 생활할 수 있어요</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-center text-white shadow-lg">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">💚</span>
                  <p className="body-l font-bold">가족을 지키는 현명한 선택</p>
                </div>
                <p className="body-s text-emerald-100">지금 준비하면 든든한 미래가 보장됩니다</p>
              </div>
            </div>

            {/* 이런 분에게 */}
            <div className="mb-6 text-center">
              <h3 className="heading-4 text-text-primary mb-6">이런 분에게 간병인보험이 필요합니다</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-[#F0FDF4] p-4 text-left">
                  <div className="mb-2 heading-5 text-emerald-700">👥 맞벌이 가정</div>
                  <p className="body-s text-text-secondary">직장 생활 중 가족 간병이 어려운 경우</p>
                  <p className="mt-1 caption-s text-emerald-600">&ldquo;일도 놓칠 수 없고, 가족도 돌봐야 하는 딜레마&rdquo;</p>
                </div>
                <div className="rounded-lg bg-[#F0FDF4] p-4 text-left">
                  <div className="mb-2 heading-5 text-emerald-700">👤 외동 자녀</div>
                  <p className="body-s text-text-secondary">혼자서 부모님을 돌봐야 하는 경우</p>
                  <p className="mt-1 caption-s text-emerald-600">&ldquo;모든 책임이 나에게만 있다는 부담감&rdquo;</p>
                </div>
                <div className="rounded-lg bg-[#F0FDF4] p-4 text-left">
                  <div className="mb-2 heading-5 text-emerald-700">👴 50대 이상</div>
                  <p className="body-s text-text-secondary">전문 간병인 도움이 필요한 연령대</p>
                  <p className="mt-1 caption-s text-emerald-600">&ldquo;자녀에게 부담 주기 싫은 마음&rdquo;</p>
                </div>
                <div className="rounded-lg bg-[#F0FDF4] p-4 text-left">
                  <div className="mb-2 heading-5 text-emerald-700">💼 자영업자</div>
                  <p className="body-s text-text-secondary">사업 운영으로 간병이 어려운 경우</p>
                  <p className="mt-1 caption-s text-emerald-600">&ldquo;사업도 가족도 모두 지켜야 하는 현실&rdquo;</p>
                </div>
              </div>
            </div>

            {/* 고객 후기 */}
            <div className="mb-8 rounded-2xl border border-emerald-200 bg-gradient-to-r from-[#F0FDF4] to-emerald-50 p-6">
              <div className="mb-6 text-center">
                <h3 className="heading-4 text-text-primary mb-3">💬 실제 고객 후기</h3>
                <p className="body-m text-text-secondary">간병인보험으로 도움을 받으신 분들의 이야기</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <span className="text-2xl">👩</span>
                    </div>
                    <div>
                      <h4 className="heading-5 text-text-primary">김○○님 (50대 직장인)</h4>
                      <p className="caption-s text-text-muted">어머니 뇌졸중으로 간병보험 이용</p>
                    </div>
                  </div>
                  <div className="body-s leading-relaxed text-text-secondary">
                    &ldquo;갑자기 어머니가 쓰러지셨는데, 다행히 간병보험이 있어서 경제적 걱정 없이 전문
                    간병인을 모실 수 있었어요. 직장을 그만두지 않고도 어머니를 잘 돌볼 수 있어 정말
                    감사해요.&rdquo;
                  </div>
                  <div className="mt-3 flex justify-end">
                    <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <span className="text-2xl">👨</span>
                    </div>
                    <div>
                      <h4 className="heading-5 text-text-primary">박○○님 (40대 자영업자)</h4>
                      <p className="caption-s text-text-muted">아버지 치매로 간병보험 이용</p>
                    </div>
                  </div>
                  <div className="body-s leading-relaxed text-text-secondary">
                    &ldquo;사업도 운영해야 하고 아버지 간병도 해야 하는 상황이었는데, 간병보험 덕분에
                    전문적인 케어를 받을 수 있었어요. 가족간병도 보험금이 나와서 큰 도움이
                    되었습니다.&rdquo;
                  </div>
                  <div className="mt-3 flex justify-end">
                    <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="caption-s text-text-muted">* 개인정보 보호를 위해 이름은 일부만 표기했습니다</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mb-8 rounded-2xl border border-emerald-200 bg-gradient-to-r from-[#F0FDF4] to-emerald-50 p-6">
              <div className="text-center">
                <h3 className="heading-4 text-emerald-700 mb-4">⏰ 지금 바로 준비하세요!</h3>
                <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
                  <p className="body-m mb-2 leading-relaxed text-text-primary">
                    <span className="font-bold text-emerald-600">갑작스러운 간병 상황</span>은 언제든 찾아올 수 있습니다.
                  </p>
                  <p className="body-s text-text-secondary">
                    미리 준비하지 않으면 <span className="font-semibold">월 360만원</span>의 간병비 부담이 현실이 됩니다.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    onClick={() => {
                      setModalType('consult');
                      setIsModalOpen(true);
                    }}
                    className="rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
                  >
                    🚀 지금 무료 상담받기
                  </button>
                  <span className="body-s text-text-secondary">간단한 정보 입력으로 맞춤 설계</span>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8 rounded-xl bg-[#F0FDF4] p-6">
              <h3 className="heading-4 text-text-primary mb-6 text-center">자주 묻는 질문 (FAQ)</h3>
              <div className="space-y-4">
                {[
                  { q: 'Q. 실비보험 있는데 꼭 필요해요?', a: '네. 실비보험은 의료비만 보장하고 간병비는 보장하지 않습니다. 간병인보험은 실비보험으로 해결할 수 없는 간병비를 별도로 보장합니다.' },
                  { q: 'Q. 보험료 많이 비싸요?', a: '대부분 월 2~5만원 수준으로 가입 가능합니다. 하루 간병비 12만원에 비해 매우 경제적입니다.' },
                  { q: 'Q. 기존 보험 있어도 상담 가능해요?', a: '네. 기존 보험과의 중복·부족 여부를 무료로 점검해드리고, 최적의 보장 설계를 도와드립니다.' },
                  { q: 'Q. 가족이 간병해도 보험금 받나요?', a: '간병비보험의 경우 가족간병시에도 보험금을 지급합니다. 다만 보험사별로 약관이 다르니 상담 시 확인해드립니다.' },
                  { q: 'Q. 치매보험과 간병보험의 차이점은?', a: '치매보험은 치매 진단 시 진단비를 지급하고, 간병보험은 실제 간병서비스 이용 시 간병비를 지급합니다. 두 보험 모두 상호 보완적 역할을 합니다.' },
                  { q: 'Q. 장기요양등급 판정 전에도 보장받나요?', a: '네. 간병보험은 장기요양등급 판정과 관계없이 의사의 간병 필요 소견서만으로도 보험금을 받을 수 있습니다.' },
                ].map(faq => (
                  <div key={faq.q} className="rounded-lg bg-white p-4">
                    <div className="heading-5 text-emerald-600 mb-2">{faq.q}</div>
                    <p className="body-s text-text-secondary">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 유의사항 ── */}
        <div className="flex w-full justify-center">
          <div className="mb-2 mt-6 w-full max-w-3xl px-6 py-0 caption-r text-text-primary md:mb-4 md:mt-8 md:max-w-4xl body-s lg:mb-6 lg:mt-10 lg:max-w-5xl">
            <div className="mb-1 button-s">[ 유의사항 ]</div>
            <div className="text-status-red">※ 본 안내물은 지면관계상 상품의 개략적인 내용을 요약·정리한 것이오니 가입 전에 상품의 약관 및 상품설명서를 자세히 읽어보시기 바랍니다.</div>
            <div>※ 가입 시 보험계약의 기본사항(보험 상품명, 보험기간, 보험료, 보험료 납입기간 등)을 반드시 확인하시기 바랍니다.</div>
            <div>※ 피보험자의 과거 건강상태, 직업 등 계약 전 알릴 의무를 사실대로 고지하지 않으면 보험금 지급이 제한되거나 계약이 해지될 수 있습니다.</div>
            <div>※ 본 상품은 간병비를 보장하는 보장성보험으로, 저축성보험과 비교하여 위험보험료 및 사업비가 더 많이 차감되므로 저축 목적에는 적합하지 않습니다.</div>
            <div>※ 해약환급금은 경과기간 및 해약공제에 따라 납입보험료보다 적거나 없을 수 있습니다.</div>
            <div>※ 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 &ldquo;1억원까지&rdquo;(본 보험회사의 여타 보호상품과 합산) 보호됩니다.</div>
            <div>※ 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 &ldquo;1억원까지&rdquo; 보호됩니다. 단, 보험계약자 및 보험료 납부자가 법인이면 보호되지 않습니다.</div>
            <div>※ 본 상품은 무배당 상품으로, 배당금이 지급되지 않습니다.</div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="w-full max-w-3xl px-6 md:max-w-4xl lg:max-w-5xl">
            <hr className="my-4 border-border-default" />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="mb-2 mt-2 w-full max-w-3xl px-6 py-0 caption-r text-text-primary md:mb-4 md:mt-4 md:max-w-4xl body-s lg:mb-6 lg:mt-6 lg:max-w-5xl">
            <div className="mb-1 button-s">[ 필수안내사항 ]</div>
            <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
            <div className="text-status-red">※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서</div>
            <div className="text-status-red">① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.</div>
            <div className="text-status-red">② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</div>
            <div>※ ㈜메타리치 심의필 25120102호 (2025.12.17~2026.12.16)</div>
          </div>
        </div>

        <Footer />

        {/* ── Floating Buttons ── */}
        {!isModalOpen && !showNotice && !isInputFocused && !isHeaderMenuOpen && (
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
            <button
              onClick={() => {
                setModalType('consult');
                setIsModalOpen(true);
              }}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border-default bg-white px-2 py-2 text-text-secondary shadow-lg transition-all duration-200 hover:bg-page-bg hover:shadow-xl sm:px-3 sm:py-3"
              aria-label="상담신청"
            >
              <span className="caption-s font-semibold">상담</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 sm:h-6 sm:w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button
              onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border-default bg-white px-2 py-2 text-text-secondary shadow-lg transition-all duration-200 hover:bg-page-bg hover:shadow-xl sm:px-3 sm:py-3"
              aria-label="카톡상담"
            >
              <span className="caption-s font-semibold">카톡</span>
              <img src="/images/icons/icon-kakaotalk.png" alt="카톡상담" className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full border border-border-default bg-white p-3 text-text-secondary shadow-lg transition-all duration-200 hover:bg-page-bg hover:shadow-xl sm:p-4"
              aria-label="맨 위로"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 sm:h-6 sm:w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
