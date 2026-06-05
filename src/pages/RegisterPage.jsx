import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Briefcase, Mail, Phone, Lock, MapPin, List, Award, Calendar, Check, AlertCircle, ArrowLeft, ArrowRight, Zap, CheckCircle2, FileText, Upload, X, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

export function RegisterPage({ onNavigate }) {
  const { signUp } = useUser();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null); // 'service_seeker' | 'provider'

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    address: '',
    // Provider specific fields
    serviceCategory: '',
    experience: '',
    skills: '',
    availability: 'Full-time',
    // KYC Documents (base64)
    aadhaarCard: null,
    panCard: null
  });

  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [panPreview, setPanPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocUpload = (field, file) => {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      setError('Only JPG, PNG or PDF files are accepted for KYC documents.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Document size must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFormData(prev => ({ ...prev, [field]: base64 }));
      if (field === 'aadhaarCard') setAadhaarPreview({ name: file.name, type: file.type, url: base64 });
      if (field === 'panCard') setPanPreview({ name: file.name, type: file.type, url: base64 });
    };
    reader.readAsDataURL(file);
  };

  const clearDoc = (field) => {
    setFormData(prev => ({ ...prev, [field]: null }));
    if (field === 'aadhaarCard') setAadhaarPreview(null);
    if (field === 'panCard') setPanPreview(null);
  };

  // Password Requirements Verification List
  const passwordRequirements = [
    { label: 'Minimum 8 characters', test: (pw) => pw.length >= 8 },
    { label: 'One uppercase letter (A-Z)', test: (pw) => /[A-Z]/.test(pw) },
    { label: 'One lowercase letter (a-z)', test: (pw) => /[a-z]/.test(pw) },
    { label: 'One number (0-9)', test: (pw) => /[0-9]/.test(pw) },
    { label: 'One special character (!@#$%^&*)', test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) }
  ];

  const getPasswordStrength = () => {
    const passed = passwordRequirements.filter(req => req.test(formData.password)).length;
    if (passed === 0) return { pct: 0, text: 'Empty', color: 'bg-slate-200' };
    if (passed < 3) return { pct: 33, text: 'Weak', color: 'bg-rose-500' };
    if (passed < 5) return { pct: 66, text: 'Medium', color: 'bg-amber-500' };
    return { pct: 100, text: 'Strong', color: 'bg-emerald-500' };
  };

  const handleNextStep = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
    setError(null);
  };

  const validateForm = () => {
    const { fullName, email, phone, password, confirmPassword, location, address, serviceCategory, experience, skills, aadhaarCard, panCard } = formData;

    if (!fullName || !email || !phone || !password || !confirmPassword || !location || !address) {
      return 'All common fields are required.';
    }

    if (role === 'provider' && (!serviceCategory || !experience || !skills)) {
      return 'Please fill in all provider business details.';
    }

    if (role === 'provider' && !aadhaarCard) {
      return 'Aadhaar Card document is required for provider registration.';
    }

    if (role === 'provider' && !panCard) {
      return 'PAN Card document is required for provider registration.';
    }

    // Email Pattern check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.toLowerCase())) {
      return 'Invalid email address format.';
    }

    // Phone Pattern check
    const phoneRe = /^\+?[0-9]{10,14}$/;
    if (!phoneRe.test(phone)) {
      return 'Phone number must be between 10 to 14 digits.';
    }

    // Passwords Match check
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    // Password strength check
    const passedRequirements = passwordRequirements.every(req => req.test(password));
    if (!passedRequirements) {
      return 'Password does not meet all security guidelines.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: role,
        location: formData.location,
        address: formData.address
      };

      if (role === 'provider') {
        payload.serviceCategory = formData.serviceCategory;
        payload.experience = formData.experience;
        payload.skills = formData.skills;
        payload.availability = formData.availability;
      }

      const user = await signUp(payload);
      setSuccess('Account created! Logging you in...');

      setTimeout(() => {
        onNavigate('Profile');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your data.');
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <section className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CHOOSE ACCOUNT TYPE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 shadow-inner">
                  <Zap className="h-6 w-6" />
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-905 dark:text-white sm:text-5xl">
                  Create <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">ServiceBridge</span> Account
                </h1>
                <p className="mx-auto max-w-md text-base text-slate-500 dark:text-slate-400">
                  Select your profile category below to begin registration.
                </p>
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {/* Seeker Option Card */}
                <button
                  onClick={() => handleNextStep('service_seeker')}
                  className="group relative rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-sky-650 dark:text-sky-405 shadow-inner text-2xl">
                      🔍
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-650 dark:group-hover:text-sky-405 transition">
                        Service Seeker
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Find local verified professionals, compare prices, write reviews, and track active bookings.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between font-bold text-sky-600 dark:text-sky-400 text-sm pl-1">
                    <span>Register as Seeker</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
                  </div>
                </button>

                {/* Provider Option Card */}
                <button
                  onClick={() => handleNextStep('provider')}
                  className="group relative rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 shadow-inner text-2xl">
                      💼
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-650 dark:group-hover:text-violet-400 transition">
                        Service Provider
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        List services, showcase skills, accept real-time requests, and track earnings metrics.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between font-bold text-violet-600 dark:text-violet-400 text-sm pl-1">
                    <span>Register as Partner</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
                  </div>
                </button>
              </div>

              <div className="pt-6">
                <p className="text-xs text-slate-505 dark:text-slate-400">
                  Already have an account?{' '}
                  <button onClick={() => onNavigate('Login')} className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
                    Login here
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: REGISTRATION FORM */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600" />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 pl-1">
                    Step 2 of 2
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-905 dark:text-white mt-1">
                    {role === 'service_seeker' ? 'Seeker Registration' : 'Provider Registration'}
                  </h2>
                </div>
                <button
                  onClick={handleBackStep}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-xs font-semibold transition"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-rose-700 dark:text-rose-400 text-xs font-semibold"
                  >
                    <AlertCircle className="h-4.5 w-4.5 mt-0.5 flex-shrink-0" />
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
                    <CheckCircle2 className="h-4.5 w-4.5 mt-0.5 flex-shrink-0" />
                    <span>{success}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Common Fields Grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        disabled={loading}
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        disabled={loading}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                        placeholder="9988776655"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                      Location / City
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                        placeholder="Mumbai, Maharashtra"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 text-left sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                      Full Address
                    </label>
                    <input
                      type="text"
                      required
                      disabled={loading}
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                      placeholder="Enter your flat/street address"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type="password"
                        required
                        disabled={loading}
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type="password"
                        required
                        disabled={loading}
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                </div>

                {/* Password Strength Checklist Indicator */}
                {formData.password && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-805 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400">Password Security:</span>
                      <span className={`font-bold ${
                        strength.text === 'Strong' ? 'text-emerald-500' :
                        strength.text === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                      }`}>
                        {strength.text}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.pct}%` }} />
                    </div>
                    <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/80">
                      {passwordRequirements.map(req => {
                        const pass = req.test(formData.password);
                        return (
                          <li key={req.label} className="flex items-center gap-2 text-[11px] font-semibold">
                            <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold ${
                              pass 
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600' 
                                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400'
                            }`}>
                              {pass ? '✓' : '•'}
                            </span>
                            <span className={pass ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-550'}>
                              {req.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* 2. Provider Specific Fields (Only visible if role === 'provider') */}
                {role === 'provider' && (
                  <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 space-y-5">
                    <h3 className="text-sm font-bold text-slate-905 dark:text-white pl-1 uppercase tracking-wider">
                      Business Details
                    </h3>
                    
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Category */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                          Service Category
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <List className="h-4 w-4" />
                          </div>
                          <select
                            required
                            disabled={loading}
                            value={formData.serviceCategory}
                            onChange={(e) => handleChange('serviceCategory', e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                            aria-label="Service Category"
                          >
                            <option value="">Select Service...</option>
                            <option value="Electrical Repair">Electrical Repair</option>
                            <option value="Plumbing Service">Plumbing Service</option>
                            <option value="Home Cleaning">Home Cleaning</option>
                            <option value="AC Repair & Servicing">AC Repair & Servicing</option>
                            <option value="Carpentry & Rack Install">Carpentry & Rack Install</option>
                            <option value="Laptop Repair">Laptop Repair</option>
                          </select>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                          Years of Experience
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Award className="h-4 w-4" />
                          </div>
                          <input
                            type="text"
                            required
                            disabled={loading}
                            value={formData.experience}
                            onChange={(e) => handleChange('experience', e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                            placeholder="e.g. 5 Years"
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-1.5 text-left sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                          Skills (Comma separated list)
                        </label>
                        <input
                          type="text"
                          required
                          disabled={loading}
                          value={formData.skills}
                          onChange={(e) => handleChange('skills', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                          placeholder="e.g. Wiring, Fuse Repair, Generator assessment"
                        />
                      </div>

                      {/* Availability */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                          Availability
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <select
                            required
                            disabled={loading}
                            value={formData.availability}
                            onChange={(e) => handleChange('availability', e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 pl-11 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950/50 focus:outline-none transition shadow-sm"
                            aria-label="Availability"
                          >
                            <option value="Full-time">Full-time (All days)</option>
                            <option value="Part-time">Part-time (Evenings)</option>
                            <option value="Weekends">Weekends only</option>
                            <option value="Emergency Only">Emergency jobs only</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* KYC Documents Section */}
                    <div className="pt-5 border-t border-slate-200/60 dark:border-slate-800 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                          <Shield className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">KYC Verification Documents</h3>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Required for identity verification. Accepted: JPG, PNG, PDF (max 5 MB each)</p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">

                        {/* Aadhaar Card Upload */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                            Aadhaar Card <span className="text-rose-500">*</span>
                          </label>
                          {!aadhaarPreview ? (
                            <label
                              htmlFor="aadhaar-upload"
                              className="group flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/30 px-4 py-6 cursor-pointer hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 transition-all duration-200"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                                <Upload className="h-5 w-5" />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Upload Aadhaar Card</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Click to browse file</p>
                              </div>
                              <input
                                id="aadhaar-upload"
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,application/pdf"
                                className="hidden"
                                disabled={loading}
                                onChange={(e) => handleDocUpload('aadhaarCard', e.target.files?.[0])}
                              />
                            </label>
                          ) : (
                            <div className="relative flex items-center gap-3 w-full rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 px-4 py-3">
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                                {aadhaarPreview.type === 'application/pdf' ? (
                                  <FileText className="h-4.5 w-4.5" />
                                ) : (
                                  <img src={aadhaarPreview.url} alt="Aadhaar preview" className="h-9 w-9 rounded-xl object-cover" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 truncate">{aadhaarPreview.name}</p>
                                <p className="text-[10px] text-emerald-600/70 dark:text-emerald-500/70 mt-0.5">✓ Uploaded successfully</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => clearDoc('aadhaarCard')}
                                className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-rose-100 dark:hover:bg-rose-950 hover:text-rose-600 transition"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* PAN Card Upload */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                            PAN Card <span className="text-rose-500">*</span>
                          </label>
                          {!panPreview ? (
                            <label
                              htmlFor="pan-upload"
                              className="group flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/30 px-4 py-6 cursor-pointer hover:border-sky-400 dark:hover:border-sky-500 hover:bg-sky-50/30 dark:hover:bg-sky-950/20 transition-all duration-200"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                                <Upload className="h-5 w-5" />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Upload PAN Card</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Click to browse file</p>
                              </div>
                              <input
                                id="pan-upload"
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,application/pdf"
                                className="hidden"
                                disabled={loading}
                                onChange={(e) => handleDocUpload('panCard', e.target.files?.[0])}
                              />
                            </label>
                          ) : (
                            <div className="relative flex items-center gap-3 w-full rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 px-4 py-3">
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                                {panPreview.type === 'application/pdf' ? (
                                  <FileText className="h-4.5 w-4.5" />
                                ) : (
                                  <img src={panPreview.url} alt="PAN preview" className="h-9 w-9 rounded-xl object-cover" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 truncate">{panPreview.name}</p>
                                <p className="text-[10px] text-emerald-600/70 dark:text-emerald-500/70 mt-0.5">✓ Uploaded successfully</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => clearDoc('panCard')}
                                className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-rose-100 dark:hover:bg-rose-950 hover:text-rose-600 transition"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                      </div>

                      <p className="text-[10px] text-slate-400 dark:text-slate-500 pl-1">
                        🔒 Your documents are encrypted and only used for identity verification. They will never be shared publicly.
                      </p>
                    </div>

                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-glow transition hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Complete Account Registration
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
