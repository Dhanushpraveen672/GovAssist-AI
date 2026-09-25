import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, FileCheck, Info, Sparkles } from 'lucide-react';

interface DocumentChecklistProps {
  documents: string[];
  schemeTitle: string;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ documents, schemeTitle }) => {
  const storageKey = `govassist_docs_ready_${schemeTitle.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleDocument = (doc: string) => {
    const updated = { ...checkedDocs, [doc]: !checkedDocs[doc] };
    setCheckedDocs(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = documents.filter(d => checkedDocs[d]).length;
  const progressPercent = Math.round((completedCount / documents.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
      
      {/* Header with Readiness Percentage */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileCheck className="w-5 h-5 text-teal-600" />
          <h4 className="text-sm font-extrabold text-slate-900">Required Documents Readiness Checklist</h4>
        </div>

        <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
          progressPercent === 100
            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
            : 'bg-teal-50 text-teal-800 border-teal-200'
        }`}>
          {completedCount} of {documents.length} Ready ({progressPercent}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-teal-600 to-teal-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Checkbox Items List */}
      <div className="space-y-2.5 pt-1">
        {documents.map((doc, idx) => {
          const isReady = !!checkedDocs[doc];

          return (
            <div
              key={idx}
              onClick={() => toggleDocument(doc)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isReady
                  ? 'bg-teal-50/60 border-teal-300 text-teal-950 font-bold'
                  : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:border-teal-200'
              }`}
            >
              <div className="flex items-center space-x-3 text-xs sm:text-sm">
                {isReady ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span>{doc}</span>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                isReady ? 'bg-teal-200 text-teal-900' : 'bg-slate-200 text-slate-600'
              }`}>
                {isReady ? 'Ready' : 'Pending'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl flex items-start space-x-2 text-[11px] text-teal-800">
        <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <span>Marking documents as ready saves them to your local Document Vault for auto-filling application forms.</span>
      </div>

    </div>
  );
};
