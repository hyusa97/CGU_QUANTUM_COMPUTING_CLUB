import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, MessageCircle } from "lucide-react"

export function SocialLinks() {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/quantumclub_cgu/?hl=en",
      icon: Instagram,
      color: "from-pink-500 to-purple-500",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/quantum-computing-club-a268a8352",
      icon: Linkedin,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919748338780",
      icon: MessageCircle,
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Connect With Us</h2>
        <p className="text-gray-400 mb-8">Stay updated with our latest activities and join our growing community</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <Button
                key={link.name}
                asChild
                size="lg"
                className={`bg-gradient-to-r ${link.color} hover:opacity-90 text-white px-6 py-3`}
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <Icon className="mr-2 h-5 w-5" />
                  {link.name}
                </a>
              </Button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
