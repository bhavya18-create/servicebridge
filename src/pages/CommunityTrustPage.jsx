// ============================================================
// CommunityTrustPage.jsx — Community & Trust Hub
// ServiceBridge Seeker Dashboard
// ============================================================

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Star, Users, AlertTriangle, Heart, MessageSquare,
  Share2, CheckCircle, ChevronLeft, ChevronRight, BadgeCheck,
  Clock, ShieldCheck, Trophy, Flag, Bell, Zap, Crown, Medal,
} from 'lucide-react';
import CountUpLib from 'react-countup';
import { Avatar } from '../components/ui/Avatar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, CartesianGrid,
} from 'recharts';

const CountUp = CountUpLib?.default || CountUpLib;

// ── Animation variant ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Mock Data ──────────────────────────────────────────────
const HERO_STATS = [
  { id: 1, label: 'Average Trust Score', value: 94, suffix: '%', icon: Shield,     iconBg: 'bg-sky-50 dark:bg-sky-950/30',     iconColor: 'text-sky-600 dark:text-sky-400',     change: '+2.1% this month' },
  { id: 2, label: 'Verified Providers',  value: 1247, suffix: '', icon: BadgeCheck, iconBg: 'bg-violet-50 dark:bg-violet-950/30', iconColor: 'text-violet-600 dark:text-violet-400', change: '+38 this week'    },
  { id: 3, label: 'Community Posts',     value: 8412, suffix: '', icon: Users,      iconBg: 'bg-emerald-50 dark:bg-emerald-950/30', iconColor: 'text-emerald-600 dark:text-emerald-400', change: '+124 today'  },
  { id: 4, label: 'Scam Alerts Resolved', value: 312, suffix: '', icon: ShieldCheck, iconBg: 'bg-amber-50 dark:bg-amber-950/30', iconColor: 'text-amber-600 dark:text-amber-400', change: '100% resolution rate' },
];

