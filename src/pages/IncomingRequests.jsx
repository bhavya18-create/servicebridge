import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';
import { 
  Bell, 
  MapPin, 
  Clock, 
  DollarSign, 
  Check, 
  X, 
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialRequests = [
  {
    id: 1,
    customer: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    service: 'Electrical Repair & Troubleshooting',
    location: 'Powai, Mumbai',
    urgency: 'High',
    payment: '₹1,200',
    time: 'Today 2:00 PM',
    distance: '1.8 km',
    notes: 'Power outlets in the kitchen stopped working. Need quick diagnosis.',
  },
  {
    id: 2,
    customer: 'Amit Joshi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    service: 'Geyser Installation & Testing',
    location: 'Andheri West, Mumbai',
    urgency: 'Medium',
    payment: '₹950',
    time: 'Today 4:30 PM',
    distance: '3.4 km',
    notes: 'New instant geyser needs wall mounting and plumbing connection.',
  },
  {
    id: 3,
    customer: 'Nisha Patel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    service: 'Smart Socket & Switch Wiring',
    location: 'Bandra West, Mumbai',
    urgency: 'High',
    payment: '₹800',
    time: 'Today 5:15 PM',
    distance: '2.5 km',
    notes: 'Fitting smart switches for smart home control.',
  },
  {
    id: 4,
    customer: 'Karan Malhotra',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop',
    service: 'AC Copper Pipe Gas Refill',
    location: 'Juhu, Mumbai',
    urgency: 'Medium',
    payment: '₹2,100',
    time: 'Tomorrow 10:00 AM',
    distance: '4.2 km',
    notes: 'Cooling is very low. Leak test and gas refill needed.',
  },
];

export function IncomingRequests({ onNavigate }) {
  const [requests, setRequests] = useState(initialRequests);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAccept = (id, customer) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    triggerToast(`Accepted request from ${customer}! Job added to Active list.`);
  };

  const handleReject = (id, customer) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    triggerToast(`Rejected request from ${customer}.`);
  };

  return (
    <section className="bg-[#F1F5F9] dark:bg-slate-950 min-h-screen py-8 transition-colors duration-250">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-slate-205 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Incoming Requests</h1>
              <p className="mt-1 text-sm text-slate-655 dark:text-slate-400">Review new customer requests, compare payouts, and respond promptly.</p>
            </div>
            <div className="self-start sm:self-center rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200/50 dark:border-sky-900/30 px-4 py-2.5 text-sm font-semibold text-sky-700 dark:text-sky-400 shadow-sm flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              {requests.length} requests waiting
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {requests.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 p-8 shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400">
                  <Bell className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">All caught up!</h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">No new customer requests at the moment. We will notify you as soon as a new booking matches your expertise.</p>
                <Button className="mt-6 text-white" onClick={() => onNavigate('Profile')}>Back to Profile</Button>
              </motion.div>
            ) : (
              requests.map((request) => (
                <motion.article
                  key={request.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition duration-200 space-y-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start justify-between">
                    <div className="flex gap-4 items-center sm:items-start flex-col sm:flex-row text-center sm:text-left">
                      <Avatar 
                        name={request.customer} 
                        src={request.avatar} 
                        size="lg" 
                        className="ring-2 ring-white dark:ring-slate-800 shadow-md"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{request.customer}</h2>
                          <span className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200/30">
                            <ShieldCheck className="w-3.5 h-3.5" /> Verified Seeker
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{request.service}</p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {request.location} ({request.distance})</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {request.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5">
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Est. Payout</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 justify-end">
                          {request.payment}
                        </p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        request.urgency === 'High' 
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-450 border border-rose-200/30' 
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-450 border border-amber-200/30'
                      }`}>
                        {request.urgency} Urgency
                      </span>
                    </div>
                  </div>

                  {request.notes && (
                    <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-4 text-sm text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-white/5 leading-relaxed">
                      <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Customer Note:</span>
                      "{request.notes}"
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex gap-2 flex-wrap pt-3 border-t border-slate-100 dark:border-white/5">
                    <button
                      onClick={() => handleAccept(request.id, request.customer)}
                      className="flex-1 min-w-[120px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/10"
                    >
                      <Check className="h-4 w-4" /> Accept Job
                    </button>
                    <button
                      onClick={() => handleReject(request.id, request.customer)}
                      className="rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-350 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <X className="h-4 w-4 text-rose-500" /> Pass
                    </button>
                    <button
                      onClick={() => onNavigate('AI Assistant')}
                      className="rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-350 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4 text-sky-500" /> Chat
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
