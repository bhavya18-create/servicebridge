import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bolt,
  ChevronRight,
  CircleDot,
  Clock3,
  Globe2,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

const trustMetrics = [
  {
    title: 'Verified Providers',
    value: '1.2k',
    detail: 'Trusted network',
    icon: <ShieldCheck className="h-5 w-5 text-sky-300" />,
  },
  {
    title: 'Fast Response',
    value: '8m',
    detail: 'Average arrival',
    icon: <Bolt className="h-5 w-5 text-cyan-300" />,
  },
  {
    title: 'Live Availability',
    value: '12 zones',
    detail: 'Real-time coverage',
    icon: <MapPin className="h-5 w-5 text-blue-300" />,
  },
  {
    title: 'AI Recommendations',
    value: '96%',
    detail: 'Top match accuracy',
    icon: <Sparkles className="h-5 w-5 text-violet-300" />,
  },
];

const workflowSteps = [
  {
    title: 'Search',
    label: 'Find a service',
    description: 'Start by telling the app what service you need and where, then we instantly search the best local matches.',
  },
  {
    title: 'AI Match',
    label: 'Get the best provider',
    description: 'Our AI filters verified providers by availability, rating, and proximity so you get the strongest match fast.',
  },
  {
    title: 'Compare',
    label: 'Review quotes easily',
    description: 'Compare pricing, ETA, and reviews side-by-side before choosing the right provider for your task.',
  },
  {
    title: 'Book',
    label: 'Confirm instantly',
    description: 'Book the service immediately and lock in the provider with one tap, including schedule and payment details.',
  },
  {
    title: 'Track',
    label: 'Monitor progress',
    description: 'Follow the provider en route, receive real-time updates, and know exactly when they arrive on-site.',
  },
];

const featureCards = [
  {
    title: 'Emergency dispatch',
    description: 'Instant routing for urgent service requests.',
    support: '9 emergency support teams ready now',
    icon: <Bolt className="h-5 w-5 text-blue-300" />,
  },
  {
    title: 'Live demand',
    description: 'Heatmaps show where needs are rising now.',
    icon: <CircleDot className="h-5 w-5 text-cyan-300" />,
  },
  {
    title: 'Price prediction',
    description: 'Forecast local rates before you book.',
    icon: <Globe2 className="h-5 w-5 text-sky-300" />,
  },
  {
    title: 'Smart recommendations',
    description: 'AI sorts the best matches by trust and speed.',
    icon: <Sparkles className="h-5 w-5 text-violet-300" />,
  },
];

const assistantSuggestions = ['Electrician', 'Plumber', 'Cleaning', 'AC Repair'];

const testimonials = [
  {
    quote: 'ServiceBridge matched me with a verified electrician in minutes. The experience felt polished and confident.',
    name: 'Aditi Mehra',
    role: 'Homeowner',
    rating: 5,
  },
  {
    quote: 'The AI recommendations are precise, and the local provider network is strong. We no longer wait for follow-ups.',
    name: 'Rohit Shah',
    role: 'Operations Lead',
    rating: 5,
  },
  {
    quote: 'A premium product with fast, trustworthy matching. It feels like a real enterprise service.',
    name: 'Nisha Patel',
    role: 'Facility Manager',
    rating: 5,
  },
];

