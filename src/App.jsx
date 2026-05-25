import { Brain } from 'lucide-react';
import { AppShell } from './components/layout/AppShell';
import { Button } from './components/ui/Button';
import { useChat } from './hooks/useChat';
import { useNavigation } from './hooks/useNavigation';
import { useSettings } from './contexts/SettingsContext';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { DashboardPage } from './pages/DashboardPage';
import { SignInPage } from './pages/SignInPage';
function renderPage(activePage, props) {
  switch (activePage) {
    case 'Home':
      return <HomePage onNavigate={props.goToPage} />;
    case 'Services':
      return <ServicesPage onCategoryClick={props.handleCategoryClick} />;
    case 'Providers':
      return (
        <ProvidersPage
          selectedCategory={props.selectedCategory}
          onNavigate={props.goToPage}
        />
      );
    case 'AI Assistant':
      return <AIAssistantPage {...props.chat} onSend={props.chat.handleSendMessage} />;
    case 'Emergency':
      return <EmergencyPage />;
    case 'Dashboard':
      return <DashboardPage />;
    case 'Sign In':
      return <SignInPage onNavigate={props.goToPage} />;
    default:
      return <HomePage onNavigate={props.goToPage} />;
  }
}

export default function App() {
  const chat = useChat();

  const { activePage, selectedCategory, goToPage, handleCategoryClick } = useNavigation({
    onPageChange: (page) => {
      if (page === 'AI Assistant') {
        chat.focusInput();
      }
    },
  });

  const { t } = useSettings();
  const showCompactHeader = activePage === 'Home';
  const pageTitleOverride =
    activePage === 'Providers' && selectedCategory
      ? `${selectedCategory} providers`
      : undefined;

  return (
    <AppShell
      activePage={activePage}
      onNavigate={goToPage}
      showPageHeader={!showCompactHeader}
      pageTitleOverride={pageTitleOverride}
      headerActions={
        activePage !== 'Dashboard' ? (
          <Button onClick={() => goToPage('Sign In')}>{t('app.launchApp')}</Button>
        ) : (
          <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 sm:inline">
            {t('app.systemsOperational')}
          </span>
        )
      }
    >
      {renderPage(activePage, {
        goToPage,
        handleCategoryClick,
        selectedCategory,
        chat: {
          chatMessages: chat.chatMessages,
          chatInput: chat.chatInput,
          setChatInput: chat.setChatInput,
          isBotTyping: chat.isBotTyping,
          chatContainerRef: chat.chatContainerRef,
          chatInputRef: chat.chatInputRef,
          handleSendMessage: chat.handleSendMessage,
        },
      })}

      <button
        type="button"
        onClick={() => goToPage('AI Assistant')}
        className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-105 sm:bottom-8 sm:right-8"
        aria-label="Open AI assistant"
      >
        <Brain className="h-5 w-5" />
        AI Help
      </button>
    </AppShell>
  );
}
