import React, { ReactNode, useState } from 'react';

interface Tab {
  label: string;
  content: ReactNode;
}

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <div>
      <nav className="mb-6 flex border-b">
        {tabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`relative flex-1 cursor-pointer whitespace-nowrap pb-3 text-base font-bold transition after:absolute after:bottom-0 after:left-0 after:h-1.5 after:w-full after:rounded after:content-[''] sm:pb-4 sm:text-lg md:text-xl lg:text-2xl ${
              active === label
                ? 'text-[#3a8094] after:bg-[#3a8094]'
                : 'text-[#333] after:bg-transparent hover:text-[#3a8094] hover:after:bg-[#3a8094]'
            } `}
            style={{ outline: 'none' }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div>
        {tabs.map((tab) =>
          tab.label === active ? (
            <div key={tab.label} className="space-y-8 px-4 py-6">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
