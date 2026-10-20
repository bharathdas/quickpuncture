import { Bike, Car, Truck, CarFront, Zap } from 'lucide-react'

export const vehicles = [
  { id: 'bike', label: 'Bike', icon: Bike },
  { id: 'car', label: 'Car', icon: Car },
  { id: 'scooter', label: 'Scooter', icon: Zap },
  { id: 'auto', label: 'Auto', icon: CarFront },
  { id: 'van', label: 'Van', icon: Truck }
]

// Base price in INR per vehicle type, used to scale service pricing.
const vehicleMultiplier = {
  bike: 1,
  scooter: 1,
  auto: 1.4,
  car: 1.8,
  van: 2.3
}

const baseServices = [
  { id: 'front-tyre', title: 'Front Tyre Puncture', desc: 'Patch or plug repair for a front-wheel puncture.', base: 149, eta: 18 },
  { id: 'rear-tyre', title: 'Rear Tyre Puncture', desc: 'Patch or plug repair for a rear-wheel puncture.', base: 149, eta: 18 },
  { id: 'tubeless', title: 'Tubeless Repair', desc: 'Plug and seal for tubeless tyres, done in place.', base: 199, eta: 20 },
  { id: 'air-filling', title: 'Air Filling', desc: 'Top-up to the right pressure for all tyres.', base: 49, eta: 12 },
  { id: 'wheel-replacement', title: 'Wheel Replacement', desc: 'Swap in your spare or a new wheel on the spot.', base: 299, eta: 25 }
]

export function servicesForVehicle(vehicleId) {
  const mult = vehicleMultiplier[vehicleId] ?? 1
  return baseServices.map((s) => ({
    ...s,
    price: Math.round((s.base * mult) / 10) * 10
  }))
}

export const timeSlots = ['As soon as possible', 'Within 30 minutes', 'Within 1 hour', 'Schedule for later today']
