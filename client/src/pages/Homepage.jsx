import React from 'react'
import HeroSection from '@/components/HeroSection'
import { GridPattern } from "@/components/ui/grid-pattern"
import FeaturesSection from "@/components/FeaturesSection"
import TestimonialMarquee from "@/components/TestimonialMarquee"
import MagicBento from '@/components/MagicBento'
import Footer from '@/components/Footer'
import TestimonialSection from '@/components/Testimonial'
import PricingSection from '@/components/Pricing'
import ProductTimeline from '@/components/Workflow'

const Homepage = () => {
  return (
    <div className='flex flex-col items-center justify-center relative'>
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <GridPattern strokeDasharray={"4 5"} width={50} height={50} className="stroke-zinc-500 opacity-20" />
      </div>
      <div className="relative z-20">
        <HeroSection />
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
        <ProductTimeline />
        <PricingSection />
        <TestimonialSection />
        <Footer />
      </div>
    </div>
  )
}

export default Homepage