import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardShell } from './components/DashboardShell';
import { GovSchemePortal } from './components/gov-portal/GovSchemePortal';

export const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [viewState, setViewState] = useState<'portal_login' | 'portal_register' | 'dashboard'>('portal_login');

  if (viewState === 'portal_login') {
    return (
      <GovSchemePortal
        defaultView="login"
        onLaunchDashboard={() => setViewState('dashboard')}
      />
    );
  }

  if (viewState === 'portal_register') {
    return (
      <GovSchemePortal
        defaultView="register"
        onLaunchDashboard={() => setViewState('dashboard')}
      />
    );
  }

  return (
    <div className="relative">
      {/* Top Banner to switch back to Official Government Portal Login/Registration */}
      <div className="bg-[#0b3d91] text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between border-b border-[#ff9933]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>National Scheme Portal • Citizen Dashboard Preview Mode</span>
        </div>
        <button
          type="button"
          onClick={() => setViewState('portal_login')}
          className="bg-[#ff9933] text-slate-950 px-3 py-1 rounded text-[11px] font-extrabold hover:bg-amber-400 transition-all"
        >
          ← Return to Citizen Login / Register
        </button>
      </div>

      <DashboardShell />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
