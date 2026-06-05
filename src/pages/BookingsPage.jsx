import { useState, useEffect } from 'react';
import { Star, MapPin, MessageSquare, Calendar, Heart, Shield, Check, Navigation, UserCheck, Star as StarIcon, Download, Trash2, RefreshCw, ChevronDown, ChevronUp, ShieldCheck, Clock, Key, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';

const getAvatar = (name) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`;

const homeTips = [
  { id: 1, title: 'Clean AC Filters', desc: 'Clean AC filters every 3 months to reduce electricity bills by 15% and improve air quality.', icon: '💡' },
  { id: 2, title: 'Prevent Clogged Drains', desc: 'Pour hot water down your sink drain once a week to clear grease buildup and prevent major clogs.', icon: '🔧' },
  { id: 3, title: 'Electrical Safety First', desc: 'Test your home GFCI outlets monthly to protect against electric shocks and circuit overloads.', icon: '⚡' }
];

export function BookingsPage({ onNavigate, user }) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history' | 'saved'
  const [chatProvider, setChatProvider] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [bookingProvider, setBookingProvider] = useState(null);
  const [bookingDate, setBookingDate] = useState('Today');
  const [bookingTime, setBookingTime] = useState('12:00 PM');
  const [tipsIdx, setTipsIdx] = useState(0);

  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [expandedHistoryId, setExpandedHistoryId] = useState(null);
  const [expandedProviderId, setExpandedProviderId] = useState(null);
  
  // State for Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronized state for Bookings, History and Saved Providers
  const [bookings, setBookings] = useState([]);
  const [savedProviders, setSavedProviders] = useState([]);
  const [history, setHistory] = useState([
    {
      id: 'h1',
      providerName: 'Sanya Mirza',
      serviceCategory: 'House Deep Cleaning',
      amount: '₹1,500',
      date: 'May 20, 2026',
      status: 'completed',
      avatar: getAvatar('Sanya Mirza'),
      rated: false,
    },
    {
      id: 'h2',
      providerName: 'Karan Malhotra',
      serviceCategory: 'Laptop Screen Repair',
      amount: '₹3,200',
      date: 'May 12, 2026',
      status: 'completed',
      avatar: getAvatar('Karan Malhotra'),
      rated: 5,
    },
    {
      id: 'h3',
      providerName: 'Rahul Verma',
      serviceCategory: 'Carpentry & Rack Install',
      amount: '₹950',
      date: 'May 02, 2026',
      status: 'cancelled',
      avatar: getAvatar('Rahul Verma'),
      rated: false,
    }
  ]);

  const [ratings, setRatings] = useState({});
  const [reviewTexts, setReviewTexts] = useState({});
  const [submittingReview, setSubmittingReview] = useState(null);
  const [bookingAgainId, setBookingAgainId] = useState(null);
  const [downloadingInvoiceId, setDownloadingInvoiceId] = useState(null);

  useEffect(() => {
    // Load Bookings
    const storedBookings = localStorage.getItem('servicebridge-bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      const defaultBookings = [
        {
          id: 'b1',
          providerName: 'Raju Sharma',
          serviceType: 'Home wiring repair',
          status: 'Ongoing - Provider en route',
          statusType: 'ongoing',
          dateTime: 'Today, 11:30 AM',
          amount: '₹650',
          avatar: getAvatar('Raju Sharma'),
          trackingStep: 1,
        }
      ];
      localStorage.setItem('servicebridge-bookings', JSON.stringify(defaultBookings));
      setBookings(defaultBookings);
    }

    // Load Saved Providers
    const storedSaved = localStorage.getItem('servicebridge-saved-providers');
    if (storedSaved) {
      setSavedProviders(JSON.parse(storedSaved));
    } else {
      const defaultSaved = [
        {
          id: 'sp1',
          name: 'Raju Sharma',
          role: 'Electrician',
          rating: 4.9,
          trustScore: '96%',
          completed: 520,
          avatar: getAvatar('Raju Sharma'),
          category: 'Electrical Repair',
        },
        {
          id: 'sp2',
          name: 'Priya Singh',
          role: 'Plumber',
          rating: 4.8,
          trustScore: '94%',
          completed: 310,
          avatar: getAvatar('Priya Singh'),
          category: 'Plumbing Service',
        }
      ];
      localStorage.setItem('servicebridge-saved-providers', JSON.stringify(defaultSaved));
      setSavedProviders(defaultSaved);
    }
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveSaved = (providerId) => {
    const updated = savedProviders.filter(p => p.id !== providerId);
    setSavedProviders(updated);
    localStorage.setItem('servicebridge-saved-providers', JSON.stringify(updated));
    triggerToast('Removed provider from saved list.');
  };

  const handleConfirmBooking = () => {
    if (!bookingProvider) return;
    const newBooking = {
      id: `b_${Date.now()}`,
      providerName: bookingProvider.name,
      serviceType: bookingProvider.category || bookingProvider.role,
      status: 'Active - Scheduled',
      statusType: 'active',
      dateTime: `${bookingDate}, ${bookingTime}`,
      amount: '₹750',
      avatar: bookingProvider.avatar,
      trackingStep: 0,
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('servicebridge-bookings', JSON.stringify(updated));
    setBookingProvider(null);
    triggerToast(`Successfully booked ${bookingProvider.name}!`);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    triggerToast(`Message sent to ${chatProvider.name}!`);
    setChatMessage('');
    setChatProvider(null);
  };

  return (
    <section className="py-8 text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">Manage Services</span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Your Bookings & Favorites</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track ongoing schedules, review history logs, or book saved professionals directly.</p>
        </div>

        {/* Vertical Stack Layout */}
        <div className="flex flex-col gap-8">
          
          {/* Box 1: My Bookings */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col">
            <div className="border-b border-slate-100 dark:border-slate-805 pb-4 mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">My Bookings</h2>
              <p className="text-xs text-slate-500">Track and manage your active orders</p>
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {bookings.length === 0 ? (
                <div className="col-span-full space-y-6">
                  <div className="text-center py-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10">
                    <p className="text-xs text-slate-500">No active bookings scheduled at the moment.</p>
                    <button onClick={() => onNavigate('Services')} className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-2 hover:underline">Find a local partner now</button>
                  </div>
                  
                  {/* Tips Carousel to fill space */}
                  <div className="rounded-3xl border border-sky-100 dark:border-sky-950 bg-sky-50/30 dark:bg-sky-950/10 p-5 text-left relative overflow-hidden flex items-center justify-between min-h-[120px] max-w-xl mx-auto">
                    <div className="absolute right-4 top-2 text-6xl opacity-10 pointer-events-none">{homeTips[tipsIdx].icon}</div>
                    <div className="space-y-1 pr-10">
                      <span className="text-[9px] font-black uppercase text-sky-605 dark:text-sky-400 tracking-wider">Expert Home Tip</span>
                      <h4 className="text-xs font-bold text-slate-850 dark:text-white mt-1">{homeTips[tipsIdx].title}</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium mt-1">{homeTips[tipsIdx].desc}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 pl-3.5 border-l border-slate-200 dark:border-white/5 flex-shrink-0">
                      <button onClick={() => setTipsIdx(prev => (prev - 1 + homeTips.length) % homeTips.length)} className="p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-white/5 transition bg-transparent"><ChevronLeft className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setTipsIdx(prev => (prev + 1) % homeTips.length)} className="p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-white/5 transition bg-transparent"><ChevronRight className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 space-y-3">
                    <div className="flex gap-3 items-center">
                      <Avatar name={booking.providerName} src={booking.avatar} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">{booking.providerName}</h4>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-semibold">{booking.dateTime.split(',')[0]}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 dark:text-slate-350 font-medium truncate">{booking.serviceType}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{booking.status}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setExpandedBookingId(expandedBookingId === booking.id ? null : booking.id)}
                        className="text-[10px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-semibold flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg transition"
                      >
                        {expandedBookingId === booking.id ? <>Hide Details <ChevronUp className="h-3 w-3" /></> : <>Show Details <ChevronDown className="h-3 w-3" /></>}
                      </button>
                    </div>

                    {expandedBookingId === booking.id && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2.5 text-[11px] text-slate-600 dark:text-slate-350 bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><Key className="h-3.5 w-3.5 text-sky-500" /> Security OTP</span>
                          <span className="font-mono bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded text-sky-700 dark:text-sky-400 font-bold tracking-wider text-xs">SB-8492</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-emerald-500" /> Cost Summary</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{booking.amount} • UPI</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-rose-500" /> Location</span>
                          <span className="truncate max-w-[140px] text-right font-medium" title={user?.location || 'Bandra, Mumbai'}>{user?.location || 'Bandra, Mumbai'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Active Stage</span>
                          <span className="text-sky-600 dark:text-sky-400 font-bold">
                            {booking.trackingStep === 0 && 'Awaiting Dispatch'}
                            {booking.trackingStep === 1 && 'Provider En Route'}
                            {booking.trackingStep === 2 && 'Work In Progress'}
                            {booking.trackingStep === 3 && 'Service Completed'}
                          </span>
                        </div>
                        <div className="pt-2 flex gap-1.5 border-t border-slate-200/50 dark:border-slate-800/50">
                          <a href="tel:+919876543210" className="flex-1 text-center py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-[10px] text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition">
                            Call Helpline
                          </a>
                          <button 
                            onClick={() => {
                              const updated = bookings.filter(b => b.id !== booking.id);
                              setBookings(updated);
                              localStorage.setItem('servicebridge-bookings', JSON.stringify(updated));
                              const newHistory = {
                                id: `h_${Date.now()}`,
                                providerName: booking.providerName,
                                serviceCategory: booking.serviceType,
                                amount: booking.amount,
                                date: 'Today',
                                status: 'completed',
                                avatar: booking.avatar,
                                rated: false,
                              };
                              setHistory(prev => [newHistory, ...prev]);
                              triggerToast('Booking completed! Moved to History.');
                            }}
                            className="flex-1 text-center py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-[10px] text-white transition shadow-sm"
                          >
                            Mark Completed
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step Tracker mini bar */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                      <button 
                        onClick={() => {
                          setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, trackingStep: (b.trackingStep + 1) % 4 } : b));
                          triggerToast('Simulated tracking updated!');
                        }}
                        className="text-[10px] text-sky-600 dark:text-sky-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} /> Progress Stage
                      </button>
                      <div className="flex gap-1.5">
                        <button onClick={() => setChatProvider({ name: booking.providerName, role: booking.serviceType, avatar: booking.avatar })} className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-750 hover:bg-slate-55" title="Contact">
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Box 2: Booking History */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col">
            <div className="border-b border-slate-100 dark:border-slate-805 pb-4 mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Booking History</h2>
              <p className="text-xs text-slate-500">Reviews & past service records</p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 space-y-3">
                  <div className="flex gap-3 items-center">
                    <Avatar name={item.providerName} src={item.avatar} size="md" className="grayscale-[20%]" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">{item.providerName}</h4>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">{item.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-350 font-medium truncate">{item.serviceCategory}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.date} • {item.amount}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setExpandedHistoryId(expandedHistoryId === item.id ? null : item.id)}
                      className="text-[10px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-semibold flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg transition"
                    >
                      {expandedHistoryId === item.id ? <>Hide Details <ChevronUp className="h-3 w-3" /></> : <>Show Details <ChevronDown className="h-3 w-3" /></>}
                    </button>
                  </div>

                  {expandedHistoryId === item.id && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2 text-[11px] text-slate-600 dark:text-slate-350 bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-violet-500" /> Duration</span>
                        <span>1 hr 20 mins</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-emerald-500" /> Invoice ID</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">INV-2026-{(item.id).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><Check className="h-3.5 w-3.5 text-emerald-500" /> Payment Mode</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">Paid via Card</span>
                      </div>
                      {item.rated && (
                        <div className="mt-1 bg-white dark:bg-slate-905/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Review</span>
                          <p className="text-[10px] leading-relaxed text-slate-600 dark:text-slate-300 italic">"Highly professional service. The problem was resolved quickly and efficiently!"</p>
                        </div>
                      )}
                    </div>
                  )}

                  {item.status === 'completed' && (
                    <div className="bg-white dark:bg-slate-950 rounded-xl p-2.5 border border-slate-105 dark:border-slate-850 flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, starIdx) => {
                          const val = starIdx + 1;
                          const isLit = (ratings[item.id] || item.rated) >= val;
                          return (
                            <button
                              key={starIdx}
                              disabled={item.rated}
                              onClick={() => setRatings(prev => ({ ...prev, [item.id]: val }))}
                              className="text-amber-400 hover:scale-110 transition disabled:opacity-80"
                            >
                              <Star className={`h-3.5 w-3.5 ${isLit ? 'fill-amber-400' : 'text-slate-200 dark:text-slate-800'}`} />
                            </button>
                          );
                        })}
                      </div>
                      {!item.rated && ratings[item.id] && (
                        <button
                          onClick={() => {
                            setHistory(prev => prev.map(h => h.id === item.id ? { ...h, rated: ratings[item.id] } : h));
                            triggerToast('Thanks for submitting your review!');
                          }}
                          className="text-[10px] font-bold text-sky-600 hover:underline"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setBookingAgainId(item.id);
                        setTimeout(() => {
                          setBookingAgainId(null);
                          const newBooking = {
                            id: `b_${Date.now()}`,
                            providerName: item.providerName,
                            serviceType: item.serviceCategory,
                            status: 'Active - Scheduled',
                            statusType: 'active',
                            dateTime: 'Tomorrow, 10:00 AM',
                            amount: item.amount,
                            avatar: item.avatar,
                            trackingStep: 0,
                          };
                          setBookings(prev => [newBooking, ...prev]);
                          triggerToast(`Re-booked ${item.providerName} successfully!`);
                        }, 800);
                      }}
                      className="flex-1 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition"
                    >
                      {bookingAgainId === item.id ? 'Booking...' : 'Book Again'}
                    </button>
                    {item.status === 'completed' && (
                      <button
                        onClick={() => {
                          setDownloadingInvoiceId(item.id);
                          setTimeout(() => {
                            setDownloadingInvoiceId(null);
                            triggerToast('Invoice downloaded successfully.');
                          }, 1000);
                        }}
                        className="py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-200"
                        title="Invoice"
                      >
                        {downloadingInvoiceId === item.id ? '...' : 'Invoice'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Box 3: Available & Saved Providers */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col">
            <div className="border-b border-slate-100 dark:border-slate-805 pb-4 mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Available & Saved Providers</h2>
              <p className="text-xs text-slate-500">Your favorite verified professionals and active rates</p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {savedProviders.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs col-span-full">
                  No saved providers.
                </div>
              ) : (
                savedProviders.map((provider) => (
                  <div key={provider.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 space-y-3">
                    <div className="flex gap-3 items-center">
                      <Avatar name={provider.name} src={provider.avatar} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">{provider.name}</h4>
                          <span className="flex items-center gap-0.5 text-[9px] font-bold text-amber-500"><StarIcon className="h-3 w-3 fill-amber-400" />{provider.rating}</span>
                        </div>
                        <p className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold truncate">{provider.role}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{provider.trustScore || '96%'} Trust score • {provider.completed || 520} jobs</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setExpandedProviderId(expandedProviderId === provider.id ? null : provider.id)}
                        className="text-[10px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-semibold flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg transition"
                      >
                        {expandedProviderId === provider.id ? <>Hide Details <ChevronUp className="h-3 w-3" /></> : <>Show Details <ChevronDown className="h-3 w-3" /></>}
                      </button>
                    </div>

                    {expandedProviderId === provider.id && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2.5 text-[11px] text-slate-600 dark:text-slate-350 bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-emerald-500" /> Base Visit Fee</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">₹299</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Certification</span>
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium">Compliance Vetted</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-violet-500" /> Availability</span>
                          <span className="text-emerald-500 font-bold">Slots Open Today</span>
                        </div>
                        <div className="pt-1.5 border-t border-slate-200/50 dark:border-slate-800/50">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">Standard Rate Card</span>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                            <div className="bg-white dark:bg-slate-900/60 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                              <span className="block text-slate-400">Diagnostics</span>
                              <span className="font-bold text-slate-700 dark:text-slate-200">₹399</span>
                            </div>
                            <div className="bg-white dark:bg-slate-900/60 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                              <span className="block text-slate-400">Standard Repair</span>
                              <span className="font-bold text-slate-700 dark:text-slate-200">₹599</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button onClick={() => setBookingProvider(provider)} className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold text-[10px] shadow-sm hover:from-sky-700 hover:to-blue-700 transition">
                        Quick Book
                      </button>
                      <button onClick={() => setChatProvider(provider)} className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-200">
                        Chat
                      </button>
                      <button onClick={() => handleRemoveSaved(provider.id)} className="py-1.5 px-2 rounded-lg border border-slate-205 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Chat modal overlay */}
      {chatProvider && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl">
            <div className="flex gap-3 items-center mb-4">
              <Avatar name={chatProvider.name} src={chatProvider.avatar} size="md" />
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">Chat with {chatProvider.name}</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{chatProvider.role || chatProvider.serviceType}</p>
              </div>
            </div>
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Hi, I need assistance with a task..."
              className="w-full text-sm p-3 rounded-2xl border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              rows={3}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setChatProvider(null)} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 transition">Cancel</button>
              <button onClick={handleSendMessage} className="rounded-xl bg-sky-600 text-white px-4 py-2 text-xs font-semibold hover:bg-sky-700 transition">Send Message</button>
            </div>
          </div>
        </div>
      )}

      {/* Booking slots modal overlay */}
      {bookingProvider && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Book Service Slot</h3>
            <p className="text-xs text-slate-500 dark:text-slate-405 mb-4">Confirm appointment slot with {bookingProvider.name}.</p>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Select Date</label>
                <select value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 bg-slate-50 dark:bg-slate-900 text-sm">
                  <option value="Today">Today (Immediate Dispatch)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="June 1, 2026">June 1, 2026</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Select Slot</label>
                <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 bg-slate-50 dark:bg-slate-900 text-sm">
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setBookingProvider(null)} className="rounded-xl border border-slate-200 dark:border-slate-850 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">Cancel</button>
              <button onClick={handleConfirmBooking} className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white px-5 py-2.5 text-xs font-semibold shadow-md transition">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-[130] flex items-center gap-3 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white px-5 py-4 shadow-2xl border border-white/10 dark:border-slate-800 animate-fade-in">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Check className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
