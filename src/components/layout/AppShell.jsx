import { useState } from 'react';
import { Menu, Search, Zap, UserCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useSettings } from '../../contexts/SettingsContext';
import { useUser } from '../../contexts/UserContext';

export function AppShell({ activePage, onNavigate, children, user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useUser();
  const isProvider = user?.role === 'provider';
  const isAuthPage = ['Login', 'Register', 'Forgot Password', 'Sign In'].includes(activePage);
  
  const { t } = useSettings();

  const handleNavClick = (page, isLogout) => {
    setMobileOpen(false);
    if (isLogout) {
      signOut();
      onNavigate('Home');
    } else {
      onNavigate(page);
    }
  };

  // Dynamic Navigation Items based on login state and role
  const navItems = user
    ? isProvider
      ? [
          { label: 'My Services', page: 'My Services' },
          { label: 'Incoming Requests', page: 'Incoming Requests' },
          { label: 'Emergency Jobs', page: 'Emergency Jobs' },
          { label: 'Earnings', page: 'Earnings' },
        ]
      : [
          { label: 'Services', page: 'Services' },
          { label: 'Providers', page: 'Providers' },
          { label: 'Bookings', page: 'Bookings' },
          { label: 'Community & Trust', page: 'Community & Trust Hub' },
        ]
    : [
        { label: 'About', page: 'About' },
        { label: 'Login', page: 'Login' },
        { label: 'Register', page: 'Register' },
      ];

  const profileActionTarget = 'Profile';

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-slate-950 text-[var(--text)] no-scroll-x transition-colors duration-250">
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm transition-colors duration-250">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {!isAuthPage && (
              <button 
                className="lg:hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-2 shadow-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition" 
                onClick={() => setMobileOpen((v) => !v)} 
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <button className="brand-logo flex items-center gap-2.5" onClick={() => handleNavClick('Home')}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-655 to-blue-600 text-white shadow-sm">
                <Zap className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ServiceBridge</span>
            </button>
          </div>

          {/* Search bar inside header for authenticated users */}
          {user && (
            <div className="hidden lg:flex flex-1 items-center justify-center px-4 max-w-md">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  className="input pl-11 pr-3 !py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 text-slate-905 dark:text-white placeholder:text-slate-400 text-xs" 
                  placeholder={t('app.searchPlaceholder') || 'Search services, providers...'} 
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-6">
            {!isAuthPage && user && (
              <nav className="flex items-center gap-5">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className={`nav-link text-sm font-semibold tracking-wide transition-colors ${
                      activePage === item.page 
                        ? 'text-sky-600 dark:text-sky-400' 
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                    }`}
                    onClick={() => handleNavClick(item.page)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-white/10">
                  {/* Circular Avatar Button */}
                  <button
                    onClick={() => handleNavClick(profileActionTarget)}
                    className="relative transition-all duration-300"
                    title="My Profile Hub"
                  >
                    <Avatar
                      name={user.fullName}
                      src={user.avatar}
                      size="md"
                      className={activePage === 'Profile' ? 'ring-2 ring-sky-500 scale-105 shadow-glow' : 'ring-2 ring-sky-500/20 dark:ring-sky-400/30 hover:ring-sky-505 hover:scale-105'}
                    />
                  </button>
                  {/* Quick Logout Button */}
                  <button 
                    onClick={() => handleNavClick('Home', true)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition duration-200 bg-transparent hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    title="Sign Out"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Button variant="ghost" className="px-4 py-2 text-slate-700 dark:text-slate-300 font-semibold" onClick={() => handleNavClick('Login')}>
                    Sign In
                  </Button>
                  <Button variant="primary" className="px-5 py-2.5 rounded-2xl text-xs font-semibold shadow-md" onClick={() => handleNavClick('Register')}>
                    Join Us
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Quick Action Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick(profileActionTarget)}
                  className="relative transition"
                  title="My Profile Hub"
                >
                  <Avatar
                    name={user.fullName}
                    src={user.avatar}
                    size="sm"
                    className={activePage === 'Profile' ? 'ring-2 ring-sky-500 scale-105' : 'ring-2 ring-sky-500/20 dark:ring-sky-400/30'}
                  />
                </button>
                <button
                  onClick={() => handleNavClick('Home', true)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition bg-transparent hover:bg-rose-50 dark:hover:bg-rose-955/20"
                  title="Sign Out"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" className="px-3.5 py-1.5 text-xs text-slate-750 dark:text-slate-300 font-semibold" onClick={() => handleNavClick('Login')}>
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-4 shadow-sm space-y-4">
            {user && (
              <div className="relative mb-2">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  className="input pl-11 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs" 
                  placeholder="Search services..." 
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`text-left w-full py-2.5 px-4 rounded-xl flex items-center justify-between text-sm font-semibold transition ${
                    activePage === item.page 
                      ? 'bg-sky-50 dark:bg-sky-955/40 text-sky-600 dark:text-sky-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                  onClick={() => handleNavClick(item.page)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
              {/* Profile Name and Logout - Last in Mobile */}
              {user && (
                <div className="border-t border-slate-200 dark:border-white/10 mt-2 pt-3 flex flex-col gap-2">
                  <button
                    onClick={() => handleNavClick(profileActionTarget)}
                    className="text-left w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-705 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition"
                  >
                    Profile Hub
                  </button>
                  <button
                    onClick={() => handleNavClick('Home', true)}
                    className="text-left w-full py-2.5 px-4 rounded-xl flex items-center justify-between text-sm font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-955/10 transition"
                  >
                    <span>Sign Out</span>
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
