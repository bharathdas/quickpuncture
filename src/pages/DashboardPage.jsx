import { Wrench, Clock3, IndianRupee, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const summary = [
  { label: 'Bookings today', value: '128', icon: Wrench, tint: 'bg-royal/10 text-royal' },
  { label: 'Avg. arrival time', value: '17 min', icon: Clock3, tint: 'bg-accent/10 text-accent' },
  { label: 'Revenue today', value: '₹34,280', icon: IndianRupee, tint: 'bg-success/10 text-success' },
  { label: 'Active technicians', value: '86', icon: Users, tint: 'bg-navy/10 text-navy' }
]

const weekly = [
  { day: 'Mon', bookings: 92 },
  { day: 'Tue', bookings: 104 },
  { day: 'Wed', bookings: 88 },
  { day: 'Thu', bookings: 121 },
  { day: 'Fri', bookings: 138 },
  { day: 'Sat', bookings: 156 },
  { day: 'Sun', bookings: 128 }
]

const recentBookings = [
  { id: 'QP-482913', customer: 'Priya Sharma', service: 'Rear Tyre Puncture', status: 'Completed', amount: '₹149' },
  { id: 'QP-482910', customer: 'Arun Kumar', service: 'Tubeless Repair', status: 'On the Way', amount: '₹199' },
  { id: 'QP-482905', customer: 'Meera Nair', service: 'Air Filling', status: 'Assigned', amount: '₹49' },
  { id: 'QP-482899', customer: 'Rahul Verma', service: 'Wheel Replacement', status: 'Completed', amount: '₹299' },
  { id: 'QP-482888', customer: 'Sana Iqbal', service: 'Front Tyre Puncture', status: 'Completed', amount: '₹149' }
]

const statusStyle = {
  Completed: 'bg-success/10 text-success',
  'On the Way': 'bg-accent/10 text-accent',
  Assigned: 'bg-royal/10 text-royal'
}

export default function DashboardPage() {
  const max = Math.max(...weekly.map((w) => w.bookings))

  return (
    <div className="min-h-screen bg-bg">
      <Navbar onBookNow={() => (window.location.href = '/')} />

      <main className="pt-32 pb-24">
        <div className="container-px mx-auto max-w-6xl">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Operations</span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-navy">Dashboard</h1>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {summary.map((s) => (
              <div key={s.label} className="bg-white rounded-card p-5 shadow-soft">
                <span className={`w-10 h-10 rounded-xl grid place-items-center ${s.tint}`}>
                  <s.icon size={18} />
                </span>
                <p className="mt-4 font-heading font-bold text-xl text-navy">{s.value}</p>
                <p className="text-xs text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 bg-white rounded-card p-6 shadow-soft">
              <h2 className="font-semibold text-navy text-sm mb-6">Bookings this week</h2>
              <div className="flex items-end justify-between gap-3 h-48">
                {weekly.map((w) => (
                  <div key={w.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end h-40">
                      <div
                        className="w-full rounded-t-lg bg-grad-blue hover:opacity-90 transition-opacity"
                        style={{ height: `${(w.bookings / max) * 100}%` }}
                        title={`${w.bookings} bookings`}
                      />
                    </div>
                    <span className="text-[11px] text-muted">{w.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-card p-6 shadow-soft">
              <h2 className="font-semibold text-navy text-sm mb-6">Service split</h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Puncture repair', pct: 48 },
                  { label: 'Tubeless repair', pct: 22 },
                  { label: 'Air filling', pct: 18 },
                  { label: 'Wheel replacement', pct: 12 }
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-ink font-medium">{s.label}</span>
                      <span className="text-muted">{s.pct}%</span>
                    </div>
                    <div className="h-2 rounded-pill bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-pill bg-accent" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-card shadow-soft mt-6 overflow-hidden">
            <div className="p-6 pb-0">
              <h2 className="font-semibold text-navy text-sm">Recent bookings</h2>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted text-xs uppercase tracking-wide border-t border-slate-100">
                    <th className="px-6 py-3 font-medium">Booking ID</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Service</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="border-t border-slate-100 hover:bg-bg/60 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-navy">{b.id}</td>
                      <td className="px-6 py-3.5 text-ink">{b.customer}</td>
                      <td className="px-6 py-3.5 text-muted">{b.service}</td>
                      <td className="px-6 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-pill ${statusStyle[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right font-semibold text-navy">{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
