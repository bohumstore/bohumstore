import React, { ReactNode, useState } from 'react';

interface Tab {
  label: string;
  content: ReactNode;
}

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <div>
      <nav className="flex border-b mb-6">
        {tabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`flex-1 pb-3 sm:pb-4 font-bold transition relative whitespace-nowrap after:absolute after:left-0 after:bottom-0 after:w-full after:h-1.5 after:rounded after:content-[''] text-base sm:text-lg md:text-xl lg:text-2xl cursor-pointer
              ${
                active === label
                  ? 'text-[#3a8094] after:bg-[#3a8094]'
                  : 'text-[#333] hover:text-[#3a8094] after:bg-transparent hover:after:bg-[#3a8094]'
              }
            `}
            style={{ outline: 'none' }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div>
        {tabs.map(tab =>
          tab.label === active ? (
            <div key={tab.label} className="px-4 py-6 space-y-8">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
