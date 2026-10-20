import { Smartphone, Bell } from 'lucide-react'
import { useState } from 'react'
import useReveal from '../hooks/useReveal'

export default function DownloadApp() {
  const ref = useReveal()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="py-24 bg-bg">
      <div ref={ref} className="reveal container-px mx-auto max-w-5xl">
        <div className="rounded-card bg-grad-orange p-10 sm:p-14 text-center relative overflow-hidden shadow-lifted">
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/15 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-white/10 translate-x-1/3 translate-y-1/3" />

          <div className="relative">
            <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-white/20 mb-5">
              <Smartphone size={26} className="text-white" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The QuickPuncture app is coming soon</h2>
            <p className="mt-3 text-white/90 max-w-md mx-auto">
              Faster rebooking, saved vehicles, and push notifications for live technician tracking.
            </p>

            {submitted ? (
              <p className="mt-6 inline-flex items-center gap-2 bg-white/20 text-white font-medium px-5 py-3 rounded-pill">
                <Bell size={16} /> We'll notify you at launch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address for launch notification"
                  className="flex-1 rounded-pill px-5 py-3 text-sm text-navy outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-navy text-white font-semibold px-6 py-3 rounded-pill hover:bg-navy/90 transition-colors"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
