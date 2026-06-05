import {
  Home,
  LayoutGrid,
  Users,
  Brain,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'Home', labelKey: 'nav.Home', icon: Home },
  { id: 'Services', labelKey: 'nav.Services', icon: LayoutGrid },
  { id: 'Providers', labelKey: 'nav.Providers', icon: Users },
  { id: 'AI Assistant', labelKey: 'nav.AI Assistant', icon: Brain },
  { id: 'Emergency', labelKey: 'nav.Emergency', icon: AlertTriangle },
  { id: 'Profile', labelKey: 'nav.Profile', icon: BarChart3 },
];

export const PAGE_HEADINGS = {
  Home: 'pageHeadings.Home',
  Services: 'pageHeadings.Services',
  Providers: 'pageHeadings.Providers',
  'AI Assistant': 'pageHeadings.AI Assistant',
  Emergency: 'pageHeadings.Emergency',
  Profile: 'pageHeadings.Profile',
  'Sign In': 'pageHeadings.Sign In',
};
