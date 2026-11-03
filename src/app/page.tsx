import Hero from "@/components/sections/Hero";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import FeaturedEvents from "@/components/sections/FeaturedEvents";
import Intro from "@/components/sections/Intro";
import ExpertiseBento from "@/components/sections/ExpertiseBento";
import VideoShowreel from "@/components/sections/VideoShowreel"; // Pudhu section
import ServicesGrid from "@/components/sections/ServicesGrid";
import EventGallery from "@/components/sections/EventGallery";
import Testimonials from "@/components/sections/Testimonials";
import OurProcess from "@/components/sections/OurProcess";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsMarquee /> 
      <FeaturedEvents />
      <Intro />
      <ExpertiseBento /> 
      <VideoShowreel /> 
      <ServicesGrid />
      <EventGallery /> 
      <Testimonials />
      <OurProcess /> 
      <CTA />
    </main>
  );
}