import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TrackBookingPage from './pages/TrackBookingPage'
import DashboardPage from './pages/DashboardPage'
import Booking from './components/Booking'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onBookNow={() => setBookingOpen(true)} />} />
        <Route path="/track" element={<TrackBookingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      <Booking open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
