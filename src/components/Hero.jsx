import { Link } from "react-router-dom";
import { ArrowRight, Clock3, ShieldCheck, Radar, Wallet } from "lucide-react";

const badges = [
  { icon: Clock3, label: "Available 24/7" },
  { icon: ShieldCheck, label: "Verified Technicians" },
  { icon: Radar, label: "Live Tracking" },
  { icon: Wallet, label: "Cash & UPI Payments" },
];

export default function Hero({ onBookNow }) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 overflow-hidden bg-grad-hero">
      <div className="container-px mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-royal bg-royal/10 px-4 py-2 rounded-pill">
            Doorstep tyre help, dispatched in minutes
          </span>

          <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-navy">
            24/7 Emergency Tyre Assistance{" "}
            <span className="text-accent">at</span>{" "}
            <span className="text-transparent bg-clip-text bg-grad-orange">
              Your Doorstep
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted max-w-xl">
            Book a trusted puncture repair expert in less than a minute. Fast
            response, transparent pricing, and real-time tracking — wherever
            you're stranded.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBookNow}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold px-7 py-3.5 rounded-pill shadow-glow hover:brightness-105 transition-all duration-200"
            >
              Book Service <ArrowRight size={18} />
            </button>
            <Link
              to="/track"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy font-semibold px-7 py-3.5 rounded-pill border border-slate-200 hover:border-royal/30 transition-colors duration-200"
            >
              Track Booking
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white rounded-2xl px-3.5 py-3 shadow-soft"
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-success/10 text-success grid place-items-center">
                  <Icon size={15} />
                </span>
                <span className="text-xs font-semibold text-navy leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: illustration */}
        <div
          className="relative animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="relative bg-white rounded-card shadow-lifted p-6 sm:p-8 overflow-hidden">
            {/* Sky */}
            <div className="relative h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-royal/5 via-white to-transparent overflow-hidden">
              {/* Sun/glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl" />
              <div className="absolute top-8 right-10 w-24 h-24 rounded-full bg-accent/15 animate-float" />

              {/* Distant buildings */}
              <div className="absolute bottom-16 left-0 right-0 flex items-end justify-around px-6 opacity-40">
                <div className="w-8 h-16 bg-navy/20 rounded-sm" />
                <div className="w-10 h-24 bg-navy/15 rounded-sm" />
                <div className="w-7 h-12 bg-navy/20 rounded-sm" />
                <div className="w-9 h-20 bg-navy/15 rounded-sm" />
                <div className="w-8 h-14 bg-navy/20 rounded-sm" />
              </div>

              {/* Road */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-navy rounded-b-2xl">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] bg-[repeating-linear-gradient(90deg,#F97316_0px,#F97316_20px,transparent_20px,transparent_48px)] animate-dash-move" />
              </div>

              {/* Driving tow truck */}
              <div className="absolute bottom-[52px] left-0 animate-drive-x">
                <TowTruck />
              </div>
            </div>

            {/* Floating status cards */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-bg rounded-2xl px-4 py-3">
                <span className="w-9 h-9 rounded-full bg-success/15 text-success grid place-items-center shrink-0">
                  <ShieldCheck size={17} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-navy">
                    Verified Technician
                  </p>
                  <p className="text-[11px] text-muted">
                    Background-checked & trained
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 bg-bg rounded-2xl px-4 py-3">
                <span className="w-9 h-9 rounded-full bg-royal/15 text-royal grid place-items-center shrink-0">
                  <Radar size={17} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-navy">
                    Live Location Sharing
                  </p>
                  <p className="text-[11px] text-muted">
                    Know exactly when help arrives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TowTruck() {
  return (
    <svg
      width="110"
      height="56"
      viewBox="0 0 110 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Truck bed / tow arm */}
      <rect x="2" y="18" width="34" height="16" rx="3" fill="#1E3A8A" />
      <path d="M4 18 L14 6 H34 V18 Z" fill="#1E3A8A" />
      {/* Cab */}
      <rect x="34" y="10" width="30" height="24" rx="4" fill="#0F172A" />
      <rect
        x="40"
        y="14"
        width="16"
        height="10"
        rx="2"
        fill="#F8FAFC"
        opacity="0.9"
      />
      {/* Tow hook */}
      <path
        d="M2 26 Q -8 26 -8 34"
        stroke="#F97316"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="-8" cy="34" r="3" fill="#F97316" />
      {/* Bumper */}
      <rect x="60" y="28" width="8" height="6" rx="1.5" fill="#F97316" />
      {/* Wheels */}
      <circle cx="16" cy="38" r="7" fill="#111827" />
      <circle cx="16" cy="38" r="2.6" fill="#F8FAFC" />
      <circle cx="54" cy="38" r="7" fill="#111827" />
      <circle cx="54" cy="38" r="2.6" fill="#F8FAFC" />
      {/* Beacon light */}
      <rect x="42" y="5" width="8" height="4" rx="1.5" fill="#F97316" />
    </svg>
  );
}
