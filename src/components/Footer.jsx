import { Wrench, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

const quickLinks = ['Home', 'Services', 'Pricing', 'Track Booking', 'About', 'Contact']
const legal = ['Privacy Policy', 'Terms of Service']

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container-px mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-grad-orange grid place-items-center">
              <Wrench size={18} className="text-white" />
            </span>
            <span className="font-heading font-bold text-lg">
              Quick<span className="text-accent">Puncture</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            24/7 doorstep tyre assistance — fast, verified, and fairly priced.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-accent transition-colors"
                aria-label="Social media link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href={l === 'Track Booking' ? '/track' : `/#${l.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/60 hover:text-accent transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4">Emergency Contact</h4>
          <a href="tel:18001234567" className="flex items-center gap-2 text-sm text-white/60 hover:text-accent transition-colors">
            <Phone size={15} /> 1800-123-4567
          </a>
          <p className="text-sm text-white/60 mt-2.5">support@quickpuncture.in</p>
          <p className="text-sm text-white/60 mt-2.5">Available 24 hours, every day</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4">Legal</h4>
          <ul className="space-y-2.5">
            {legal.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-white/60 hover:text-accent transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} QuickPuncture. All rights reserved.
      </div>
    </footer>
  )
}
