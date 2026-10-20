import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PackageCheck,
  UserCheck,
  Navigation,
  Wrench,
  CheckCircle2,
  Phone,
  Search,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const timelineSteps = [
  {
    key: "received",
    label: "Booking Received",
    icon: PackageCheck,
    desc: "We've got your request and are finding the nearest technician.",
  },
  {
    key: "assigned",
    label: "Technician Assigned",
    icon: UserCheck,
    desc: "A verified technician has accepted your job.",
  },
  {
    key: "on-the-way",
    label: "On the Way",
    icon: Navigation,
    desc: "Your technician is en route to your location.",
  },
  {
    key: "started",
    label: "Repair Started",
    icon: Wrench,
    desc: "Work has begun on your vehicle.",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    desc: "Repair finished — you're back on the road.",
  },
];

const statusToStep = {
  received: 0,
  assigned: 1,
  "on-the-way": 2,
  started: 3,
  completed: 4,
};

export default function TrackBookingPage() {
  const [searchParams] = useSearchParams();
  const [bookingId, setBookingId] = useState(searchParams.get("id") || "");
  const [tracking, setTracking] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookupBooking(id) {
    setError("");
    setBooking(null);

    if (!isSupabaseConfigured) {
      setError("Database not connected yet.");
      return;
    }
    if (!id.trim()) return;

    setLoading(true);
    const { data, error: dbError } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_ref", id.trim().toUpperCase())
      .single();
    setLoading(false);

    if (dbError || !data) {
      setError("No booking found with that ID. Double-check and try again.");
      setTracking(false);
      return;
    }

    setBooking(data);
    setActiveStep(statusToStep[data.status] ?? 0);
    setTracking(true);
  }

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      lookupBooking(idFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tracking || !booking || activeStep >= timelineSteps.length - 1) return;
    const t = setTimeout(async () => {
      const nextStep = activeStep + 1;
      const nextStatus = timelineSteps[nextStep].key;
      setActiveStep(nextStep);
      if (isSupabaseConfigured) {
        await supabase
          .from("bookings")
          .update({ status: nextStatus, updated_at: new Date().toISOString() })
          .eq("id", booking.id);
      }
    }, 3200);
    return () => clearTimeout(t);
  }, [tracking, activeStep, booking]);

  function handleTrack(e) {
    e.preventDefault();
    lookupBooking(bookingId);
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar onBookNow={() => (window.location.href = "/")} />

      <main className="pt-32 pb-24">
        <div className="container-px mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              Track Booking
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-navy">
              Follow your repair in real time
            </h1>
          </div>

          <form
            onSubmit={handleTrack}
            className="flex gap-3 bg-white rounded-pill shadow-soft p-2"
          >
            <div className="flex items-center flex-1 px-4">
              <Search size={18} className="text-muted shrink-0" />
              <input
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="Enter your Booking ID (e.g. QP-482913)"
                className="w-full px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-white font-semibold px-6 rounded-pill hover:brightness-105 transition-all disabled:opacity-60"
            >
              {loading ? "Searching..." : "Track"}
            </button>
          </form>

          {error && (
            <p className="text-sm text-accent text-center mt-4">{error}</p>
          )}

          {tracking && booking && (
            <div className="mt-10 bg-white rounded-card shadow-soft p-8 animate-fade-up">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div>
                  <p className="text-xs text-muted">Booking ID</p>
                  <p className="font-bold text-navy">{booking.booking_ref}</p>
                </div>
                {activeStep < timelineSteps.length - 1 ? (
                  <a
                    href="tel:18001234567"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-royal border border-royal/20 rounded-pill px-4 py-2 hover:bg-royal/5 transition-colors"
                  >
                    <Phone size={15} /> Call Technician
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-success bg-success/10 rounded-pill px-4 py-2">
                    <CheckCircle2 size={15} /> Job Complete
                  </span>
                )}
              </div>

              <ol className="relative flex flex-col gap-8 pl-2">
                {timelineSteps.map((step, i) => {
                  const done = i < activeStep;
                  const active = i === activeStep;
                  return (
                    <li key={step.key} className="flex gap-4 relative">
                      {i < timelineSteps.length - 1 && (
                        <span
                          className={`absolute left-[19px] top-10 w-[2px] h-[calc(100%-8px)] rounded transition-colors duration-500 ${
                            done ? "bg-success" : "bg-slate-100"
                          }`}
                        />
                      )}
                      <span
                        className={`shrink-0 w-10 h-10 rounded-full grid place-items-center transition-all duration-500 ${
                          done
                            ? "bg-success text-white"
                            : active
                              ? "bg-accent text-white ring-4 ring-accent/20"
                              : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <step.icon size={18} />
                      </span>
                      <div>
                        <p
                          className={`font-semibold text-sm ${done || active ? "text-navy" : "text-slate-400"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-muted mt-1 max-w-sm">
                          {step.desc}
                        </p>
                        {active && i < timelineSteps.length - 1 && (
                          <span className="inline-block mt-2 text-[11px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-pill">
                            In progress
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
