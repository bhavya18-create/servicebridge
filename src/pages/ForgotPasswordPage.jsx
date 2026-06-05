import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, Eye, EyeOff, Check, AlertCircle, Key, KeyRound, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

export function ForgotPasswordPage({ onNavigate }) {
  const { forgotPassword, verifyOtp, resetPassword } = useUser();

  const [step, setStep] = useState(1); // 1: Input email/phone, 2: OTP verify, 3: Reset password
  const [emailOrPhone, setEmailOrPhone] = useState('');
  
  // OTP verify state
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState(''); // Developer helper testing code
  
  // Password reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 1. Submit email/phone to trigger OTP
  const handleTriggerOtp = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setError('Please enter your registered Email or Phone.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await forgotPassword(emailOrPhone.trim());
      setSuccess('Verification OTP code sent!');
      
      // Store dev testing OTP if available
      if (data && data.testOtp) {
        setDevOtp(data.testOtp);
      }
      
      setTimeout(() => {
        setSuccess(null);
        setStep(2);
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to locate user account. Check your details.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit OTP to verify
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await verifyOtp(emailOrPhone.trim(), otp);
      setSuccess('OTP verified successfully!');
      
      setTimeout(() => {
        setSuccess(null);
        setStep(3);
      }, 1000);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Submit new passwords
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await resetPassword(emailOrPhone.trim(), otp, newPassword, confirmPassword);
      setSuccess('Password reset successfully!');
      
      setTimeout(() => {
        onNavigate('Login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Password reset failed. Ensure standard password guidelines are met.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="relative rounded-3xl border border-slate-205 dark:border-white/10 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600" />

          {/* Back to Login header link */}
          <div className="mb-6 flex justify-start">
            <button
              onClick={() => onNavigate('Login')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>
          </div>

          <div className="text-center space-y-2 mb-8">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 shadow-inner">
              <KeyRound className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {step === 1 ? 'Forgot Password?' : step === 2 ? 'Verify Identity' : 'New Password'}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {step === 1 ? 'Reset your ServiceBridge credentials' : step === 2 ? 'Enter the code sent to your profile' : 'Create your new secure password'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-rose-700 dark:text-rose-400 text-xs font-semibold"
              >
                <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
              >
                <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP 1: REQUEST OTP */}
          {step === 1 && (
            <form onSubmit={handleTriggerOtp} className="space-y-6">
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                  Email or Phone number
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-14 pr-4 py-3 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/60 focus:outline-none transition duration-200 shadow-sm"
                    placeholder="john@example.com or 9988776655"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-glow transition hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Locating Account...
                  </>
                ) : (
                  <>
                    Send Reset OTP
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              
              {/* Dev mode tester box */}
              {devOtp && (
                <div className="p-4 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 rounded-2xl text-left space-y-1">
                  <div className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400">
                    Local Demo Mode Helper
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    OTP generated for <span className="font-semibold">{emailOrPhone}</span> is:{' '}
                    <span className="font-mono font-extrabold text-base bg-white dark:bg-slate-950 px-2 py-0.5 border border-sky-100 dark:border-sky-900 rounded-lg text-sky-700 dark:text-sky-400 shadow-inner">
                      {devOtp}
                    </span>
                  </p>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Key className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    disabled={loading}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-3 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/60 focus:outline-none text-center font-mono font-bold tracking-[0.4em] text-lg transition duration-200 shadow-sm"
                    placeholder="000000"
                    aria-label="One-Time Password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-glow transition hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Verifying OTP...
                  </>
                ) : (
                  <>
                    Verify OTP
                    <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* STEP 3: RESET PASSWORDS */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              
              {/* New Password */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={loading}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-205 dark:border-white/10 pl-11 pr-12 py-3 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-905 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/60 focus:outline-none transition duration-200 shadow-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    disabled={loading}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-205 dark:border-white/10 pl-11 pr-4 py-3 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-905 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/60 focus:outline-none transition duration-200 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-glow transition hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

        </div>
      </motion.div>
    </section>
  );
}
