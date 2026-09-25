import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Sidebar, DashboardRoute } from './Sidebar';
import { Topbar } from './Topbar';
import { SchemeExplorer } from './SchemeExplorer';
import { SchemeDetailModal } from './SchemeDetailModal';
import { SCHEMES } from '../../server/data/schemes';
import { Scheme, EligibilityResult, CitizenProfile } from '../types/schemes';
import { Loader2 } from 'lucide-react';

// Code-splitting lazy loaded routes for performance polish & low bandwidth users
const EligibilityWizard = lazy(() =>
  import('./EligibilityWizard').then(m => ({ default: m.EligibilityWizard }))
);
const EligibilityResults = lazy(() =>
  import('./EligibilityResults').then(m => ({ default: m.EligibilityResults }))
);
const CitizenDashboard = lazy(() =>
  import('./CitizenDashboard').then(m => ({ default: m.CitizenDashboard }))
);
const GovBotChat = lazy(() =>
  import('./GovBotChat').then(m => ({ default: m.GovBotChat }))
);
const ProfileDocuments = lazy(() =>
  import('./ProfileDocuments').then(m => ({ default: m.ProfileDocuments }))
);
const AdminPanel = lazy(() =>
  import('./AdminPanel').then(m => ({ default: m.AdminPanel }))
);

