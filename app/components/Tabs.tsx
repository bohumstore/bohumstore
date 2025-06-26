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
            className={`flex-1 pb-4 border-b-4 ${
              active === label 
                ? 'border-[#3a8094] text-[#3a8094]' 
                : 'border-transparent text-[#333] hover:text-[#3a8094]'
            }`}
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
