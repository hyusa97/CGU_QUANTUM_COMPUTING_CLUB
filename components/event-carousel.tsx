import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

export function EventCarousel() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Quantum Algorithms Workshop",
      date: "2024-02-15",
      time: "2:00 PM - 5:00 PM",
      location: "Physics Lab, Block A",
      attendees: 25,
      description: "Deep dive into quantum algorithms including Shor's and Grover's algorithms.",
    },
    {
      id: 2,
      title: "IBM Qiskit Hands-on Session",
      date: "2024-02-22",
      time: "10:00 AM - 1:00 PM",
      location: "Computer Lab, Block B",
      attendees: 30,
      description: "Learn to program quantum circuits using IBM's Qiskit framework.",
    },
    {
      id: 3,
      title: "Quantum Computing Career Panel",
      date: "2024-03-01",
      time: "4:00 PM - 6:00 PM",
      location: "Auditorium",
      attendees: 100,
      description: "Industry experts discuss career opportunities in quantum computing.",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Spline 3D Embed */}
        <div className="mb-12 flex justify-center">
          <iframe
            src="https://my.spline.design/claritystream-OOSYs4Lt8c1v9liiyPGptVmD/"
            frameBorder="0"
            width="1000"
            height="500"
            allowFullScreen
            style={{ borderRadius: '16px', boxShadow: '0 4px 24px #0003', width: '100%', maxWidth: '1000px', height: '500px' }}
            title="Spline 3D"
          />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join us for exciting workshops, seminars, and hands-on sessions to expand your quantum computing knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-white text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{event.description}</p>

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
                    {event.attendees} expected attendees
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
