import { categories, categoryIcons } from '../constants/data';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeader } from '../components/ui/SectionHeader';

export function ServicesPage({ onCategoryClick }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Services"
        title="Explore service categories"
        description="Browse categories and choose the right local professional for any task."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || categoryIcons.default;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryClick(category)}
              className="group text-left"
            >
              <GlassCard hover className="h-full">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{category}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Verified reviews and fast availability near you.
                </p>
              </GlassCard>
            </button>
          );
        })}
      </div>
    </section>
  );
}
