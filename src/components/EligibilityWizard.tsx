import React, { useState, useEffect } from 'react';
import { CitizenProfile, EligibilityResult } from '../types/schemes';
import { useLanguage } from '../context/LanguageContext';
import { User, Wallet, Sparkles, ChevronRight, ChevronLeft, Award, CheckCircle2, Save, Users, MapPin, ShieldCheck } from 'lucide-react';

interface EligibilityWizardProps {
  onResultsCalculated: (results: EligibilityResult[], profile: CitizenProfile) => void;
}

export const EligibilityWizard: React.FC<EligibilityWizardProps> = ({ onResultsCalculated }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [saveProfileLocally, setSaveProfileLocally] = useState(true);

  // Profile form state (initialized from localStorage if saved)
  const [profile, setProfile] = useState<CitizenProfile>(() => {
    try {
      const saved = localStorage.getItem('govassist_citizen_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      age: 28,
      gender: 'Female',
      state: 'Tamil Nadu',
      annualIncome: 180000,
      familySize: 4,
      occupation: 'Farmer',
      landOwnership: 'Small (< 2 Acres)',
      category: 'OBC',
      isBpl: true,
      isDisability: false,
      isStudent: false,
      isFarmer: true,
    };
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleCalculate = async () => {
    setIsCalculating(true);

    if (saveProfileLocally) {
      try {
        localStorage.setItem('govassist_citizen_profile', JSON.stringify(profile));
      } catch (e) {
        console.error('Failed to save profile', e);
      }
    }

    try {
      const response = await fetch('/api/eligibility/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const data = await response.json();
        onResultsCalculated(data.results, profile);
      } else {
        import('../../server/services/eligibilityEngine').then(mod => {
          const localRes = mod.evaluateEligibility(profile);
          onResultsCalculated(localRes, profile);
        });
      }
    } catch (err) {
      import('../../server/services/eligibilityEngine').then(mod => {
        const localRes = mod.evaluateEligibility(profile);
        onResultsCalculated(localRes, profile);
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const statesList = [
    'All India (Central)', 'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab',
    'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const progressPercent = Math.round((step / 3) * 100);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Wizard Card Container */}
      <div className="bg-white rounded-3xl border border-teal-100 shadow-soft-lg overflow-hidden">
        
        {/* Header Banner with Teal Progress Bar */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>60-Second AI Eligibility Diagnostic</span>
            </div>
            <span className="text-xs font-extrabold bg-teal-800 border border-teal-600 text-teal-200 px-3 py-1 rounded-full">
              Step {step} of 3 ({progressPercent}%)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black">Analyze Your Scheme Eligibility</h2>
          <p className="mt-1.5 text-xs sm:text-sm text-teal-100/90">
            Answer a few basic questions to see all national and state schemes customized for you.
          </p>

          {/* TEAL PROGRESS BAR */}
          <div className="mt-6 w-full bg-teal-950/60 h-2.5 rounded-full overflow-hidden p-0.5 border border-teal-600/40">
            <div
              className="bg-gradient-to-r from-teal-400 to-teal-300 h-full rounded-full transition-all duration-300 shadow-teal-glow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Form Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Basic Demographics & State */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-teal-900 font-bold border-b border-slate-100 pb-3">
                <User className="w-5 h-5 text-teal-600" />
                <h3 className="text-base sm:text-lg font-black">Step 1: Basic Demographics & Residence</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Age Input */}
                <div>
                  <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-1.5">
                    Citizen Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={profile.age || ''}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || undefined })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                  />
                </div>

                {/* Gender Select */}
                <div>
                  <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none cursor-pointer"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other / Third Gender</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* State / UT Selector */}
                <div>
                  <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-1.5">
                    State / UT of Residence
                  </label>
                  <select
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none cursor-pointer"
                  >
                    {statesList.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* Family Size Input */}
                <div>
                  <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-1.5">
                    Total Family Members
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={profile.familySize || 4}
                    onChange={(e) => setProfile({ ...profile, familySize: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Economic & Land Ownership */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-teal-900 font-bold border-b border-slate-100 pb-3">
                <Wallet className="w-5 h-5 text-teal-600" />
                <h3 className="text-base sm:text-lg font-black">Step 2: Economic Profile & Land Ownership</h3>
              </div>

              {/* Occupation Selector */}
              <div>
                <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-1.5">
                  Primary Occupation
                </label>
                <select
                  value={profile.occupation}
                  onChange={(e) => {
                    const occ = e.target.value;
                    setProfile({
                      ...profile,
                      occupation: occ,
                      isFarmer: occ === 'Farmer',
                      isStudent: occ === 'Student',
                    });
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none cursor-pointer"
                >
                  <option value="Farmer">Farmer / Agricultural Worker</option>
                  <option value="Student">Student (School / College)</option>
                  <option value="Self Employed">Self Employed / Micro Trader</option>
                  <option value="Artisan">Artisan / Traditional Craftsman</option>
                  <option value="Salaried Employee">Private / Govt Salaried Worker</option>
                  <option value="Unemployed">Unemployed / Homemaker</option>
                </select>
              </div>

              {/* Annual Household Income */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider">
                    Annual Family Household Income
                  </label>
                  <span className="text-sm font-black text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                    ₹{(profile.annualIncome || 0).toLocaleString('en-IN')} / year
                  </span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="1000000"
                  step="10000"
                  value={profile.annualIncome || 180000}
                  onChange={(e) => setProfile({ ...profile, annualIncome: parseInt(e.target.value) })}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                  <span>Below ₹50,000</span>
                  <span>₹2.5 Lakh</span>
                  <span>₹6 Lakh</span>
                  <span>₹10 Lakh+</span>
                </div>
              </div>

              {/* Cultivable Land Ownership Selection */}
              <div>
                <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-1.5">
                  Cultivable Agricultural Landholding
                </label>
                <select
                  value={profile.landOwnership || 'Small (< 2 Acres)'}
                  onChange={(e) => setProfile({ ...profile, landOwnership: e.target.value as any, isFarmer: e.target.value !== 'None' })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none cursor-pointer"
                >
                  <option value="None">None (Landless / Non-Farmer)</option>
                  <option value="Small (< 2 Acres)">Small Farmer (Under 2 Acres / 1 Hectare)</option>
                  <option value="Marginal (2 - 5 Acres)">Marginal Farmer (2 to 5 Acres)</option>
                  <option value="Large (> 5 Acres)">Large Landholding (Over 5 Acres)</option>
                </select>
              </div>

              {/* BPL Card Toggle */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">Below Poverty Line (BPL) Card Holder</div>
                  <div className="text-[11px] text-slate-500">Holds active BPL, Antyodaya, or Priority Ration Card</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.isBpl}
                  onChange={(e) => setProfile({ ...profile, isBpl: e.target.checked })}
                  className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Special Categories & Disability */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-teal-900 font-bold border-b border-slate-100 pb-3">
                <Award className="w-5 h-5 text-teal-600" />
                <h3 className="text-base sm:text-lg font-black">Step 3: Social Category & Special Status</h3>
              </div>

              {/* Social Category Select */}
              <div>
                <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-1.5">
                  Social Category
                </label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value as any })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none cursor-pointer"
                >
                  <option value="General">General Category</option>
                  <option value="OBC">OBC (Other Backward Classes)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                </select>
              </div>

              {/* Special Status Toggles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Person with Disability (Divyangjan 40%+)</div>
                    <div className="text-[11px] text-slate-500">Possesses valid UDID Disability Certificate</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.isDisability}
                    onChange={(e) => setProfile({ ...profile, isDisability: e.target.checked })}
                    className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-800">Enrolled Student in Recognized School/College</div>
                  <input
                    type="checkbox"
                    checked={profile.isStudent}
                    onChange={(e) => setProfile({ ...profile, isStudent: e.target.checked })}
                    className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Option to Save Profile locally */}
              <div className="flex items-center space-x-2 pt-2 text-xs font-semibold text-teal-800 bg-teal-50/70 p-3 rounded-xl border border-teal-200">
                <input
                  type="checkbox"
                  id="saveLocally"
                  checked={saveProfileLocally}
                  onChange={(e) => setSaveProfileLocally(e.target.checked)}
                  className="w-4 h-4 accent-teal-600 cursor-pointer"
                />
                <label htmlFor="saveLocally" className="cursor-pointer flex items-center space-x-1">
                  <Save className="w-3.5 h-3.5 text-teal-600" />
                  <span>Save eligibility profile to avoid re-entering on return visits</span>
                </label>
              </div>

            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 shadow-soft transition-all"
              >
                <span>Continue to Step {step + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="flex items-center space-x-2 px-7 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 hover:from-teal-800 hover:to-teal-600 shadow-soft hover:shadow-teal-glow transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-teal-200 animate-spin" />
                <span>{isCalculating ? "Analyzing..." : "Analyze My AI Scheme Matches"}</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