const TRUST_RANKINGS = [
  { id: 1, rank: 1, name: 'Raju Sharma',    role: 'Master Electrician',   avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=80&h=80&fit=crop', trustScore: 98, completionRate: 99, responseTime: '8 min',  verified: true, badge: 'platinum' },
  { id: 2, rank: 2, name: 'Priya Singh',    role: 'Senior Plumber',        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop', trustScore: 96, completionRate: 97, responseTime: '12 min', verified: true, badge: 'gold' },
  { id: 3, rank: 3, name: 'Arjun Mehta',   role: 'AC Technician',         avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', trustScore: 94, completionRate: 95, responseTime: '15 min', verified: true, badge: 'gold' },
  { id: 4, rank: 4, name: 'Sanya Mirza',   role: 'Cleaning Expert',       avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop', trustScore: 92, completionRate: 94, responseTime: '18 min', verified: true, badge: 'silver' },
  { id: 5, rank: 5, name: 'Karan Malhotra', role: 'IT Repair Specialist',  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop', trustScore: 91, completionRate: 93, responseTime: '20 min', verified: true, badge: 'silver' },
];

const TRUST_BREAKDOWN = [
  { label: 'Completion Rate',       value: 97, color: 'bg-sky-500',     textColor: 'text-sky-600 dark:text-sky-400'     },
  { label: 'Customer Satisfaction', value: 94, color: 'bg-violet-500',  textColor: 'text-violet-600 dark:text-violet-400' },
  { label: 'Response Speed',        value: 89, color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Repeat Customers',      value: 78, color: 'bg-amber-500',   textColor: 'text-amber-600 dark:text-amber-400' },
  { label: 'Low Complaint Rate',    value: 96, color: 'bg-rose-400',    textColor: 'text-rose-500 dark:text-rose-400'   },
];

const COMMUNITY_POSTS = [
  { id: 1, user: 'Aarav Patel',  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop', role: 'Verified Customer',       time: '2 hours ago', content: '⚡ Just had an amazing experience with Raju Sharma for electrical repair. Fixed my entire home wiring issue in under 2 hours — professional, polite, and super affordable. Highly recommend!', likes: 47, comments: 12, liked: false, tag: 'Provider Recommendation', tagColor: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400' },
  { id: 2, user: 'Meera Kapoor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', role: 'Community Contributor',   time: '5 hours ago', content: '💰 Budget Tip: Always ask for a written estimate before work begins. I saved ₹800 last week by comparing 3 quotes on ServiceBridge. The price transparency feature is amazing — no surprise charges!', likes: 89, comments: 23, liked: true,  tag: 'Budget Tip',             tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
  { id: 3, user: 'Rohit Sharma', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop', role: 'Trusted Customer',        time: '1 day ago',   content: '🛡️ Safety Tip: Always verify the provider badge before letting anyone into your home. I declined a provider with no badge last month — turned out to be unlicensed. The badge system here is a lifesaver!', likes: 134, comments: 41, liked: false, tag: 'Safety Advice',          tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  { id: 4, user: 'Divya Nair',   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', role: 'Helpful Reviewer',       time: '2 days ago',  content: '✨ Priya from ServiceBridge did an incredible deep clean of my 3BHK in just 4 hours! Everything sparkles. She even cleaned the window grills without being asked. This is what 5-star service looks like!', likes: 62, comments: 8, liked: false, tag: 'Positive Experience',    tagColor: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400' },
];

const SCAM_ALERTS = [
  { id: 1, icon: AlertTriangle, title: 'Suspicious Pricing Detected',     description: 'A provider offered AC servicing at ₹199, well below the market rate (₹600–800). Avoid unusually low quotes — they often lead to hidden charges or substandard work.',             severity: 'high',     time: '3 hours ago', action: 'Report Similar' },
  { id: 2, icon: ShieldCheck,   title: 'Fraudulent Provider Removed',     description: 'A provider operating under a fake license was reported and removed within 2 hours. Our AI flagged the anomaly before any transactions occurred.',                                  severity: 'resolved', time: '1 day ago',   action: 'View Details'  },
  { id: 3, icon: Bell,          title: 'Safety Reminder',                 description: 'Always share your live location with a trusted contact when a provider visits. Use our in-app real-time tracking feature for continuous safety monitoring during service.',         severity: 'info',     time: '2 days ago',  action: 'Learn More'    },
  { id: 4, icon: BadgeCheck,    title: 'Verification System Updated',     description: 'We upgraded provider ID verification to Aadhaar + police clearance checks. All 1,247 active providers have been re-verified under the new enhanced protocol.',                    severity: 'update',   time: '3 days ago',  action: 'View Changelog' },
];

const TOP_PROVIDERS = [
  { id: 1, name: 'Raju Sharma',    category: 'Electrician', rating: 4.9, trustScore: 98, avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&h=200&fit=crop', verified: true, jobs: 520 },
  { id: 2, name: 'Priya Singh',    category: 'Plumbing',    rating: 4.8, trustScore: 96, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', verified: true, jobs: 310 },
  { id: 3, name: 'Arjun Mehta',   category: 'AC Repair',   rating: 4.8, trustScore: 94, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', verified: true, jobs: 287 },
  { id: 4, name: 'Sanya Mirza',   category: 'Cleaning',    rating: 4.7, trustScore: 92, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', verified: true, jobs: 415 },
  { id: 5, name: 'Karan Malhotra', category: 'IT Repair',  rating: 4.7, trustScore: 91, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', verified: true, jobs: 198 },
  { id: 6, name: 'Rahul Verma',   category: 'Carpentry',   rating: 4.6, trustScore: 89, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', verified: true, jobs: 243 },
];

const ACHIEVEMENTS = [
  { id: 1, title: 'Helpful Reviewer',    description: 'Submitted 10+ detailed reviews',     icon: Star,    gradient: 'from-amber-400 to-orange-500',  bg: 'bg-amber-50 dark:bg-amber-950/20',   border: 'border-amber-200 dark:border-amber-900/40',   earned: true,  count: 14 },
  { id: 2, title: 'Trusted Customer',    description: 'Completed 20+ verified bookings',    icon: Shield,  gradient: 'from-sky-400 to-blue-500',       bg: 'bg-sky-50 dark:bg-sky-950/20',       border: 'border-sky-200 dark:border-sky-900/40',       earned: true,  count: 24 },
  { id: 3, title: 'Scam Reporter',       description: 'Flagged 5+ suspicious providers',    icon: Flag,    gradient: 'from-rose-400 to-red-500',       bg: 'bg-rose-50 dark:bg-rose-950/20',     border: 'border-rose-200 dark:border-rose-900/40',     earned: false, count: 3,  needed: 5 },
  { id: 4, title: 'Community Voice',     description: 'Posted 15+ helpful community tips',  icon: Users,   gradient: 'from-violet-400 to-purple-500',  bg: 'bg-violet-50 dark:bg-violet-950/20', border: 'border-violet-200 dark:border-violet-900/40', earned: true,  count: 18 },
  { id: 5, title: 'Early Adopter',       description: 'Among the first 500 members',        icon: Zap,     gradient: 'from-emerald-400 to-teal-500',   bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-900/40', earned: true },
  { id: 6, title: 'Safety Champion',     description: 'Completed safety checklist 3×',      icon: Trophy,  gradient: 'from-blue-400 to-indigo-500',    bg: 'bg-blue-50 dark:bg-blue-950/20',     border: 'border-blue-200 dark:border-blue-900/40',     earned: false, count: 1,  needed: 3 },
];

// ── Chart Data ─────────────────────────────────────────────
const CATEGORY_TRUST = [
  { name: 'Electrical', score: 94, fill: '#3b82f6' },
  { name: 'Plumbing',   score: 91, fill: '#8b5cf6' },
  { name: 'Cleaning',   score: 88, fill: '#10b981' },
  { name: 'Carpentry',  score: 86, fill: '#f59e0b' },
  { name: 'AC Repair',  score: 83, fill: '#06b6d4' },
  { name: 'Painting',   score: 79, fill: '#ec4899' },
];

const MONTHLY_BOOKINGS = [
  { month: 'Jan', bookings: 420 }, { month: 'Feb', bookings: 480 },
  { month: 'Mar', bookings: 550 }, { month: 'Apr', bookings: 610 },
  { month: 'May', bookings: 720 }, { month: 'Jun', bookings: 850 },
];

const COMMUNITY_GROWTH = [
  { month: 'Jan', posts: 120, members: 340 }, { month: 'Feb', posts: 180, members: 420 },
  { month: 'Mar', posts: 240, members: 560 }, { month: 'Apr', posts: 310, members: 720 },
  { month: 'May', posts: 420, members: 940 }, { month: 'Jun', posts: 580, members: 1200 },
];

const TRUST_DISTRIBUTION = [
  { name: 'Excellent (90+)', value: 42, color: '#10b981' },
  { name: 'Good (75–89)',    value: 31, color: '#3b82f6' },
  { name: 'Average (60–74)', value: 18, color: '#f59e0b' },
  { name: 'Below Average',   value: 9,  color: '#f43f5e' },
];

// ── Utility functions ──────────────────────────────────────
function getBadgeStyle(badge) {
  return {
    platinum: 'bg-gradient-to-r from-slate-200 via-white to-slate-200 text-slate-600 border border-slate-300',
    gold:     'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 text-amber-800',
    silver:   'bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 text-slate-700',
  }[badge] || 'bg-slate-100 text-slate-600';
}

function getRankIcon(rank) {
  if (rank === 1) return <Crown className="h-4 w-4 text-amber-400" />;
  if (rank === 2) return <Medal className="h-4 w-4 text-slate-400" />;
  if (rank === 3) return <Medal className="h-4 w-4 text-amber-600" />;
  return <span className="text-xs font-black text-slate-400 dark:text-slate-500">#{rank}</span>;
}

function getAlertConfig(severity) {
  return {
    high:     { bar: 'bg-rose-500',    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',         icon: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30',         label: 'High Alert'  },
    resolved: { bar: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', icon: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30', label: 'Resolved'    },
    info:     { bar: 'bg-sky-500',     badge: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400',             icon: 'text-sky-500 bg-sky-50 dark:bg-sky-950/30',             label: 'Safety Tip'  },
    update:   { bar: 'bg-violet-500',  badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400', icon: 'text-violet-500 bg-violet-50 dark:bg-violet-950/30',     label: 'Update'      },
  }[severity] || { bar: 'bg-slate-400', badge: 'bg-slate-100 text-slate-600', icon: 'text-slate-500 bg-slate-50', label: 'Notice' };
}

// ── Sub-components ─────────────────────────────────────────
function TrustRing({ score, uid, size = 80 }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const gId = `tg-${uid}`;
  const textClass = size >= 90 ? 'text-base font-black' : 'text-[11px] font-black';
  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e2e8f0" className="dark:stroke-slate-700" strokeWidth="7" />
        <circle
          cx="40" cy="40" r={r}
          fill="none"
          stroke={`url(#${gId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
        />
        <defs>
          <linearGradient id={gId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span className={`absolute ${textClass} text-slate-900 dark:text-white`}>{score}</span>
    </div>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-xl text-xs">
      {label && <p className="font-bold text-slate-700 mb-1.5">{label}</p>}
      {payload.map((e, i) => (
        <div key={i} className="flex items-center gap-1.5 text-slate-600">
          <span className="h-2 w-2 rounded-full" style={{ background: e.color || e.fill }} />
          <span>{e.name}:</span>
          <span className="font-bold text-slate-800">{e.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export function CommunityTrustPage() {
  const [liked, setLiked] = useState(() =>
    Object.fromEntries(COMMUNITY_POSTS.map(p => [p.id, p.liked]))
  );
  const [likes, setLikes] = useState(() =>
    Object.fromEntries(COMMUNITY_POSTS.map(p => [p.id, p.likes]))
  );
  const scrollRef = useRef(null);

  const toggleLike = (id) => {
    setLiked(prev => {
      const was = prev[id];
      setLikes(c => ({ ...c, [id]: c[id] + (was ? -1 : 1) }));
      return { ...prev, [id]: !was };
    });
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="py-8 text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4">

        {/* ──────────── SECTION 1: Hero Banner ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-sky-950/20 dark:via-slate-900 dark:to-violet-950/20 p-8 sm:p-10 shadow-sm"
        >
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gradient-to-br from-sky-300/20 to-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-gradient-to-br from-violet-400/20 to-purple-600/15 blur-3xl" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-2">
              <Shield className="h-3.5 w-3.5" /> Community &amp; Trust
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Community{' '}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                &amp; Trust Hub
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Discover trusted providers, community recommendations, safety insights, and reputation analytics — all in one place.
            </p>
          </div>
        </motion.div>

        {/* ──────────── Hero Stat Cards ──────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {HERO_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                variants={fadeUp} initial="hidden" animate="visible" custom={i}
                className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${s.iconBg}`}>
                  <Icon className={`h-5 w-5 ${s.iconColor}`} />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                  <CountUp end={s.value} duration={2.5} separator="," />{s.suffix}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
                <p className="mt-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{s.change}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ──────────── SECTION 2: Trust Center ─────────── */}
        <div className="mb-10">
          <div className="mb-5">
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-1">Trust Intelligence</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Trust Center</h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Rankings — 2/3 width */}
            <div className="xl:col-span-2 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Provider Trust Rankings</h3>
                  <p className="text-xs text-slate-500">Top providers ranked by community trust score</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
                </span>
              </div>

              <div className="space-y-3">
                {TRUST_RANKINGS.map((p, i) => (
                  <motion.div
                    key={p.id}
                    variants={fadeUp} initial="hidden" animate="visible" custom={i}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 hover:border-sky-200 dark:hover:border-sky-800/60 hover:bg-sky-50/20 dark:hover:bg-sky-950/10 transition-all duration-200"
                  >
                    <div className="w-7 flex items-center justify-center flex-shrink-0">{getRankIcon(p.rank)}</div>
                    <div className="relative flex-shrink-0">
                      <Avatar name={p.name} src={p.avatar} size="md" />
                      {p.verified && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center z-10">
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{p.name}</span>
                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full flex-shrink-0 ${getBadgeStyle(p.badge)}`}>{p.badge}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{p.role}</span>
                    </div>
                    <div className="hidden sm:flex gap-5 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Done</p>
                        <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">{p.completionRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Speed</p>
                        <p className="text-xs font-black text-slate-700 dark:text-slate-200">{p.responseTime}</p>
                      </div>
                    </div>
                    <TrustRing score={p.trustScore} uid={`rank${p.id}`} size={58} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Score Breakdown — 1/3 width */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col">
              <div className="mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">Trust Score Breakdown</h3>
                <p className="text-xs text-slate-500">Platform-wide quality metrics</p>
              </div>
              <div className="flex flex-col items-center py-5 mb-5 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-sky-950/20 dark:via-slate-900 dark:to-violet-950/10 border border-slate-100 dark:border-white/5">
                <TrustRing score={94} uid="overall" size={100} />
                <p className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-200">Platform Overall</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Industry avg: 72%</p>
              </div>
              <div className="space-y-4">
                {TRUST_BREAKDOWN.map((item, i) => (
                  <motion.div key={item.label} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.label}</span>
                      <span className={`text-xs font-black ${item.textColor}`}>{item.value}%</span>
                    </div>
                    <ProgressBar value={item.value} color={item.color} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ──────────── SECTION 3: Community Feed ───────── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-1">Feed</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Community Feed</h2>
            </div>
            <button className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">View All Posts</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMUNITY_POSTS.map((post, i) => (
              <motion.div
                key={post.id}
                variants={fadeUp} initial="hidden" animate="visible" custom={i}
                className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar name={post.user} src={post.avatar} size="md" className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{post.user}</span>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${post.tagColor}`}>{post.tag}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">{post.role}</span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="h-2.5 w-2.5" />{post.time}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 line-clamp-3 mb-4">{post.content}</p>
                <div className="flex items-center gap-0.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      liked[post.id]
                        ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 transition-all ${liked[post.id] ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
                    {likes[post.id]}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-sky-600 transition-all">
                    <MessageSquare className="h-3.5 w-3.5" />{post.comments}
                  </button>
                  <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-violet-600 transition-all">
                    <Share2 className="h-3.5 w-3.5" />Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ──────────── SECTION 4: Scam Alert Center ────── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400 mb-1">Safety</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Scam Alert Center</h2>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />AI-Monitored 24/7
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCAM_ALERTS.map((alert, i) => {
              const AlertIcon = alert.icon;
              const cfg = getAlertConfig(alert.severity);
              return (
                <motion.div
                  key={alert.id}
                  variants={fadeUp} initial="hidden" animate="visible" custom={i}
                  className="relative rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bar} rounded-l-3xl`} />
                  <div className="flex items-start gap-4 pl-2">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-2xl flex items-center justify-center ${cfg.icon}`}>
                      <AlertIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{alert.title}</h4>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${cfg.badge}`}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{alert.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Clock className="h-3 w-3" />{alert.time}
                        </span>
                        <button className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline">{alert.action}</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ──────────── SECTION 5: Top Trusted Providers ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-1">Recommended</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Top Trusted Providers</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => scroll(-1)} className="h-8 w-8 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 dark:hover:border-sky-700 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => scroll(1)} className="h-8 w-8 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 dark:hover:border-sky-700 transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TOP_PROVIDERS.map((p, i) => (
              <motion.div
                key={p.id}
                variants={fadeUp} initial="hidden" animate="visible" custom={i}
                className="flex-shrink-0 w-52 snap-start rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="relative inline-block">
                    <Avatar name={p.name} src={p.avatar} size="xl" className="shadow-sm" />
                    {p.verified && (
                      <span className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm z-10">
                        <BadgeCheck className="h-3.5 w-3.5 text-white" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{p.name}</h4>
                  <p className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 mt-0.5">{p.category}</p>
                  <div className="flex items-center justify-center gap-3 mt-2 mb-1">
                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
                      <Star className="h-3 w-3 fill-amber-400" />{p.rating}
                    </span>
                    <span className="text-slate-200 dark:text-slate-700">|</span>
                    <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">{p.trustScore}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-4">{p.jobs} jobs done</p>
                  <button className="w-full py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs font-bold shadow-sm shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all duration-200">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ──────────── SECTION 6: Community Achievements ─ */}
        <div className="mb-10">
          <div className="mb-5">
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-1">Milestones</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Community Achievements</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ACHIEVEMENTS.map((badge, i) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  variants={fadeUp} initial="hidden" animate="visible" custom={i}
                  className={`relative rounded-3xl border p-5 text-center transition-all duration-300 ${
                    badge.earned
                      ? `${badge.bg} ${badge.border} hover:-translate-y-1 hover:shadow-md cursor-default`
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 opacity-50 grayscale cursor-not-allowed'
                  }`}
                >
                  {badge.earned && (
                    <div className="absolute top-2.5 right-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                  )}
                  {!badge.earned && (
                    <div className="absolute top-2 right-2 bg-slate-200 dark:bg-slate-700 rounded-full px-1.5 py-0.5">
                      <span className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase">Lock</span>
                    </div>
                  )}
                  <div className={`mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${badge.gradient}`}>
                    <BadgeIcon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{badge.title}</p>
                  <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{badge.description}</p>
                  {!badge.earned && badge.needed && (
                    <div className="mt-2">
                      <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: `${(badge.count / badge.needed) * 100}%` }} />
                      </div>
                      <p className="text-[9px] text-slate-400 mt-0.5">{badge.count}/{badge.needed}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ──────────── SECTION 7: Analytics Dashboard ──── */}
        <div>
          <div className="mb-5">
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-1">Insights</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Chart 1: Category Trust Scores */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Most Trusted Categories</h3>
              <p className="text-xs text-slate-500 mb-5">Trust score by service category</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CATEGORY_TRUST} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={58} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="score" name="Trust Score" radius={[0, 8, 8, 0]}>
                    {CATEGORY_TRUST.map((e, idx) => <Cell key={idx} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Monthly Bookings */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Monthly Successful Bookings</h3>
              <p className="text-xs text-slate-500 mb-5">Verified service completions per month</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={MONTHLY_BOOKINGS} margin={{ left: -10, right: 10, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#3b82f6" strokeWidth={2.5} fill="url(#bkGrad)" dot={{ r: 3, fill: '#3b82f6' }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 3: Community Activity Growth */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Community Activity Growth</h3>
              <p className="text-xs text-slate-500 mb-5">Posts and member growth over time</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={COMMUNITY_GROWTH} margin={{ left: -10, right: 10, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}   />
                    </linearGradient>
                    <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="posts"   name="Posts"   stroke="#8b5cf6" strokeWidth={2} fill="url(#posGrad)" dot={false} />
                  <Area type="monotone" dataKey="members" name="Members" stroke="#10b981" strokeWidth={2} fill="url(#memGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex gap-5 mt-3">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500"><span className="h-2 w-5 rounded-full bg-violet-500" />Posts</span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500"><span className="h-2 w-5 rounded-full bg-emerald-500" />Members</span>
              </div>
            </div>

            {/* Chart 4: Trust Distribution */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Trust Score Distribution</h3>
              <p className="text-xs text-slate-500 mb-5">Provider quality breakdown across the platform</p>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0" style={{ width: '55%', height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={TRUST_DISTRIBUTION}
                        cx="50%" cy="50%"
                        innerRadius={52} outerRadius={82}
                        dataKey="value" nameKey="name"
                        paddingAngle={3}
                      >
                        {TRUST_DISTRIBUTION.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                      </Pie>
                      <Tooltip content={<ChartTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {TRUST_DISTRIBUTION.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-tight">{item.name}</span>
                      </div>
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 flex-shrink-0">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
