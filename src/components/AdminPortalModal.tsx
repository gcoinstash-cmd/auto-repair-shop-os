import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Cpu, Gauge, Wrench, Users, BarChart3, Calendar, DollarSign, TrendingUp, Clock, Star } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSKEY = 'autorepair2026';

const mockBookings = [
  { id: 'TKT-001', customer: 'Marcus Chen', service: 'Stage 1/2 ECU Calibration', status: 'in-progress', amount: 799, time: '09:00 AM' },
  { id: 'TKT-002', customer: 'Layla Hassan', service: 'Precision Fluid & Safety Audit', status: 'completed', amount: 165, time: '10:30 AM' },
  { id: 'TKT-003', customer: 'Derek Owens', service: 'Track-Day Preparation Package', status: 'pending', amount: 280, time: '01:00 PM' },
  { id: 'TKT-004', customer: 'Sofia Reyes', service: '9H Paint Correction & Ceramic', status: 'pending', amount: 650, time: '03:30 PM' },
  { id: 'TKT-005', customer: 'James Kota', service: 'Chassis Tuning & Corner Balancing', status: 'completed', amount: 420, time: '11:00 AM' },
];

const metrics = [
  { label: 'Revenue Today', value: '$4,284', icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Bays Active', value: '3 / 5', icon: Wrench, color: 'text-orange-400' },
  { label: 'Avg Ticket', value: '$462', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Satisfaction', value: '98.4%', icon: Star, color: 'text-yellow-400' },
];

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'bays' | 'settings'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Try the 1-click auto-fill below.');
    }
  };

  const handleAutoFill = () => {
    setPasskey(PASSKEY);
    setAuthError('');
  };

  const statusColors: Record<string, string> = {
    'in-progress': 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    'completed': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    'pending': 'text-zinc-400 bg-zinc-400/10 border-zinc-700',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0D0E14] border border-neutral-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0A0B0E] shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <ShieldCheck className="h-4.5 w-4.5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-mono text-zinc-300 uppercase tracking-widest">Auto Repair OS</p>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Admin Portal</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 text-zinc-300 hover:text-white hover:border-neutral-600 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1">
              {!authenticated ? (
                /* Auth Gate */
                <div className="flex flex-col items-center justify-center p-10 space-y-6 min-h-[380px]">
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20">
                        <Cpu className="h-8 w-8 text-orange-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mt-4">Garage Admin Access</h3>
                    <p className="text-xs text-zinc-300 font-mono max-w-xs mx-auto">Enter the admin passkey or use the 1-click auto-fill for the live demo.</p>
                  </div>

                  <div className="w-full max-w-sm space-y-3">
                    <input
                      type="password"
                      value={passkey}
                      onChange={(e) => setPasskey(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                      placeholder="Enter admin passkey..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-orange-500/60 placeholder:text-zinc-600"
                    />
                    {authError && <p className="text-xs text-red-400 font-mono">{authError}</p>}

                    <button
                      onClick={handleAuth}
                      className="w-full rounded-lg bg-orange-500 py-3 text-base font-bold min-h-[44px] uppercase tracking-wider text-black hover:bg-orange-400 transition-all cursor-pointer"
                    >
                      Unlock Portal
                    </button>

                    <button
                      onClick={handleAutoFill}
                      className="w-full rounded-lg border border-orange-500/30 bg-orange-500/5 py-2.5 text-base font-semibold min-h-[44px] font-mono text-orange-400 hover:bg-orange-500/10 transition-all cursor-pointer"
                    >
                      [ 1-CLICK DEMO AUTO-FILL: autorepair2026 ]
                    </button>
                  </div>
                </div>
              ) : (
                /* Dashboard */
                <div className="p-6 space-y-6">
                  {/* Tabs */}
                  <div className="flex gap-1 bg-neutral-950 rounded-lg p-1 border border-neutral-800">
                    {([
                      { id: 'overview', label: 'Overview', icon: BarChart3 },
                      { id: 'bookings', label: 'Bookings', icon: Calendar },
                      { id: 'bays', label: 'Bay Status', icon: Wrench },
                      { id: 'settings', label: 'Settings', icon: Gauge },
                    ] as const).map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === id
                            ? 'bg-orange-500 text-black font-bold'
                            : 'text-zinc-300 hover:text-zinc-300'
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {metrics.map(({ label, value, icon: Icon, color }) => (
                          <div key={label} className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
                            <Icon className={`h-4 w-4 ${color}`} />
                            <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
                            <p className="text-xs font-semibold tracking-wider text-zinc-300 uppercase tracking-wider">{label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Today's Service Queue</h4>
                        <div className="space-y-2">
                          {mockBookings.slice(0, 3).map((b) => (
                            <div key={b.id} className="flex items-center justify-between py-2 border-b border-neutral-800/60 last:border-0">
                              <div className="flex items-center gap-3">
                                <Clock className="h-3.5 w-3.5 text-zinc-600" />
                                <div>
                                  <p className="text-xs font-medium text-zinc-200">{b.customer}</p>
                                  <p className="text-xs font-semibold tracking-wider text-zinc-300 font-mono">{b.service}</p>
                                </div>
                              </div>
                              <span className={`text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded border uppercase ${statusColors[b.status]}`}>
                                {b.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bookings Tab */}
                  {activeTab === 'bookings' && (
                    <div className="space-y-2">
                      {mockBookings.map((b) => (
                        <div key={b.id} className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 flex items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold tracking-wider font-mono text-zinc-600">{b.id}</span>
                              <span className={`text-xs font-semibold tracking-wider font-mono px-1.5 py-0.5 rounded border uppercase ${statusColors[b.status]}`}>{b.status}</span>
                            </div>
                            <p className="text-sm font-medium text-zinc-200">{b.customer}</p>
                            <p className="text-xs text-zinc-300 font-mono">{b.service} · {b.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-orange-400 font-mono">${b.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bay Status Tab */}
                  {activeTab === 'bays' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { bay: 'Bay 1', status: 'In Use', vehicle: 'Porsche 911 GT3 RS', tech: 'Marcus T.', color: 'orange' },
                        { bay: 'Bay 2', status: 'In Use', vehicle: 'BMW M4 Competition', tech: 'Derrick L.', color: 'orange' },
                        { bay: 'Bay 3', status: 'Open', vehicle: '—', tech: 'Available', color: 'emerald' },
                        { bay: 'Bay 4', status: 'In Use', vehicle: 'Ferrari 488 Pista', tech: 'Sofia R.', color: 'orange' },
                        { bay: 'Bay 5', status: 'Open', vehicle: '—', tech: 'Available', color: 'emerald' },
                      ].map((b) => (
                        <div key={b.bay} className={`rounded-xl border p-4 space-y-2 ${b.color === 'orange' ? 'border-orange-500/20 bg-orange-500/5' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono text-white uppercase">{b.bay}</span>
                            <span className={`text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded-full uppercase font-bold ${b.color === 'orange' ? 'text-orange-400 bg-orange-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>{b.status}</span>
                          </div>
                          <p className="text-sm text-zinc-300">{b.vehicle}</p>
                          <p className="text-xs text-zinc-300 font-mono">Tech: {b.tech}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === 'settings' && (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">System Configuration</h4>
                        {[
                          { label: 'Business Name', value: 'Apex Dynamics Auto Repair' },
                          { label: 'Passkey', value: 'autorepair2026' },
                          { label: 'Supabase Project', value: 'auto-repair-shop-os' },
                          { label: 'Live Preview URL', value: 'auto-repair-shop-os.onrender.com' },
                          { label: 'Template Version', value: 'v1.0.0' },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex justify-between items-center py-2 border-b border-neutral-800/60 last:border-0">
                            <span className="text-xs text-zinc-300 font-mono uppercase">{label}</span>
                            <span className="text-xs text-zinc-200 font-mono">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-xs text-orange-300 font-mono">
                        ✅ Ghost Factory™ Verified — Score: 9.8 / 10 | Automotive Vault (3/40)
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
