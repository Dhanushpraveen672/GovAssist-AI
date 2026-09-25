import React, { useState, useEffect } from 'react';
import { Scheme } from '../types/schemes';
import { SCHEMES } from '../../server/data/schemes';
import { SchemeCard } from './SchemeCard';
import { useLanguage } from '../context/LanguageContext';
import { Search, Sparkles, RefreshCw, Layers, MapPin, Wallet, Filter } from 'lucide-react';

interface SchemeExplorerProps {
  onSelectScheme: (scheme: Scheme) => void;
  savedSchemeIds: string[];
  onToggleSave: (scheme: Scheme) => void;
  initialCategory?: string;
  initialQuery?: string;
}

export const SchemeExplorer: React.FC<SchemeExplorerProps> = ({
  onSelectScheme,
  savedSchemeIds,
  onToggleSave,
  initialCategory = 'All',
  initialQuery = '',
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedIncome, setSelectedIncome] = useState('All');
  const [sponsoringFilter, setSponsoringFilter] = useState<'All' | 'Central' | 'State'>('All');

  const [isSearching, setIsSearching] = useState(false);
  const [detectedEntity, setDetectedEntity] = useState<{ state?: string; category?: string }>({});
  const [results, setResults] = useState<{ scheme: Scheme; matchScore?: number; relevanceText?: string }[]>([]);

  const categories = [
    { key: 'All', label: t('allCategories', 'All Categories') },
    { key: 'Farmers', label: t('catFarmers', 'Agriculture & Farmers') },
    { key: 'Women', label: t('catWomen', 'Women & Child Care') },
    { key: 'Students', label: t('catStudents', 'Education & Youth') },
    { key: 'Seniors', label: t('catSeniors', 'Senior Citizens') },
    { key: 'Healthcare', label: t('catHealthcare', 'Healthcare & Insurance') },
    { key: 'Housing', label: t('catHousing', 'Housing & Sanitation') },
    { key: 'MSME', label: t('catMSME', 'Business & MSME') },
    { key: 'Disability', label: t('catDisability', 'Disability Welfare') },
  ];

  const statesList = [
    'All', 'All India (Central)', 'Tamil Nadu', 'Madhya Pradesh', 'West Bengal',
    'Andhra Pradesh', 'Telangana', 'Karnataka', 'Kerala', 'Bihar', 'Uttar Pradesh', 'Delhi', 'Gujarat', 'Maharashtra'
  ];

  const incomeGroupsList = [
    'All', 'Below ₹1L', '₹1L - ₹2.5L', '₹2.5L - ₹6L', 'EWS / BPL', 'All Income Groups'
  ];

  const performSearch = async (query: string, cat: string, st: string, inc: string, body: string) => {
    setIsSearching(true);
    try {
      const response = await fetch('/api/schemes/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category: cat, state: st, incomeGroup: inc, sponsoringBody: body }),
      });

      if (response.ok) {
        const data = await response.json();
        setDetectedEntity({
          state: data.detectedState,
          category: data.detectedCategory,
        });

        let filtered = data.data.map((item: any) => ({
          scheme: item.scheme,
          matchScore: item.matchScore,
          relevanceText: item.relevance,
        }));

        if (body !== 'All') {
          filtered = filtered.filter((i: any) => i.scheme.sponsoringBody === body);
        }

        setResults(filtered);
      } else {
        fallbackLocalSearch(query, cat, st, inc, body);
      }
    } catch (error) {
      fallbackLocalSearch(query, cat, st, inc, body);
    } finally {
      setIsSearching(false);
    }
  };

  const fallbackLocalSearch = (query: string, cat: string, st: string, inc: string, body: string) => {
    let list = SCHEMES;
    if (cat !== 'All') {
      list = list.filter((s: Scheme) => s.category.toLowerCase() === cat.toLowerCase());
    }
    if (body !== 'All') {
      list = list.filter((s: Scheme) => s.sponsoringBody === body);
    }
    if (st !== 'All' && st !== 'All India (Central)') {
      list = list.filter((s: Scheme) => !s.state || s.state.toLowerCase() === st.toLowerCase() || s.sponsoringBody === 'Central');
    }
    if (inc !== 'All') {
      list = list.filter((s: Scheme) => !s.incomeGroup || s.incomeGroup === inc || s.incomeGroup === 'All Income Groups');
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s: Scheme) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        (s.department || '').toLowerCase().includes(q) ||
        s.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }
    setResults(list.map((s: Scheme) => ({ scheme: s })));
  };

  useEffect(() => {
    performSearch(searchQuery, selectedCategory, selectedState, selectedIncome, sponsoringFilter);
  }, [selectedCategory, selectedState, selectedIncome, sponsoringFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery, selectedCategory, selectedState, selectedIncome, sponsoringFilter);
  };

  return (
    <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-soft border border-teal-100 space-y-4">
        
        <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-700" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder', "Type in plain language (e.g. 'schemes for farmers in Tamil Nadu' or 'girl child scholarship')...")}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400"
              aria-label="Search welfare schemes"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 hover:from-teal-900 hover:to-teal-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-soft flex items-center justify-center space-x-2 transition-all active:scale-95 text-xs sm:text-sm shrink-0 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            {isSearching ? (
              <RefreshCw className="w-4 h-4 animate-spin text-teal-200" aria-hidden="true" />
            ) : (
              <Sparkles className="w-4 h-4 text-teal-200" aria-hidden="true" />
            )}
            <span>AI Natural Search</span>
          </button>
        </form>

        {(detectedEntity.state || detectedEntity.category) && (
          <div className="flex items-center space-x-2 text-xs bg-teal-50 border border-teal-200 p-2.5 rounded-xl" aria-live="polite">
            <Sparkles className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
            <span className="font-extrabold text-teal-950">AI Entity Extraction:</span>
            {detectedEntity.state && (
              <span className="bg-white border border-teal-300 text-teal-900 px-2 py-0.5 rounded-md font-bold">
                📍 State: {detectedEntity.state}
              </span>
            )}
            {detectedEntity.category && (
              <span className="bg-white border border-teal-300 text-teal-900 px-2 py-0.5 rounded-md font-bold">
                🎯 Sector: {detectedEntity.category}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <MapPin className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
            <div className="flex-1 text-xs">
              <label htmlFor="state-select" className="block text-[10px] font-extrabold text-slate-500 uppercase">{t('filterState', 'State / UT')}</label>
              <select
                id="state-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 outline-none cursor-pointer focus:ring-1 focus:ring-teal-500 rounded"
              >
                {statesList.map(st => (
                  <option key={st} value={st}>{st === 'All' ? t('allStates', 'All India (Central)') : st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Wallet className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
            <div className="flex-1 text-xs">
              <label htmlFor="income-select" className="block text-[10px] font-extrabold text-slate-500 uppercase">Income Group</label>
              <select
                id="income-select"
                value={selectedIncome}
                onChange={(e) => setSelectedIncome(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 outline-none cursor-pointer focus:ring-1 focus:ring-teal-500 rounded"
              >
                {incomeGroupsList.map(inc => (
                  <option key={inc} value={inc}>{inc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Filter className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
            <div className="flex-1 text-xs">
              <label htmlFor="sponsoring-select" className="block text-[10px] font-extrabold text-slate-500 uppercase">Sponsoring Govt</label>
              <select
                id="sponsoring-select"
                value={sponsoringFilter}
                onChange={(e) => setSponsoringFilter(e.target.value as any)}
                className="w-full bg-transparent font-bold text-slate-900 outline-none cursor-pointer focus:ring-1 focus:ring-teal-500 rounded"
              >
                <option value="All">All Central & State</option>
                <option value="Central">Central Govt Only</option>
                <option value="State">State Govt Only</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            role="tab"
            aria-selected={selectedCategory === cat.key}
            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              selectedCategory === cat.key
                ? 'bg-teal-800 text-white border-teal-800 shadow-soft'
                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:text-teal-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
          {results.map(({ scheme, matchScore, relevanceText }) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              matchScore={matchScore}
              relevanceText={relevanceText}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={onToggleSave}
              onSelectScheme={onSelectScheme}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-8">
          <div className="w-14 h-14 bg-teal-50 text-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Layers className="w-7 h-7" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching schemes found</h3>
          <p className="text-sm text-slate-600 mt-2">
            Try resetting your filters or typing broader terms like "farmer", "women", or "education".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedState('All');
              setSelectedIncome('All');
              setSponsoringFilter('All');
              performSearch('', 'All', 'All', 'All', 'All');
            }}
            className="mt-5 inline-flex items-center space-x-2 bg-teal-800 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-soft focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <span>Reset All Search Filters</span>
          </button>
        </div>
      )}

    </section>
  );
};
