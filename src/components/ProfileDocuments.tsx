import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, FileText, Upload, CheckCircle2, ShieldCheck, Download, AlertCircle, Sparkles } from 'lucide-react';

export const ProfileDocuments: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [documents, setDocuments] = useState([
    { id: 'doc-1', title: 'Aadhaar Card', status: 'Verified', date: '2026-06-12', number: 'XXXX-XXXX-8812' },
    { id: 'doc-2', title: 'Income Certificate', status: 'Verified', date: '2026-07-01', number: 'INC-2026-44129' },
    { id: 'doc-3', title: 'Land Record (7/12 Extract)', status: 'Verified', date: '2026-05-19', number: 'LR-TN-99201' },
    { id: 'doc-4', title: 'BPL Ration Card', status: 'Uploaded', date: '2026-08-15', number: 'RAT-339102' },
    { id: 'doc-5', title: 'Bank Account Passbook', status: 'Verified', date: '2026-04-10', number: 'SB-88291004' },
  ]);

  const [activeTab, setActiveTab] = useState<'profile' | 'vault'>('vault');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-700" aria-hidden="true" />
            <span>Secure Citizen Document Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            {t('navProfile', 'Profile & Documents')}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Manage your verified credentials to auto-fill government scheme applications.
          </p>
        </div>

        <button className="flex items-center space-x-2 bg-teal-800 hover:bg-teal-900 text-white font-extrabold px-5 py-3 rounded-2xl shadow-soft text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none">
          <Upload className="w-4 h-4" aria-hidden="true" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-3 border-b border-slate-200 pb-3" role="tablist">
        <button
          onClick={() => setActiveTab('vault')}
          role="tab"
          aria-selected={activeTab === 'vault'}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none ${
            activeTab === 'vault'
              ? 'bg-teal-800 text-white shadow-soft'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
          }`}
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>Document Vault ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          role="tab"
          aria-selected={activeTab === 'profile'}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none ${
            activeTab === 'profile'
              ? 'bg-teal-800 text-white shadow-soft'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
          }`}
        >
          <User className="w-4 h-4" aria-hidden="true" />
          <span>Citizen Profile</span>
        </button>
      </div>

      {/* TAB 1: DOCUMENT VAULT */}
      {activeTab === 'vault' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-teal-900 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                  <span>{doc.status}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-bold">{doc.date}</span>
              </div>

              <h2 className="text-base font-black text-slate-950">{doc.title}</h2>
              <div className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                {doc.number}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center space-x-1 focus:ring-2 focus:ring-teal-500 focus:outline-none rounded px-1">
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download e-Copy</span>
                </button>
                <span className="text-[10px] text-emerald-700 font-extrabold">e-KYC Ready</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CITIZEN PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-800 to-teal-600 text-white font-black text-2xl flex items-center justify-center shadow-soft">
              {user ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-950">{user ? user.name : 'Citizen User'}</h2>
              <p className="text-xs text-slate-500 font-bold">{user ? user.email : 'citizen@govassist.in'}</p>
              <div className="mt-1 inline-flex items-center space-x-1 text-[11px] font-extrabold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                <span>Verified Resident • Tamil Nadu</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 font-bold block mb-1">State / Region</span>
              <strong className="text-slate-900 text-sm font-extrabold">Tamil Nadu</strong>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 font-bold block mb-1">Occupation</span>
              <strong className="text-slate-900 text-sm font-extrabold">Agriculture / Small Farmer</strong>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 font-bold block mb-1">Income Band</span>
              <strong className="text-slate-900 text-sm font-extrabold">₹1,80,000 / year (EWS/BPL)</strong>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 font-bold block mb-1">Aadhaar Linked Mobile</span>
              <strong className="text-slate-900 text-sm font-extrabold">+91 98765 43210</strong>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
