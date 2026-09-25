import React from 'react';
import { EmblemIcon } from './EmblemIcon';
import { Sun, Moon, Monitor, PhoneCall, Shield } from 'lucide-react';

interface GovHeaderProps {
  fontSizeLevel: number; // 0: Normal (100%), 1: Large (110%), -1: Small (90%)
  setFontSizeLevel: (level: number) => void;
  darkMode: 'system' | 'light' | 'dark';
  setDarkMode: (mode: 'system' | 'light' | 'dark') => void;
  activePage: 'login' | 'register';
  onSwitchPage: (page: 'login' | 'register') => void;
}

export const GovHeader: React.FC<GovHeaderProps> = ({
  fontSizeLevel,
  setFontSizeLevel,
  darkMode,
  setDarkMode,
  activePage,
  onSwitchPage,
}) => {
  return (
    <header className="w-full bg-gradient-to-r from-[#0b3d91] via-[#08337a] to-[#062a63] text-white border-b-4 border-[#ff9933] shadow-md relative z-40">
      {/* Top Utility Accessibility Bar */}
      <div className="bg-[#041c44]/80 backdrop-blur-sm border-b border-white/10 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Government of India Left Badge */}
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="font-semibold tracking-wide text-[11px] sm:text-xs">
              GOVERNMENT OF INDIA • भारत सरकार
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              Ministry of Electronics & Information Technology
            </span>
          </div>

          {/* Right Controls: Font Zoom, Dark Mode, Emergency Contact */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px] sm:text-xs">
            {/* Font Size Accessibility Controls */}
            <div className="flex items-center bg-white/10 rounded px-1.5 py-0.5 border border-white/15 space-x-1">
              <span className="text-slate-300 text-[10px] hidden sm:inline mr-1">Text Size:</span>
              <button
                type="button"
                onClick={() => setFontSizeLevel(-1)}
                title="Decrease Font Size"
                aria-label="Decrease Font Size"
                className={`px-1.5 py-0.5 rounded hover:bg-white/20 font-bold transition-all text-[11px] ${
                  fontSizeLevel === -1 ? 'bg-[#ff9933] text-slate-900' : 'text-slate-200'
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel(0)}
                title="Reset Font Size"
                aria-label="Reset Font Size"
                className={`px-1.5 py-0.5 rounded hover:bg-white/20 font-bold transition-all text-[11px] ${
                  fontSizeLevel === 0 ? 'bg-[#ff9933] text-slate-900' : 'text-slate-200'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel(1)}
                title="Increase Font Size"
                aria-label="Increase Font Size"
                className={`px-1.5 py-0.5 rounded hover:bg-white/20 font-bold transition-all text-[11px] ${
                  fontSizeLevel === 1 ? 'bg-[#ff9933] text-slate-900' : 'text-slate-200'
                }`}
              >
                A+
              </button>
            </div>

            {/* Dark Mode Selector */}
            <div className="flex items-center bg-white/10 rounded px-1.5 py-0.5 border border-white/15 space-x-1">
              <button
                type="button"
                onClick={() => setDarkMode('light')}
                title="Light Mode"
                aria-label="Light Mode"
                className={`p-1 rounded hover:bg-white/20 transition-all ${
                  darkMode === 'light' ? 'bg-[#ff9933] text-slate-900' : 'text-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDarkMode('dark')}
                title="Dark Mode"
                aria-label="Dark Mode"
                className={`p-1 rounded hover:bg-white/20 transition-all ${
                  darkMode === 'dark' ? 'bg-[#ff9933] text-slate-900' : 'text-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDarkMode('system')}
                title="System Preferred Mode"
                aria-label="System Preferred Mode"
                className={`p-1 rounded hover:bg-white/20 transition-all ${
                  darkMode === 'system' ? 'bg-[#ff9933] text-slate-900' : 'text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Toll Free Helpline */}
            <div className="hidden sm:flex items-center space-x-1 text-emerald-300 font-bold">
              <PhoneCall className="w-3 h-3 text-[#ff9933]" />
              <span>Toll Free: 1800-11-0001</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Brand Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Emblem + Portal Name + Tagline */}
        <div className="flex items-center space-x-3.5 sm:space-x-4 text-center sm:text-left">
          {/* Circular Government Emblem Placeholder */}
          <EmblemIcon size={46} className="shadow-md" />

          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
                National Scheme Portal
              </h1>
              <span className="hidden lg:inline-block bg-[#138808] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                Official
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200/90 font-medium">
              Government Welfare Schemes — Beneficiary Login
            </p>
          </div>
        </div>

        {/* Page Quick Switcher Pills */}
        <div className="flex items-center space-x-2 bg-[#041c44]/60 p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => onSwitchPage('login')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activePage === 'login'
                ? 'bg-[#ff9933] text-slate-950 shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            Beneficiary Login
          </button>
          <button
            type="button"
            onClick={() => onSwitchPage('register')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activePage === 'register'
                ? 'bg-[#138808] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            New Registration
          </button>
        </div>

      </div>
    </header>
  );
};
