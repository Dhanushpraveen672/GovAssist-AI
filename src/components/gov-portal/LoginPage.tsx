import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Lock, User, AlertCircle, CheckCircle2, Shield, HelpCircle, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onLoginSuccess?: (data: { username: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToRegister,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Inline Validation Errors
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  
  // Forgot Password modal state
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!username.trim()) {
      newErrors.username = 'Username / Registered ID is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
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

    // Simulated client-side submission (ready for real auth API integration)
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessBanner(`Login successful! Welcome to the National Scheme Portal, ${username.trim()}.`);

      if (onLoginSuccess) {
        onLoginSuccess({ username: username.trim() });
      }
    }, 700);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your registered ID, Email, or Mobile Number');
      return;
    }
    setForgotSuccess(`Password reset instructions have been dispatched to ${forgotEmail.trim()}`);
    setTimeout(() => {
      setForgotSuccess('');
      setShowForgotPasswordModal(false);
      setForgotEmail('');
    }, 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 sm:my-8 px-4 sm:px-0">
      {/* Centered White Card with Rounded Corners and Soft Shadow */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300">
        
        {/* Card Header in Navy Blue with Title & Subtitle */}
        <div className="bg-gradient-to-r from-[#0b3d91] via-[#08337a] to-[#062a63] px-6 py-6 text-white border-b-4 border-[#ff9933]">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block text-[10px] uppercase tracking-wider font-extrabold text-[#ff9933] bg-[#041c44]/60 px-2 py-0.5 rounded border border-[#ff9933]/30 mb-2">
                Official Citizen Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center space-x-2">
                <LogIn className="w-6 h-6 text-[#ff9933] shrink-0" />
                <span>Beneficiary Login</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 font-medium mt-1">
                Sign in to access your scheme applications
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-[#ff9933] shrink-0 shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card Body Form */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Success Banner Shown on Valid Submit */}
          {successBanner && (
            <div
              role="alert"
              aria-live="polite"
              className="bg-emerald-50 dark:bg-emerald-950/60 border-2 border-[#138808] text-emerald-900 dark:text-emerald-200 p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-start space-x-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <CheckCircle2 className="w-5 h-5 text-[#138808] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950 dark:text-emerald-100">Login Successful</p>
                <p className="mt-0.5">{successBanner}</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">
                  Ready to connect to real authentication API.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            
            {/* Field 1: Username / Registered ID (text, required) */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Username / Registered ID <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors(prev => ({ ...prev, username: undefined }));
                  }}
                  placeholder="Enter Registered ID, Username, or Mobile"
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? "username-error" : undefined}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.username
                      ? 'border-red-500 focus:ring-red-400 bg-red-50/20 dark:bg-red-950/20'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                  }`}
                />
              </div>
              {/* Inline error message */}
              {errors.username && (
                <p id="username-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.username}</span>
                </p>
              )}
            </div>

            {/* Field 2: Password (password, masked, required) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Password <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-xs font-bold text-[#0b3d91] dark:text-sky-400 hover:text-[#062a63] dark:hover:text-sky-300 hover:underline transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`w-full pl-10 pr-11 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-400 bg-red-50/20 dark:bg-red-950/20'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-[#0b3d91] focus:border-[#0b3d91]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Inline error message */}
              {errors.password && (
                <p id="password-error" className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button "Login" */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-[#0b3d91] hover:bg-[#062a63] active:bg-[#041c44] text-white font-extrabold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#ff9933] focus:ring-offset-2 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Authenticating...</span>
                </span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#ff9933]" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Footer links: "Forgot Password?" and "New Registration" */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Don't have a Beneficiary Account yet?
            </p>
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="w-full bg-emerald-50 dark:bg-emerald-950/40 border border-[#138808] text-[#138808] dark:text-emerald-300 font-extrabold py-2.5 px-4 rounded-lg hover:bg-[#138808] hover:text-white dark:hover:bg-[#138808] dark:hover:text-white transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              <span>New Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-center space-x-4 text-xs">
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-[#0b3d91] dark:text-sky-400 hover:text-[#062a63] hover:underline font-semibold"
              >
                Forgot Password?
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <a
                href="#help"
                onClick={(e) => {
                  e.preventDefault();
                  alert('For login assistance or grievance redressal, please contact the National Scheme Toll-Free Helpline: 1800-11-0001 (Available 24x7)');
                }}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
              >
                Citizen Helpdesk
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-password-title"
        >
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-sm w-full p-6 space-y-4">
            <h3 id="forgot-password-title" className="text-lg font-bold text-[#0b3d91] dark:text-sky-400 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#ff9933]" />
              <span>Password Recovery</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Enter your Registered ID, Email Address, or Mobile Number to receive recovery instructions.
            </p>

            {forgotSuccess && (
              <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg border border-emerald-300 font-semibold">
                {forgotSuccess}
              </div>
            )}

            {forgotError && (
              <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg border border-red-300 font-semibold">
                {forgotError}
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
              <div>
                <label htmlFor="recovery-input" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Registered ID / Email / Mobile
                </label>
                <input
                  type="text"
                  id="recovery-input"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com or Registered ID"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3d91]"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setForgotError('');
                    setForgotSuccess('');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#0b3d91] hover:bg-[#062a63] text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
