import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const faqs = [
  { q: 'How fast can a technician reach me?', a: 'Most bookings get a technician on-site within 15–20 minutes, depending on your location and traffic conditions.' },
  { q: 'What payment methods are accepted?', a: 'You can pay by cash or UPI directly to the technician once the repair is complete. No prepayment is required.' },
  { q: 'Which vehicles are supported?', a: 'We service bikes, scooters, cars, autos, and vans. Select your vehicle type in step one of booking to see the right services and pricing.' },
  { q: 'Is the price shown final?', a: 'Yes. The price you see before confirming your booking is the price you pay — no roadside surprises.' },
  { q: 'Can I track my technician in real time?', a: 'Yes, use the Track Booking page to follow your technician\'s status from assignment through completion.' },
  { q: 'Are technicians verified?', a: 'Every technician on QuickPuncture is background-checked, trained, and rated by riders after each job.' }
]

export default function FAQ() {
  const ref = useReveal()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 bg-white">
      <div ref={ref} className="reveal container-px mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Frequently asked questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const open = openIndex === i
            return (
              <div key={f.q} className="rounded-2xl border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-bg hover:bg-slate-100/70 transition-colors"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-sm text-navy">{f.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 py-4 text-sm text-muted leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