export function HomePage({ onNavigate }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="home-root relative overflow-hidden bg-[#050816] text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_28%)]" />
      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <section className="min-h-[calc(90vh-5rem)] py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-1 lg:items-center">
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-100">
                ✨ AI Powered Hyperlocal Services
              </span>
              <div className="max-w-2xl space-y-6">
                <h1 className="text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                  Find trusted professionals instantly.
                </h1>
                <p className="text-xl leading-9 text-slate-300 sm:text-2xl">
                  Smart AI matching connects you with verified local providers in minutes.
                </p>
              </div>

              <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_32px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:grid-cols-[1fr_1fr] lg:grid-cols-[1.05fr_0.95fr_1fr]">
                <label className="flex flex-col gap-2 text-sm text-slate-400">
                  Service
                  <input className="glass-input w-full bg-white/5 text-slate-100 placeholder:text-slate-500" placeholder="Plumbing, electrician…" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-400">
                  Location
                  <input className="glass-input w-full bg-white/5 text-slate-100 placeholder:text-slate-500" placeholder="Mumbai, Bandra…" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-400 lg:col-span-2">
                  Budget
                  <input className="glass-input w-full bg-white/5 text-slate-100 placeholder:text-slate-500" placeholder="Under ₹700" />
                </label>
                <button type="button" className="btn-brand w-full rounded-[24px] border border-transparent px-6 py-4 text-base font-semibold shadow-glow transition hover:scale-[1.02] lg:col-span-2">
                  Find Match
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button onClick={() => onNavigate('Services')} className="rounded-[24px] px-8 py-4 text-base font-semibold">
                  Get Started
                </Button>
                <button type="button" className="btn-ghost rounded-[24px] px-8 py-4 text-base font-semibold">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>
        

        <section className="grid gap-8 py-16">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">How it works</p>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">Search, match, book, and track in minutes.</h2>
          </div>
          <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:p-6">
            {workflowSteps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setSelectedWorkflow(step)}
                className="group flex flex-col gap-4 rounded-[24px] border border-white/10 bg-slate-950/85 p-5 text-left transition hover:border-cyan-300/40 hover:bg-slate-900/95 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-200 ring-1 ring-blue-500/20">
                    <span className="text-lg font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{step.title}</p>
                    <p className="text-sm text-slate-400">{step.label}</p>
                  </div>
                </div>
                {index < workflowSteps.length - 1 ? (
                  <div className="flex items-center gap-2 text-slate-500">
                    <ChevronRight className="h-4 w-4" />
                    <span>Next</span>
                  </div>
                ) : null}
              </button>
            ))}
          </div>

          {selectedWorkflow ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{selectedWorkflow.title}</p>
                    <h3 className="mt-3 text-3xl font-bold text-white">{selectedWorkflow.label}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedWorkflow(null)}
                    className="rounded-full border border-white/10 bg-slate-900/80 p-3 text-slate-300 transition hover:bg-slate-900"
                    aria-label="Close workflow info"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-6 text-base leading-8 text-slate-300">{selectedWorkflow.description}</p>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedWorkflow(null)}
                    className="inline-flex rounded-[24px] bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="grid gap-8 py-20 xl:grid-cols-[1.45fr_1fr] xl:items-start">
          <GlassCard className="p-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Feature showcase</p>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">A premium platform built to scale local service operations.</h2>
              <p className="max-w-2xl text-slate-400">Explore the features that make matching, dispatch, and pricing feel effortless.</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {featureCards.map((feature) => (
                <motion.div key={feature.title} whileHover={{ y: -6 }} className="group">
                  <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.18)] transition duration-300 group-hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-glow">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-slate-400">{feature.description}</p>
                    {feature.support ? (
                      <p className="mt-4 text-sm font-medium text-cyan-300">{feature.support}</p>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">AI assistant</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white">Describe what you need.</h2>
            <p className="mt-3 text-slate-400">Ask our AI to match you with the best local provider for any task.</p>
            <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/85 p-6 shadow-inner-glow">
              <label htmlFor="assistant" className="sr-only">Describe what you need</label>
              <input
                id="assistant"
                type="text"
                placeholder="Describe what you need…"
                className="glass-input w-full border-white/10 bg-white/5 px-4 py-4 text-slate-100 placeholder:text-slate-500"
              />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {assistantSuggestions.map((suggestion) => (
                  <button key={suggestion} type="button" className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-left text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:bg-slate-900">
                    {suggestion}
                  </button>
                ))}
              </div>
              <button type="button" className="mt-6 inline-flex w-full items-center justify-center rounded-[24px] bg-brand-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition hover:scale-[1.02]">
                Ask AI
              </button>
            </div>
          </GlassCard>
        </section>

        <section className="py-16">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Testimonials</p>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">Trusted by local customers and teams.</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeTestimonial === index ? 1 : 0.5, y: activeTestimonial === index ? 0 : 12 }}
                transition={{ duration: 0.4 }}
                className="rounded-[28px] border border-white/10 bg-slate-900/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-200">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg leading-8 text-slate-200">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-1 text-amber-300">
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_40px_120px_rgba(37,99,235,0.16)] backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Ready to launch</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Ready to find help instantly?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Join the premium hyperlocal platform built for fast matching, trusted providers, and smarter emergency service delivery.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button onClick={() => onNavigate('Dashboard')} className="rounded-[24px] px-8 py-4 text-lg font-semibold">
              Launch App
            </Button>
            <button type="button" className="btn-ghost rounded-[24px] px-8 py-4 text-lg font-semibold">
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
