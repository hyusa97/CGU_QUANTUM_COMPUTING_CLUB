import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SocialLinks } from "@/components/social-links"
import { EventCarousel } from "@/components/event-carousel"
import { FeaturedGame } from "@/components/featured-game"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialLinks />
        <EventCarousel />
        <FeaturedGame />
      </main>
      <Chatbot />
    </div>
  )
}
