import React from 'react';

interface EmblemIconProps {
  className?: string;
  size?: number;
}

export const EmblemIcon: React.FC<EmblemIconProps> = ({ className = "w-10 h-10", size = 40 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#fbf3d5] via-[#ffffff] to-[#f7dfa5] border-2 border-[#d4af37] shadow-sm shrink-0 overflow-hidden ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="p-1"
        aria-label="Government Emblem Placeholder"
      >
        {/* Outer Circular Ring */}
        <circle cx="50" cy="50" r="46" stroke="#0b3d91" strokeWidth="2.5" fill="none" />
        <circle cx="50" cy="50" r="43" stroke="#d4af37" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        
        {/* Ashoka Chakra Center Emblem */}
        <g transform="translate(50, 42)">
          <circle cx="0" cy="0" r="16" fill="none" stroke="#0b3d91" strokeWidth="2" />
          <circle cx="0" cy="0" r="3" fill="#0b3d91" />
          {/* 24 Spokes (simplified 12 radial spokes) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={16 * Math.cos((deg * Math.PI) / 180)}
              y2={16 * Math.sin((deg * Math.PI) / 180)}
              stroke="#0b3d91"
              strokeWidth="1.2"
            />
          ))}
        </g>

        {/* Base Pillar / Lions Base */}
        <path
          d="M30 68 L70 68 L66 74 L34 74 Z"
          fill="#0b3d91"
        />
        <rect x="25" y="75" width="50" height="4" rx="2" fill="#d4af37" />

        {/* Satyameva Jayate Motto Text Arc Placeholder */}
        <text
          x="50"
          y="88"
          textAnchor="middle"
          fill="#062a63"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="serif"
          letterSpacing="0.5"
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
};
