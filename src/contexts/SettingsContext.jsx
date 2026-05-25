import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LANGUAGE_OPTIONS, TRANSLATIONS, DEFAULT_LANGUAGE, DEFAULT_THEME } from '../constants/translations';

const STORAGE_KEYS = {
  theme: 'servicebridge-theme',
  language: 'servicebridge-language',
  notifications: 'servicebridge-notifications',
};

const SettingsContext = createContext(null);

function getStoredValue(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function getStoredBoolean(key, fallback) {
  const value = getStoredValue(key, null);
  if (value === null) return fallback;
  return value === 'true';
}

function getTranslation(path, language) {
  const segments = path.split('.');
  let node = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
  for (const segment of segments) {
    if (!node || typeof node !== 'object') return undefined;
    node = node[segment];
  }
  return typeof node === 'string' ? node : undefined;
}

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [languages, setLanguages] = useState([DEFAULT_LANGUAGE]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    setTheme(getStoredValue(STORAGE_KEYS.theme, DEFAULT_THEME));
    const stored = getStoredValue(STORAGE_KEYS.language, DEFAULT_LANGUAGE);
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setLanguages(parsed);
        setLanguage(parsed[0]);
      } else if (typeof parsed === 'string') {
        setLanguages([parsed]);
        setLanguage(parsed);
      } else {
        setLanguages([DEFAULT_LANGUAGE]);
        setLanguage(DEFAULT_LANGUAGE);
      }
    } catch {
      // stored might be plain string
      setLanguages([stored]);
      setLanguage(stored);
    }
    setNotificationsEnabled(getStoredBoolean(STORAGE_KEYS.notifications, true));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {}
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    root.style.transition = 'background-color 0.25s ease, color 0.25s ease';
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.language, JSON.stringify(languages));
    } catch {}
  }, [languages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.notifications, String(notificationsEnabled));
    } catch {}
  }, [notificationsEnabled]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const cycleLanguage = () => {
    const currentIndex = LANGUAGE_OPTIONS.findIndex((item) => item.code === language);
    const nextIndex = (currentIndex + 1) % LANGUAGE_OPTIONS.length;
    // If currently multiple languages are selected, reset to first option
    if (languages.length > 1) {
      const first = LANGUAGE_OPTIONS[0].code;
      setLanguages([first]);
      setLanguage(first);
      return;
    }
    // If we're at the last option, switch to all languages
    if (currentIndex === LANGUAGE_OPTIONS.length - 1) {
      const all = LANGUAGE_OPTIONS.map((o) => o.code);
      setLanguages(all);
      setLanguage(all[0]);
      return;
    }
    const nextCode = LANGUAGE_OPTIONS[nextIndex].code;
    setLanguages([nextCode]);
    setLanguage(nextCode);
  };

  const translated = (path) => {
    const pieces = languages.map((lang) => getTranslation(path, lang) ?? getTranslation(path, DEFAULT_LANGUAGE) ?? path);
    return pieces.join(' / ');
  };

  const value = useMemo(
    () => ({
      theme,
      language,
      languages,
      notificationsEnabled,
      helpOpen,
      toggleTheme,
      cycleLanguage,
      setLanguage: (code) => {
        setLanguage(code);
        setLanguages([code]);
      },
      setLanguages,
      setNotificationsEnabled,
      openHelp: () => setHelpOpen(true),
      closeHelp: () => setHelpOpen(false),
      t: translated,
      languageOptions: LANGUAGE_OPTIONS,
    }),
    [theme, language, notificationsEnabled, helpOpen],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
