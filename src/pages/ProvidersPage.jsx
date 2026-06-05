import { useMemo, useState } from 'react';
import { Star, MapPin, Search, Calendar, MessageSquare, Check, Sparkles, X, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { providers as rawProviders, categories } from '../constants/data';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

function ProviderCard({ provider, onView, onChat, onBook }) {
  return (
    <div className="group relative rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 hover:shadow-xl hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between min-h-[290px]">
      <div className="flex items-start gap-4">
        <Avatar
          name={provider.name}
          src={provider.image}
          size="h-16 w-16 text-lg font-bold"
          className="ring-2 ring-slate-100 dark:ring-slate-800"
        />
        
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{provider.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{provider.role} • {provider.years} yrs exp</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                {provider.trustScore} Trust
              </span>
              <div className="flex items-center justify-end gap-1 mt-1 text-xs text-amber-500 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{provider.rating}</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-655 dark:text-slate-350 line-clamp-2 leading-relaxed font-medium">{provider.bio}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="text-left">
          <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Price Estimate</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{provider.priceRange}</span>
        </div>
        <span className="rounded-full bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1 text-[10px] font-bold text-sky-700 dark:text-sky-400">
          {provider.availability}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" className="flex-1 py-2 text-xs rounded-xl" onClick={onView}>
          Details
        </Button>
        <Button variant="outline" className="flex-1 py-2 text-xs rounded-xl" onClick={onChat}>
          Chat
        </Button>
        <Button className="flex-1 py-2 text-xs bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-sm" onClick={onBook}>
          Book
        </Button>
      </div>
    </div>
  );
}

export function ProvidersPage({ selectedCategory, onNavigate, user }) {
  const [filters, setFilters] = useState({ location: '', category: selectedCategory || '', budget: '', rating: 0 });
  const [chatProvider, setChatProvider] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [bookingProvider, setBookingProvider] = useState(null);
  const [bookingDate, setBookingDate] = useState('Today');
  const [bookingTime, setBookingTime] = useState('12:00 PM');
  const [toastMessage, setToastMessage] = useState(null);
  
  // Detailed provider view state
  const [selectedProviderDetails, setSelectedProviderDetails] = useState(null);

  const [featuredIdx, setFeaturedIdx] = useState(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // DiceBear illustrated avatars — entirely fictional, no real person's likeness
  const getAvatar = (name) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`;

  const providers = useMemo(() => {
    return rawProviders.map((p, i) => ({
      ...p,
      id: i,
      image: getAvatar(p.name),
      trustScore: `${90 + (i % 10)}%`,
      years: 2 + (i % 8),
      location: ['Bandra', 'Andheri', 'Juhu', 'Colaba'][i % 4],
      bio: 'Experienced local professional with background check clearance, solid review metrics, and quick response dispatch guarantees.',
      priceRange: `${p.price} - ${Math.max(400, parseInt(p.price.replace(/[^0-9]/g, '')) + 200)}`,
      availability: i % 3 === 0 ? 'Available now' : '2-4 hrs',
      aiBadge: i % 4 === 1 ? 'AI Recommended' : i % 5 === 2 ? 'Best Budget Match' : i % 6 === 3 ? 'Fastest Available' : null,
    }));
  }, []);

  const featuredProviders = useMemo(() => {
    return providers.slice(0, 3).map((p) => ({
      ...p,
      avatar: p.image
    }));
  }, [providers]);

  const filtered = providers.filter((p) => {
    // Category filter
    if (filters.category && p.role !== filters.category) return false;
    
    // Rating filter
    if (filters.rating && p.rating < filters.rating) return false;
    
    // Location filter
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    
    // Budget filter
    if (filters.budget) {
      const priceStr = p.price.replace(/[^0-9]/g, '');
      const price = parseInt(priceStr) || 0;
      
      if (filters.budget === 'low' && price >= 400) return false;
      if (filters.budget === 'mid' && (price < 400 || price > 800)) return false;
      if (filters.budget === 'high' && price < 800) return false;
    }
    
    return true;
  });

  const handleAction = (provider, actionType) => {
    if (!user) {
      onNavigate('Sign In');
      return;
    }

    if (actionType === 'chat') {
      setChatProvider(provider);
    } else if (actionType === 'book') {
      setBookingProvider(provider);
    }
  };

  const handleConfirmBooking = () => {
    if (!bookingProvider) return;
    
    // Read current bookings
    const stored = localStorage.getItem('servicebridge-bookings');
    const currentBookings = stored ? JSON.parse(stored) : [];
    
    const newBooking = {
      id: `b_${Date.now()}`,
      providerName: bookingProvider.name,
      serviceType: bookingProvider.role === 'Electrician' ? 'Fault assessment & Repair' : 'General Service Check',
      status: 'Active - Scheduled',
      statusType: 'active',
      dateTime: `${bookingDate}, ${bookingTime}`,
      amount: bookingProvider.price || '₹500',
      avatar: bookingProvider.image || getAvatar(bookingProvider.name),
      trackingStep: 0,
    };
    
    localStorage.setItem('servicebridge-bookings', JSON.stringify([newBooking, ...currentBookings]));
    setBookingProvider(null);
    showToast(`Successfully booked ${bookingProvider.name}!`);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    showToast(`Message sent to ${chatProvider.name}!`);
    setChatMessage('');
    setChatProvider(null);
  };

  return (
    <section className="py-8 text-left">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-650 dark:text-sky-400 pl-0.5">Marketplace</span>
            <h2 className="text-3xl font-extrabold text-slate-905 dark:text-white mt-1">Browse trusted professionals</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Compare profiles, review trust scores, chat instantly, and schedule bookings.</p>
          </div>
          <div className="text-right">
            <Button variant="outline" className="rounded-xl px-4 py-2 text-xs font-bold border border-slate-200 dark:border-slate-800" onClick={() => onNavigate('Services')}>
              Browse Categories
            </Button>
          </div>
        </div>

        {/* Featured Providers Carousel */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-205 dark:border-white/5 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="absolute right-4 top-2 text-7xl opacity-5 pointer-events-none">⭐</div>
          <div className="flex gap-4 items-center text-left">
            <Avatar name={featuredProviders[featuredIdx].name} src={featuredProviders[featuredIdx].avatar} size="h-16 w-16 text-lg font-bold" className="ring-2 ring-sky-500/20" />
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-400 border border-amber-250/20"><Star className="h-3 w-3 fill-amber-400" /> Featured Partner</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mt-1">{featuredProviders[featuredIdx].name}</h4>
              <p className="text-xs text-slate-500">{featuredProviders[featuredIdx].role} • {featuredProviders[featuredIdx].trustScore} Trust Score</p>
              <p className="text-xs text-slate-600 dark:text-slate-350 italic mt-2 font-semibold">"{featuredProviders[featuredIdx].bio}"</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <button 
                onClick={() => setFeaturedIdx(prev => (prev - 1 + featuredProviders.length) % featuredProviders.length)} 
                className="p-2 rounded-xl border border-slate-250 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setFeaturedIdx(prev => (prev + 1) % featuredProviders.length)} 
                className="p-2 rounded-xl border border-slate-250 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Button variant="primary" className="text-xs rounded-xl font-bold py-2 px-4 shadow-sm" onClick={() => handleAction(featuredProviders[featuredIdx], 'book')}>
              Quick Book
            </Button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 rounded-3xl shadow-sm">
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider pl-1">Location</label>
            <input 
              placeholder="City, area..." 
              value={filters.location} 
              onChange={(e) => setFilters(f => ({...f, location: e.target.value}))} 
              className="w-full rounded-2xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none" 
            />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-555 uppercase tracking-wider pl-1">Category</label>
            <select 
              value={filters.category} 
              onChange={(e) => setFilters(f => ({...f, category: e.target.value}))} 
              className="w-full rounded-2xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-555 uppercase tracking-wider pl-1">Budget</label>
            <select 
              value={filters.budget} 
              onChange={(e) => setFilters(f => ({...f, budget: e.target.value}))} 
              className="w-full rounded-2xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="low">Under ₹400</option>
              <option value="mid">₹400 - ₹800</option>
              <option value="high">₹800+</option>
            </select>
          </div>
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-555 uppercase tracking-wider pl-1">Min Rating</label>
            <select 
              value={filters.rating} 
              onChange={(e) => setFilters(f => ({...f, rating: Number(e.target.value)}))} 
              className="w-full rounded-2xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value={0}>Any Rating</option>
              <option value={4}>4.0+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-550 dark:text-slate-400 font-medium">
              No matching service providers found. Try expanding your filters.
            </div>
          ) : (
            filtered.map((p) => (
              <ProviderCard
                key={p.id}
                provider={p}
                onView={() => setSelectedProviderDetails(p)}
                onChat={() => handleAction(p, 'chat')}
                onBook={() => handleAction(p, 'book')}
              />
            ))
          )}
        </div>
      </div>

      {/* Provider Details Modal */}
      <AnimatePresence>
        {selectedProviderDetails && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedProviderDetails(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProviderDetails(null)} 
                className="absolute right-6 top-6 rounded-full bg-slate-50 dark:bg-slate-800 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-4 items-start pb-5 border-b border-slate-100 dark:border-white/5 text-left">
                <Avatar name={selectedProviderDetails.name} src={selectedProviderDetails.image} size="h-16 w-16 text-lg font-bold" className="ring-2 ring-sky-500/20 shadow-md flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedProviderDetails.name}</h3>
                  <p className="text-xs text-sky-600 dark:text-sky-405 font-bold mt-0.5">{selectedProviderDetails.role} • {selectedProviderDetails.years} yrs exp</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center text-xs text-amber-500 font-bold"><Star className="h-3.5 w-3.5 fill-amber-400 mr-0.5" /> {selectedProviderDetails.rating}</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-450 font-bold">{selectedProviderDetails.trustScore} Trust Score</span>
                  </div>
                </div>
              </div>

              <div className="py-5 space-y-4 text-left">
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider pl-0.5">Bio / Overview</span>
                  <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-white/5">
                    {selectedProviderDetails.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-0.5">
                    <span className="block text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider pl-0.5">Service Rate</span>
                    <span className="text-base font-extrabold text-slate-905 dark:text-white">{selectedProviderDetails.priceRange}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-0.5">
                    <span className="block text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider pl-0.5">Availability</span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{selectedProviderDetails.availability}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="block text-[10px] font-bold text-slate-450 dark:text-slate-550 uppercase tracking-wider pl-0.5">Vetting Standards</span>
                  <ul className="grid gap-2 grid-cols-2">
                    <li className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> Background Checked
                    </li>
                    <li className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> Identity Verified
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 py-3 text-xs rounded-xl"
                  onClick={() => {
                    handleAction(selectedProviderDetails, 'chat');
                    setSelectedProviderDetails(null);
                  }}
                >
                  Chat Now
                </Button>
                <Button 
                  className="flex-1 py-3 text-xs bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-sm"
                  onClick={() => {
                    handleAction(selectedProviderDetails, 'book');
                    setSelectedProviderDetails(null);
                  }}
                >
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simulated Instant Chat Modal */}
      {chatProvider && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl text-left animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3 items-center mb-4">
            <Avatar name={chatProvider.name} src={chatProvider.image || chatProvider.avatar} size="md" />
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">Chat with {chatProvider.name}</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-450 font-semibold">{chatProvider.role} • Vetted</p>
              </div>
            </div>
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Hi, I need assistance with a task..."
              className="w-full text-sm p-3 rounded-2xl border border-slate-205 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setChatProvider(null)} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 transition bg-transparent">
                Cancel
              </button>
              <button onClick={handleSendMessage} className="rounded-xl bg-sky-600 text-white px-4 py-2 text-xs font-bold hover:bg-sky-700 transition">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Booking Modal */}
      {bookingProvider && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-250 dark:border-slate-850 bg-white dark:bg-slate-955 p-6 shadow-2xl text-left animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Book Service appointment</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Scheduling service with <span className="font-semibold text-slate-900 dark:text-white">{bookingProvider.name}</span> ({bookingProvider.role}).</p>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Select Date</label>
                <select value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 bg-slate-50 dark:bg-slate-900 text-sm cursor-pointer">
                  <option value="Today">Today (Immediate Dispatch)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="June 1, 2026">June 1, 2026</option>
                  <option value="June 2, 2026">June 2, 2026</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Select Time Slot</label>
                <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 bg-slate-50 dark:bg-slate-900 text-sm cursor-pointer">
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setBookingProvider(null)} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 transition bg-transparent">
                Cancel
              </button>
              <button onClick={handleConfirmBooking} className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white px-5 py-2.5 text-xs font-bold hover:from-sky-700 hover:to-blue-700 transition shadow-md">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-[130] flex items-center gap-3 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white px-5 py-4 shadow-2xl border border-white/10 dark:border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Check className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
