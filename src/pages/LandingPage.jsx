import { useState } from 'react';
import { MapPin, Search, Zap, Shield, Star, ChevronRight, ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon, Quote, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { GlassCard } from '../components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { icon: '⚡', name: 'Electrician', count: '2,450+' },
  { icon: '🔧', name: 'Plumber', count: '1,890+' },
  { icon: '❄️', name: 'AC Specialist', count: '1,450+' },
  { icon: '🚗', name: 'Mechanic', count: '1,230+' },
  { icon: '🧹', name: 'Cleaning', count: '3,100+' },
  { icon: '📚', name: 'Tutor', count: '980+' },
  { icon: '🪵', name: 'Carpenter', count: '760+' },
  { icon: '💻', name: 'Laptop Repair', count: '1,560+' },
];

const trustPoints = [
  { icon: '🛡️', title: 'Verified Professionals', desc: 'All providers undergo rigorous background checks' },
  { icon: '🤖', title: 'AI Fraud Detection', desc: 'Real-time safety monitor rules and dispatch filters' },
  { icon: '⭐', title: 'Trust Score System', desc: 'Transparent rating records and client validation' },
  { icon: '🏆', title: 'Quality Guaranteed', desc: 'Full satisfaction warranty or reimbursement support' },
];

const reviews = [
  {
    name: 'Amit R. Sharma',
    role: 'Homeowner in Bandra',
    text: 'Outstanding experience! The AI recommended a certified electrician who arrived in 10 minutes and solved our short circuit issues. 10/10!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&h=120&fit=crop'
  },
  {
    name: 'Neha M. Mehta',
    role: 'Property Manager in Powai',
    text: 'We had a plumbing emergency late at night. The SOS button on ServiceBridge was a lifesaver. Priya arrived within 15 minutes and fixed the burst valve.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop'
  },
  {
    name: 'Dr. Vikram Desai',
    role: 'Tutor & Academic Consultant',
    text: 'As a tutor, ServiceBridge helped me connect with 20+ local families. The trust score system makes it incredibly easy to build credibility.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop'
  }
];

