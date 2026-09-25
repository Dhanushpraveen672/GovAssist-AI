import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Compass, CheckCircle2, FileText, Bookmark, Bot, UserCheck, ShieldCheck, ArrowRight, Sparkles, Landmark, X } from 'lucide-react';

export type DashboardRoute = 'schemes' | 'eligibility' | 'applications' | 'saved' | 'chat' | 'profile' | 'admin';

interface SidebarProps {
  activeRoute: DashboardRoute;
  setActiveRoute: (route: DashboardRoute) => void;
  savedCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeRoute,
  setActiveRoute,
  savedCount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { t } = useLanguage();

  const navItems = [
    {
      id: 'schemes' as DashboardRoute,
      label: t('navHome', 'Home / Schemes'),
      icon: Compass,
    },
    {
      id: 'eligibility' as DashboardRoute,
      label: t('navEligibility', 'Eligibility Checker'),
      icon: CheckCircle2,
      badge: '60s AI',
    },
    {
      id: 'applications' as DashboardRoute,
      label: t('navTracker', 'My Applications'),
      icon: FileText,
    },
    {
      id: 'saved' as DashboardRoute,
      label: t('navSaved', 'Saved Schemes'),
      icon: Bookmark,
      count: savedCount,
    },
    {
      id: 'chat' as DashboardRoute,
      label: t('btnAskAI', 'Chat with AI Assistant'),
      icon: Bot,
      highlight: true,
    },
    {
      id: 'profile' as DashboardRoute,
      label: t('navProfile', 'Profile & Documents'),
      icon: UserCheck,
    },
    {
      id: 'admin' as DashboardRoute,
      label: t('navAdmin', 'Admin Panel'),
      icon: ShieldCheck,
      adminBadge: true,
    },
  ];

  const content = (
    <div className="h-full flex flex-col justify-between p-4 bg-white border-r border-teal-100/80" role="navigation" aria-label="Main Navigation">
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-800 via-teal-700 to-teal-600 flex items-center justify-center text-white shadow-soft">
              <Landmark className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-teal-950 font-sans">GovAssist AI</span>
              <p className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider">Citizen Portal</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prominent Primary CTA Button */}
        <div className="p-3 bg-gradient-to-br from-teal-950 to-teal-800 rounded-2xl text-white shadow-soft space-y-2">
          <div className="flex items-center space-x-1.5 text-teal-300 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>AI Diagnostic Engine</span>
          </div>
          <div className="text-xs font-bold leading-snug">Check your eligibility for 500+ scheme benefits</div>
          <button
            onClick={() => {
              setActiveRoute('eligibility');
              onCloseMobile();
            }}
            className="w-full mt-1 bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 text-teal-950 font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all focus:ring-2 focus:ring-teal-400 focus:outline-none"
          >
            <span>{t('btnCheckEligibility', 'Check Eligibility Now')}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveRoute(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  isActive
                    ? 'bg-teal-50 text-teal-950 border-r-4 border-teal-700 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-teal-800'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-800' : 'text-slate-400'}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="bg-teal-100 text-teal-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}

                {item.adminBadge && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className="bg-teal-700 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                )}

                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
        <div className="font-bold text-slate-800">Digital India Gateway</div>
        <div>Version 2.0 • Multilingual Accessibility</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-72 h-full bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
          <div className="flex-1" onClick={onCloseMobile} aria-hidden="true" />
        </div>
      )}
    </>
  );
};
