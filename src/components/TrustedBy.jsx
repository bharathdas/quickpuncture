const brands = ['Ola Fleet', 'Zomato Riders', 'Swiggy Delivery', 'Uber Partners', 'Porter', 'Rapido']

export default function TrustedBy() {
  return (
    <section className="py-10 bg-bg border-y border-slate-100">
      <div className="container-px mx-auto max-w-7xl">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted mb-6">
          Trusted by riders and fleets across the city
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {brands.map((b) => (
            <span key={b} className="text-sm font-heading font-semibold text-navy/40">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
