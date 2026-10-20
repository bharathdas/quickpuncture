import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'

const stats = [
  { label: 'Repairs completed', value: 62480, suffix: '+' },
  { label: 'Verified technicians', value: 1240, suffix: '+' },
  { label: 'Cities covered', value: 18, suffix: '' },
  { label: 'Avg. response time', value: 17, suffix: ' min' }
]

export default function Stats() {
  const ref = useReveal()
  return (
    <section className="py-20 bg-navy">
      <div ref={ref} className="reveal container-px mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <Counter key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}

function Counter({ value, suffix, label }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = nodeRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 1400
            const startTime = performance.now()
            function tick(now) {
              const progress = Math.min((now - startTime) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.round(eased * value))
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={nodeRef} className="text-center">
      <p className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
        {count.toLocaleString('en-IN')}
        {suffix}
      </p>
      <p className="text-xs text-white/60 mt-2 uppercase tracking-wide">{label}</p>
    </div>
  )
}
