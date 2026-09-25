import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { NotificationCenter } from './NotificationCenter';
import { Scheme } from '../types/schemes';
import {
  Bell,
  Globe,
  Menu,
  User,
  LogOut,
  Sparkles,
  ChevronDown,
  Wifi,
  Zap,
} from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu: () => void;
  onNavigateToProfile: () => void;
  onSelectScheme?: (scheme: Scheme) => void;
  isLowBandwidth?: boolean;
  onToggleLowBandwidth?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileMenu,
  onNavigateToProfile,
  onSelectScheme,
  isLowBandwidth = false,
  onToggleLowBandwidth,
}) => {
  const { user, signOut } = useAuth();
  const { currentLang, setLanguage, languages, t } = useLanguage();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const selectedLangObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <header
      className={`sticky top-0 z-20 border-b border-teal-100/80 px-4 sm:px-6 py-3 transition-colors ${
        isLowBandwidth ? 'bg-white' : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button + Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:text-teal-800 hover:bg-teal-50 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex items-center space-x-2 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-full text-xs font-extrabold text-teal-900">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
            <span>Official Citizen Portal</span>
          </div>

          {/* Rural Low-Bandwidth Mode Toggle Button */}
          {onToggleLowBandwidth && (
            <button
              onClick={onToggleLowBandwidth}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                isLowBandwidth
                  ? 'bg-amber-100 border border-amber-300 text-amber-900'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Toggle Low-Bandwidth Mode for 2G/3G connections"
            >
              {isLowBandwidth ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('lowBandwidthMode', 'Low-Bandwidth (2G/3G)')}</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden lg:inline">{t('normalMode', 'Standard Mode')}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Right Side: Notifications + Language Switcher + User Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Notifications Icon with Badge */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200/80 transition-colors relative focus:ring-2 focus:ring-teal-500 focus:outline-none"
            aria-label="Open notification center"
            title="Notifications & Alerts"
          >
            <Bell className="w-4 h-4 text-slate-800" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-teal-600 ring-2 ring-white animate-pulse" />
          </button>

          {/* Interactive Notification Center Component Drawer */}
          <NotificationCenter
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            onSelectScheme={onSelectScheme}
          />

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1.5 bg-slate-50 hover:bg-teal-50 border border-slate-200/80 text-teal-950 text-xs font-bold px-3 py-2 rounded-xl transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-expanded={isLangOpen}
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
              <span>{selectedLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" aria-hidden="true" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-teal-100 py-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language / भाषा
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between hover:bg-teal-50 ${
                      currentLang === lang.code ? 'text-teal-800 bg-teal-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-slate-400 text-[10px]">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <div className="relative">
            <button
              onClick={() => setIsUserOpen(!isUserOpen)}
              className="flex items-center space-x-2 bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-950 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-expanded={isUserOpen}
              aria-label="User Account Menu"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-800 to-teal-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                {user ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold leading-tight max-w-[110px] truncate">
                  {user ? user.name : 'Citizen User'}
                </div>
                <div className="text-[10px] text-teal-800 font-extrabold leading-none">
                  {user?.state || 'Verified Citizen'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-teal-800 hidden sm:block" aria-hidden="true" />
            </button>

            {isUserOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-teal-100 py-2 z-50 animate-in fade-in duration-100">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-teal-950 truncate">{user?.name || 'Citizen User'}</div>
                  <div className="text-[10px] text-slate-500 truncate">{user?.email || 'citizen@govassist.in'}</div>
                </div>

                <button
                  onClick={() => {
                    onNavigateToProfile();
                    setIsUserOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-teal-50 flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                  <span>Profile & Documents</span>
                </button>

                <button
                  onClick={() => {
                    signOut();
                    setIsUserOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-extrabold text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
