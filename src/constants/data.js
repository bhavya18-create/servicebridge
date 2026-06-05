import { Zap, Wrench, Brain, ShieldCheck, Sparkles, Camera, Laptop, Stethoscope, Snowflake, Hammer } from 'lucide-react';

export const categories = [
  'Electrician',
  'Plumber',
  'Tutor',
  'Mechanic',
  'Photographer',
  'Cleaning',
  'Laptop Repair',
  'Healthcare',
  'AC Specialist',
  'Carpenter',
];

export const categoryIcons = {
  Electrician: Zap,
  Plumber: Wrench,
  Tutor: Brain,
  Mechanic: ShieldCheck,
  Photographer: Camera,
  Cleaning: Sparkles,
  'Laptop Repair': Laptop,
  Healthcare: Stethoscope,
  'AC Specialist': Snowflake,
  Carpenter: Hammer,
  default: Sparkles,
};

export const providers = [
  { name: 'Raju Sharma', role: 'Electrician', rating: 4.9, eta: '12 mins', price: '₹420' },
  { name: 'Priya Singh', role: 'Plumber', rating: 4.8, eta: '18 mins', price: '₹360' },
  { name: 'Amit Patel', role: 'Mechanic', rating: 4.7, eta: '22 mins', price: '₹520' },
  { name: 'Nisha Verma', role: 'AC Specialist', rating: 4.9, eta: '15 mins', price: '₹680' },
  { name: 'Sahil Rao', role: 'Cleaning', rating: 4.8, eta: '14 mins', price: '₹340' },
  { name: 'Manish Gupta', role: 'Carpenter', rating: 4.7, eta: '19 mins', price: '₹390' },
  { name: 'Ayesha Khan', role: 'Photographer', rating: 4.8, eta: '21 mins', price: '₹450' },
  { name: 'Vikram Desai', role: 'Tutor', rating: 4.6, eta: '17 mins', price: '₹320' },
  { name: 'Kavita Joshi', role: 'Healthcare', rating: 4.9, eta: '13 mins', price: '₹500' },
  { name: 'Rohan Mehta', role: 'Laptop Repair', rating: 4.7, eta: '20 mins', price: '₹560' },
  { name: 'Priyanka Nair', role: 'Cleaning', rating: 4.6, eta: '16 mins', price: '₹370' },
  { name: 'Sandeep Kumar', role: 'Plumber', rating: 4.8, eta: '18 mins', price: '₹410' },
];

export const analyticsData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 900 },
  { name: 'Mar', users: 1400 },
  { name: 'Apr', users: 2200 },
  { name: 'May', users: 3200 },
];

export const dashboardStats = [
  { title: 'Trust Score', value: 98, suffix: '%' },
  { title: 'Response Speed', value: 3, suffix: ' mins' },
  { title: 'Completion Rate', value: 96, suffix: '%' },
  { title: 'Verified Providers', value: 12, suffix: 'K+' },
];

export const CHART_COLORS = {
  stroke: '#60a5fa',
  fillStart: '#3b82f6',
  fillEnd: '#8b5cf6',
  axis: '#64748b',
};
