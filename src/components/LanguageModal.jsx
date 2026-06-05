import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function LanguageModal({ isOpen, onClose }) {
  const { language, languageOptions, setLanguage, t } = useSettings();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-6">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-semibold">
              {t('dashboard.selectLanguage')}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Choose your language
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 shadow-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-2.5">
          {languageOptions.map((option) => {
            const isSelected = language === option.code;
            return (
              <button
                key={option.code}
                type="button"
                onClick={() => {
                  setLanguage(option.code);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/40 text-blue-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">{option.label}</span>
                {isSelected && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
