import { useEffect } from 'react';
import { Brain, Zap } from 'lucide-react';
import { AppShell } from './components/layout/AppShell';
import { Button } from './components/ui/Button';
import { useChat } from './hooks/useChat';
import { useNavigation } from './hooks/useNavigation';
import { useUser } from './contexts/UserContext';
import { LandingPage } from './pages/LandingPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { IncomingRequests } from './pages/IncomingRequests';
import { MyServices } from './pages/MyServices';
import { EmergencyJobs } from './pages/EmergencyJobs';
import { Earnings } from './pages/Earnings';
import { BookingsPage } from './pages/BookingsPage';
import { CommunityTrustPage } from './pages/CommunityTrustPage';

// Import New Authentication Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';

function renderPage(activePage, props) {
  switch (activePage) {
    case 'Home':
      return <LandingPage onNavigate={props.goToPage} />;
    case 'Services':
      return <ServicesPage onCategoryClick={props.handleCategoryClick} />;
    case 'Providers':
      return (
        <ProvidersPage
          selectedCategory={props.selectedCategory}
          onNavigate={props.goToPage}
          user={props.user}
        />
      );
    case 'AI Assistant':
      return <AIAssistantPage {...props.chat} onSend={props.chat.handleSendMessage} />;
    case 'Emergency':
      return <EmergencyPage />;
    case 'Seeker Dashboard':
    case 'Provider Profile':
    case 'Profile':
      return <ProfilePage onNavigate={props.goToPage} />;
    case 'Incoming Requests':
      return <IncomingRequests onNavigate={props.goToPage} />;
    case 'My Services':
      return <MyServices onNavigate={props.goToPage} />;
    case 'Emergency Jobs':
      return <EmergencyJobs onNavigate={props.goToPage} />;
    case 'Earnings':
      return <Earnings onNavigate={props.goToPage} />;
    case 'Admin Dashboard':
      return <AdminDashboard onNavigate={props.goToPage} />;
    case 'Bookings':
      return <BookingsPage onNavigate={props.goToPage} user={props.user} />;
    case 'Community & Trust Hub':
      return <CommunityTrustPage onNavigate={props.goToPage} />;
    
    // Auth & General Routes
    case 'About':
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-white/10 p-8 sm:p-10 rounded-[32px] shadow-2xl text-left space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-650" />
            <h1 className="text-3xl font-extrabold text-slate-905 dark:text-white">About ServiceBridge</h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              ServiceBridge is a next-generation, AI-powered hyperlocal service platform that connects local verified service seekers and trusted service providers. Designed like a premier modern SaaS application, we offer secure JWT authentication, instant bookings, transparent reviews, and a robust provider ecosystem.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Our mission is to bridge the gap between household needs and professional service partners, leveraging advanced fraud-detection algorithms and real-time dispatch systems to ensure speed, security, and absolute reliability.
            </p>
            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" className="px-6 py-2.5 rounded-xl font-semibold" onClick={() => props.goToPage('Login')}>Login</Button>
              <Button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-semibold shadow-md" onClick={() => props.goToPage('Register')}>Register</Button>
            </div>
          </div>
        </div>
      );
    case 'Sign In':
    case 'Login':
      return <LoginPage onNavigate={props.goToPage} />;
    case 'Register':
      return <RegisterPage onNavigate={props.goToPage} />;
    case 'Forgot Password':
      return <ForgotPasswordPage onNavigate={props.goToPage} />;
      
    default:
      return <LandingPage onNavigate={props.goToPage} />;
  }
}

export default function App() {
  const { user, loading } = useUser();
  const chat = useChat();

  const { activePage, selectedCategory, goToPage, handleCategoryClick } = useNavigation({
    onPageChange: (page) => {
      if (page === 'AI Assistant') {
        chat.focusInput();
      }
    },
  });

  // Enforce Protected Routes Redirection Middleware
  useEffect(() => {
    if (loading) return;

    const protectedPages = [
      'Profile',
      'Provider Profile',
      'Seeker Dashboard',
      'Incoming Requests',
      'My Services',
      'Emergency Jobs',
      'Earnings',
      'Bookings',
      'Community & Trust Hub',
    ];

    if (!user && protectedPages.includes(activePage)) {
      console.warn(`Attempted access to protected page [${activePage}] while unauthenticated. Redirecting to Login...`);
      goToPage('Login');
    }
  }, [user, loading, activePage, goToPage]);

  // Redirect Logged-In Users Away From Auth Screens
  useEffect(() => {
    if (loading || !user) return;

    const authPages = ['Login', 'Register', 'Forgot Password', 'Sign In'];
    if (authPages.includes(activePage)) {
      goToPage('Profile');
    }
  }, [user, loading, activePage, goToPage]);

  // Loading state placeholder render
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] dark:bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-sky-200 dark:border-sky-950 border-t-sky-600 dark:border-t-sky-400 animate-spin" />
            <Zap className="h-6 w-6 text-sky-600 dark:text-sky-400 absolute" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-wide">Loading ServiceBridge...</h2>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      activePage={activePage}
      onNavigate={goToPage}
      user={user}
    >
      {renderPage(activePage, {
        goToPage,
        handleCategoryClick,
        selectedCategory,
        user,
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
