import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import HowItWorks from '../components/HowItWorks'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Stats from '../components/Stats'
import FAQ from '../components/FAQ'
import DownloadApp from '../components/DownloadApp'
import Footer from '../components/Footer'

export default function HomePage({ onBookNow }) {
  return (
    <>
      <Navbar onBookNow={onBookNow} />
      <Hero onBookNow={onBookNow} />
      <TrustedBy />
      <HowItWorks />
      <Services onBookNow={onBookNow} />
      <WhyChooseUs />
      <Pricing />
      <Testimonials />
      <Stats />
      <FAQ />
      <DownloadApp />
      <Footer />
    </>
  )
}
