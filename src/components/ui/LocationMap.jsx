import { MapPin, Navigation2, ShieldCheck, Sparkles, Users } from 'lucide-react';

const locationProfiles = {
  bandra: {
    key: 'bandra',
    label: 'Bandra • Live Zone',
    description: 'Best availability for premium local matching',
    center: [58, 42],
    route: ['20,70', '38,58', '58,48', '78,35'],
    highlight: '#38bdf8',
  },
  andheri: {
    key: 'andheri',
    label: 'Andheri • Live Zone',
    description: 'High density of verified providers near transit hubs',
    center: [67, 58],
    route: ['28,78', '50,68', '68,58', '84,44'],
    highlight: '#22c55e',
  },
  pune: {
    key: 'pune',
    label: 'Pune • Live Zone',
    description: 'Trusted provider clusters across central corridors',
    center: [44, 61],
    route: ['18,72', '34,64', '52,55', '68,48'],
    highlight: '#f59e0b',
  },
  delhi: {
    key: 'delhi',
    label: 'Delhi • Live Zone',
    description: 'Fast response coverage with premium reliability scoring',
    center: [56, 28],
    route: ['22,40', '42,33', '60,26', '76,22'],
    highlight: '#f472b6',
  },
  bengaluru: {
    key: 'bengaluru',
    label: 'Bengaluru • Live Zone',
    description: 'Dense service coverage with quick dispatch windows',
    center: [36, 74],
    route: ['18,80', '30,72', '46,66', '64,58'],
    highlight: '#8b5cf6',
  },
  mumbai: {
    key: 'mumbai',
    label: 'Mumbai • Citywide Coverage',
    description: 'Cross-zone dispatch available with live availability',
    center: [55, 50],
    route: ['18,74', '34,64', '52,52', '74,38'],
    highlight: '#38bdf8',
  },
};

const providerCatalog = [
  { name: 'Aarav Mehta', role: 'Electrician', locationKey: 'bandra', x: 58, y: 34, eta: '12 min', price: '₹420', rating: 4.9, status: 'Available now' },
  { name: 'Nitika Rao', role: 'Plumber', locationKey: 'bandra', x: 50, y: 44, eta: '15 min', price: '₹360', rating: 4.8, status: 'Ready in 10 min' },
  { name: 'Rohan Shah', role: 'Cleaning', locationKey: 'bandra', x: 66, y: 52, eta: '18 min', price: '₹280', rating: 4.7, status: 'Live today' },
  { name: 'Kavya Iyer', role: 'Electrician', locationKey: 'andheri', x: 69, y: 57, eta: '11 min', price: '₹450', rating: 4.9, status: 'Available now' },
  { name: 'Sahil Desai', role: 'Mechanic', locationKey: 'andheri', x: 78, y: 48, eta: '14 min', price: '₹520', rating: 4.8, status: 'Near you' },
  { name: 'Pooja Verma', role: 'Tutor', locationKey: 'pune', x: 43, y: 63, eta: '20 min', price: '₹260', rating: 4.8, status: 'Open now' },
  { name: 'Mohit Sen', role: 'Plumber', locationKey: 'delhi', x: 60, y: 26, eta: '10 min', price: '₹390', rating: 4.9, status: 'Available now' },
  { name: 'Simran Kapoor', role: 'Cleaning', locationKey: 'bengaluru', x: 35, y: 72, eta: '13 min', price: '₹300', rating: 4.7, status: 'Ready in 8 min' },
  { name: 'Anil Yadav', role: 'Mechanic', locationKey: 'mumbai', x: 48, y: 50, eta: '16 min', price: '₹500', rating: 4.8, status: 'Available now' },
];

const fallbackService = 'Electrician';

function normalize(value) {
  return value.toLowerCase().trim();
}

export function LocationMap({ service = fallbackService, location = 'Bandra, Mumbai' }) {
  const normalizedLocation = normalize(location);
  const activeProfile =
    Object.values(locationProfiles).find((profile) => {
      const names = [profile.key, 'mumbai', 'bandra', 'andheri', 'pune', 'delhi', 'bengaluru'];
      return names.some((name) => normalizedLocation.includes(name));
    }) || locationProfiles.mumbai;

  const inZoneProviders = providerCatalog.filter((provider) => provider.locationKey === activeProfile.key);
  const serviceMatches = inZoneProviders.filter((provider) => provider.role === service);
  const visibleProviders = serviceMatches.length ? serviceMatches : inZoneProviders;

  const activeCount = visibleProviders.length;
  const topProvider = visibleProviders[0] ?? providerCatalog[0];

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/85 p-4 md:min-h-[520px] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_24%)]" />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Live map view</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{activeProfile.label}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{activeProfile.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
            {activeCount} providers nearby
          </span>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            {service}
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-4 h-[300px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.98),rgba(15,23,42,0.7))] md:h-[340px]">
        <svg viewBox="0 0 100 100" className="h-full w-full" role="presentation" aria-hidden="true">
          <defs>
            <linearGradient id="mapGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="100" height="100" rx="8" fill="url(#mapGlow)" />

          <path d="M8 30C24 24 34 34 48 30C62 26 74 12 92 18" fill="none" stroke="rgba(59,130,246,0.24)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M12 64C28 58 42 68 58 62C72 56 84 62 92 52" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M48 12C52 22 60 28 70 32" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeLinecap="round" />

          <circle cx="18" cy="22" r="6" fill="rgba(56,189,248,0.08)" />
          <circle cx="84" cy="78" r="7" fill="rgba(139,92,246,0.08)" />
          <circle cx="28" cy="84" r="5" fill="rgba(45,212,191,0.06)" />

          <path
            d={activeProfile.route.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point}`).join(' ')}
            fill="none"
            stroke={activeProfile.highlight}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          <circle cx={activeProfile.center[0]} cy={activeProfile.center[1]} r="6" fill={activeProfile.highlight} fillOpacity="0.28" />
          <circle cx={activeProfile.center[0]} cy={activeProfile.center[1]} r="2.4" fill={activeProfile.highlight} />

          {visibleProviders.map((provider) => (
            <g key={provider.name} transform={`translate(${provider.x} ${provider.y})`}>
              <circle r="3.4" fill="#0f172a" stroke="#ffffff" strokeWidth="0.6" />
              <circle r="1.8" fill="#38bdf8" />
              <text x="4.4" y="1.2" fontSize="3" fill="#f8fafc">{provider.name.split(' ')[0]}</text>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/85 px-3 py-1.5 text-xs text-slate-200 backdrop-blur">
          <Navigation2 className="h-3.5 w-3.5 text-cyan-300" />
          {topProvider.eta} average ETA in this area
        </div>
      </div>

      <div className="relative z-10 mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
        <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Users className="h-4 w-4 text-cyan-300" />
            Top nearby matches
          </div>
          <div className="mt-3 space-y-2">
            {visibleProviders.slice(0, 3).map((provider) => (
              <div key={provider.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-white">{provider.name}</p>
                  <p className="text-xs text-slate-300">{provider.role} · {provider.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-cyan-200">{provider.price}</p>
                  <p className="text-xs text-slate-400">{provider.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Verified network
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">Every provider on this map is screened, background-checked, and rated for fast delivery.</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-violet-300" />
              AI route quality
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">The route highlight updates instantly as your service selection and location inputs change.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
