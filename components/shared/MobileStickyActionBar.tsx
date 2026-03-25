'use client';

const BUTTONS = [
  { label: '보험료 계산', icon: '/svgs/common/actions/calculate.svg', event: 'floatingCalculate' },
  { label: '상담 신청',   icon: '/svgs/common/actions/consult.svg',    event: 'floatingConsult' },
  { label: '카카오톡 상담', icon: '/svgs/common/actions/kakao.svg', event: null },
] as const;

interface MobileStickyActionBarProps {
  visible?: boolean;
  showCalculator?: boolean;
  showConsult?: boolean;
  kakaoUrl?: string;
}

export default function MobileStickyActionBar({
  visible = true,
  showCalculator = true,
  showConsult = true,
  kakaoUrl = 'https://pf.kakao.com/_lrubxb/chat',
}: MobileStickyActionBarProps) {
  const dispatch = (name: string) => window.dispatchEvent(new CustomEvent(name));

  const visibleButtons = BUTTONS.filter((b) => {
    if (b.event === 'floatingCalculate') return showCalculator;
    if (b.event === 'floatingConsult') return showConsult;
    return true;
  });

  const handleClick = (b: typeof BUTTONS[number]) => {
    if (b.event) dispatch(b.event);
    else window.open(kakaoUrl, '_blank');
  };

  return (
    <div
      className={`w-80 md:hidden fixed bottom-0 pb-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        visible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >

      {/* 바 */}
      <div className="bg-white border-t border-border-default rounded-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-stretch max-w-sm mx-auto">
          {visibleButtons.map((btn, i) => (
            <div key={i} className="flex items-stretch flex-1">
              {i > 0 && <div className="w-px self-stretch bg-border-default my-3" />}
              <button
                onClick={() => handleClick(btn)}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 active:bg-page-bg transition-colors"
                aria-label={btn.label}
              >
                <div
                  className="w-6 h-6 bg-text-secondary"
                  style={{
                    maskImage: `url(${btn.icon})`,
                    WebkitMaskImage: `url(${btn.icon})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                />
                <span className="body-m text-text-secondary">{btn.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
