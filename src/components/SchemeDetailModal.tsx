import React, { useState, useEffect } from 'react';
import { Scheme } from '../types/schemes';
import { DocumentChecklist } from './DocumentChecklist';
import { useLanguage } from '../context/LanguageContext';
import { X, ExternalLink, CheckCircle2, Bot, Bookmark, ListOrdered, ShieldCheck, Building2, Calendar, Wallet, Sparkles, ArrowRight } from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (scheme: Scheme) => void;
  onOpenGovBotForScheme: (scheme: Scheme) => void;
  onNavigateToEligibility?: () => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  isSaved,
  onToggleSave,
  onOpenGovBotForScheme,
  onNavigateToEligibility,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'apply' | 'documents'>('overview');

  // ESC key listener for modal trap closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && scheme) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scheme, onClose]);

  if (!scheme) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scheme-modal-title"
    >
      
      {/* Modal Container Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-teal-100 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 text-white p-6 sm:p-8 shrink-0">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="bg-teal-800/90 text-teal-100 text-xs font-black px-3 py-1 rounded-full border border-teal-600">
                {scheme.category}
              </span>
              <span className="text-xs text-teal-200 font-bold flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{scheme.state ? `${scheme.state} State Scheme` : `${scheme.sponsoringBody} Government`}</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleSave(scheme)}
                className={`p-2.5 rounded-xl border transition-all focus:ring-2 focus:ring-teal-400 focus:outline-none ${
                  isSaved ? 'bg-white text-teal-900 border-white' : 'bg-teal-900/60 text-white border-teal-700 hover:bg-teal-800'
                }`}
                title={isSaved ? "Saved" : "Save Scheme"}
                aria-label={isSaved ? "Remove from Saved Schemes" : "Save Scheme"}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-teal-900' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-teal-900/60 hover:bg-teal-800 text-white border border-teal-700 transition-colors focus:ring-2 focus:ring-teal-400 focus:outline-none"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Department Name */}
          <div className="text-xs font-black text-teal-300 uppercase tracking-wider mb-1">
            {scheme.department}
          </div>

          <h2 id="scheme-modal-title" className="text-xl sm:text-2xl font-black leading-tight">
            {scheme.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-teal-100/90 font-medium">
            <span>Target: <strong className="font-black text-white">{scheme.targetGroup}</strong></span>
            {scheme.incomeGroup && (
              <span className="bg-teal-900/80 px-2.5 py-0.5 rounded border border-teal-700">
                Income: <strong className="font-black text-white">{scheme.incomeGroup}</strong>
              </span>
            )}
            {scheme.deadline && (
              <span className="bg-teal-900/80 px-2.5 py-0.5 rounded border border-teal-700 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-teal-300" aria-hidden="true" />
                <span>Deadline: <strong className="font-black text-white">{scheme.deadline}</strong></span>
              </span>
            )}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mt-6 flex items-center space-x-2 overflow-x-auto pb-1" role="tablist">
            <button
              onClick={() => setActiveTab('overview')}
              role="tab"
              aria-selected={activeTab === 'overview'}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap focus:ring-2 focus:ring-teal-400 focus:outline-none ${
                activeTab === 'overview' ? 'bg-white text-teal-950 shadow-xs' : 'bg-teal-900/60 text-teal-100 hover:bg-teal-800'
              }`}
            >
              Overview & Benefits
            </button>

            <button
              onClick={() => setActiveTab('eligibility')}
              role="tab"
              aria-selected={activeTab === 'eligibility'}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap focus:ring-2 focus:ring-teal-400 focus:outline-none ${
                activeTab === 'eligibility' ? 'bg-white text-teal-950 shadow-xs' : 'bg-teal-900/60 text-teal-100 hover:bg-teal-800'
              }`}
            >
              Eligibility Criteria
            </button>

            <button
              onClick={() => setActiveTab('apply')}
              role="tab"
              aria-selected={activeTab === 'apply'}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap focus:ring-2 focus:ring-teal-400 focus:outline-none ${
                activeTab === 'apply' ? 'bg-white text-teal-950 shadow-xs' : 'bg-teal-900/60 text-teal-100 hover:bg-teal-800'
              }`}
            >
              How to Apply
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              role="tab"
              aria-selected={activeTab === 'documents'}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap focus:ring-2 focus:ring-teal-400 focus:outline-none ${
                activeTab === 'documents' ? 'bg-white text-teal-950 shadow-xs' : 'bg-teal-900/60 text-teal-100 hover:bg-teal-800'
              }`}
            >
              Document Checklist
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Scheme Description</h3>
                <p className="text-slate-800 text-sm leading-relaxed">{scheme.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Key Citizen Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scheme.benefits.map((benefit: string, idx: number) => (
                    <div key={idx} className="bg-teal-50/80 border border-teal-200/80 rounded-2xl p-4 flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-xs sm:text-sm font-extrabold text-teal-950">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span>Mandatory Qualification Rules</span>
                </h3>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                  {scheme.eligibilityCriteria.minAge !== undefined && (
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                      <span>Minimum Age: <strong className="font-bold text-slate-900">{scheme.eligibilityCriteria.minAge} Years</strong></span>
                    </li>
                  )}
                  {scheme.eligibilityCriteria.maxAge !== undefined && (
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                      <span>Maximum Age Limit: <strong className="font-bold text-slate-900">{scheme.eligibilityCriteria.maxAge} Years</strong></span>
                    </li>
                  )}
                  {scheme.eligibilityCriteria.maxAnnualIncome !== undefined && (
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                      <span>Annual Family Income Limit: <strong className="font-bold text-slate-900">₹{scheme.eligibilityCriteria.maxAnnualIncome.toLocaleString('en-IN')}</strong></span>
                    </li>
                  )}
                  {scheme.eligibilityCriteria.bplOnly && (
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                      <span>Must belong to <strong className="font-bold text-slate-900">BPL / Low Income Household</strong></span>
                    </li>
                  )}
                  {scheme.eligibilityCriteria.customRules?.map((rule: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-1.5 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: HOW TO APPLY */}
          {activeTab === 'apply' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2">
                  <ListOrdered className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span>5-Step Official Application Roadmap</span>
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 font-black flex items-center justify-center text-xs shrink-0">1</span>
                    <div>
                      <strong className="text-slate-950 font-bold">Gather Documents:</strong> Prepare self-attested copies of {scheme.requiredDocuments.slice(0, 2).join(', ')}.
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 font-black flex items-center justify-center text-xs shrink-0">2</span>
                    <div>
                      <strong className="text-slate-950 font-bold">Access Official Portal:</strong> Visit official portal link or local CSC Kendra.
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 font-black flex items-center justify-center text-xs shrink-0">3</span>
                    <div>
                      <strong className="text-slate-950 font-bold">Fill Online Form:</strong> Complete citizen details and verify mobile number via OTP.
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 font-black flex items-center justify-center text-xs shrink-0">4</span>
                    <div>
                      <strong className="text-slate-950 font-bold">Upload Attachments:</strong> Attach clear scanned copies of identity and income proof.
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 font-black flex items-center justify-center text-xs shrink-0">5</span>
                    <div>
                      <strong className="text-slate-950 font-bold">Track Status:</strong> Save your Application ID to track verification and sanction.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENT CHECKLIST */}
          {activeTab === 'documents' && (
            <div className="animate-in fade-in duration-150">
              <DocumentChecklist documents={scheme.requiredDocuments} schemeTitle={scheme.title} />
            </div>
          )}

        </div>

        {/* Modal Action Bar Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => onOpenGovBotForScheme(scheme)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-teal-100 hover:bg-teal-200 text-teal-950 font-black px-4 py-3 rounded-2xl border border-teal-300 text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <Bot className="w-4 h-4 text-teal-800" aria-hidden="true" />
              <span>Ask GovBot</span>
            </button>

            {onNavigateToEligibility && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToEligibility();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 bg-gradient-to-r from-teal-800 to-teal-700 hover:from-teal-900 text-white font-extrabold px-4 py-3 rounded-2xl shadow-soft text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <Sparkles className="w-4 h-4 text-teal-200" aria-hidden="true" />
                <span>{t('btnCheckEligibility', 'Check My Eligibility')}</span>
              </button>
            )}
          </div>

          <a
            href={scheme.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-teal-900 hover:bg-teal-950 text-white font-black px-6 py-3 rounded-2xl shadow-soft text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <span>{t('officialPortal', 'Official Portal')}</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>

        </div>

      </div>

    </div>
  );
};
