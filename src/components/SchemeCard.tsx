import React from 'react';
import { Scheme } from '../types/schemes';
import { useLanguage } from '../context/LanguageContext';
import { Bookmark, CheckCircle2, ArrowRight, Building2, Users, Sparkles, Calendar, Wallet } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  matchScore?: number;
  relevanceText?: string;
  isSaved: boolean;
  onToggleSave: (scheme: Scheme) => void;
  onSelectScheme: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  matchScore,
  relevanceText,
  isSaved,
  onToggleSave,
  onSelectScheme,
}) => {
  const { t } = useLanguage();

  const categoryColors: Record<string, string> = {
    Farmers: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Women: 'bg-pink-50 text-pink-700 border-pink-200',
    Students: 'bg-blue-50 text-blue-700 border-blue-200',
    Seniors: 'bg-purple-50 text-purple-700 border-purple-200',
    Healthcare: 'bg-rose-50 text-rose-700 border-rose-200',
    Housing: 'bg-amber-50 text-amber-700 border-amber-200',
    MSME: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Disability: 'bg-teal-50 text-teal-800 border-teal-200',
  };

  const badgeClass = categoryColors[scheme.category] || 'bg-teal-50 text-teal-700 border-teal-200';

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-teal-300 shadow-sm hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Top Header Row */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeClass}`}>
              {scheme.category}
            </span>

            <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>{scheme.state ? scheme.state : `${scheme.sponsoringBody} Govt`}</span>
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(scheme);
            }}
            className={`p-2 rounded-xl transition-all ${
              isSaved
                ? 'bg-teal-100 text-teal-700 font-bold scale-105'
                : 'text-slate-400 hover:text-teal-600 hover:bg-teal-50'
            }`}
            title={isSaved ? "Saved scheme" : "Save scheme"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-teal-700' : ''}`} />
          </button>
        </div>

        {/* AI Vector Match Badge if present */}
        {matchScore !== undefined && (
          <div className="mb-3 inline-flex items-center space-x-1.5 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{matchScore}% {t('matchPercentage')}</span>
            {relevanceText && <span className="text-[10px] text-teal-600 font-normal">({relevanceText})</span>}
          </div>
        )}

        {/* Department Name */}
        <div className="text-[11px] font-semibold text-slate-400 truncate uppercase tracking-wider mb-1">
          {scheme.department}
        </div>

        {/* Scheme Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
          {scheme.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          {scheme.shortDescription}
        </p>

        {/* Target Beneficiaries & Income Group */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate max-w-[150px]">{scheme.targetGroup}</span>
          </div>

          {scheme.incomeGroup && (
            <div className="flex items-center space-x-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <Wallet className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] text-slate-700 font-bold">{scheme.incomeGroup}</span>
            </div>
          )}
        </div>

        {/* Key Benefits Snippet */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          {scheme.benefits.slice(0, 2).map((benefit: string, idx: number) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-2 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center space-x-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>{scheme.deadline || 'Open All Year'}</span>
        </span>

        <button
          onClick={() => onSelectScheme(scheme)}
          className="flex items-center space-x-1.5 text-xs font-extrabold text-teal-700 hover:text-teal-800 hover:underline transition-colors bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200/80"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
