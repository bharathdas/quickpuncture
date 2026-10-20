import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Wrench } from 'lucide-react'

const links = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Track Booking', href: '/track' },
  { label: 'About', href: '/#why-us' },
  { label: 'Contact', href: '/#faq' }
]

export default function Navbar({ onBookNow }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-px mx-auto flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2 group" aria-label="QuickPuncture home">
          <span className="w-9 h-9 rounded-xl bg-grad-orange grid place-items-center shadow-glow group-hover:rotate-12 transition-transform duration-300">
            <Wrench size={18} className="text-white" strokeWidth={2.5} />
          </span>
          <span className="font-heading font-bold text-lg text-navy tracking-tight">
            Quick<span className="text-accent">Puncture</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8 font-medium text-sm text-ink">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative py-1 hover:text-accent transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <button className="text-sm font-semibold text-navy hover:text-accent transition-colors">
            Login
          </button>
          <button
            onClick={onBookNow}
            className="bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-pill shadow-glow hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Book Now
          </button>
        </div>

        <button
          className="lg:hidden p-2 text-navy"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lifted animate-fade-up">
          <ul className="flex flex-col p-6 gap-4 font-medium text-ink">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-1">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex gap-3 pt-2">
              <button className="flex-1 border border-slate-200 rounded-pill py-2.5 font-semibold text-navy">
                Login
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  onBookNow?.()
                }}
                className="flex-1 bg-accent text-white rounded-pill py-2.5 font-semibold"
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
