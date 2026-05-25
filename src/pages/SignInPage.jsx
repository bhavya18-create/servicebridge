import { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';

const seekerFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'age', label: 'Age', type: 'number' },
  { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'budget', label: 'Budget', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
];

const providerFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'work', label: 'Work', type: 'text' },
  { name: 'serviceProvided', label: 'Service provided', type: 'text' },
  { name: 'skill', label: 'Skill', type: 'text' },
  { name: 'minPrice', label: 'Minimum price charged', type: 'text' },
  { name: 'avgPrice', label: 'Avg price charged', type: 'text' },
];

export function SignInPage({ onNavigate }) {
  const [role, setRole] = useState('Seeker');
  const [seekerData, setSeekerData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    location: '',
    budget: '',
    address: '',
  });
  const [providerData, setProviderData] = useState({
    name: '',
    phone: '',
    email: '',
    work: '',
    serviceProvided: '',
    skill: '',
    minPrice: '',
    avgPrice: '',
  });

  const selectedData = role === 'Seeker' ? seekerData : providerData;
  const fieldDefinitions = role === 'Seeker' ? seekerFields : providerFields;

  const handleChange = (field, value) => {
    if (role === 'Seeker') {
      setSeekerData((current) => ({ ...current, [field]: value }));
    } else {
      setProviderData((current) => ({ ...current, [field]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onNavigate('Dashboard');
  };

  return (
    <section>
      <SectionHeader
        eyebrow="Sign In"
        title="Sign in to access ServiceBridge"
        description="Choose your role below and complete the required details to continue as a service seeker or provider."
        actions={
          <Button variant="ghost" onClick={() => onNavigate('Home')}>
            Back to home
          </Button>
        }
      />

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-8">
          <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-950/85 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Role selection</p>
                <h2 className="mt-3 text-3xl font-bold text-white">I am a</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRole('Seeker')}
                  className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${
                    role === 'Seeker'
                      ? 'bg-brand-gradient text-white shadow-glow'
                      : 'bg-slate-900 text-slate-300 ring-1 ring-white/10 hover:bg-slate-900/80'
                  }`}
                >
                  Service Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Provider')}
                  className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${
                    role === 'Provider'
                      ? 'bg-brand-gradient text-white shadow-glow'
                      : 'bg-slate-900 text-slate-300 ring-1 ring-white/10 hover:bg-slate-900/80'
                  }`}
                >
                  Provider
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              {role === 'Seeker'
                ? 'Complete your service seeker profile to get matched with local professionals quickly.'
                : 'Complete your provider profile to connect with customers and receive service requests.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            {fieldDefinitions.map((field) => (
              <label key={field.name} className="grid gap-3 text-sm text-slate-300">
                <span className="font-semibold text-slate-100">{field.label}</span>
                {field.type === 'select' ? (
                  <select
                    value={selectedData[field.name]}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    className="glass-input"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={selectedData[field.name]}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    className="glass-input"
                    placeholder={field.label}
                    min={field.type === 'number' ? 0 : undefined}
                  />
                )}
              </label>
            ))}

            <Button type="submit" className="mt-2 w-full rounded-[24px] px-6 py-4">
              Continue as {role === 'Seeker' ? 'Service Seeker' : 'Provider'}
            </Button>
          </form>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">What you get</p>
              <h3 className="mt-3 text-3xl font-bold text-white">A tailored sign-in experience</h3>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <p className="text-sm font-semibold text-white">Service Seekers</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li>- Fast matching with top providers</li>
                  <li>- Personalized budget and location options</li>
                  <li>- Manage service details in one place</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <p className="text-sm font-semibold text-white">Providers</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li>- Showcase your services and skills</li>
                  <li>- Set pricing per service type</li>
                  <li>- Reach more local customers instantly</li>
                </ul>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
