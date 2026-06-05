import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '../components/ui/Avatar';
import { 
  User, Mail, Phone, MapPin, Shield, Calendar, Edit2, Key, LogOut, Check, X, Star, 
  AlertCircle, Award, List, Sparkles, MessageSquare, Heart, ShieldCheck, Clock, 
  Activity, Bell, Moon, Globe, LifeBuoy, Zap, TrendingUp, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, DollarSign
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { useUser } from '../contexts/UserContext';
import { useSettings } from '../contexts/SettingsContext';
import { HelpModal } from '../components/HelpModal';
import { LanguageModal } from '../components/LanguageModal';

// Mock charts data for provider dashboard
const performanceData = [
  { day: 'Mon', earnings: 800 },
  { day: 'Tue', earnings: 1400 },
  { day: 'Wed', earnings: 900 },
  { day: 'Thu', earnings: 1800 },
  { day: 'Fri', earnings: 1200 },
  { day: 'Sat', earnings: 2100 },
  { day: 'Sun', earnings: 1420 },
];

// Carousel items for seeker dashboard
const promoCards = [
  { id: 1, title: 'Summer AC Cleaning Special', desc: 'Get 25% off all AC repairs and service bookings this week.', icon: '❄️', code: 'ACSUMMER25', color: 'from-amber-500 to-orange-600' },
  { id: 2, title: 'Rain Shield Waterproofing', desc: 'Book verified roofing and ceiling leak repairs with a 1-year guarantee.', icon: '☔', code: 'MONSOON10', color: 'from-sky-500 to-indigo-650' },
  { id: 3, title: 'Hyperlocal Safe Electricals', desc: 'Full home wiring inspections starting at just ₹499.', icon: '⚡', code: 'SAFESTART', color: 'from-emerald-500 to-teal-600' },
];

export function ProfilePage({ onNavigate }) {
  const { user, updateUser, changePassword, signOut } = useUser();
  const {
    t,
    theme,
    languages,
    languageOptions,
    notificationsEnabled,
    toggleTheme,
    setNotificationsEnabled,
    openHelp,
  } = useSettings();

  const isProvider = user?.role === 'provider';

  // Active Tab state: 'overview' | 'account' | 'settings' (provider only) | 'security'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Edit Profile Form State
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [location, setLocation] = useState(user?.location || '');
  const [address, setAddress] = useState(user?.address || '');
  const [serviceCategory, setServiceCategory] = useState(user?.serviceCategory || '');
  const [experience, setExperience] = useState(user?.experience || '');
  const [skills, setSkills] = useState(user?.skills ? (Array.isArray(user.skills) ? user.skills.join(', ') : user.skills) : '');
  const [availability, setAvailability] = useState(user?.availability || 'Full-time');
  
  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Alerts states
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });
  const [loading, setLoading] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  // Seeker Specific states
  const [seekerQuery, setSeekerQuery] = useState('');
  const [bookings, setBookings] = useState([]);
  const [savedProviders, setSavedProviders] = useState([]);
  const [promoIndex, setPromoIndex] = useState(0);

  // Provider Specific states
  const [online, setOnline] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Load local Seeker storage data on mount
  useEffect(() => {
    if (!isProvider) {
      const storedBookings = localStorage.getItem('servicebridge-bookings');
      if (storedBookings) setBookings(JSON.parse(storedBookings));
      
      const storedSaved = localStorage.getItem('servicebridge-saved-providers');
      if (storedSaved) setSavedProviders(JSON.parse(storedSaved));
    }
  }, [isProvider]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500 animate-pulse">Verifying credentials, redirecting...</p>
      </div>
    );
  }

  const triggerAlert = (msg, type = 'success') => {
    setAlert({ show: true, msg, type });
    setTimeout(() => setAlert({ show: false, msg: '', type: 'success' }), 4000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      triggerAlert('Profile photo must be less than 2MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setLoading(true);
        await updateUser({ avatar: reader.result });
        triggerAlert('Profile photo updated successfully!');
      } catch (err) {
        triggerAlert(err.message || 'Failed to update profile photo.', 'error');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !location.trim() || !address.trim()) {
      triggerAlert('Name, Location, and Address are required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const updates = {
        fullName: fullName.trim(),
        location: location.trim(),
        address: address.trim(),
      };

      if (isProvider) {
        updates.serviceCategory = serviceCategory;
        updates.experience = experience;
        updates.skills = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : skills;
        updates.availability = availability;
      }

      await updateUser(updates);
      triggerAlert('Profile updated successfully!');
      setActiveTab('overview');
    } catch (err) {
      triggerAlert(err.message || 'Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      triggerAlert('All password fields are required.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerAlert('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword, confirmPassword);
      triggerAlert('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setActiveTab('overview');
    } catch (err) {
      triggerAlert(err.message || 'Failed to update password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Seeker Actions
  const handleRemoveSaved = (providerName) => {
    const updated = savedProviders.filter(p => p.name !== providerName);
    setSavedProviders(updated);
    localStorage.setItem('servicebridge-saved-providers', JSON.stringify(updated));
    triggerAlert(`Removed ${providerName} from saved favorites`);
  };

  // Provider Data Mock
  const providerStats = [
    { label: 'Today Earnings', value: '₹1,420', color: 'from-emerald-500 to-teal-655' },
    { label: 'Active Jobs', value: '2', color: 'from-sky-500 to-blue-600' },
    { label: 'Pending Requests', value: '7', color: 'from-violet-500 to-purple-600' },
    { label: 'Trust Score', value: '96%', color: 'from-amber-500 to-orange-655' },
  ];

  const providerJobs = [
    { id: 101, customer: 'Neha Sharma', service: 'AC Copper Wire Fault assessment', status: 'On route', location: 'Santacruz East, Mumbai', eta: '12 mins' },
    { id: 102, customer: 'Amit Joshi', service: 'Main Switchbox fuse replacement', status: 'Arrived', location: 'Andheri West, Mumbai', eta: 'Arrived' },
  ];

  // Seeker Data Mock
  const nearbySeekerProviders = [
    { name: 'Raju Sharma', role: 'Electrician', distance: '1.2 km', rating: 4.9, completed: 520, trustScore: '96%', avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop' },
    { name: 'Priya Singh', role: 'Plumber', distance: '2.4 km', rating: 4.8, completed: 310, trustScore: '94%', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' },
    { name: 'Vijay Varma', role: 'Carpenter', distance: '2.5 km', rating: 4.7, completed: 180, trustScore: '92%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  ];

  const filteredNearbySeekerProviders = nearbySeekerProviders.filter(p => 
    p.name.toLowerCase().includes(seekerQuery.toLowerCase()) || 
    p.role.toLowerCase().includes(seekerQuery.toLowerCase())
  );

  return (
    <section className="py-6 max-w-6xl mx-auto px-4 text-slate-800 dark:text-slate-100 select-none">
      
      {/* Alert Banner */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[110] p-4 rounded-2xl border shadow-lg flex items-center gap-3 text-sm font-semibold w-full max-w-md ${
              alert.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300' 
                : 'bg-rose-50 dark:bg-rose-955/90 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-350'
            }`}
          >
            {alert.type === 'success' ? <Check className="h-5 w-5 text-emerald-600" /> : <AlertCircle className="h-5 w-5 text-rose-600" />}
            <span>{alert.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Header Hero Section */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 dark:from-slate-900 dark:via-sky-950/20 dark:to-slate-950 p-6 sm:p-8 text-white shadow-xl mb-8 border border-white/5">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-sky-500/10 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div 
              onClick={() => document.getElementById('avatar-upload').click()} 
              className="relative h-20 w-20 rounded-full overflow-hidden ring-4 ring-sky-500/30 flex-shrink-0 shadow-lg cursor-pointer group"
              title="Click to upload profile photo"
            >
              <Avatar
                name={user.fullName}
                src={user.avatar}
                size="xl"
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Edit2 className="h-5 w-5 text-white" />
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div className="text-left">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{user.fullName}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <ShieldCheck className="h-3 w-3" /> Vetted
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium mt-1">{user.email}</p>
              <p className="text-xs text-slate-500 mt-0.5">{isProvider ? 'Service Partner Account' : 'Seeker Account'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isProvider && (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl shadow-inner">
                <span className={`h-2.5 w-2.5 rounded-full ${online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                <span className="text-xs font-bold text-slate-300">{online ? 'Active Online' : 'Offline Mode'}</span>
                <button 
                  onClick={() => setOnline(!online)}
                  className="text-[10px] font-bold text-sky-400 hover:text-sky-300 ml-2 hover:underline"
                >
                  {online ? 'Go Offline' : 'Go Online'}
                </button>
              </div>
            )}
            <button
              onClick={() => {
                signOut();
                onNavigate('Home');
              }}
              className="px-4 py-2 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-2xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
        
        {/* Navigation Sidebar Drawer */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-md space-y-1 text-left">
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-3 mb-2">Workspace Hub</span>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full py-3 px-4 rounded-2xl flex items-center gap-3 text-sm font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-sky-50 dark:bg-sky-955/40 text-sky-600 dark:text-sky-400 border border-sky-200/30 dark:border-sky-900/20'
                  : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Console Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`w-full py-3 px-4 rounded-2xl flex items-center gap-3 text-sm font-semibold transition ${
                activeTab === 'account'
                  ? 'bg-sky-50 dark:bg-sky-955/40 text-sky-600 dark:text-sky-400 border border-sky-200/30 dark:border-sky-900/20'
                  : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile Settings</span>
            </button>

            {isProvider && (
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full py-3 px-4 rounded-2xl flex items-center gap-3 text-sm font-semibold transition ${
                  activeTab === 'settings'
                    ? 'bg-sky-50 dark:bg-sky-955/40 text-sky-600 dark:text-sky-400 border border-sky-200/30 dark:border-sky-900/20'
                    : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <Bell className="h-4 w-4" />
                <span>App Preferences</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full py-3 px-4 rounded-2xl flex items-center gap-3 text-sm font-semibold transition ${
                activeTab === 'security'
                  ? 'bg-violet-50 dark:bg-violet-955/40 text-violet-600 dark:text-violet-400 border border-violet-200/30 dark:border-violet-900/20'
                  : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              <Key className="h-4 w-4" />
              <span>Access & Security</span>
            </button>
          </div>
        </div>

        {/* Content Pane */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW / DASHBOARD TAB */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                {/* 1. SEEKER DASHBOARD CONTENTS */}
                {!isProvider && (
                  <div className="grid gap-6">
                    {/* Seeker Greeting & Quick Search */}
                    <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div className="text-left space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Need a quick local responder?</h3>
                        <p className="text-xs text-slate-500">Search electrician, plumber, cleaner, mechanic instantly near you.</p>
                      </div>
                      <div className="relative w-full md:max-w-xs">
                        <input
                          type="text"
                          value={seekerQuery}
                          onChange={(e) => setSeekerQuery(e.target.value)}
                          placeholder="Search professional..."
                          className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-805 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    {/* Interactive Promotional Carousel */}
                    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${promoCards[promoIndex].color} p-6 text-white shadow-md flex items-center justify-between min-h-[160px]`}>
                      <div className="absolute right-4 top-2 text-7xl opacity-10 pointer-events-none">{promoCards[promoIndex].icon}</div>
                      <div className="space-y-2 max-w-lg">
                        <span className="inline-block text-[9px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md tracking-wider">Special Promotion</span>
                        <h4 className="text-lg sm:text-xl font-bold">{promoCards[promoIndex].title}</h4>
                        <p className="text-xs text-white/80 leading-relaxed font-medium">{promoCards[promoIndex].desc}</p>
                        <div className="pt-2 flex items-center gap-2">
                          <span className="text-[10px] font-bold text-white/90">Use Code:</span>
                          <span className="font-mono bg-white/20 text-xs font-extrabold px-2.5 py-0.5 rounded border border-white/20">{promoCards[promoIndex].code}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pl-4 border-l border-white/10">
                        <button 
                          onClick={() => setPromoIndex(prev => (prev - 1 + promoCards.length) % promoCards.length)} 
                          className="p-1.5 rounded-full hover:bg-white/10 transition"
                        >
                          <ChevronLeft className="h-4.5 w-4.5" />
                        </button>
                        <button 
                          onClick={() => setPromoIndex(prev => (prev + 1) % promoCards.length)} 
                          className="p-1.5 rounded-full hover:bg-white/10 transition"
                        >
                          <ChevronRight className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>

                    {/* Seeker Dashboard widgets */}
                    <div className="grid gap-6 md:grid-cols-[1.7fr_1.3fr]">
                      
                      {/* Nearby providers */}
                      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col justify-between min-h-[360px]">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-bold text-slate-905 dark:text-white">Vetted partners nearby</h3>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/20">Response speed &lt; 15m</span>
                          </div>
                          <div className="space-y-3.5">
                            {filteredNearbySeekerProviders.length === 0 ? (
                              <p className="text-xs text-slate-500 text-center py-6">No matching nearby providers found.</p>
                            ) : (
                              filteredNearbySeekerProviders.map((p) => (
                                <div key={p.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-805 hover:border-sky-500/20 transition-all duration-200">
                                  <div className="flex gap-3 items-center">
                                    <Avatar name={p.name} src={p.avatar} size="md" />
                                    <div>
                                      <h4 className="font-bold text-slate-905 dark:text-white text-xs sm:text-sm">{p.name}</h4>
                                      <p className="text-[10px] text-slate-500">{p.role} • {p.distance} away</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="flex items-center text-[10px] text-amber-500 font-bold"><Star className="h-3 w-3 fill-amber-400 mr-0.5" />{p.rating}</span>
                                    <button 
                                      onClick={() => onNavigate('Providers')} 
                                      className="text-[10px] font-bold text-sky-600 dark:text-sky-400 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-105 transition"
                                    >
                                      Contact
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                        <button onClick={() => onNavigate('Providers')} className="w-full text-center text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline pt-4 border-t border-slate-100 dark:border-slate-805 mt-2">View all certified providers</button>
                      </div>

                      {/* Active Bookings Summary & Saved */}
                      <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
                          <h3 className="text-base font-bold text-slate-905 dark:text-white mb-4">Active Schedules</h3>
                          <div className="space-y-3">
                            {bookings.length === 0 ? (
                              <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                <p className="text-[11px] text-slate-500">You have no active schedules.</p>
                                <button onClick={() => onNavigate('Services')} className="text-[10px] font-bold text-sky-600 dark:text-sky-400 mt-1 hover:underline">Book service now</button>
                              </div>
                            ) : (
                              bookings.slice(0, 2).map((booking) => (
                                <div key={booking.id} className="flex gap-3 items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850">
                                  <Avatar name={booking.providerName} src={booking.avatar} size="sm" className="h-9 w-9" />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">{booking.providerName}</h4>
                                    <p className="text-[10px] text-slate-500 truncate">{booking.serviceType}</p>
                                    <p className="text-[9px] text-sky-600 font-bold truncate mt-0.5">{booking.status}</p>
                                  </div>
                                </div>
                              ))
                            )}
                            {bookings.length > 0 && (
                              <button onClick={() => onNavigate('Bookings')} className="w-full text-center text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline pt-2 block">Track bookings ({bookings.length})</button>
                            )}
                          </div>
                        </div>

                        {/* Favorites */}
                        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
                          <h3 className="text-base font-bold text-slate-905 dark:text-white mb-4">Saved Favorites</h3>
                          <div className="space-y-3">
                            {savedProviders.length === 0 ? (
                              <p className="text-xs text-slate-500 text-center py-4">Save providers from listings to see them here.</p>
                            ) : (
                              savedProviders.slice(0, 3).map((sp) => (
                                <div key={sp.name} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850">
                                  <div className="flex gap-2.5 items-center">
                                    <Avatar name={sp.name} src={sp.avatar} size="sm" />
                                    <div>
                                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{sp.name}</h4>
                                      <p className="text-[9px] text-slate-500">{sp.role}</p>
                                    </div>
                                  </div>
                                  <button onClick={() => handleRemoveSaved(sp.name)} className="p-1 text-slate-400 hover:text-rose-500 transition">
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 2. PROVIDER DASHBOARD CONTENTS */}
                {isProvider && (
                  <div className="grid gap-6">
                    {/* Stats Row */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {providerStats.map((stat) => (
                        <div key={stat.label} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                          <span className="text-xs font-bold text-slate-455 uppercase tracking-wider">{stat.label}</span>
                          <div className="flex items-baseline justify-between mt-2">
                            <span className="text-2xl font-black text-slate-905 dark:text-white">{stat.value}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">Live status</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart & Active Jobs Grid */}
                    <div className="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
                      {/* Business Analytics AreaChart */}
                      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-base font-bold text-slate-905 dark:text-white">Earnings Analytics</h3>
                            <p className="text-xs text-slate-500">Weekly earnings breakdown including SOS bonuses.</p>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="h-4.5 w-4.5" /> +12.4%</span>
                        </div>
                        <div className="h-60 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="earningsColor" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                              <Area type="monotone" dataKey="earnings" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#earningsColor)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Active Jobs Alerts list */}
                      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between min-h-[320px]">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active assignments</h3>
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <div className="space-y-4">
                            {providerJobs.map((job) => (
                              <div key={job.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-805 space-y-2">
                                <div className="flex justify-between items-start gap-2">
                                  <div>
                                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{job.customer}</h4>
                                    <p className="text-[10px] text-slate-500 font-semibold">{job.service}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">{job.status}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/55">
                                  <span>{job.location}</span>
                                  <button 
                                    onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                                    className="font-bold text-sky-500 flex items-center gap-0.5 hover:underline"
                                  >
                                    {expandedJobId === job.id ? 'Close' : 'Track'}
                                    <ChevronDown className={`h-3 w-3 transform transition ${expandedJobId === job.id ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                                
                                {expandedJobId === job.id && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-2 text-[10px] text-slate-550 space-y-1 bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900/50 mt-1"
                                  >
                                    <div className="flex justify-between"><span>ETA:</span><span className="font-semibold text-slate-800 dark:text-white">{job.eta}</span></div>
                                    <div className="flex justify-between"><span>Call verification:</span><span className="font-semibold text-sky-600">SB-OTP-920</span></div>
                                    <button 
                                      onClick={() => triggerAlert('Opening dispatch map coordinates...')}
                                      className="w-full mt-2 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-[9px] hover:bg-sky-700 transition"
                                    >
                                      Open Dispatch GPS
                                    </button>
                                  </motion.div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => onNavigate('Incoming Requests')} className="w-full text-center text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline pt-4 border-t border-slate-100 dark:border-slate-805 mt-2">Manage incoming bookings</button>
                      </div>
                    </div>

                    {/* Quick Access panel cards */}
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                      {[
                        { label: 'Pending Requests', page: 'Incoming Requests', desc: 'Manage incoming job orders' },
                        { label: 'Manage Services', page: 'My Services', desc: 'Edit rates and list catalogs' },
                        { label: 'Emergency SOS Alerts', page: 'Emergency Jobs', desc: 'Accept high paying critical tasks' },
                        { label: 'Settlement History', page: 'Earnings', desc: 'Track payouts and print statements' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => onNavigate(item.page)}
                          className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 px-5 py-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500/20 hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[120px]"
                        >
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.label}</span>
                          <span className="text-[10px] text-slate-500 font-medium leading-relaxed block mt-2">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ACCOUNT DETAILS TAB */}
            {activeTab === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-3xl border border-slate-205 dark:border-white/10 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md text-left"
              >
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Details</h2>
                    <p className="text-xs text-slate-500">Update your account credentials and personal fields.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider pl-1">Full Name</label>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Location / City</label>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Full Address</label>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                      />
                    </div>

                    {/* Provider Credentials editing */}
                    {isProvider && (
                      <>
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Service Category</label>
                          <select
                            required
                            disabled={loading}
                            value={serviceCategory}
                            onChange={(e) => setServiceCategory(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:outline-none transition cursor-pointer"
                          >
                            <option value="Electrical Repair">Electrical Repair</option>
                            <option value="Plumbing Service">Plumbing Service</option>
                            <option value="Home Cleaning">Home Cleaning</option>
                            <option value="AC Repair & Servicing">AC Repair & Servicing</option>
                            <option value="Carpentry & Rack Install">Carpentry & Rack Install</option>
                            <option value="Laptop Repair">Laptop Repair</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Experience</label>
                          <input
                            type="text"
                            required
                            disabled={loading}
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-905 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Skills (Comma Separated)</label>
                          <input
                            type="text"
                            required
                            disabled={loading}
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-905 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Availability</label>
                          <select
                            required
                            disabled={loading}
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-sky-500 focus:outline-none transition cursor-pointer"
                          >
                            <option value="Full-time">Full-time (All days)</option>
                            <option value="Part-time">Part-time (Evenings)</option>
                            <option value="Weekends">Weekends only</option>
                            <option value="Emergency Only">Emergency jobs only</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold shadow-md flex items-center gap-2"
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* APP SETTINGS TAB (PROVIDER ONLY) */}
            {activeTab === 'settings' && isProvider && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-3xl border border-slate-205 dark:border-white/10 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md text-left space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">App Preferences</h2>
                  <p className="text-xs text-slate-500">Configure theme, languages, notification options and help desk options.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Theme Change */}
                  <button 
                    onClick={toggleTheme}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-sky-500/20 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm"><Moon className="h-4 w-4" /></span>
                      <span className="text-xs font-bold">Theme Style</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 capitalize">{theme} mode</span>
                  </button>

                  {/* Language Selector */}
                  <button 
                    onClick={() => setLanguageModalOpen(true)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-sky-500/20 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm"><Globe className="h-4 w-4" /></span>
                      <span className="text-xs font-bold">App Language</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {languages.map(code => languageOptions.find(o => o.code === code)?.label || code).join(', ')}
                    </span>
                  </button>

                  {/* Notifications */}
                  <button 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-sky-500/20 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm"><Bell className="h-4 w-4" /></span>
                      <span className="text-xs font-bold">Alert Alerts</span>
                    </div>
                    <span className={`text-[10px] font-bold ${notificationsEnabled ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {notificationsEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </button>

                  {/* Support */}
                  <button 
                    onClick={openHelp}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-sky-500/20 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm"><LifeBuoy className="h-4 w-4" /></span>
                      <span className="text-xs font-bold">Help & Support</span>
                    </div>
                    <span className="text-[10px] font-bold text-sky-500">Contact Us</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ACCESS & SECURITY TAB */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-3xl border border-slate-205 dark:border-white/10 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md text-left space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-905 dark:text-white">Access & Password Security</h2>
                  <p className="text-xs text-slate-500">Configure a strong security password for access protection.</p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Current Password</label>
                    <input
                      type="password"
                      required
                      disabled={loading}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-905 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">New Password</label>
                      <input
                        type="password"
                        required
                        disabled={loading}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-905 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                        placeholder="Min 8 characters"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider pl-1">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        disabled={loading}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/40 text-slate-905 dark:text-white focus:border-sky-500 focus:outline-none transition shadow-sm"
                        placeholder="Re-enter new password"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-gradient-to-r from-sky-655 to-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md"
                    >
                      {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Modals for Preferences */}
      <HelpModal />
      <LanguageModal isOpen={languageModalOpen} onClose={() => setLanguageModalOpen(false)} />
    </section>
  );
}
