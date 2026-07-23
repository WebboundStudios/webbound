import React from 'react';
import { LoadingScreen } from '@/components/animations/LoadingScreen';
import { CustomCursor } from '@/components/common/CustomCursor';
import { Navbar } from '@/components/common/Navbar';
import { ScrollThemeController } from '@/components/animations/ScrollThemeController';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Services } from '@/sections/Services/Services';
import { Projects } from '@/sections/Projects/Projects';
import { Process } from '@/sections/Process/Process';
import { WhyUs } from '@/sections/WhyUs/WhyUs';
import { TechStack } from '@/sections/TechStack/TechStack';
import { Testimonials } from '@/sections/Testimonials/Testimonials';
import { FAQ } from '@/sections/FAQ/FAQ';
import { CTA } from '@/sections/CTA/CTA';
import { Footer } from '@/sections/Footer/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EE] text-[#0A0A0A] selection:bg-[#C5F52A] selection:text-[#0A0A0A] transition-colors duration-500">
      {/* Scroll Background Morph Controller */}
      <ScrollThemeController />

      {/* Preloader Screen */}
      <LoadingScreen />

      {/* Interactive Custom Cursor Follower */}
      <CustomCursor />

      {/* Floating Bottom Dock Navbar */}
      <Navbar />

      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Who We Are / About */}
      <About />

      {/* Section 3: Featured Projects Showcase */}
      <Projects />

      {/* Section 4: Services */}
      <Services />

      {/* Section 5: Our Process */}
      <Process />

      {/* Section 6: Why Clients Choose Us */}
      <WhyUs />

      {/* Section 7: Technology Stack */}
      <TechStack />

      {/* Section 8: Client Testimonials */}
      <Testimonials />

      {/* Section 9: FAQ */}
      <FAQ />

      {/* Section 10: Call To Action & Inquiry Form */}
      <CTA />

      {/* Section 11: Minimal Footer */}
      <Footer />
    </main>
  );
}
