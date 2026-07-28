import HeroSection from '@/components/sections/HeroSection'
import MissionSection from '@/components/sections/MissionSection'
import ImpactStats from '@/components/sections/ImpactStats'
import ProgramsSection from '@/components/sections/ProgramsSection'
import StoriesSection from '@/components/sections/StoriesSection'
import DonationCTA from '@/components/sections/DonationCTA'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PartnersSection from '@/components/sections/PartnersSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MissionSection />
      <ImpactStats />
      <ProgramsSection />
      <StoriesSection />
      <DonationCTA />
      <TestimonialsSection />
      <PartnersSection />
    </main>
  )
}
