import { MapPin, UserCheck, CheckCircle2 } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const steps = [
  {
    icon: MapPin,
    title: 'Share your location',
    desc: 'Drop a pin or auto-detect where you are stranded — no address typing needed.'
  },
  {
    icon: UserCheck,
    title: 'Get matched instantly',
    desc: 'A verified technician near you accepts the job and heads over in minutes.'
  },
  {
    icon: CheckCircle2,
    title: 'Repaired & back on the road',
    desc: 'Pay by cash or UPI once the job is done, and rate your experience.'
  }
]

export default function HowItWorks() {
  const ref = useReveal()
  return (
    <section className="py-24 bg-white" aria-labelledby="how-it-works-heading">
      <div ref={ref} className="reveal container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">How it works</span>
          <h2 id="how-it-works-heading" className="mt-3 text-3xl sm:text-4xl font-bold">
            Help arrives in three simple steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-royal/20 via-accent/40 to-royal/20" />
          {steps.map((step, i) => (
            <div key={step.title} className="relative bg-bg rounded-card p-8 text-center hover:shadow-lifted transition-shadow duration-300">
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-grad-blue grid place-items-center shadow-lifted">
                <step.icon size={26} className="text-white" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold grid place-items-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
