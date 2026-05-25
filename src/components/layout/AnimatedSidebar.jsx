import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from '../../constants/navigation';
import { cn } from '../../lib/cn';
import { useSettings } from '../../contexts/SettingsContext';

export function AnimatedSidebar({
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapse,
}) {
  const { t } = useSettings();
  return (
    <motion.aside
      layout
      className={cn(
        'sticky top-0 flex h-screen shrink-0 flex-col border-r border-glass-border bg-sidebar-gradient shadow-panel',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar',
      )}
      initial={false}
    >
      <div className="flex items-center gap-3 border-b border-glass-border px-4 py-5">
        <div
          className={cn(
            'flex items-center gap-3 overflow-hidden',
            collapsed && 'w-full justify-center',
          )}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="min-w-0"
              >
                <h1 className="truncate font-display text-lg font-bold text-white">ServiceBridge</h1>
                <p className="truncate text-xs text-slate-500">AI Hyperlocal Platform</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition duration-300 ease-spring',
                isActive
                  ? 'text-white shadow-glow bg-white/5 ring-1 ring-blue-400/10'
                  : 'text-slate-400 hover:bg-white/[0.08] hover:text-slate-200',
                collapsed && 'justify-center px-0',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/15 to-violet-500/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className={cn('relative z-10 h-5 w-5 shrink-0', isActive && 'text-blue-300')} />
              {!collapsed && <span className="relative z-10 truncate">{t(item.labelKey)}</span>}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-glass-border p-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-glass-border py-2.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
