import { ShieldCheck, Timer, Wallet, Star } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const points = [
  { icon: Timer, title: 'Fast dispatch', desc: 'Average technician arrival under 20 minutes across the city.' },
  { icon: ShieldCheck, title: 'Verified technicians', desc: 'Every partner is background-checked, trained, and rated.' },
  { icon: Wallet, title: 'Fair, upfront pricing', desc: 'See the exact cost before you confirm — no roadside haggling.' },
  { icon: Star, title: 'Rated 4.8 by riders', desc: 'Thousands of five-star repairs across bikes, cars, and fleets.' }
]

export default function WhyChooseUs() {
  const ref = useReveal()
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div ref={ref} className="reveal container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Why choose us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Built for the moment you're stuck</h2>
          <p className="mt-4 text-muted max-w-md">
            QuickPuncture exists for the ten minutes that ruin your day. We've stripped everything down to speed, trust, and a fair price.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {points.map((p) => (
              <div key={p.title} className="flex gap-3.5">
                <span className="shrink-0 w-11 h-11 rounded-xl bg-grad-blue grid place-items-center shadow-soft">
                  <p.icon size={20} className="text-white" />
                </span>
                <div>
                  <p className="font-semibold text-navy text-sm">{p.title}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-card bg-grad-blue p-10 shadow-lifted relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-6 text-white">
              <StatBlock value="4.8★" label="Average rating" />
              <StatBlock value="<20 min" label="Avg. arrival time" />
              <StatBlock value="60k+" label="Repairs completed" />
              <StatBlock value="24/7" label="Always available" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatBlock({ value, label }) {
  return (
    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
      <p className="text-2xl font-heading font-bold">{value}</p>
      <p className="text-xs text-white/70 mt-1">{label}</p>
    </div>
  )
}
