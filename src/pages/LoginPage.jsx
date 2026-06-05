import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, Eye, EyeOff, Check, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

export function LoginPage({ onNavigate }) {
  const { signIn } = useUser();
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password) {
      setError('Please enter both Email/Phone and Password.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const user = await signIn(emailOrPhone.trim(), password, rememberMe);
      setSuccess('Logged in successfully!');
      
      setTimeout(() => {
        onNavigate('Profile');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="relative rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md overflow-hidden">
          
          {/* Top Decorative Blue Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600" />
          
          <div className="text-center space-y-2 mb-8">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 shadow-inner">
              <Zap className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm text-slate-505 dark:text-slate-400">
              Sign in to your ServiceBridge cockpit
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
                <Check className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Email / Phone Number
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
                  placeholder="Enter email or phone number"
                  aria-label="Email or Phone Number"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center pl-1">
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('Forgot Password')}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-12 py-3 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/60 focus:outline-none transition duration-200 shadow-sm"
                  placeholder="••••••••"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={loading}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4 dark:border-slate-800 dark:bg-slate-950"
                />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Remember Me
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-glow transition duration-200 hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('Register')}
                className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
