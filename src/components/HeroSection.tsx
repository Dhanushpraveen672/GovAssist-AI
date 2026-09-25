import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight, ShieldCheck, Search, Users, Award, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onStartEligibility: () => void;
  onExploreSchemes: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartEligibility,
  onExploreSchemes,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-50/80 via-teal-50/30 to-white py-12 md:py-20 border-b border-teal-100/60">
      
      {/* Background Decorative Glow Bubbles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-20 right-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Official Badge */}
          <div className="inline-flex items-center space-x-2 bg-teal-100/80 border border-teal-300 text-teal-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{t('badgeText')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Empowering Every Citizen to Claim Their{' '}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 bg-clip-text text-transparent">
              Government Benefits
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartEligibility}
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white font-bold px-7 py-4 rounded-2xl shadow-soft hover:shadow-teal-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('btnCheckEligibility')}</span>
              <ArrowRight className="w-5 h-5 text-teal-200" />
            </button>

            <button
              onClick={onExploreSchemes}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-teal-50/60 text-teal-800 font-bold px-6 py-4 rounded-2xl border border-teal-200 shadow-sm transition-all"
            >
              <Search className="w-5 h-5 text-teal-600" />
              <span>{t('btnExploreSchemes')}</span>
            </button>
          </div>

          {/* Value Proposition Highlights Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-teal-100 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-teal-900">500+</div>
              <div className="text-xs text-slate-500 font-medium">Verified Schemes</div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-teal-100 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-teal-900">60 sec</div>
              <div className="text-xs text-slate-500 font-medium">AI Eligibility Match</div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-teal-100 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-teal-900">6 Languages</div>
              <div className="text-xs text-slate-500 font-medium">Multilingual Guidance</div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-teal-100 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-teal-900">100% Free</div>
              <div className="text-xs text-slate-500 font-medium">Citizen First AI</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
