import React, { useEffect } from 'react';
import { EligibilityResult, CitizenProfile, Scheme } from '../types/schemes';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, ArrowRight, Bookmark, Sparkles, RefreshCw, XCircle } from 'lucide-react';

interface EligibilityResultsProps {
  results: EligibilityResult[];
  profile: CitizenProfile;
  onSelectScheme: (scheme: Scheme) => void;
  savedSchemeIds: string[];
  onToggleSave: (scheme: Scheme) => void;
  onRecalculate: () => void;
}

export const EligibilityResults: React.FC<EligibilityResultsProps> = ({
  results,
  profile,
  onSelectScheme,
  savedSchemeIds,
  onToggleSave,
  onRecalculate,
}) => {
  const { t } = useLanguage();

  const fullyEligibleCount = results.filter(r => r.status === 'Eligible').length;
  const partiallyEligibleCount = results.filter(r => r.status === 'Partially Eligible').length;

  useEffect(() => {
    if (fullyEligibleCount > 0) {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#0F766E', '#14B8A6', '#5EEAD4', '#FF9933']
      });
    }
  }, [fullyEligibleCount]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner Summary */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-teal-800/80 text-teal-200 text-xs font-bold px-3 py-1 rounded-full border border-teal-600 mb-3">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>AI Matching Engine Verdict</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black">
            You Are Eligible for <span className="text-teal-300">{fullyEligibleCount} Schemes</span>
            {partiallyEligibleCount > 0 && <span className="text-amber-300 text-xl font-bold font-sans"> ({partiallyEligibleCount} Partially Eligible)</span>}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-teal-100/90 max-w-3xl leading-relaxed">
            Profile Evaluated: Age {profile.age || '28'}, {profile.gender}, {profile.occupation}, Land: {profile.landOwnership || 'None'}, Family Size: {profile.familySize || 4}, Income: ₹{(profile.annualIncome || 0).toLocaleString('en-IN')}/yr, State: {profile.state || 'All India'}.
          </p>
        </div>

        <button
          onClick={onRecalculate}
          className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl border border-white/20 text-xs flex items-center space-x-2 shrink-0 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Edit Citizen Profile</span>
        </button>
      </div>

      {/* Ranked Scheme Results */}
      <div className="space-y-6">
        {results.map(({ scheme, matchScore, status, matchedCriteria, unmetCriteria, customGuidance }) => {
          const isSaved = savedSchemeIds.includes(scheme.id);

          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-soft-lg ${
                status === 'Eligible'
                  ? 'border-emerald-300 ring-1 ring-emerald-200'
                  : status === 'Partially Eligible'
                  ? 'border-amber-300 ring-1 ring-amber-100'
                  : 'border-slate-200 opacity-90'
              }`}
            >
              <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left Column: Scheme Metadata & Reasoning */}
                <div className="flex-1 space-y-3">
                  
                  {/* Status Pill & Category */}
                  <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      status === 'Eligible'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : status === 'Partially Eligible'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      {status === 'Eligible' ? '✓ Fully Eligible' : status === 'Partially Eligible' ? `⚠️ Partially Eligible (${unmetCriteria.length} criteria missing)` : '✕ Ineligible'} ({matchScore}% Score)
                    </span>

                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {scheme.category}
                    </span>

                    <span className="text-xs font-medium text-slate-500">
                      {scheme.department || `${scheme.sponsoringBody} Govt`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectScheme(scheme)}
                    className="text-xl font-black text-slate-900 hover:text-teal-700 transition-colors cursor-pointer"
                  >
                    {scheme.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {scheme.shortDescription}
                  </p>

                  {/* AI Reasoning Pills (Matched vs Missing) */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      AI Diagnostic Reasoning Breakdown:
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {matchedCriteria.map((c: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Matched: {c}</span>
                        </span>
                      ))}

                      {unmetCriteria.map((c: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center space-x-1 bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Missing: {c}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column: Actions */}
                <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-8">
                  
                  <button
                    onClick={() => onSelectScheme(scheme)}
                    className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-soft text-xs sm:text-sm transition-all"
                  >
                    <span>Apply Guidance</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onToggleSave(scheme)}
                    className={`p-3 rounded-2xl border transition-all text-xs font-bold flex items-center justify-center space-x-2 ${
                      isSaved
                        ? 'bg-teal-50 border-teal-300 text-teal-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-teal-200'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-teal-700 text-teal-700' : ''}`} />
                    <span>{isSaved ? "Saved" : "Save Scheme"}</span>
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
