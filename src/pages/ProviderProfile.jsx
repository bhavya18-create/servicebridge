import { useState } from 'react';
import { Star, CheckCircle, CalendarCheck, MessageSquare, Bolt } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ProviderProfile({ onNavigate, user }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const provider = user && user.role === 'provider' ? {
    name: user.fullName || 'Service Provider',
    role: user.work || 'Professional',
    rating: 4.9,
    trustScore: '96%',
    completed: 520,
    years: 6,
    location: user.location || 'Not specified',
    priceEstimate: user.avgPrice ? `₹${user.minPrice || 'N/A'} - ₹${user.avgPrice}` : '₹0 - ₹0',
    bio: `Skilled ${user.work || 'professional'} specializing in ${user.serviceProvided || 'various services'}.`,
    services: user.serviceProvided ? [user.serviceProvided, user.skill].filter(Boolean) : ['Professional services'],
    portfolio: [
      'https://via.placeholder.com/300x200?text=Work+1',
      'https://via.placeholder.com/300x200?text=Work+2',
    ],
    email: user.email || 'Not provided',
    phone: user.phone || 'Not provided',
    avatar: user.avatar || '',
  } : {
    name: 'Raju Sharma',
    role: 'Electrician',
    rating: 4.9,
    trustScore: '96%',
    completed: 520,
    years: 6,
    location: 'Bandra, Mumbai',
    priceEstimate: '₹400 - ₹800',
    bio: 'Experienced electrician specializing in residential wiring, geyser repair, and emergency fault finding.',
    services: ['Home wiring', 'Geyser repair', 'Socket installation', 'AC wiring'],
    portfolio: [
      'https://via.placeholder.com/300x200?text=Work+1',
      'https://via.placeholder.com/300x200?text=Work+2',
    ],
    email: 'N/A',
    phone: 'N/A',
    avatar: '',
  };

  const handleConfirmBooking = () => {
    const newBooking = {
      id: `b_${Date.now()}`,
      providerName: provider.name,
      serviceType: provider.role === 'Electrician' ? 'Fault assessment & Repair' : 'General Service Check',
      status: 'Active - Scheduled',
      statusType: 'active',
      dateTime: 'Today, 04:30 PM',
      amount: provider.priceEstimate.split(' - ')[0] || '₹500',
      avatar: provider.avatar || '',
      trackingStep: 0,
    };

    const stored = localStorage.getItem('servicebridge-bookings');
    const bookings = stored ? JSON.parse(stored) : [];
    localStorage.setItem('servicebridge-bookings', JSON.stringify([newBooking, ...bookings]));

    setShowCalendar(false);
    onNavigate('Seeker Dashboard');
  };

  return (
    <section className="py-10 text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800/80 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{provider.name}</h1>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 font-medium">{provider.role} • {provider.years} Years Experience</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
                  <span className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full"><Star className="h-4 w-4 fill-amber-400" />{provider.rating}</span>
                  <span className="rounded-full bg-green-50 dark:bg-green-950/40 px-2.5 py-1 text-green-700 dark:text-green-400 border border-green-150/30">{provider.trustScore} Trust Score</span>
                  <span className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-850 px-2.5 py-1 rounded-full">{provider.completed} Completed Jobs</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-50 dark:hover:bg-slate-900" onClick={() => onNavigate('Providers')}>
                  <MessageSquare className="mr-2 h-4 w-4 text-sky-500"/>Chat
                </Button>
                <Button className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl px-4 py-2.5 text-xs font-semibold shadow-md" onClick={() => setShowCalendar(true)}>
                  <CalendarCheck className="mr-2 h-4 w-4"/>Book Service
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-5">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-left">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Email</span>
                  <span className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{provider.email}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Phone</span>
                  <span className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{provider.phone}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Location</span>
                  <span className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{provider.location}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Pricing Guide</span>
                  <span className="mt-1 block text-sm font-semibold text-slate-850 dark:text-slate-200 truncate">{provider.priceEstimate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">About Professional</span>
              <p className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed">{provider.bio}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 text-left">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Services Offered</h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-350 font-medium">
                  {provider.services.map((s) => (<li key={s} className="flex items-center gap-2">• {s}</li>))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Certifications & Quality</h4>
                <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  Verified trade license, background-cleared compliance certificates, and safety training guidelines certified by ServiceBridge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCalendar ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Confirm Appointment Slot</h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Select a preferred dispatch time for your service today:
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['10:00 AM', '12:00 PM', '04:30 PM'].map((slot) => (
                <button
                  key={slot}
                  onClick={handleConfirmBooking}
                  className="rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 py-3 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-sky-500 hover:text-sky-600 transition"
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="ghost" className="rounded-xl border border-slate-200 dark:border-slate-800 text-xs px-4 py-2 hover:bg-slate-50 dark:hover:bg-white/5" onClick={() => setShowCalendar(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
