import { Check, IndianRupee } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const plans = [
  {
    name: 'Two-Wheeler',
    price: 49,
    unit: 'starting price',
    desc: 'For bikes and scooters',
    features: ['Air filling from ₹49', 'Puncture repair from ₹149', 'Tubeless repair from ₹199', 'Avg. arrival under 18 min'],
    highlighted: false
  },
  {
    name: 'Car & Auto',
    price: 199,
    unit: 'starting price',
    desc: 'Our most-booked plan',
    features: ['Puncture repair from ₹199', 'Tubeless repair from ₹249', 'Wheel replacement from ₹349', 'Priority technician match'],
    highlighted: true
  },
  {
    name: 'Fleet & Van',
    price: 349,
    unit: 'starting price',
    desc: 'For vans and light commercial',
    features: ['All repair types covered', 'Dedicated fleet support line', 'Monthly billing available', 'Multi-vehicle scheduling'],
    highlighted: false
  }
]

export default function Pricing() {
  const ref = useReveal()
  return (
    <section id="pricing" className="py-24 bg-bg">
      <div ref={ref} className="reveal container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Simple pricing, by vehicle type</h2>
          <p className="mt-3 text-muted">Final cost is always confirmed before you book — never after.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-card p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-grad-blue text-white shadow-lifted md:-translate-y-3 scale-[1.02]'
                  : 'bg-white text-navy shadow-soft hover:shadow-lifted'
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-pill mb-4">
                  MOST BOOKED
                </span>
              )}
              <h3 className="font-heading font-bold text-lg">{plan.name}</h3>
              <p className={`text-xs mt-1 ${plan.highlighted ? 'text-white/70' : 'text-muted'}`}>{plan.desc}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <IndianRupee size={20} />
                <span className="text-4xl font-heading font-extrabold">{plan.price}</span>
              </div>
              <p className={`text-xs ${plan.highlighted ? 'text-white/60' : 'text-muted'}`}>{plan.unit}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className={plan.highlighted ? 'text-accent mt-0.5 shrink-0' : 'text-success mt-0.5 shrink-0'} />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-ink'}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full font-semibold py-3 rounded-pill transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-accent text-white hover:brightness-105'
                    : 'bg-navy/5 text-navy hover:bg-navy hover:text-white'
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
