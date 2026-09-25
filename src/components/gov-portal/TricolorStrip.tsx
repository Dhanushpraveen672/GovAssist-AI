import React from 'react';

export const TricolorStrip: React.FC = () => {
  return (
    <div className="w-full flex h-[5px] select-none pointer-events-none sticky top-0 z-50 shadow-sm" aria-hidden="true">
      <div className="flex-1 bg-[#ff9933]" title="Saffron - Courage & Sacrifice" />
      <div className="flex-1 bg-[#ffffff] border-y border-slate-200/40 relative flex items-center justify-center" title="White - Peace & Truth" />
      <div className="flex-1 bg-[#138808]" title="Green - Faith & Chivalry" />
    </div>
  );
};
