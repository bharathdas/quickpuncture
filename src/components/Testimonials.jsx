import { useRef } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const reviews = [
  { name: 'Priya Sharma', role: 'Daily commuter', rating: 5, text: 'Got a flat on the flyover at 11pm and a technician was there in 15 minutes. Paid by UPI, no drama.' },
  { name: 'Arun Kumar', role: 'Cab driver', rating: 5, text: 'I use this between rides now. Fast, and the pricing shown upfront matches what I actually pay.' },
  { name: 'Meera Nair', role: 'First-time user', rating: 4, text: 'Booking took under a minute and the live tracking meant I wasn\'t just guessing when help would show up.' },
  { name: 'Rahul Verma', role: 'Delivery partner', rating: 5, text: 'Tubeless repair on the spot, didn\'t even have to push my bike to a shop. Genuinely useful service.' }
]

export default function Testimonials() {
  const ref = useReveal()
  const scrollerRef = useRef(null)

  function scrollBy(dir) {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="reveal container-px mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Testimonials</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Riders trust us when it matters</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              className="w-10 h-10 rounded-full border border-slate-200 grid place-items-center hover:border-royal/40 transition-colors"
              aria-label="Scroll testimonials left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-10 h-10 rounded-full border border-slate-200 grid place-items-center hover:border-royal/40 transition-colors"
              aria-label="Scroll testimonials right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="snap-start shrink-0 w-[300px] bg-bg rounded-card p-6 shadow-soft hover:shadow-lifted transition-shadow duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-grad-orange grid place-items-center text-white font-heading font-bold">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-navy text-sm">{r.name}</p>
                  <p className="text-xs text-muted">{r.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mt-4" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < r.rating ? 'fill-accent text-accent' : 'text-slate-200'} />
                ))}
              </div>
              <p className="mt-3 text-sm text-ink leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
