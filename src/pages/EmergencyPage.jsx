import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';

const emergencyServices = [
  {
    title: 'Emergency Electrician',
    body: '24/7 support for electrical hazards, short circuits, and urgent repairs.',
    primary: true,
  },
  {
    title: 'Request Assistance — Immediate',
    body: 'Request a nearby responder for any urgent household issue.',
    primary: false,
  },
  {
    title: 'Emergency Plumber',
    body: 'Fast response for leaks, flooding, and urgent plumbing issues.',
    primary: false,
  },
  {
    title: 'Request Assistance — Same Day',
    body: 'Get help scheduled on the same day for non-critical emergencies.',
    primary: false,
  },
  {
    title: 'Gas Leak Response',
    body: 'Rapid team dispatch for dangerous gas leaks and shutoff support.',
    primary: false,
  },
  {
    title: 'Request Assistance — Health & Safety',
    body: 'Priority assistance for situations affecting health or safety.',
    primary: true,
  },
  {
    title: 'Flood Damage Team',
    body: 'Rapid water removal and damage control for flooded spaces.',
    primary: true,
  },
];

export function EmergencyPage() {
  const emergencyCount = emergencyServices.length;

  return (
    <section>
      <SectionHeader
        eyebrow="Emergency"
        title="Priority dispatch for urgent service"
        description={`Request emergency support from the nearest verified professionals right now. ${emergencyCount}+ emergency teams are available.`}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {emergencyServices.map((service) => (
          <GlassCard key={service.title} hover className="relative overflow-hidden">
            <div className="absolute right-4 top-4 opacity-20">
              <AlertTriangle className="h-16 w-16 text-rose-400" />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900">{service.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-700">{service.body}</p>
            <Button variant="primary" className="mt-6 w-full">
              {service.primary ? (
                <Phone className="h-4 w-4" />
              ) : (
                <MessageSquare className="h-4 w-4" />
              )}
              {service.primary ? 'Call now' : 'Request help'}
            </Button>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
