import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Lightbulb, Award, ArrowRight, Brain, Zap } from "lucide-react"

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Aditya Kumar",
      role: "Club President",
      description: "Passionate about quantum algorithms and their real-world applications.",
      image: "/professional-student-portrait.png",
    },
    {
      name: "Ashutosh Kumar",
      role: "Vice President",
      description: "Professor of Physics specializing in quantum mechanics and computation.",
      image: "/professor-portrait.png",
    },
    {
      name: "Archita Bhalotia",
      role: "Vice President",
      description: "Expert in quantum programming languages and Qiskit development.",
      image: "/student-tech-portrait.png",
    },
    {
      name: "Ayush kumar",
      role: "Secretary",
      description: "Focuses on quantum cryptography and security applications.",
      image: "/diverse-female-student.png",
    },
  ]

  const achievements = [
    { icon: Award, title: "IBM Qiskit Challenge Winner", description: "2023 Global Competition" },
    { icon: Users, title: "50+ Active Members", description: "Growing community of quantum enthusiasts" },
    { icon: Lightbulb, title: "25+ Workshops Conducted", description: "Hands-on learning experiences" },
    { icon: Brain, title: "10+ Research Projects", description: "Student-led quantum research initiatives" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-950"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Our Club
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are a passionate community of students and researchers exploring the fascinating world of quantum
            computing at CV Raman Global University.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-gray-300">
                  To democratize quantum computing education and foster innovation through hands-on learning, research,
                  and collaboration.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Lightbulb className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-gray-300">
                  To be the leading quantum computing community in India, bridging the gap between theoretical knowledge
                  and practical applications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/20">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Our Values</h3>
                <p className="text-gray-300">
                  Innovation, collaboration, inclusivity, and continuous learning drive everything we do in the quantum
                  realm.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors"
                >
                  <CardContent className="p-6 text-center">
                    <Icon className="h-10 w-10 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-purple-400 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-400">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Us?</h2>
          <p className="text-gray-400 mb-8">
            Be part of the quantum revolution and help shape the future of computing.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            Contact Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
