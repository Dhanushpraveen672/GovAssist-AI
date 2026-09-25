import React, { useState } from 'react';
import { Scheme } from '../types/schemes';
import { SchemeCard } from './SchemeCard';
import { useLanguage } from '../context/LanguageContext';
import { Bookmark, Download, FileCheck, CheckCircle2, Clock, Sparkles, ExternalLink, ChevronRight, AlertCircle } from 'lucide-react';

interface CitizenDashboardProps {
  savedSchemes: Scheme[];
  onToggleSave: (scheme: Scheme) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onNavigateToEligibility: () => void;
}

export interface ApplicationTrackerItem {
  id: string;
  schemeId: string;
  schemeTitle: string;
  department: string;
  appliedDate: string;
  applicationNo: string;
  estimatedSanctionDate: string;
  stage: 'Not Started' | 'In Progress' | 'Submitted' | 'Under Review' | 'Approved / Sanctioned';
  notes: string;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  savedSchemes,
  onToggleSave,
  onSelectScheme,
  onNavigateToEligibility,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'applications' | 'saved'>('applications');

  // Application tracker mock items
  const [applications, setApplications] = useState<ApplicationTrackerItem[]>([
    {
      id: 'app-101',
      schemeId: 'pm-kisan',
      schemeTitle: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      department: 'Ministry of Agriculture & Farmers Welfare',
      appliedDate: '2026-08-10',
      applicationNo: 'PMK-2026-992014',
      estimatedSanctionDate: '2026-09-05',
      stage: 'Approved / Sanctioned',
      notes: '₹2,000 17th Installment sanctioned directly to Aadhaar linked bank account.',
    },
    {
      id: 'app-102',
      schemeId: 'ayushman-bharat',
      schemeTitle: 'Ayushman Bharat - PM-JAY (Health Insurance)',
      department: 'Ministry of Health and Family Welfare',
      appliedDate: '2026-08-22',
      applicationNo: 'ABJAY-TN-441092',
      estimatedSanctionDate: '2026-09-02',
      stage: 'Under Review',
      notes: 'District health officer verification in progress.',
    },
    {
      id: 'app-103',
      schemeId: 'pm-awas-yojana',
      schemeTitle: 'PM Awas Yojana (Pradhan Mantri Housing Scheme)',
      department: 'Ministry of Housing and Urban Affairs',
      appliedDate: '2026-08-28',
      applicationNo: 'PMAY-2026-11094',
      estimatedSanctionDate: '2026-10-15',
      stage: 'In Progress',
      notes: 'Document verification pending (Land Record 7/12 required).',
    }
  ]);

  const stagesList = ['Not Started', 'In Progress', 'Submitted', 'Under Review', 'Approved / Sanctioned'];

  const getStageIndex = (stage: string) => {
    const idx = stagesList.indexOf(stage);
    return idx >= 0 ? idx : 1;
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-4 h-4 text-teal-700" aria-hidden="true" />
            <span>Citizen Dashboard & Trackers</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            {t('dashboardTitle', 'My Applications & Bookmarked Schemes')}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            {t('dashboardSubtitle', 'Track real-time sanction progress, upload missing documents, and view saved benefits.')}
          </p>
        </div>

        <button
          onClick={onNavigateToEligibility}
          className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 hover:from-teal-900 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-soft text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none"
        >
          <span>Run 60-Sec Eligibility Diagnostic</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-3 border-b border-slate-200 pb-3" role="tablist">
        <button
          onClick={() => setActiveTab('applications')}
          role="tab"
          aria-selected={activeTab === 'applications'}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none ${
            activeTab === 'applications'
              ? 'bg-teal-800 text-white shadow-soft'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
          }`}
        >
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span>{t('navTracker', 'My Active Applications')} ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          role="tab"
          aria-selected={activeTab === 'saved'}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none ${
            activeTab === 'saved'
              ? 'bg-teal-800 text-white shadow-soft'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
          }`}
        >
          <Bookmark className="w-4 h-4" aria-hidden="true" />
          <span>{t('navSaved', 'Saved Schemes')} ({savedSchemes.length})</span>
        </button>
      </div>

      {/* TAB 1: MY ACTIVE APPLICATIONS TRACKER */}
      {activeTab === 'applications' && (
        <div className="space-y-6" aria-live="polite">
          {applications.map((app) => {
            const currentIdx = getStageIndex(app.stage);

            return (
              <div key={app.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold text-teal-900 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                      Ref ID: {app.applicationNo}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-slate-950 mt-1">{app.schemeTitle}</h2>
                    <p className="text-xs text-slate-600 font-medium">{app.department}</p>
                  </div>

                  <div className="text-left sm:text-right text-xs">
                    <span className="text-slate-500 font-semibold block">Applied Date: {app.appliedDate}</span>
                    <span className="text-teal-800 font-extrabold">Est. Sanction: {app.estimatedSanctionDate}</span>
                  </div>
                </div>

                {/* TEAL STEP TRACKER UI */}
                <div className="py-2">
                  <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-4">
                    Live Sanction Progress Tracker
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
                    {stagesList.map((stg, idx) => {
                      const isPassed = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={stg} className="flex flex-col items-center text-center space-y-2 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                            isCurrent
                              ? 'bg-teal-800 text-white ring-4 ring-teal-100 shadow-soft scale-110'
                              : isPassed
                              ? 'bg-teal-700 text-white'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}>
                            {isPassed ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> : idx + 1}
                          </div>

                          <span className={`text-[11px] font-extrabold ${
                            isCurrent ? 'text-teal-950 font-black' : isPassed ? 'text-teal-800' : 'text-slate-500'
                          }`}>
                            {stg}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status Notes Banner */}
                <div className="p-4 bg-teal-50/80 border border-teal-200/90 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-teal-950">
                  <AlertCircle className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="font-extrabold">Status Update:</strong> {app.notes}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: SAVED SCHEMES */}
      {activeTab === 'saved' && (
        <div aria-live="polite">
          {savedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                  onSelectScheme={onSelectScheme}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 text-teal-700 mx-auto mb-3" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-900">No saved schemes yet</h2>
              <p className="text-xs text-slate-600 mt-1">
                Bookmark schemes while browsing to build your saved application shortlist.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
