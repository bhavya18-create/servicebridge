import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  AlertTriangle, 
  MapPin, 
  Zap, 
  ShieldAlert, 
  Check, 
  Navigation,
  Compass,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialEmergencyJobs = [
  {
    id: 1,
    title: 'Short-Circuit & Burning Wire Smell',
    category: 'Electrical SOS',
    location: 'Santacruz East, Mumbai',
    payout: '₹1,700',
    distance: '1.2 km',
    dangerLevel: 'Critical',
    reportedTime: '3 mins ago',
    details: 'Customer reports smoking main circuit breaker panel and hot burning wire smell. Power is partially cut.',
  },
  {
    id: 2,
    title: 'High Pressure Water Valve Burst',
    category: 'Plumbing SOS',
    location: 'Andheri West, Mumbai',
    payout: '₹1,500',
    distance: '3.1 km',
    dangerLevel: 'High',
    reportedTime: '6 mins ago',
    details: 'Bathroom main inlet coupling burst. Water flooding living area. Customer unable to find local shut-off valve.',
  },
  {
    id: 3,
    title: 'Total Power Blackout & Sparking Outlet',
    category: 'Electrical SOS',
    location: 'Bandra West, Mumbai',
    payout: '₹1,950',
    distance: '2.4 km',
    dangerLevel: 'Critical',
    reportedTime: '9 mins ago',
    details: 'Wall outlet in bedroom sparked loudly, causing a full house blackout. Customer smells burning plastic.',
  },
  {
    id: 4,
    title: 'Commercial HVAC Unit Blockage',
    category: 'HVAC SOS',
    location: 'Bandra Kurla Complex (BKC)',
    payout: '₹3,400',
    distance: '4.8 km',
    dangerLevel: 'Medium',
    reportedTime: '12 mins ago',
    details: 'Server room backup AC unit has failed, causing temperatures to rise rapidly. Urgent repair required.',
  },
];

export function EmergencyJobs({ onNavigate }) {
  const [jobs, setJobs] = useState(initialEmergencyJobs);
  const [toastMessage, setToastMessage] = useState(null);
  const [acceptingId, setAcceptingId] = useState(null);

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleQuickAccept = (id, title) => {
    setAcceptingId(id);
    setTimeout(() => {
      setJobs(prev => prev.filter(j => j.id !== id));
      setAcceptingId(null);
      triggerToast(`Accepted SOS Job: "${title}"! GPS coordinates sent. Go en route immediately!`);
    }, 1200);
  };

  return (
    <section className="bg-[#F1F5F9] dark:bg-slate-950 min-h-screen py-8 transition-colors duration-250">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-rose-200/50 dark:border-rose-900/35 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200/40">
                <AlertTriangle className="h-7 w-7 animate-bounce" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Emergency SOS Jobs
                </h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Urgent, high-paying jobs requiring immediate response. Fast acceptance guarantees maximum payout.
                </p>
              </div>
            </div>
            <div className="self-start sm:self-center rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-250/50 dark:border-rose-900/40 px-4 py-2.5 text-sm font-semibold text-rose-700 dark:text-rose-450 shadow-sm flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              {jobs.length} SOS Alerts Active
            </div>
          </div>
        </div>

        {/* SOS Alerts Grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {jobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 p-8 shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">All emergencies cleared</h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">Excellent! There are no pending critical incidents in your localized area. Relax or work on standard bookings.</p>
                <Button className="mt-6 text-white" onClick={() => onNavigate('Profile')}>Back to Profile</Button>
              </motion.div>
            ) : (
              jobs.map((job) => (
                <motion.article
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition duration-200 space-y-4 relative overflow-hidden"
                >
                  {/* Left decorative danger edge indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    job.dangerLevel === 'Critical' ? 'bg-red-650' : 'bg-amber-500'
                  }`} />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                          job.dangerLevel === 'Critical' 
                            ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200/30' 
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/30'
                        }`}>
                          <ShieldAlert className="w-3.5 h-3.5" /> SOS • {job.dangerLevel}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-550 font-semibold">{job.reportedTime}</span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{job.title}</h2>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-slate-400" /> {job.distance} away</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5">
                      <div className="sm:text-right">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-505 uppercase tracking-wider">Premium Payout</p>
                        <p className="text-2xl font-black text-rose-605 dark:text-rose-400 flex items-center gap-0.5 sm:justify-end">
                          {job.payout}
                        </p>
                      </div>
                      <span className="text-[10px] text-rose-600 dark:text-rose-450 font-bold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md mt-1 border border-rose-200/20">
                        +40% Emergency Bonus Included
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed rounded-2xl bg-slate-50 dark:bg-slate-950/80 p-4 border border-slate-200/40 dark:border-white/5 font-medium">
                    "{job.details}"
                  </p>

                  <div className="pt-2 border-t border-slate-105 dark:border-white/5 flex gap-2 justify-between items-center flex-wrap">
                    <span className="text-xs text-slate-450 dark:text-slate-505 font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Auto-Dispatched GPS Route Guidance Included
                    </span>
                    
                    <button
                      onClick={() => handleQuickAccept(job.id, job.title)}
                      disabled={acceptingId === job.id}
                      className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-650 hover:scale-[1.02] text-white px-5 py-3 text-sm font-bold shadow-lg shadow-rose-500/20 flex items-center gap-2 transition duration-200 cursor-pointer disabled:opacity-50"
                    >
                      {acceptingId === job.id ? (
                        <>GPS Transmitting...</>
                      ) : (
                        <>
                          Quick Accept & Route <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Action / Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-6 z-[100] flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-5 py-4 shadow-2xl border border-white/10 dark:bg-slate-950 dark:border-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Check className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
