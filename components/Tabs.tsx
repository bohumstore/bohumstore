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
            className={`relative flex-1 cursor-pointer whitespace-nowrap outline-none pb-4 heading-3 transition after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:content-[''] ${
              active === label
                ? 'text-brand-primary after:bg-brand-primary'
                : 'text-brand-primary/60 after:bg-transparent hover:text-brand-primary hover:after:bg-brand-primary/30'
            } `}
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
