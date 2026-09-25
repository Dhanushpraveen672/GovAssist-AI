import React, { useState } from 'react';
import { CaptchaBox } from './CaptchaBox';
import {
  User,
  CreditCard,
  Smartphone,
  Mail,
  MapPin,
  UserCheck,
  KeyRound,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Shield,
  ArrowLeft,
  Check,
} from 'lucide-react';

interface RegistrationPageProps {
  onNavigateToLogin: () => void;
  onRegistrationSuccess?: (data: { username: string; name: string }) => void;
}

const INDIAN_STATES_AND_UTS = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  onNavigateToLogin,
  onRegistrationSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [aadhaarRaw, setAadhaarRaw] = useState(''); // Only 12 raw digits
  const [showAadhaar, setShowAadhaar] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Delhi (NCT)');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaTargetCode, setCaptchaTargetCode] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Field Errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    aadhaarNumber?: string;
    mobileNumber?: string;
    email?: string;
    state?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    captcha?: string;
    terms?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [generatedCitizenId, setGeneratedCitizenId] = useState<string | null>(null);

  // Auto-format Aadhaar Number into groups of 4 (e.g. 1234 5678 9012)
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 12);
    setAadhaarRaw(rawVal);
    if (errors.aadhaarNumber) {
      setErrors((prev) => ({ ...prev, aadhaarNumber: undefined }));
    }
  };

  const getFormattedAadhaarDisplay = (): string => {
    if (!aadhaarRaw) return '';
    const parts = [];
    for (let i = 0; i < aadhaarRaw.length; i += 4) {
      parts.push(aadhaarRaw.substring(i, i + 4));
    }
    const formatted = parts.join(' ');
    if (!showAadhaar && formatted.length > 0) {
      // Mask first 8 digits as •••• •••• 9012
      return formatted.replace(/\d(?=.*\d{4})/g, '•');
    }
    return formatted;
  };

  // Password strength calculation
  const getPasswordStrength = (): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-[#ff9933]' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-yellow-500' };
    return { score: 100, label: 'Strong', color: 'bg-[#138808]' };
  };

  const strength = getPasswordStrength();

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // 1. Full Name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name as per Aadhaar is required';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters';
    }

    // 2. Aadhaar Number (12 digits required)
    if (!aadhaarRaw) {
      newErrors.aadhaarNumber = '12-digit Aadhaar Number is required';
    } else if (aadhaarRaw.length !== 12) {
      newErrors.aadhaarNumber = `Aadhaar Number must be exactly 12 digits (entered ${aadhaarRaw.length} digits)`;
    }

    // 3. Mobile Number (10 digits starting with 6-9)
    if (!mobileNumber) {
      newErrors.mobileNumber = '10-digit Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit Indian Mobile Number starting with 6-9';
    }

    // 4. Email Address
    if (!email) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid Email Address (e.g. name@domain.gov.in)';
    }

    // 5. State
    if (!state) {
      newErrors.state = 'Please select your State / UT of residence';
    }

    // 6. Username
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.trim().length < 4) {
      newErrors.username = 'Username must be at least 4 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // 7. Password & Confirm Password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your Password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // 8. Captcha
    if (!captchaInput.trim()) {
      newErrors.captcha = 'Please enter the Security Code';
    } else if (captchaInput.trim() !== captchaTargetCode) {
      newErrors.captcha = 'Security code mismatch! Please check the code and try again.';
    }

    // 9. Terms & Conditions Checkbox
    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the Terms & Conditions and Privacy Policy to register';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessBanner(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate Citizen Registration & Citizen ID assignment
    setTimeout(() => {
      setIsSubmitting(false);
      const newCitizenId = `NSP-CIT-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedCitizenId(newCitizenId);
      setSuccessBanner(
        `Registration Successful! Citizen Account created for ${fullName}.`
      );

      if (onRegistrationSuccess) {
        onRegistrationSuccess({ username, name: fullName });
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      {/* Centered White Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
        
        {/* Card Header in Navy Blue */}
        <div className="bg-gradient-to-r from-[#0b3d91] via-[#08337a] to-[#062a63] px-6 py-5 text-white border-b-2 border-[#ff9933] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#ff9933]">
              Official Citizen Enrolment
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center space-x-2">
              <UserPlus className="w-6 h-6 text-[#ff9933]" />
              <span>New Citizen Registration</span>
            </h2>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-[#138808]">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Success Banner */}
          {successBanner && (
            <div
              role="alert"
              className="bg-emerald-50 dark:bg-emerald-950/60 border-2 border-[#138808] text-emerald-950 dark:text-emerald-100 p-5 rounded-xl text-xs sm:text-sm font-medium space-y-2 shadow-md animate-in fade-in duration-300"
            >
              <div className="flex items-center space-x-2.5 font-extrabold text-base text-[#138808] dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>Account Created Successfully!</span>
              </div>
              <p>{successBanner}</p>
              {generatedCitizenId && (
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-300 dark:border-emerald-700 flex items-center justify-between font-mono text-xs font-bold text-slate-800 dark:text-white">
                  <span>Registered Citizen ID:</span>
                  <span className="text-[#0b3d91] dark:text-sky-300 text-sm">{generatedCitizenId}</span>
                </div>
              )}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="bg-[#0b3d91] text-white font-extrabold px-5 py-2 rounded-lg text-xs hover:bg-[#062a63] transition-all"
                >
                  Proceed to Citizen Login →
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            
            {/* ROW 1: Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Full Name (as per Aadhaar Card) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="e.g. Rajesh Kumar Sharma"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p id="fullName-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* ROW 2: Aadhaar Number (Auto-formatted in groups of 4) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="aadhaarNumber"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Aadhaar Number (12 Digits) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowAadhaar(!showAadhaar)}
                  className="text-xs font-bold text-[#0b3d91] dark:text-sky-400 hover:underline flex items-center space-x-1"
                >
                  {showAadhaar ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showAadhaar ? 'Mask Digits' : 'Show Digits'}</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  value={getFormattedAadhaarDisplay()}
                  onChange={handleAadhaarChange}
                  placeholder="1234 5678 9012"
                  maxLength={14} // 12 digits + 2 spaces
                  aria-invalid={!!errors.aadhaarNumber}
                  aria-describedby={errors.aadhaarNumber ? 'aadhaar-error' : undefined}
                  className={`w-full pl-10 pr-12 py-2.5 font-mono tracking-widest font-semibold bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.aadhaarNumber
                      ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  {aadhaarRaw.length === 12 && (
                    <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                  )}
                </div>
              </div>
              {errors.aadhaarNumber ? (
                <p id="aadhaar-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.aadhaarNumber}</span>
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Auto-formatted in 3 groups of 4 digits. Stored securely per UIDAI standards.
                </p>
              )}
            </div>

            {/* ROW 3: Mobile Number & Email Address (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label
                  htmlFor="mobileNumber"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-xs font-bold">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={mobileNumber}
                    maxLength={10}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setMobileNumber(val);
                      if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
                    }}
                    placeholder="9876543210"
                    aria-invalid={!!errors.mobileNumber}
                    aria-describedby={errors.mobileNumber ? 'mobile-error' : undefined}
                    className={`w-full pl-14 pr-3 py-2.5 font-semibold bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.mobileNumber
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                    }`}
                  />
                </div>
                {errors.mobileNumber && (
                  <p id="mobile-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.mobileNumber}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="name@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

            </div>

            {/* ROW 4: State Dropdown & Username (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* State Dropdown */}
              <div className="space-y-1.5">
                <label
                  htmlFor="state"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  State / Union Territory <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    id="state"
                    name="state"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      if (errors.state) setErrors((prev) => ({ ...prev, state: undefined }));
                    }}
                    aria-invalid={!!errors.state}
                    aria-describedby={errors.state ? 'state-error' : undefined}
                    className={`w-full pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.state
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                    }`}
                  >
                    {INDIAN_STATES_AND_UTS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <p id="state-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.state}</span>
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-username"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Desired Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="reg-username"
                    name="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
                    }}
                    placeholder="e.g. rajesh_2026"
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? 'username-reg-error' : undefined}
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.username
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                    }`}
                  />
                </div>
                {errors.username && (
                  <p id="username-reg-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.username}</span>
                  </p>
                )}
              </div>

            </div>

            {/* ROW 5: Password & Confirm Password (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reg-password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Password (min 8 chars) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="reg-password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="At least 8 characters"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-reg-error' : undefined}
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength Meter Bar */}
                {password && (
                  <div className="space-y-1 pt-1">
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Strength:</span>
                      <span className={strength.score >= 75 ? 'text-[#138808]' : 'text-slate-600'}>
                        {strength.label}
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p id="password-reg-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }}
                    placeholder="Re-enter password"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                    }`}
                  />
                  {confirmPassword && password === confirmPassword && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#138808]">
                      <Check className="w-4 h-4 font-bold" />
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p id="confirm-password-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>

            </div>

            {/* ROW 6: Captcha Component */}
            <CaptchaBox
              id="register-captcha"
              value={captchaInput}
              onChange={(val) => {
                setCaptchaInput(val);
                if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: undefined }));
              }}
              error={errors.captcha}
              onRefreshCaptchaCode={(code) => setCaptchaTargetCode(code)}
            />

            {/* ROW 7: Terms & Conditions Checkbox */}
            <div className="space-y-1 pt-1">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0b3d91] focus:ring-[#0b3d91]"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  I hereby declare that all details provided above are true to the best of my knowledge. I accept the{' '}
                  <a href="#terms" className="text-[#0b3d91] dark:text-sky-400 font-bold hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-[#0b3d91] dark:text-sky-400 font-bold hover:underline">
                    Privacy Policy
                  </a>{' '}
                  of the National Scheme Portal. <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.terms}</span>
                </p>
              )}
            </div>

            {/* Submit Button "Register" */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 bg-gradient-to-r from-[#138808] to-[#0d6005] hover:from-[#117607] hover:to-[#0a4d04] text-white font-extrabold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#ff9933] disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Registering Citizen Account...</span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-[#ff9933]" />
                  <span>Register</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation Link to Login */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Already registered on the National Scheme Portal?
            </p>
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[#0b3d91] dark:text-sky-300 font-extrabold py-2.5 px-4 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
