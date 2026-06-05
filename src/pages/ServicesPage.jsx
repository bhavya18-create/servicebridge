import { useState } from 'react';
import { categories, categoryIcons, providers as rawProviders } from '../constants/data';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Star, MapPin, MessageSquare, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

function ProviderCard({ provider, onChat, onBook }) {
  const initials = (provider.name || '')
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="group relative rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 hover:shadow-xl hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between min-h-[290px]">
      <div className="flex items-start gap-4">
        {provider.image ? (
          <img src={provider.image} alt={provider.name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
        ) : (
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-md">
            {initials}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{provider.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{provider.role} • {provider.years} yrs exp</p>
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

          <p className="mt-3 text-xs text-slate-655 dark:text-slate-300 line-clamp-2 leading-relaxed">{provider.bio}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="text-left">
          <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Price Estimate</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{provider.priceRange}</span>
        </div>
        <span className="rounded-full bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1 text-[10px] font-semibold text-sky-700 dark:text-sky-400">
          {provider.availability}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="ghost" className="flex-1 py-2 text-xs border border-slate-200 dark:border-slate-800 text-white rounded-xl" onClick={onChat}>
          Chat
        </Button>
        <Button className="flex-1 py-2 text-xs bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-sm" onClick={onBook}>
          Book
        </Button>
      </div>
    </div>
  );
}

export function ServicesPage({ onCategoryClick }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [promoIdx, setPromoIdx] = useState(0);

  const promoSlides = [
    { title: 'Festival Cleaning Pre-Book', desc: 'Pre-book deep home cleaning and save ₹500 instantly on any slots.', code: 'FESTIVAL500', color: 'from-sky-500 to-indigo-650', icon: '🧹' },
    { title: 'Electrical Safety Drive', desc: 'Complimentary fuse and breaker box check with any repair booking.', code: 'SAFEHOME', color: 'from-amber-500 to-orange-600', icon: '⚡' },
    { title: 'AC Cooling Optimizer', desc: 'Get chemically washed coils & pressure check for peak summer performance.', code: 'COOLMAX', color: 'from-teal-500 to-emerald-600', icon: '❄️' },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProviders = selectedCategory
    ? rawProviders
        .map((p, i) => ({
          ...p,
          id: i,
          image: '',
          trustScore: `${90 + (i % 10)}%`,
          years: 2 + (i % 8),
          location: ['Bandra', 'Andheri', 'Juhu', 'Colaba'][i % 4],
          bio: 'Experienced local professional with background check clearance, solid review metrics, and quick response dispatch guarantees.',
          priceRange: `${p.price} - ${Math.max(400, parseInt(p.price.replace(/[^0-9]/g, '')) + 200)}`,
          availability: i % 3 === 0 ? 'Available now' : '2-4 hrs',
          rating: 4.5 + (i % 5) * 0.1,
        }))
        .filter((p) => p.role === selectedCategory)
    : [];

  return (
    <>
      <section className="space-y-8 text-left">
        <SectionHeader
          eyebrow="Services"
          title="Explore service categories"
          description="Browse categories and choose the right local professional for any task."
        />

        {/* Promotions Carousel Banner */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${promoSlides[promoIdx].color} p-6 text-white shadow-md flex items-center justify-between min-h-[150px] border border-white/5`}>
          <div className="absolute right-4 top-2 text-7xl opacity-10 pointer-events-none">{promoSlides[promoIdx].icon}</div>
          <div className="space-y-2 max-w-xl">
            <span className="inline-block text-[9px] font-black uppercase bg-white/20 px-2.5 py-0.5 rounded-md tracking-wider">Seasonal Offer</span>
            <h4 className="text-lg sm:text-xl font-bold">{promoSlides[promoIdx].title}</h4>
            <p className="text-xs text-white/80 leading-relaxed font-medium">{promoSlides[promoIdx].desc}</p>
            <div className="pt-1.5 flex items-center gap-2">
              <span className="text-[10px] font-bold text-white/90">Use Promo:</span>
              <span className="font-mono bg-white/20 text-xs font-extrabold px-2 py-0.5 rounded border border-white/20">{promoSlides[promoIdx].code}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 pl-4 border-l border-white/10">
            <button 
              onClick={() => setPromoIdx(prev => (prev - 1 + promoSlides.length) % promoSlides.length)} 
              className="p-1.5 rounded-full hover:bg-white/10 transition"
              aria-label="Previous Offer"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button 
              onClick={() => setPromoIdx(prev => (prev + 1) % promoSlides.length)} 
              className="p-1.5 rounded-full hover:bg-white/10 transition"
              aria-label="Next Offer"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || categoryIcons.default;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className="group text-left"
              >
                <GlassCard hover className="h-full border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 p-6 rounded-3xl transition duration-300">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 shadow-sm transition-transform group-hover:scale-105">
                    <Icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                    Verified reviews, compliance checked and fast dispatch availability near you.
                  </p>
                </GlassCard>
              </button>
            );
          })}
        </div>
      </section>

      {/* Providers Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                    {selectedCategory} Providers
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {filteredProviders.length} verified professionals available
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto py-6 pr-2">
                {filteredProviders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500 dark:text-slate-400 text-lg">No providers found for this category</p>
                  </div>
                ) : (
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProviders.map((provider) => (
                      <ProviderCard
                        key={provider.id}
                        provider={provider}
                        onChat={() => {
                          showToast(`Chat opened with ${provider.name}`);
                          setSelectedCategory(null);
                        }}
                        onBook={() => {
                          showToast(`Booking initiated with ${provider.name}`);
                          setSelectedCategory(null);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-[110] flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-5 py-4 shadow-2xl border border-white/10 dark:bg-slate-950 dark:border-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <span className="text-sm font-semibold">✓</span>
            </div>
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
