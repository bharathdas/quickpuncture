# QuickPuncture — 24/7 Roadside Tyre Assistance

A complete, production-ready marketing + booking website built with **React 18, Vite, Tailwind CSS, React Router, and lucide-react** icons. No paid APIs, no external services required to run it.

## What's included

- Sticky navbar (transparent → solid on scroll)
- Full-screen animated hero with feature badges
- 3-step booking flow (Vehicle → Service → Location & Contact) in a modal, with a circular progress indicator, live cost/ETA estimate, browser geolocation ("auto-detect"), and a booking confirmation screen
- Homepage sections: Trusted By, How It Works, Services grid, Why Choose Us, Pricing, Testimonials carousel, animated Live Statistics counters, FAQ accordion, Download App signup, Footer
- `/track` — Track Booking page with a live-updating timeline (Received → Assigned → On the Way → Repair Started → Completed)
- `/dashboard` — operations dashboard with summary cards, a weekly bookings chart, a service-split breakdown, and a recent bookings table
- Fully responsive (mobile bottom-first navigation, large touch targets), keyboard-focus visible, and respects `prefers-reduced-motion`

## Requirements

- [Node.js](https://nodejs.org) 18 or newer (includes npm)
- [VS Code](https://code.visualstudio.com) (or any editor)

## Setup in VS Code

1. Unzip this project and open the `quickpuncture` folder in VS Code (`File → Open Folder…`).
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser. The site hot-reloads as you edit files.

## Building for production

```bash
npm run build
```

This outputs a static, optimized site into the `dist/` folder. Preview it locally with:

```bash
npm run preview
```

You can deploy the contents of `dist/` to any static host (Vercel, Netlify, GitHub Pages, S3, etc.).

## Project structure

```
quickpuncture/
├─ index.html
├─ package.json
├─ tailwind.config.js        ← color palette, fonts, animations (design tokens)
├─ src/
│  ├─ main.jsx                ← app entry + router
│  ├─ App.jsx                 ← routes + global booking modal
│  ├─ index.css                ← Tailwind + base styles
│  ├─ hooks/useReveal.js       ← scroll-reveal (fade-in-on-scroll) hook
│  ├─ data/services.js         ← vehicle types, services, and pricing logic
│  ├─ components/              ← Navbar, Hero, Booking, Services, Pricing, etc.
│  └─ pages/                   ← HomePage, TrackBookingPage, DashboardPage
```

## Customizing

- **Colors & fonts:** edit the `theme.extend` block in `tailwind.config.js`.
- **Pricing/services:** edit `src/data/services.js`.
- **Copy:** section text lives directly in each file under `src/components/`.
- **Real backend:** the booking flow currently generates a mock booking ID and simulates timeline progress on a timer. Swap the logic in `src/components/Booking.jsx` (`submitBooking`) and `src/pages/TrackBookingPage.jsx` for real API calls when you have a backend.

## Notes on the booking flow's "Auto-detect location" button

This uses the browser's built-in Geolocation API (`navigator.geolocation`), which requires the site to be served over `https://` (or `localhost`, which is exempt) and requires the user to grant permission. If it's denied or unsupported, the field falls back to manual address entry.
