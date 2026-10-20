import { Disc3, CircleDot, Gauge, Wind, RefreshCw, IndianRupee, Clock3 } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const services = [
  { icon: Disc3, title: 'Front Tyre Puncture', desc: 'Patch or plug repair for a front-wheel puncture, done roadside.', price: 149, eta: 18 },
  { icon: CircleDot, title: 'Rear Tyre Puncture', desc: 'Patch or plug repair for a rear-wheel puncture, done roadside.', price: 149, eta: 18 },
  { icon: Gauge, title: 'Tubeless Repair', desc: 'Plug and seal for tubeless tyres without removing the wheel.', price: 199, eta: 20 },
  { icon: Wind, title: 'Air Filling', desc: 'Precise top-up to the manufacturer-recommended pressure.', price: 49, eta: 12 },
  { icon: RefreshCw, title: 'Wheel Replacement', desc: 'Swap in your spare or a replacement wheel on the spot.', price: 299, eta: 25 }
]

export default function Services({ onBookNow }) {
  const ref = useReveal()
  return (
    <section id="services" className="py-24 bg-bg">
      <div ref={ref} className="reveal container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Every tyre problem, one number away</h2>
          <p className="mt-3 text-muted">Transparent pricing, no hidden charges, no negotiation on the roadside.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-white rounded-card p-6 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-royal/10 grid place-items-center group-hover:bg-accent/10 transition-colors">
                <s.icon size={22} className="text-royal group-hover:text-accent transition-colors" />
              </div>
              <h3 className="mt-5 font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-bold text-navy flex items-center gap-0.5">
                  <IndianRupee size={13} /> {s.price}
                </span>
                <span className="text-muted flex items-center gap-1">
                  <Clock3 size={13} /> {s.eta} min
                </span>
              </div>

              <button
                onClick={onBookNow}
                className="mt-5 w-full text-sm font-semibold text-royal border border-royal/20 rounded-pill py-2.5 hover:bg-royal hover:text-white transition-colors duration-200"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
