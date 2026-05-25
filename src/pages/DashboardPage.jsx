import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { analyticsData, dashboardStats, CHART_COLORS } from '../constants/data';
import { StatCard } from '../components/ui/StatCard';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useSettings } from '../contexts/SettingsContext';
import { HelpModal } from '../components/HelpModal';
import { Bell, Globe, LifeBuoy, Mail, Moon, Phone, User } from 'lucide-react';

const alerts = [
  'High demand in plumbing across the city.',
  'New preferred electrician onboarded.',
  'Emergency requests rose 18% this week.',
];

export function DashboardPage() {
  const {
    t,
    theme,
    language,
    languages,
    languageOptions,
    notificationsEnabled,
    toggleTheme,
    cycleLanguage,
    setNotificationsEnabled,
    openHelp,
  } = useSettings();

  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow={t('nav.Dashboard')}
        title={t('pageHeadings.Dashboard')}
        description={t('app.helpSubtitle')}
        compact
      />
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-sky-300 shadow-glow">
              <User className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profile</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Arjun Mehta</h3>
              <p className="text-sm text-slate-400">Service Provider · Electrical Repair</p>
            </div>
          </div>
          <div className="mt-8 grid gap-3 rounded-[28px] border border-white/10 bg-slate-950/80 p-5">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail className="h-4 w-4 text-sky-300" />
              <span>{t('dashboard.emailLabel')}: arjun.mehta@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="h-4 w-4 text-cyan-300" />
              <span>{t('dashboard.phoneLabel')}: +91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Bell className="h-4 w-4 text-violet-300" />
              <span>
                {t('dashboard.notificationsStatus')?.replace(
                  '{status}',
                  t(notificationsEnabled ? 'dashboard.enabled' : 'dashboard.disabled'),
                )}
              </span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quick settings</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Preferences</h3>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              {
                icon: <Moon className="h-4 w-4 text-slate-100" />,
                label: t('dashboard.changeTheme'),
                action: toggleTheme,
              },
              {
                icon: <Globe className="h-4 w-4 text-sky-300" />,
                label: `${t('dashboard.changeLanguage')} (${languages
                  .map((code) => languageOptions.find((o) => o.code === code)?.label || code)
                  .join(', ')})`,
                action: cycleLanguage,
              },
              {
                icon: <LifeBuoy className="h-4 w-4 text-cyan-300" />,
                label: t('dashboard.helpSupport'),
                action: openHelp,
              },
              {
                icon: <Bell className="h-4 w-4 text-violet-300" />,
                label: `${t('dashboard.notificationSettings')} ${notificationsEnabled ? t('dashboard.enabled') : t('dashboard.disabled')}`,
                action: () => setNotificationsEnabled((value) => !value),
              },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="flex w-full items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-sky-400/30 hover:bg-white/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-900 text-slate-100 shadow-glow">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <GlassCard className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Performance</p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">Monthly growth</h3>
            </div>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              Live
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="dashboardChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.fillStart} stopOpacity={0.7} />
                  <stop offset="95%" stopColor={CHART_COLORS.fillEnd} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke={CHART_COLORS.axis} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke={CHART_COLORS.axis} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: '#0f1424',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke={CHART_COLORS.stroke}
                fill="url(#dashboardChart)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="lg:col-span-2">
          <h3 className="font-display text-xl font-bold text-white">AI alerts</h3>
          <ul className="mt-5 space-y-3">
            {alerts.map((alert) => (
              <li
                key={alert}
                className="rounded-2xl border border-glass-border bg-white/[0.03] px-4 py-3.5 text-sm text-slate-400"
              >
                {alert}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
      <HelpModal />
    </section>
  );
}
