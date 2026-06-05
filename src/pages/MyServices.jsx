import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  Tag, 
  Check, 
  X, 
  Star,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialServices = [
  {
    id: 1,
    name: 'Home Wiring & Troubleshooting',
    pricing: '₹650 - ₹1,200',
    category: 'Electrical',
    availability: 'Today 10 AM - 6 PM',
    rating: 4.9,
    jobsCompleted: 145,
    details: 'Complete residential wiring diagnostic, circuit breaker fixing, and electrical outlet replacement.',
  },
  {
    id: 2,
    name: 'Instant & Storage Geyser Install',
    pricing: '₹850',
    category: 'Plumbing & Heating',
    availability: 'Today 9 AM - 4 PM',
    rating: 4.8,
    jobsCompleted: 88,
    details: 'Wall mounting, inlet/outlet coupling, leak prevention, and element safety testing.',
  },
  {
    id: 3,
    name: 'AC Servicing & Gas Refill',
    pricing: '₹1,200 - ₹2,500',
    category: 'HVAC Control',
    availability: 'Tomorrow 11 AM - 5 PM',
    rating: 4.9,
    jobsCompleted: 210,
    details: 'Air filter washing, cooling coil chemical cleaning, pressure check, and refrigerant top-up.',
  },
  {
    id: 4,
    name: 'Smart Switch & Home Automation',
    pricing: '₹1,500',
    category: 'Electrical Tech',
    availability: 'Weekends 9 AM - 6 PM',
    rating: 5.0,
    jobsCompleted: 34,
    details: 'Setting up smart switches, Alexa/Google Home coupling, and lighting scene automation.',
  },
];

export function MyServices({ onNavigate }) {
  const [services, setServices] = useState(initialServices);
  const [toastMessage, setToastMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electrical');
  const [pricing, setPricing] = useState('');
  const [availability, setAvailability] = useState('Today 9 AM - 5 PM');
  const [details, setDetails] = useState('');

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!name || !pricing) {
      triggerToast('Please fill out the name and pricing fields!');
      return;
    }
    const newService = {
      id: Date.now(),
      name,
      pricing,
      category,
      availability,
      rating: 5.0,
      jobsCompleted: 0,
      details: details || 'No additional details provided.',
    };
    setServices(prev => [newService, ...prev]);
    setModalOpen(false);
    triggerToast(`Successfully added service "${name}"!`);
    
    // Reset Form
    setName('');
    setCategory('Electrical');
    setPricing('');
    setAvailability('Today 9 AM - 5 PM');
    setDetails('');
  };

  const handleRemove = (id, title) => {
    setServices(prev => prev.filter(s => s.id !== id));
    triggerToast(`Removed service "${title}".`);
  };

  return (
    <section className="bg-[#F1F5F9] dark:bg-slate-950 min-h-screen py-8 transition-colors duration-250">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-slate-205 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Services</h1>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">Manage your active service catalog, update pricing estimates, and customize availability.</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-brand-gradient hover:scale-[1.02] text-white px-5 py-3 text-sm font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Add New Service
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {services.map((service) => (
              <motion.article 
                key={service.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 hover:border-slate-350 dark:hover:border-white/20 transition duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-400">
                        {service.category}
                      </span>
                      <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white leading-tight">{service.name}</h2>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-450 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-white/5 whitespace-nowrap font-medium">
                      <Clock className="w-3.5 h-3.5" /> {service.availability}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
                    {service.details}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-amber-500" />{service.rating.toFixed(1)} Rating</span>
                    <span>•</span>
                    <span>{service.jobsCompleted} Jobs Completed</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
                  <div className="text-slate-600 dark:text-slate-405 text-sm">
                    <span className="text-xs text-slate-400 block">Pricing Estimate</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{service.pricing}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => triggerToast(`Editing of "${service.name}" is coming in the next update!`)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4 text-sky-500" />
                    </button>
                    <button 
                      onClick={() => handleRemove(service.id, service.name)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-200/50 transition"
                      title="Remove Service"
                    >
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Service Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-[32px] border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-sky-505" /> Add New Service
                </h3>
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="rounded-full bg-slate-50 dark:bg-slate-850 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddService} className="flex-1 overflow-y-auto py-5 space-y-4 no-scroll-x">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Residential Fan Installation"
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Carpentry">Carpentry</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pricing Estimate *</label>
                    <input
                      type="text"
                      required
                      value={pricing}
                      onChange={(e) => setPricing(e.target.value)}
                      placeholder="e.g. ₹500 or ₹400 - ₹800"
                      className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Availability Slot</label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="e.g. Today 9 AM - 5 PM"
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Details / Description</label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Provide a description of what is included in the service..."
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
                    rows={3}
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-end gap-3">
                  <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">Submit & Publish</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
