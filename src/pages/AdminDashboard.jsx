import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';

const activityData = [
  { name: 'Mon', users: 120 },
  { name: 'Tue', users: 380 },
  { name: 'Wed', users: 250 },
  { name: 'Thu', users: 450 },
  { name: 'Fri', users: 600 },
  { name: 'Sat', users: 300 },
  { name: 'Sun', users: 420 },
];

export function AdminDashboard({ onNavigate }) {
  const providers = [
    { id: 1, name: 'Raju Sharma', status: 'Pending' },
    { id: 2, name: 'Priya Singh', status: 'Verified' },
  ];

  return (
    <section className="bg-gray-100 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin control panel</h1>
            <p className="mt-1 text-sm text-gray-600">Manage users, verify providers, and monitor platform health.</p>
          </div>
          <div>
            <Button variant="ghost">Settings</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-4">
            <h3 className="font-semibold text-gray-900">User management</h3>
            <p className="mt-2 text-sm text-gray-600">Customers, providers and blocked users.</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">Customers <Button variant="ghost" className="text-sm">View</Button></div>
              <div className="flex items-center justify-between">Providers <Button variant="ghost" className="text-sm" onClick={() => onNavigate('Providers')}>View</Button></div>
              <div className="flex items-center justify-between">Blocked users <Button variant="ghost" className="text-sm">View</Button></div>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="font-semibold text-gray-900">Provider verification</h3>
            <p className="mt-2 text-sm text-gray-600">Approve or reject provider documents.</p>
            <div className="mt-4 space-y-3">
              {providers.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border border-gray-300 p-3">
                  <div>
                    <div className="font-medium text-gray-900">{p.name}</div>
                    <div className="text-sm text-gray-600">Status: {p.status}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost">Review</Button>
                    <Button>Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="font-semibold text-gray-900">Fraud detection</h3>
            <p className="mt-2 text-sm text-gray-600">Monitor suspicious activity and flagged accounts.</p>
            <div className="mt-4 text-sm">
              <div className="rounded-md border border-gray-300 p-3">No high-risk alerts</div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Platform activity</h3>
              <div className="text-sm text-gray-600">Weekly</div>
            </div>
            <div className="mt-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#0ea5e9" fillOpacity={0.2} fill="#0ea5e9" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">Complaints & disputes</h3>
            <p className="mt-2 text-sm text-gray-600">Customer complaints and dispute resolution queue.</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-md border border-gray-300 p-3">No open complaints</div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-6">
          <GlassCard className="p-4">
            <h3 className="font-semibold text-gray-900">Trust score monitoring</h3>
            <p className="mt-2 text-sm text-gray-600">Overview of provider trust scores and review trends.</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
