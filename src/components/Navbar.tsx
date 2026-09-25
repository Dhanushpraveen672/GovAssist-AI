import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Globe, Compass, CheckCircle2, Bookmark, FileText, Menu, X, Bot, Landmark, User, LogOut, LogIn } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'schemes' | 'eligibility' | 'tracker' | 'saved' | 'signin' | 'signup';
  setActiveTab: (tab: 'home' | 'schemes' | 'eligibility' | 'tracker' | 'saved' | 'signin' | 'signup') => void;
  openGovBot: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openGovBot,
  savedCount
}) => {
  const { currentLang, setLanguage, t, languages } = useLanguage();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedLangObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-teal-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-teal-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-teal-900 font-sans">
                  {t('appName')}
                </span>
                <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-teal-200">
                  AI Platform
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Digital Welfare & Eligibility Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
              }`}
            >
              <span>{t('navHome')}</span>
            </button>

            <button
              onClick={() => setActiveTab('schemes')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'schemes'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
              }`}
            >
              <Compass className="w-4 h-4 text-teal-600" />
              <span>{t('navSchemes')}</span>
            </button>

            <button
              onClick={() => setActiveTab('eligibility')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'eligibility'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>{t('navEligibility')}</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'tracker'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
              }`}
            >
              <FileText className="w-4 h-4 text-teal-600" />
              <span>{t('navTracker')}</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'saved'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
              }`}
            >
              <Bookmark className="w-4 h-4 text-teal-600" />
              <span>{t('navSaved')}</span>
              {savedCount > 0 && (
                <span className="bg-teal-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Bar (GovBot AI + User Account + Language Switcher) */}
          <div className="flex items-center space-x-3">
            {/* GovBot Button */}
            <button
              onClick={openGovBot}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white font-semibold px-3.5 py-2 rounded-xl shadow-soft hover:shadow-teal-glow transition-all active:scale-95 text-xs sm:text-sm"
            >
              <Bot className="w-4 h-4 text-teal-200 animate-pulse" />
              <span className="hidden sm:inline">{t('btnAskAI')}</span>
            </button>

            {/* Authenticated User Badge / Sign In Button */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserOpen(!isUserOpen)}
                  className="flex items-center space-x-2 bg-teal-100/70 border border-teal-300 text-teal-900 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                </button>

                {isUserOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-teal-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-teal-900 truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsUserOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('signin')}
                className="flex items-center space-x-1.5 bg-teal-50 border border-teal-300 text-teal-900 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm hover:bg-teal-100 transition-colors"
              >
                <LogIn className="w-4 h-4 text-teal-700" />
                <span>Sign In</span>
              </button>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 text-teal-900 text-xs sm:text-sm font-medium px-3 py-2 rounded-xl transition-all"
              >
                <Globe className="w-4 h-4 text-teal-700" />
                <span className="font-semibold">{selectedLangObj.nativeName}</span>
                <span className="text-[10px] text-teal-600">▼</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-soft-lg border border-teal-100 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Language / भाषा
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm font-medium flex items-center justify-between hover:bg-teal-50 transition-colors ${
                        currentLang === lang.code ? 'text-teal-700 font-bold bg-teal-50/70' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-slate-400 text-xs">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-teal-100 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'home' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700'
            }`}
          >
            <span>{t('navHome')}</span>
          </button>
          <button
            onClick={() => { setActiveTab('schemes'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'schemes' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4 text-teal-600" />
            <span>{t('navSchemes')}</span>
          </button>
          <button
            onClick={() => { setActiveTab('eligibility'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'eligibility' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>{t('navEligibility')}</span>
          </button>
          <button
            onClick={() => { setActiveTab('tracker'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'tracker' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>{t('navTracker')}</span>
          </button>
          <button
            onClick={() => { setActiveTab('saved'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'saved' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4 text-teal-600" />
            <span>{t('navSaved')}</span>
            {savedCount > 0 && (
              <span className="ml-auto bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
