import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from '../../constants/navigation';
import { cn } from '../../lib/cn';
import { useSettings } from '../../contexts/SettingsContext';

export function MobileNavDrawer({ open, activePage, onNavigate, onClose }) {
  const { t } = useSettings();
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close navigation"
      />
      <aside
        className="absolute left-0 top-0 z-[201] flex h-full w-[min(17rem,85vw)] flex-col border-r border-glass-border bg-sidebar-gradient shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-glass-border px-4 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg font-bold text-white">ServiceBridge</h1>
              <p className="truncate text-xs text-slate-500">AI Hyperlocal Platform</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl border border-glass-border p-2 text-slate-400"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-colors',
                  isActive
                    ? 'border border-blue-500/30 bg-gradient-to-r from-blue-500/15 to-violet-500/10 text-white'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200',
                )}
              >
                <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-blue-300')} />
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>
      </aside>
    </div>,
    document.body,
  );
}
