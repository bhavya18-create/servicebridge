import { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  ArrowUpRight, 
  Calendar,
  CheckCircle,
  FileText,
  Percent,
  CircleDollarSign,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const earningsInfo = [
  { label: 'Today Earnings', value: '₹1,420', detail: 'Strong demand this morning', trend: '+18% vs yesterday', up: true },
  { label: 'Weekly Earnings', value: '₹9,300', detail: 'Steady booking velocity', trend: '+5% vs last week', up: true },
  { label: 'Monthly Earnings', value: '₹34,800', detail: 'Excellent performance', trend: '+12% vs last month', up: true },
  { label: 'Completed Jobs', value: '18', detail: 'New ratings pending', trend: '100% completion rate', up: true },
];

const transactionHistory = [
  {
    id: 'TXN-9021',
    customer: 'Neha Mehta',
    service: 'AC Servicing & Gas Refill',
    date: 'May 30, 2026',
    time: '11:15 AM',
    basePayout: '₹1,200',
    bonus: '₹220',
    commission: '₹142',
    net: '₹1,420',
    status: 'Settled',
  },
  {
    id: 'TXN-8845',
    customer: 'Rahul Verma',
    service: 'Emergency Geyser Repair',
    date: 'May 28, 2026',
    time: '4:30 PM',
    basePayout: '₹850',
    bonus: '₹340',
    commission: '₹119',
    net: '₹1,071',
    status: 'Settled',
  },
  {
    id: 'TXN-8512',
    customer: 'Sanya Mirza',
    service: 'Home Switch Installation',
    date: 'May 26, 2026',
    time: '2:45 PM',
    basePayout: '₹650',
    bonus: '₹0',
    commission: '₹65',
    net: '₹585',
    status: 'Settled',
  },
  {
    id: 'TXN-8201',
    customer: 'Priya Singh',
    service: 'Smart Home Hub Syncing',
    date: 'May 22, 2026',
    time: '9:00 AM',
    basePayout: '₹1,500',
    bonus: '₹250',
    commission: '₹175',
    net: '₹1,575',
    status: 'Settled',
  },
];

export function Earnings({ onNavigate }) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDownloadInvoice = (txnId) => {
    setDownloadingId(txnId);
    setTimeout(() => {
      setDownloadingId(null);
      triggerToast(`Invoice ${txnId}.pdf downloaded successfully!`);
    }, 1500);
  };

  return (
    <section className="bg-[#F1F5F9] dark:bg-slate-950 min-h-screen py-8 transition-colors duration-250">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-slate-205 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Earnings</h1>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">Track payouts, evaluate commission breakdowns, and view your detailed business metrics.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-505" /> Monthly Statement Cycle Active
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {earningsInfo.map((item) => (
            <GlassCard key={item.label} className="p-5 flex flex-col justify-between h-40">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-slate-455 dark:text-slate-400">{item.label}</div>
                <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{item.value}</div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-450">
                <span>{item.detail}</span>
                <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-450 font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {item.trend}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Analytical Columns */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CircleDollarSign className="w-5 h-5 text-sky-500" /> Business Overview
              </h2>
              <p className="mt-3 text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
                Your monthly earnings are growing consistently. The increase is driven by solid emergency (SOS) bookings, which add a 40% premium payout rate. Maintain a quick job acceptance rate to keep this growth momentum.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('Profile')} 
              className="mt-6 text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 flex items-center gap-1 cursor-pointer self-start"
            >
              Go to Profile Hub <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-505" /> Instant Settlements
              </h2>
              <p className="mt-3 text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
                The latest payment of <strong>₹1,420</strong> has been settled to your linked UPI bank account instantly. Payments for emergency and normal services are cleared within 15 minutes of customer completion.
              </p>
            </div>
            <div className="mt-6 text-xs text-slate-400 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Instant Payout Routing Enabled
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Percent className="w-5 h-5 text-violet-500" /> Performance Rates
              </h2>
              <ul className="mt-3 space-y-3.5 text-sm text-slate-655 dark:text-slate-350">
                <li className="flex justify-between">
                  <span className="text-slate-500">Average Order Value:</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹940</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Response Speed:</span>
                  <span className="font-bold text-slate-900 dark:text-white">4.2 mins</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Acceptance Rate:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">96.8%</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100 dark:border-white/5">
              ServiceBridge Tier: Elite Partner
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Settlements</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review itemized breakdowns and download invoice PDFs for your tax records.</p>
            </div>
          </div>
          
          <div className="overflow-x-auto select-none">
            <table className="w-full text-left text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-white/5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Job Details</th>
                  <th className="pb-3 font-semibold">Date & Time</th>
                  <th className="pb-3 font-semibold">Base Payout</th>
                  <th className="pb-3 font-semibold">Bonus / Promo</th>
                  <th className="pb-3 font-semibold">Platform Fee (10%)</th>
                  <th className="pb-3 font-semibold">Net Received</th>
                  <th className="pb-3 text-right font-semibold">Invoices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-medium text-slate-700 dark:text-slate-300">
                {transactionHistory.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="py-4 pr-3">
                      <span className="block font-bold text-slate-900 dark:text-white">{txn.service}</span>
                      <span className="text-xs text-slate-405 block mt-0.5">Ref: {txn.id} • {txn.customer}</span>
                    </td>
                    <td className="py-4 pr-3 text-xs">
                      <span className="block">{txn.date}</span>
                      <span className="text-slate-400 block mt-0.5">{txn.time}</span>
                    </td>
                    <td className="py-4 pr-3 font-semibold text-slate-950 dark:text-white">{txn.basePayout}</td>
                    <td className="py-4 pr-3 text-emerald-600 dark:text-emerald-450 font-bold">{txn.bonus}</td>
                    <td className="py-4 pr-3 text-rose-500">{txn.commission}</td>
                    <td className="py-4 pr-3 text-base font-black text-slate-950 dark:text-white">{txn.net}</td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(txn.id)}
                        disabled={downloadingId === txn.id}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                      >
                        {downloadingId === txn.id ? (
                          <>Downloading...</>
                        ) : (
                          <>
                            <FileText className="w-3.5 h-3.5 text-sky-505" /> Invoice <Download className="w-3 h-3 text-slate-400" />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

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
