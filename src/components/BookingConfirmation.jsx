import {
  CheckCircle2,
  Download,
  Clock3,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BookingConfirmation({
  bookingId,
  vehicle,
  service,
  form,
  onClose,
}) {
  return (
    <div className="text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-success/15 grid place-items-center animate-fade-up">
        <CheckCircle2 size={32} className="text-success" />
      </div>
      <h3 className="mt-4 font-heading font-bold text-xl text-navy">
        You're all set!
      </h3>
      <p className="mt-1 text-sm text-muted">
        A technician has been notified and is on the way.
      </p>

      <div className="mt-6 rounded-2xl bg-bg p-5 text-left space-y-3">
        <Row label="Booking ID" value={bookingId} strong />
        <Row label="Vehicle" value={vehicle?.label} />
        <Row label="Service" value={service?.title} />
        <Row label="Contact" value={`${form.name} · ${form.phone}`} />
        <Row label="Location" value={form.address} icon={MapPin} />
        <Row label="Preferred time" value={form.time} icon={Clock3} />
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-navy">
            Total (estimated)
          </span>
          <span className="font-bold text-navy flex items-center gap-0.5">
            <IndianRupee size={14} />
            {service?.price}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => window.print()}
          className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 rounded-pill py-3 font-semibold text-navy hover:border-royal/40 transition-colors"
        >
          <Download size={16} /> Download Invoice
        </button>
        <Link
          to={`/track?id=${bookingId}`}
          onClick={onClose}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-navy text-white rounded-pill py-3 font-semibold hover:bg-navy/90 transition-colors"
        >
          Track Booking
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, strong, icon: Icon }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-muted flex items-center gap-1.5">
        {Icon && <Icon size={13} />}
        {label}
      </span>
      <span
        className={`text-sm text-right ${strong ? "font-bold text-navy" : "font-medium text-navy"}`}
      >
        {value}
      </span>
    </div>
  );
}
