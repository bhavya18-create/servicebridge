import { AlertTriangle, Phone } from 'lucide-react';
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
    title: 'Emergency Plumber',
    body: 'Fast response for leaks, flooding, and urgent plumbing issues.',
    primary: false,
  },
  {
    title: 'Gas Leak Response',
    body: 'Rapid team dispatch for dangerous gas leaks and shutoff support.',
    primary: false,
  },
  {
    title: 'Locksmith Emergency',
    body: 'Secure entry and lock replacement during lockout situations.',
    primary: false,
  },
  {
    title: 'Roof Leak Repair',
    body: 'Quick containment for leaks, water damage, and structural safety.',
    primary: false,
  },
  {
    title: 'Broken Glass Repair',
    body: 'Fast glass replacement for shattered windows and doors.',
    primary: false,
  },
  {
    title: 'Appliance Rescue',
    body: 'Emergency fixes for ovens, refrigerators, and critical appliances.',
    primary: false,
  },
  {
    title: 'Heating Failure Response',
    body: 'Urgent heating system support for sudden cold snaps.',
    primary: false,
  },
  {
    title: 'Flood Damage Team',
    body: 'Rapid water removal and damage control for flooded spaces.',
    primary: false,
  },
  {
    title: 'Security System Repair',
    body: 'Immediate restore of alarms and surveillance coverage.',
    primary: false,
  },
  {
    title: 'Structural Hazard Support',
    body: 'Critical assistance for unsafe walls, ceilings, and beams.',
    primary: false,
  },
  {
    title: 'Medical Equipment Help',
    body: 'Fast on-site support for urgent medical device failures.',
    primary: false,
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
            <h3 className="font-display text-2xl font-bold text-white">{service.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">{service.body}</p>
            {service.primary ? (
              <Button variant="danger" className="mt-6 w-full">
                <Phone className="h-4 w-4" />
                Call now
              </Button>
            ) : (
              <Button variant="ghost" className="mt-6 w-full">
                Request help
              </Button>
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
