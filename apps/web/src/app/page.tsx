import { Metadata } from 'next';

import { CallToAction } from '@/components/sections/CallToAction';
import { FeaturedServices } from '@/components/sections/FeaturedServices';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { TrustIndicators } from '@/components/sections/TrustIndicators';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Find trusted local service providers instantly. Book with confidence using our secure escrow payment system.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Featured Services */}
      <FeaturedServices />

      {/* How It Works */}
      <HowItWorks />

      {/* Call to Action */}
      <CallToAction />
    </main>
  );
}
