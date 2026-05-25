import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { AnimatedSidebar } from './AnimatedSidebar';
import { MobileNavDrawer } from './MobileNavDrawer';
import { BackgroundOrbs } from './BackgroundOrbs';
import { PageTransition } from './PageTransition';
import { useMediaQuery, DESKTOP_MEDIA } from '../../hooks/useMediaQuery';
import { useSettings } from '../../contexts/SettingsContext';

export function AppShell({
  activePage,
  onNavigate,
  children,
  headerActions,
  showPageHeader = true,
  pageTitleOverride,
}) {
  const { t } = useSettings();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA);

  const pageTitle = pageTitleOverride ?? t(`pageHeadings.${activePage}`) ?? activePage;

  const closeMobileMenu = () => setMobileOpen(false);
  const showMobileDrawer = !isDesktop && mobileOpen;

  useEffect(() => {
    if (!showMobileDrawer) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    document.addEventListener('keydown', handleEscape);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [showMobileDrawer]);

  return (
    <div className="min-h-screen w-full bg-hero-radial font-sans text-slate-200">
      <BackgroundOrbs />

      {!isDesktop && (
        <MobileNavDrawer
          open={showMobileDrawer}
          activePage={activePage}
          onNavigate={onNavigate}
          onClose={closeMobileMenu}
        />
      )}

      <div className="flex min-h-screen w-full">
        {isDesktop && (
          <AnimatedSidebar
            activePage={activePage}
            onNavigate={onNavigate}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((v) => !v)}
          />
        )}

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-glass-border bg-slate-950/60 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
            <div className="flex min-w-0 items-center gap-3">
              {!isDesktop && (
                <button
                  type="button"
                  onClick={() => setMobileOpen((open) => !open)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-glass-border text-slate-300"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileOpen}
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
              {showPageHeader && (
                <div className="min-w-0">
                  <p className="eyebrow">{t(`nav.${activePage}`) ?? activePage}</p>
                  <h2 className="mt-1 truncate font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {pageTitle}
                  </h2>
                </div>
              )}
            </div>
            <div className="shrink-0">{headerActions}</div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="mx-auto w-full max-w-[1400px]">
              <PageTransition pageKey={activePage}>{children}</PageTransition>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
