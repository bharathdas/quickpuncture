import { useMemo, useState } from "react";
import { X, LocateFixed, ChevronLeft, Clock3, IndianRupee } from "lucide-react";
import { vehicles, servicesForVehicle, timeSlots } from "../data/services";
import BookingConfirmation from "./BookingConfirmation";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const STEP_LABELS = ["Vehicle", "Service", "Location & Contact"];

export default function Booking({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [vehicleId, setVehicleId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: timeSlots[0],
    notes: "",
    address: "",
  });
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const services = useMemo(
    () => (vehicleId ? servicesForVehicle(vehicleId) : []),
    [vehicleId],
  );
  const selectedService = services.find((s) => s.id === serviceId);

  if (!open) return null;

  const canContinue =
    (step === 1 && vehicleId) ||
    (step === 2 && serviceId) ||
    (step === 3 &&
      form.name.trim() &&
      form.phone.trim().length >= 10 &&
      form.address.trim());

  function reset() {
    setStep(1);
    setVehicleId(null);
    setServiceId(null);
    setForm({
      name: "",
      phone: "",
      time: timeSlots[0],
      notes: "",
      address: "",
    });
    setConfirmed(false);
    setLocationError("");
    setSubmitError("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function detectLocation() {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError(
        "Location services are not available on this device. Enter your address manually.",
      );
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((f) => ({
          ...f,
          address: `Pinned location · ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        }));
        setLocating(false);
      },
      () => {
        setLocationError(
          "Could not access your location. Enter your address manually.",
        );
        setLocating(false);
      },
      { timeout: 8000 },
    );
  }

  async function submitBooking() {
    setSubmitError("");

    if (!isSupabaseConfigured) {
      setSubmitError(
        "Database not connected yet. Add your Supabase keys to .env and restart the dev server.",
      );
      return;
    }

    setSubmitting(true);

    const ref = "QP-" + Math.floor(100000 + Math.random() * 900000);
    const vehicle = vehicles.find((v) => v.id === vehicleId);

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        booking_ref: ref,
        vehicle_type: vehicle?.label ?? vehicleId,
        service_id: serviceId,
        service_title: selectedService?.title ?? "",
        price: selectedService?.price ?? 0,
        eta_minutes: selectedService?.eta ?? 0,
        name: form.name,
        phone: form.phone,
        address: form.address,
        preferred_time: form.time,
        notes: form.notes,
        status: "received",
      })
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      console.error(error);
      setSubmitError(
        "Something went wrong saving your booking. Please try again.",
      );
      return;
    }

    setBookingId(data.booking_ref);
    setConfirmed(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a service"
    >
      <button
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
        aria-label="Close booking dialog"
        onClick={handleClose}
      />

      <div className="relative bg-white w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-card shadow-lifted animate-fade-up">
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            {!confirmed && step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-navy hover:text-accent p-1 -ml-1"
                aria-label="Previous step"
              >
                <ChevronLeft size={22} />
              </button>
            ) : (
              <span />
            )}
            <h2 className="font-heading font-bold text-lg text-navy">
              {confirmed ? "Booking Confirmed" : "Book Your Repair"}
            </h2>
            <button
              onClick={handleClose}
              className="text-muted hover:text-navy p-1 -mr-1"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {!confirmed && <ProgressRing step={step} labels={STEP_LABELS} />}
        </div>

        <div className="px-6 sm:px-8 py-6">
          {confirmed ? (
            <BookingConfirmation
              bookingId={bookingId}
              vehicle={vehicles.find((v) => v.id === vehicleId)}
              service={selectedService}
              form={form}
              onClose={handleClose}
            />
          ) : (
            <>
              {step === 1 && (
                <VehicleStep vehicleId={vehicleId} onSelect={setVehicleId} />
              )}
              {step === 2 && (
                <ServiceStep
                  services={services}
                  serviceId={serviceId}
                  onSelect={setServiceId}
                />
              )}
              {step === 3 && (
                <LocationStep
                  form={form}
                  setForm={setForm}
                  onDetect={detectLocation}
                  locating={locating}
                  locationError={locationError}
                  selectedService={selectedService}
                />
              )}

              {submitError && (
                <p className="text-xs text-accent mt-3 text-center">
                  {submitError}
                </p>
              )}
              <button
                disabled={!canContinue || submitting}
                onClick={() =>
                  step < 3 ? setStep((s) => s + 1) : submitBooking()
                }
                className="mt-8 w-full bg-accent disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-pill shadow-glow disabled:shadow-none hover:brightness-105 transition-all duration-200"
              >
                {submitting
                  ? "Booking..."
                  : step < 3
                    ? "Continue"
                    : "Confirm Booking"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgressRing({ step, labels }) {
  return (
    <div className="mt-5 flex items-center justify-between">
      {labels.map((label, i) => {
        const idx = i + 1;
        const state =
          idx < step ? "done" : idx === step ? "active" : "upcoming";
        return (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <span
                className={`w-8 h-8 rounded-full grid place-items-center text-xs font-bold transition-all duration-300 ${
                  state === "done"
                    ? "bg-success text-white"
                    : state === "active"
                      ? "bg-accent text-white ring-4 ring-accent/20"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {idx}
              </span>
              <span
                className={`text-[11px] font-medium ${state === "upcoming" ? "text-slate-400" : "text-navy"}`}
              >
                {label}
              </span>
            </div>
            {idx < labels.length && (
              <span
                className={`h-[2px] flex-1 mx-2 mb-4 rounded ${idx < step ? "bg-success" : "bg-slate-100"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function VehicleStep({ vehicleId, onSelect }) {
  return (
    <div>
      <p className="text-sm text-muted mb-4">What are we fixing today?</p>
      <div className="grid grid-cols-3 gap-3">
        {vehicles.map((v) => {
          const active = v.id === vehicleId;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl py-6 border-2 transition-all duration-200 ${
                active
                  ? "border-accent bg-accent/5 shadow-glow"
                  : "border-slate-100 hover:border-slate-200 hover:-translate-y-0.5"
              }`}
              aria-pressed={active}
            >
              <v.icon
                size={28}
                className={active ? "text-accent" : "text-navy"}
              />
              <span className="text-sm font-semibold text-navy">{v.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ServiceStep({ services, serviceId, onSelect }) {
  return (
    <div>
      <p className="text-sm text-muted mb-4">Choose the service you need.</p>
      <div className="flex flex-col gap-3">
        {services.map((s) => {
          const active = s.id === serviceId;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`text-left rounded-2xl p-4 border-2 transition-all duration-200 ${
                active
                  ? "border-accent bg-accent/5 shadow-glow"
                  : "border-slate-100 hover:border-slate-200"
              }`}
              aria-pressed={active}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-navy text-sm">{s.title}</p>
                  <p className="text-xs text-muted mt-1">{s.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-navy text-sm flex items-center justify-end gap-0.5">
                    <IndianRupee size={13} />
                    {s.price}
                  </p>
                  <p className="text-[11px] text-muted flex items-center gap-1 justify-end mt-1">
                    <Clock3 size={12} /> {s.eta} min
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LocationStep({
  form,
  setForm,
  onDetect,
  locating,
  locationError,
  selectedService,
}) {
  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-xs font-semibold text-navy mb-1.5 block">
          Location
        </label>
        <div className="flex gap-2">
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Street, landmark, or area"
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-royal outline-none"
          />
          <button
            type="button"
            onClick={onDetect}
            disabled={locating}
            className="shrink-0 rounded-xl border border-royal/30 text-royal px-3 hover:bg-royal/5 transition-colors disabled:opacity-60"
            aria-label="Auto-detect my location"
          >
            <LocateFixed size={18} className={locating ? "animate-spin" : ""} />
          </button>
        </div>
        {locationError && (
          <p className="text-xs text-accent mt-1.5">{locationError}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-navy mb-1.5 block">
            Full name
          </label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-royal outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-navy mb-1.5 block">
            Phone number
          </label>
          <input
            value={form.phone}
            onChange={(e) =>
              update("phone", e.target.value.replace(/[^\d+ ]/g, ""))
            }
            placeholder="10-digit mobile number"
            inputMode="tel"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-royal outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-navy mb-1.5 block">
          Preferred time
        </label>
        <select
          value={form.time}
          onChange={(e) => update("time", e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-royal outline-none bg-white"
        >
          {timeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-navy mb-1.5 block">
          Notes (optional)
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Anything the technician should know"
          rows={2}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-royal outline-none resize-none"
        />
      </div>

      {selectedService && (
        <div className="rounded-2xl bg-bg p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">Estimated arrival</p>
            <p className="font-semibold text-navy text-sm flex items-center gap-1">
              <Clock3 size={14} /> {selectedService.eta} minutes
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Estimated total</p>
            <p className="font-bold text-navy text-sm flex items-center justify-end gap-0.5">
              <IndianRupee size={14} />
              {selectedService.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