interface DashboardShellProps {
  initialRoute?: DashboardRoute;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ initialRoute = 'schemes' }) => {
  const [activeRoute, setActiveRoute] = useState<DashboardRoute>(initialRoute);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Rural Low-Bandwidth Mode State
  const [isLowBandwidth, setIsLowBandwidth] = useState<boolean>(() => {
    try {
      return localStorage.getItem('govassist_low_bandwidth') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleLowBandwidth = () => {
    setIsLowBandwidth(prev => {
      const next = !prev;
      try {
        localStorage.setItem('govassist_low_bandwidth', String(next));
      } catch {}
      return next;
    });
  };

  const [savedSchemes, setSavedSchemes] = useState<Scheme[]>(() => {
    try {
      const saved = localStorage.getItem('govassist_saved');
      return saved ? JSON.parse(saved) : [SCHEMES[0], SCHEMES[1]];
    } catch {
      return [SCHEMES[0], SCHEMES[1]];
    }
  });

  const [selectedSchemeModal, setSelectedSchemeModal] = useState<Scheme | null>(null);
  const [isGovBotOpen, setIsGovBotOpen] = useState(false);
  const [govBotSchemeTarget, setGovBotSchemeTarget] = useState<Scheme | null>(null);

  const [diagnosticResults, setDiagnosticResults] = useState<EligibilityResult[] | null>(null);
  const [citizenProfile, setCitizenProfile] = useState<CitizenProfile | null>(null);

  const handleToggleSaveScheme = (scheme: Scheme) => {
    setSavedSchemes(prev => {
      const exists = prev.some(s => s.id === scheme.id);
      const updated = exists ? prev.filter(s => s.id !== scheme.id) : [...prev, scheme];
      try {
        localStorage.setItem('govassist_saved', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleResultsCalculated = (results: EligibilityResult[], profile: CitizenProfile) => {
    setDiagnosticResults(results);
    setCitizenProfile(profile);
  };

  const handleOpenGovBotForScheme = (scheme: Scheme) => {
    setGovBotSchemeTarget(scheme);
    setIsGovBotOpen(true);
    if (selectedSchemeModal) setSelectedSchemeModal(null);
  };

  // Loading Fallback Spinner Component
  const LoadingFallback = (
    <div className="flex items-center justify-center py-16 space-x-3 text-teal-800">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="text-xs font-extrabold tracking-wide">Loading GovAssist Module...</span>
    </div>
  );

  return (
    <div className={`min-h-screen flex text-slate-800 transition-colors ${
      isLowBandwidth ? 'bg-slate-50' : 'bg-[#F0FDFA]/60'
    }`}>
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        savedCount={savedSchemes.length}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <Topbar
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onNavigateToProfile={() => setActiveRoute('profile')}
          onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
          isLowBandwidth={isLowBandwidth}
          onToggleLowBandwidth={handleToggleLowBandwidth}
        />

        {/* Route View Switcher */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8" role="main">
          
          <Suspense fallback={LoadingFallback}>
            {/* ROUTE 1: HOME / SCHEME DISCOVERY */}
            {activeRoute === 'schemes' && (
              <div>
                <SchemeExplorer
                  onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
                  savedSchemeIds={savedSchemes.map(s => s.id)}
                  onToggleSave={handleToggleSaveScheme}
                />
              </div>
            )}

            {/* ROUTE 2: ELIGIBILITY CHECKER */}
            {activeRoute === 'eligibility' && (
              <div>
                {diagnosticResults && citizenProfile ? (
                  <EligibilityResults
                    results={diagnosticResults}
                    profile={citizenProfile}
                    onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
                    savedSchemeIds={savedSchemes.map(s => s.id)}
                    onToggleSave={handleToggleSaveScheme}
                    onRecalculate={() => setDiagnosticResults(null)}
                  />
                ) : (
                  <EligibilityWizard
                    onResultsCalculated={handleResultsCalculated}
                  />
                )}
              </div>
            )}

            {/* ROUTE 3: MY APPLICATIONS */}
            {activeRoute === 'applications' && (
              <div>
                <CitizenDashboard
                  savedSchemes={savedSchemes}
                  onToggleSave={handleToggleSaveScheme}
                  onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
                  onNavigateToEligibility={() => setActiveRoute('eligibility')}
                />
              </div>
            )}

            {/* ROUTE 4: SAVED SCHEMES */}
            {activeRoute === 'saved' && (
              <div>
                <CitizenDashboard
                  savedSchemes={savedSchemes}
                  onToggleSave={handleToggleSaveScheme}
                  onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
                  onNavigateToEligibility={() => setActiveRoute('eligibility')}
                />
              </div>
            )}

            {/* ROUTE 5: CHAT WITH AI ASSISTANT */}
            {activeRoute === 'chat' && (
              <div className="max-w-4xl mx-auto py-4 space-y-4">
                <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white rounded-3xl p-6 shadow-soft">
                  <h2 className="text-2xl font-black">GovBot AI Assistant</h2>
                  <p className="mt-1 text-xs sm:text-sm text-teal-100/90">
                    Ask anything about Indian government welfare schemes, eligibility bounds, and document checklists in your native language.
                  </p>
                </div>

                <div className="h-[520px] relative">
                  <GovBotChat
                    isOpen={true}
                    onClose={() => setActiveRoute('schemes')}
                    initialScheme={null}
                  />
                </div>
              </div>
            )}

            {/* ROUTE 6: PROFILE & DOCUMENTS */}
            {activeRoute === 'profile' && (
              <div>
                <ProfileDocuments />
              </div>
            )}

            {/* ROUTE 7: ADMIN PANEL */}
            {activeRoute === 'admin' && (
              <div>
                <AdminPanel
                  onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
                />
              </div>
            )}
          </Suspense>

        </main>

        {/* Scheme Detail Modal */}
        <SchemeDetailModal
          scheme={selectedSchemeModal}
          onClose={() => setSelectedSchemeModal(null)}
          isSaved={selectedSchemeModal ? savedSchemes.some(s => s.id === selectedSchemeModal.id) : false}
          onToggleSave={handleToggleSaveScheme}
          onOpenGovBotForScheme={handleOpenGovBotForScheme}
          onNavigateToEligibility={() => setActiveRoute('eligibility')}
        />

        {/* Floating GovBot Drawer */}
        {activeRoute !== 'chat' && (
          <Suspense fallback={null}>
            <GovBotChat
              isOpen={isGovBotOpen}
              onClose={() => setIsGovBotOpen(false)}
              initialScheme={govBotSchemeTarget}
            />
          </Suspense>
        )}

      </div>

    </div>
  );
};