export function LandingPage({ onNavigate }) {
  const [selectedService, setSelectedService] = useState('Select service...');
  const [locationInput, setLocationInput] = useState('');
  const [budgetInput, setBudgetInput] = useState('Any budget');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigate('Services');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-250 select-none">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 bg-hero-radial rounded-[40px] mt-2 border border-slate-200/50 dark:border-white/5 shadow-inner">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Side */}
          <div className="flex flex-col justify-center space-y-8 text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 px-3.5 py-1.5 rounded-full border border-sky-100 dark:border-sky-900/40">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" /> AI-Powered Hyperlocal Service Platform
              </span>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight leading-none">
                Find trusted local <span className="bg-gradient-to-r from-sky-600 to-indigo-650 bg-clip-text text-transparent">professionals</span> near you
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Book plumbers, electricians, tutors, and mechanics instantly. Transparent reviews, vetted trust scores, and real-time dispatch monitoring.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-6 shadow-soft backdrop-blur-md">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="text-left space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider pl-1">Service needed</label>
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    <option>Select service...</option>
                    {services.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider pl-1">Your location</label>
                  <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter location..."
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      className="ml-2 flex-1 border-0 bg-transparent text-slate-855 dark:text-white placeholder-slate-450 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="text-left space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-555 uppercase tracking-wider pl-1">Budget range</label>
                <select 
                   onChange={(e) => setBudgetInput(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option>Any budget</option>
                  <option>₹0 - ₹500</option>
                  <option>₹500 - ₹1000</option>
                  <option>₹1000 - ₹5000</option>
                  <option>₹5000+</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" className="flex-1 py-3 text-sm rounded-2xl font-bold">
                  <Search className="mr-2 h-4 w-4" />
                  Find Services
                </Button>
                <Button type="button" variant="danger" onClick={() => onNavigate('Emergency')} className="flex-1 py-3 text-sm rounded-2xl font-bold flex items-center justify-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Emergency SOS
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3.5 sm:flex-row pt-2">
              <Button onClick={() => onNavigate('Providers')} variant="primary" className="rounded-2xl font-bold py-3 px-6 flex items-center justify-center gap-1.5 shadow-md">
                Browse Providers
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('Register')}
                className="rounded-2xl font-bold py-3 px-6"
              >
                Become a Provider
              </Button>
            </div>
          </div>

          {/* Right Side - Premium Floating Showcase */}
          <div className="relative hidden lg:block h-[500px]">
            {/* Background design elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none z-0" />
            <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none z-0" />

            <div className="space-y-6 relative z-10">
              {/* Provider Card 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="animate-float rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-soft max-w-sm ml-auto mr-12 select-none"
              >
                <div className="flex items-start gap-4 text-left">
                  <Avatar name="Rajesh Kumar" src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&h=100&fit=crop" size="lg" className="ring-2 ring-slate-105 dark:ring-slate-850 shadow-sm" />
                  <div className="flex-1">
                    <div className="font-extrabold text-slate-900 dark:text-white text-base">Rajesh Kumar</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">⚡ Lead Electrician</div>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-450" />
                      <span className="font-bold text-slate-905 dark:text-white">4.9</span>
                      <span className="text-slate-500 text-xs">(520 jobs completed)</span>
                    </div>
                    <div className="mt-3 inline-block rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 px-3 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                      ✓ Compliance Vetted
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Provider Card 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="animate-float rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 shadow-soft max-w-sm mr-auto ml-8 select-none" 
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-start gap-4 text-left">
                  <Avatar name="Priya Singh" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" size="lg" className="ring-2 ring-slate-105 dark:ring-slate-850 shadow-sm" />
                  <div className="flex-1">
                    <div className="font-extrabold text-slate-900 dark:text-white text-base">Priya Singh</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">🔧 Master Plumber</div>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-450" />
                      <span className="font-bold text-slate-905 dark:text-white">4.8</span>
                      <span className="text-slate-500 text-xs">(310 jobs completed)</span>
                    </div>
                    <div className="mt-3 inline-block rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/30 px-3 py-0.5 text-[10px] font-bold text-violet-750 dark:text-violet-400">
                      🤖 AI Curation Match
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Categories */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-655 dark:text-sky-400">Marketplace Catalog</span>
            <h2 className="text-3xl font-extrabold text-slate-905 dark:text-white sm:text-4xl mt-2">Popular Categories</h2>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Browse trusted local service providers configured across our premium platform.</p>
          </div>

          <div className="grid gap-5 grid-cols-2 md:grid-cols-4 select-none">
            {services.map((service) => (
              <button
                key={service.name}
                onClick={() => onNavigate('Services')}
                className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 text-left transition hover:border-sky-500/30 hover:shadow-soft hover:-translate-y-0.5"
              >
                <div className="text-4xl mb-4 bg-slate-50 dark:bg-slate-950/80 rounded-2xl h-14 w-14 flex items-center justify-center border border-slate-200/50 dark:border-white/5 transition-transform group-hover:scale-105 shadow-sm">{service.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">{service.name}</h3>
                <p className="mt-1.5 text-xs text-slate-505 dark:text-slate-400 font-medium">{service.count} local agents</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Testimonial Reviews Carousel */}
      <section className="bg-slate-100/50 dark:bg-slate-900/30 py-16 sm:py-24 border-y border-slate-200/50 dark:border-white/5">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-violet-655 dark:text-violet-400">Customer Success</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl mt-2">What Our Customers Say</h2>
          </div>

          <div className="relative rounded-[32px] border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-soft overflow-hidden min-h-[300px] flex flex-col justify-between">
            {/* Quotes Background mark */}
            <Quote className="absolute right-8 top-8 h-20 w-20 text-slate-100 dark:text-slate-800/40 pointer-events-none" />

            <div className="relative flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: reviews[activeReviewIndex].rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-450" />
                    ))}
                  </div>

                  <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                    "{reviews[activeReviewIndex].text}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <Avatar 
                      name={reviews[activeReviewIndex].name} 
                      src={reviews[activeReviewIndex].avatar} 
                      size="lg" 
                      className="ring-2 ring-slate-100 dark:ring-slate-800" 
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{reviews[activeReviewIndex].name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{reviews[activeReviewIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/85 pt-4">
              <div className="flex gap-1">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeReviewIndex === idx ? 'w-6 bg-sky-600' : 'w-2 bg-slate-200 dark:bg-slate-800'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={prevReview}
                  className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5 transition bg-transparent text-slate-700 dark:text-slate-300"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={nextReview}
                  className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5 transition bg-transparent text-slate-700 dark:text-slate-300"
                  aria-label="Next review"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-655 dark:text-sky-400">Strict Safety protocols</span>
            <h2 className="text-3xl font-extrabold text-slate-905 dark:text-white sm:text-4xl">Platform Trust & Safety</h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Your protection and compliance vetting are at the core of ServiceBridge guidelines.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.title} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/40 p-6 text-left hover:shadow-soft transition">
                <div className="mb-4 text-3xl h-12 w-12 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center shadow-sm border border-slate-200/50 dark:border-white/5">{point.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{point.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-505 dark:text-slate-400 font-medium">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 py-16 sm:py-24 text-white text-center rounded-[40px] mx-auto max-w-7xl px-4 shadow-xl select-none mb-10">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight leading-none">Ready to experience ServiceBridge?</h2>
          <p className="text-base text-sky-100 leading-relaxed font-medium">Join thousands of verified local seeker accounts and reliable service partner agents today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Button onClick={() => onNavigate('Services')} size="lg" className="rounded-2xl bg-white text-slate-900 hover:bg-slate-50 font-bold py-3.5 shadow-md">
              Browse Services
            </Button>
            <Button variant="outline" onClick={() => onNavigate('Register')} size="lg" className="rounded-2xl border-white/20 hover:bg-white/10 text-white font-bold py-3.5 bg-transparent">
              Become a Provider
            </Button>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white shadow-sm">
                  <Zap className="h-4.5 w-4.5 animate-pulse" />
                </span>
                <span className="font-bold text-slate-905 dark:text-white text-lg">ServiceBridge</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Hyperlocal AI coordination connecting communities with background-checked certified specialists.</p>
            </div>
            {[
              { title: 'For Seekers', links: ['Browse Services', 'Emergency SOS Dispatch', 'Safety Guidelines', 'Dispute Center'] },
              { title: 'For Providers', links: ['Join ServiceBridge', 'SaaS Business Manager', 'Rate Cards', 'Partner Resources'] },
              { title: 'Company Hub', links: ['About ServiceBridge', 'Company Blog', 'API Reference', 'Privacy Policy'] },
            ].map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider pl-0.5">{col.title}</h4>
                <ul className="space-y-2 text-xs font-semibold text-slate-550 dark:text-slate-400">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-slate-200 dark:border-white/5 pt-8 text-center text-xs text-slate-550 dark:text-slate-400 font-medium">
            <p>&copy; 2026 ServiceBridge. All rights reserved. Locally Vetted and Certified.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
