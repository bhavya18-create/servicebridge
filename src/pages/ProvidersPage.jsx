import { Star, Clock3 } from 'lucide-react';
import { providers } from '../constants/data';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';

export function ProvidersPage({ selectedCategory, onNavigate }) {
  const title = selectedCategory ? `${selectedCategory} experts` : 'Top local providers';
  const providerCount = providers.length;

  return (
    <section>
      <SectionHeader
        eyebrow="Providers"
        title={title}
        description={`Compare ratings, ETA, and pricing from ${providerCount}+ verified professionals.`}
        actions={<Button variant="ghost" onClick={() => onNavigate('Services')}>Browse categories</Button>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {providers.map((provider) => (
          <GlassCard key={provider.name} hover>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{provider.name}</h3>
                <p className="text-sm text-slate-400">{provider.role}</p>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-glass-border bg-white/[0.06] font-bold text-slate-300">
                {provider.name.slice(0, 2)}
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                {provider.rating} rating
              </p>
              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-blue-400" />
                ETA {provider.eta}
              </p>
              <p className="font-semibold text-slate-200">From {provider.price}</p>
            </div>
            <Button className="mt-6 w-full" onClick={() => onNavigate('Dashboard')}>
              View details
            </Button>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
