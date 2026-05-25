import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const initialForm = { name: '', email: '', phone: '', message: '' };

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function HelpModal() {
  const { helpOpen, closeHelp, t, language } = useSettings();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!helpOpen) {
      setForm(initialForm);
      setErrors({});
      setStatus(null);
    }
  }, [helpOpen]);

  const faqs = useMemo(
    () => [
      {
        question: t('help.faq1Question'),
        answer: t('help.faq1Answer'),
      },
      {
        question: t('help.faq2Question'),
        answer: t('help.faq2Answer'),
      },
      {
        question: t('help.faq3Question'),
        answer: t('help.faq3Answer'),
      },
    ],
    [t],
  );

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = t('validation.required');
    if (!form.email.trim()) nextErrors.email = t('validation.required');
    else if (!isValidEmail(form.email.trim())) nextErrors.email = t('validation.email');
    if (!form.message.trim()) nextErrors.message = t('validation.required');

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus('error');
      return;
    }

    setStatus('success');
    setErrors({});
    setForm(initialForm);
  };

  if (!helpOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 text-slate-100">
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{t('app.helpTitle')}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{t('app.helpSubtitle')}</h2>
          </div>
          <button
            type="button"
            aria-label={t('app.close')}
            onClick={closeHelp}
            className="rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-slate-300 transition hover:bg-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{t('app.faqTitle')}</h3>
            <div className="space-y-3">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{t('app.contactTitle')}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{t('app.contactDescription')}</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">
                  {t('help.formName')}
                  <input
                    value={form.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    className="glass-input mt-2 w-full"
                    placeholder={t('help.formName')}
                  />
                </label>
                {errors.name && <p className="mt-2 text-sm text-rose-400">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm text-slate-300">
                  {t('help.formEmail')}
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    className="glass-input mt-2 w-full"
                    placeholder={t('help.formEmail')}
                  />
                </label>
                {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm text-slate-300">
                  {t('help.formPhone')}
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    className="glass-input mt-2 w-full"
                    placeholder={t('help.formPhone')}
                  />
                </label>
              </div>
              <div>
                <label className="text-sm text-slate-300">
                  {t('help.formMessage')}
                  <textarea
                    value={form.message}
                    onChange={(event) => handleChange('message', event.target.value)}
                    className="glass-input mt-2 min-h-[120px] w-full resize-none"
                    placeholder={t('help.formMessage')}
                  />
                </label>
                {errors.message && <p className="mt-2 text-sm text-rose-400">{errors.message}</p>}
              </div>
              <button type="submit" className="btn-brand w-full">{t('app.submit')}</button>
              {status === 'success' && (
                <p className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {t('app.successMessage')}
                </p>
              )}
              {status === 'error' && (
                <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                  {t('app.errorMessage')}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
