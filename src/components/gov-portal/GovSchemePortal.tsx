import React, { useState, useEffect } from 'react';
import { TricolorStrip } from './TricolorStrip';
import { GovHeader } from './GovHeader';
import { GovFooter } from './GovFooter';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { ShieldCheck, Info, Sparkles, LayoutDashboard } from 'lucide-react';

interface GovSchemePortalProps {
  onLaunchDashboard?: () => void;
  defaultView?: 'login' | 'register';
}

export const GovSchemePortal: React.FC<GovSchemePortalProps> = ({
  onLaunchDashboard,
  defaultView = 'login',
}) => {
  const [activePage, setActivePage] = useState<'login' | 'register'>(defaultView);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<'system' | 'light' | 'dark'>('system');
  const [userLoggedIn, setUserLoggedIn] = useState<{ username: string } | null>(null);

  // Sync dark mode class on <html> or container
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode === 'dark') {
      root.classList.add('dark');
    } else if (darkMode === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [darkMode]);

  // Handle font size scaling inline
  const getFontSizeStyle = () => {
    if (fontSizeLevel === 1) return { fontSize: '108%' };
    if (fontSizeLevel === -1) return { fontSize: '92%' };
    return { fontSize: '100%' };
  };

  const handleLoginSuccess = (data: { username: string }) => {
    setUserLoggedIn(data);
    if (onLaunchDashboard) {
      setTimeout(() => {
        onLaunchDashboard();
      }, 1200);
    }
  };

  return (
    <div
      style={getFontSizeStyle()}
      className="min-h-screen flex flex-col bg-[#f4f6f9] dark:bg-[#0c192c] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-[#ff9933] selection:text-slate-950 pb-safe pt-safe"
    >
      {/* 1. Indian Tricolor Strip at Very Top */}
      <TricolorStrip />

      {/* 2. Official Government Header */}
      <GovHeader
        fontSizeLevel={fontSizeLevel}
        setFontSizeLevel={setFontSizeLevel}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activePage={activePage}
        onSwitchPage={setActivePage}
      />

      {/* Official Notice Ticker Bar */}
      <div className="bg-[#0b3d91]/5 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 dark:text-slate-300 gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-[#ff9933] text-slate-950 font-extrabold px-2 py-0.5 rounded text-[10px] uppercase shrink-0">
              Notice
            </span>
            <p className="truncate">
              Aadhaar authentication is recommended for direct benefit transfer (DBT) scheme eligibility verification.
            </p>
          </div>

          {onLaunchDashboard && (
            <button
              type="button"
              onClick={onLaunchDashboard}
              className="text-[#0b3d91] dark:text-sky-400 font-bold hover:underline flex items-center space-x-1 shrink-0 text-[11px]"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#ff9933]" />
              <span>Explore All 500+ Schemes (Guest Mode)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Form Page Area */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 sm:py-10 px-4 relative overflow-hidden" role="main">
        
        {/* Subtle Background Backdrop Graphics */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#0b3d91]/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ff9933]/5 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Dynamic Page Component: Login vs Registration */}
        {activePage === 'login' ? (
          <LoginPage
            onNavigateToRegister={() => setActivePage('register')}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <RegistrationPage
            onNavigateToLogin={() => setActivePage('login')}
            onRegistrationSuccess={() => setActivePage('login')}
          />
        )}

      </main>

      {/* 3. Official Government Footer */}
      <GovFooter />
    </div>
  );
};
