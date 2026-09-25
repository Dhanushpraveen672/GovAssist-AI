import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, languages, currentLang, setLanguage } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white">{t('appName')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Citizen Welfare Scheme Discovery, Eligibility Diagnostic & Step-by-Step Application Platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Key Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://myscheme.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center space-x-1">
                  <span>MyScheme India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center space-x-1">
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pmjay.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center space-x-1">
                  <span>Ayushman Bharat</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-400 flex items-center space-x-1">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Languages */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Languages / भाषाएं</h4>
            <div className="flex flex-wrap gap-1.5">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                    currentLang === lang.code
                      ? 'bg-teal-600 text-white border-teal-500 font-bold'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>

          {/* Trust & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Citizen Safety</h4>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs space-y-1">
              <div className="flex items-center space-x-1 text-teal-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Data Storage</span>
              </div>
              <p className="text-[11px] text-slate-400">
                GovAssist AI does not store sensitive identity numbers or personal documents.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 GovAssist AI. Empowering 1.4 Billion Citizens across India.</p>
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-teal-500 fill-teal-500" />
            <span>for Citizens of India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
