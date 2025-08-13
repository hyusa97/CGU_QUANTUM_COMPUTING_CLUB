import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Play, Trophy, Gamepad2, ExternalLink, Grid3X3, Zap, Atom } from "lucide-react"
import Link from "next/link"

export default function ClubActivityPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Quantum Algorithms Deep Dive",
      date: "2024-02-20",
      time: "2:00 PM - 5:00 PM",
      location: "Physics Lab, Block A",
      capacity: 30,
      registered: 18,
      description:
        "Comprehensive workshop covering Shor's algorithm, Grover's search, and quantum machine learning algorithms.",
      type: "Workshop",
      difficulty: "Intermediate",
      prerequisites: "Basic quantum mechanics knowledge",
      instructor: "Dr. Sarah Chen",
      registrationLink: "https://forms.google.com/quantum-algorithms-workshop",
    },
    {
      id: 2,
      title: "IBM Qiskit Certification Prep",
      date: "2024-02-25",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Lab, Block B",
      capacity: 25,
      registered: 22,
      description: "Intensive preparation session for IBM Qiskit Developer Certification with hands-on practice.",
      type: "Certification",
      difficulty: "Advanced",
      prerequisites: "Python programming, Qiskit basics",
      instructor: "Alex Kumar",
      registrationLink: "https://forms.google.com/qiskit-certification-prep",
    },
    {
      id: 3,
      title: "Quantum Career Panel Discussion",
      date: "2024-03-05",
      time: "4:00 PM - 6:00 PM",
      location: "Main Auditorium",
      capacity: 100,
      registered: 67,
      description: "Industry experts from IBM, Google, and Microsoft discuss career paths in quantum computing.",
      type: "Panel",
      difficulty: "Beginner",
      prerequisites: "None",
      instructor: "Industry Experts",
      registrationLink: "https://forms.google.com/quantum-career-panel",
    },
  ]

  const pastEvents = [
    {
      id: 4,
      title: "Quantum Cryptography Workshop",
      date: "2024-01-15",
      attendees: 28,
      rating: 4.8,
      highlights: ["RSA vs Quantum encryption", "Quantum key distribution", "Post-quantum cryptography"],
    },
    {
      id: 5,
      title: "Quantum Hardware Seminar",
      date: "2024-01-08",
      attendees: 35,
      rating: 4.9,
      highlights: ["Superconducting qubits", "Ion trap systems", "Photonic quantum computers"],
    },
    {
      id: 6,
      title: "Student Research Showcase",
      date: "2023-12-20",
      attendees: 45,
      rating: 4.7,
      highlights: ["10 student presentations", "Research poster session", "Networking with faculty"],
    },
  ]

  const games = [
    {
      id: 1,
      title: "Quantum Tic Tac Toe",
      description:
        "Experience quantum superposition and entanglement in this mind-bending version of the classic game.",
      difficulty: "Beginner",
      concepts: ["Superposition", "Entanglement", "Measurement"],
      playTime: "10-15 minutes",
      link: "/games/tictactoe",
      featured: true,
      icon: Grid3X3,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Quantum Maze Runner",
      description: "Navigate through quantum tunnels using probability amplitudes and wave function collapse.",
      difficulty: "Intermediate",
      concepts: ["Wave functions", "Tunneling", "Probability"],
      playTime: "15-20 minutes",
      link: "/games/maze",
      featured: false,
      icon: Zap,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Qubit Simulator",
      description: "Interactive Bloch sphere manipulation to understand qubit states and quantum gates.",
      difficulty: "Advanced",
      concepts: ["Bloch sphere", "Quantum gates", "State vectors"],
      playTime: "20-30 minutes",
      link: "/games/qubit-simulator",
      featured: false,
      icon: Atom,
      color: "from-green-500 to-teal-500",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Workshop":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Certification":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "Panel":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-300"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300"
      case "Advanced":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

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
              Club Activities
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our workshops, events, and interactive games to deepen your understanding of quantum computing.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    <Badge className={getDifficultyColor(event.difficulty)}>{event.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="h-4 w-4 mr-2 text-green-400" />
                      {event.registered}/{event.capacity} registered
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-2 text-orange-400" />
                      Instructor: {event.instructor}
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-3">Prerequisites: {event.prerequisites}</p>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Register Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Games */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Interactive Learning Games</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            Learn quantum concepts through fun and engaging games that make complex theories accessible and interactive.
          </p>

          {/* Featured Game */}
          {games
            .filter((game) => game.featured)
            .map((game) => {
              const IconComponent = game.icon
              return (
                <Card
                  key={game.id}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/30 mb-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className={`p-8 rounded-full bg-gradient-to-r ${game.color} bg-opacity-20`}>
                        <IconComponent className="h-24 w-24 text-white" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          <Trophy className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <CardTitle className="text-2xl text-white mb-4">{game.title}</CardTitle>
                      <p className="text-gray-300 mb-6 leading-relaxed">{game.description}</p>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Difficulty:</span>
                          <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Play Time:</span>
                          <span className="text-white">{game.playTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm block mb-2">Concepts:</span>
                          <div className="flex flex-wrap gap-2">
                            {game.concepts.map((concept, index) => (
                              <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300">
                                {concept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Link href={game.link}>
                          <Play className="mr-2 h-5 w-5" />
                          Play Now
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )
            })}

          {/* Other Games */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games
              .filter((game) => !game.featured)
              .map((game) => {
                const IconComponent = game.icon
                return (
                  <Card
                    key={game.id}
                    className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors"
                  >
                    <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className={`p-6 rounded-full bg-gradient-to-r ${game.color} bg-opacity-20`}>
                        <IconComponent className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <CardTitle className="text-white text-lg mb-3">{game.title}</CardTitle>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{game.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Play Time:</span>
                          <span className="text-gray-300">{game.playTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {game.concepts.slice(0, 2).map((concept, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-purple-500/30 text-purple-300 text-xs"
                            >
                              {concept}
                            </Badge>
                          ))}
                          {game.concepts.length > 2 && (
                            <Badge variant="outline" className="border-gray-500/30 text-gray-400 text-xs">
                              +{game.concepts.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Link href={game.link}>
                          <Gamepad2 className="mr-2 h-4 w-4" />
                          Play Game
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Recent Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="bg-slate-800/50 border-purple-500/20">
                <CardContent className="p-6">
                  <CardTitle className="text-white text-lg mb-3">{event.title}</CardTitle>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Attendees:</span>
                      <span className="text-white">{event.attendees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white">{event.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Highlights:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
