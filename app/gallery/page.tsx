"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, Calendar } from "lucide-react"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"gallery" | "activity">("gallery") // NEW

  const galleryImages = [
    {
      id: 1,
      src: "/quantum-computing-workshop.png",
      title: "Quantum Algorithms Workshop",
      category: "Workshops",
      date: "2024-01-15",
      description: "Students learning about Shor's and Grover's algorithms in our hands-on workshop session.",
    },
    {
      id: 2,
      src: "/ibm-quantum-lab.png",
      title: "IBM Quantum Lab Visit",
      category: "Events",
      date: "2024-01-10",
      description: "Club members visiting IBM's quantum computing facility and interacting with real quantum hardware.",
    },
    {
      id: 3,
      src: "/quantum-hackathon-team.png",
      title: "Quantum Hackathon 2023",
      category: "Competitions",
      date: "2023-12-20",
      description: "Teams competing in our annual quantum programming hackathon with innovative solutions.",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      title: "Club Team Photo",
      category: "Team",
      date: "2023-12-15",
      description: "Our growing quantum computing club family at CV Raman Global University.",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      title: "Research Presentation",
      category: "Research",
      date: "2023-12-10",
      description: "Maya presenting her quantum cryptography research at the national physics conference.",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600",
      title: "Qiskit Programming Session",
      category: "Workshops",
      date: "2023-12-05",
      description: "Hands-on session teaching students to program quantum circuits using IBM Qiskit.",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600",
      title: "Guest Lecture Series",
      category: "Events",
      date: "2023-11-25",
      description: "Renowned quantum physicist Dr. John Smith delivering a lecture on quantum supremacy.",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600",
      title: "Quantum Game Development",
      category: "Projects",
      date: "2023-11-20",
      description: "Students developing educational quantum games to make quantum concepts more accessible.",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=400&width=600",
      title: "Award Ceremony",
      category: "Achievements",
      date: "2023-11-15",
      description: "Celebrating our victory in the IBM Qiskit Global Challenge with the winning trophy.",
    },
    {
      id: 10,
      src: "/placeholder.svg?height=400&width=600",
      title: "Industry Networking Event",
      category: "Events",
      date: "2023-11-10",
      description: "Connecting with quantum computing professionals and exploring career opportunities.",
    },
    {
      id: 11,
      src: "/placeholder.svg?height=400&width=600",
      title: "Lab Equipment Setup",
      category: "Infrastructure",
      date: "2023-11-05",
      description: "Setting up our new quantum computing laboratory with state-of-the-art equipment.",
    },
    {
      id: 12,
      src: "/placeholder.svg?height=400&width=600",
      title: "School Outreach Program",
      category: "Outreach",
      date: "2023-10-30",
      description: "Introducing quantum computing concepts to high school students in our community outreach program.",
    },
  ]

  const categories = [
    "All",
    "Workshops",
    "Events",
    "Competitions",
    "Team",
    "Research",
    "Projects",
    "Achievements",
    "Infrastructure",
    "Outreach",
  ]

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      Workshops: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      Events: "bg-green-500/20 text-green-300 border-green-500/30",
      Competitions: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Team: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      Research: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      Projects: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      Achievements: "bg-red-500/20 text-red-300 border-red-500/30",
      Infrastructure: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      Outreach: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
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
              Photo Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore moments from our quantum computing journey - workshops, events, achievements, and community
            building.
          </p>
        </div>
      </section>

      {/* View Mode Toggle */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto flex justify-center gap-4">
          <Button
            variant={viewMode === "gallery" ? "default" : "outline"}
            onClick={() => setViewMode("gallery")}
            className={viewMode === "gallery" ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : ""}
          >
            Gallery View
          </Button>
          <Button
            variant={viewMode === "activity" ? "default" : "outline"}
            onClick={() => setViewMode("activity")}
            className={viewMode === "activity" ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white" : ""}
          >
            Activity List View
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Section: Gallery or Activity List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {viewMode === "gallery" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-slate-800/50 rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(image.category)}>{image.category}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{image.title}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(image.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredImages.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-slate-800/50 rounded-lg border border-purple-500/20 p-6 flex flex-col sm:flex-row gap-4 items-start"
                >
                  <img
                    src={activity.src || "/placeholder.svg"}
                    alt={activity.title}
                    className="w-32 h-32 object-cover rounded-lg border border-purple-500/30"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{activity.title}</h3>
                    <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                    <div className="flex items-center text-xs text-gray-400 mt-2 mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                    <p className="text-gray-300">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                    <Badge className={getCategoryColor(selectedImage.category)}>{selectedImage.category}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Our Journey in Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">{galleryImages.length}+</div>
              <div className="text-gray-400">Memorable Moments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">Events Organized</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">200+</div>
              <div className="text-gray-400">Students Reached</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
