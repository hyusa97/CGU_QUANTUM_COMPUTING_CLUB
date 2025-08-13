"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  ImageIcon,
  FileText,
  LogOut,
  Plus,
  Settings,
  BarChart3,
  Atom,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [showEventForm, setShowEventForm] = useState(false)
  const [showNewsForm, setShowNewsForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [editingNews, setEditingNews] = useState<any>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Mock data - in real implementation, this would come from a database
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Quantum Algorithms Workshop",
      date: "2024-02-20",
      time: "2:00 PM - 5:00 PM",
      location: "Physics Lab, Block A",
      capacity: 30,
      registered: 18,
      description: "Deep dive into quantum algorithms including Shor's and Grover's algorithms.",
      type: "Workshop",
      difficulty: "Intermediate",
      instructor: "Dr. Sarah Chen",
      status: "upcoming",
    },
    {
      id: 2,
      title: "IBM Qiskit Certification Prep",
      date: "2024-02-25",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Lab, Block B",
      capacity: 25,
      registered: 22,
      description: "Intensive preparation session for IBM Qiskit Developer Certification.",
      type: "Certification",
      difficulty: "Advanced",
      instructor: "Alex Kumar",
      status: "upcoming",
    },
  ])

  const [newsArticles, setNewsArticles] = useState([
    {
      id: 1,
      title: "Quantum Computing Club Wins IBM Qiskit Global Challenge",
      excerpt: "Our team secured first place in the international quantum programming competition.",
      content:
        "In a remarkable achievement, the Quantum Computing Club at CV Raman Global University has won the prestigious IBM Qiskit Global Challenge 2024...",
      author: "Hyusa",
      date: "2024-01-15",
      category: "Achievement",
      status: "published",
      featured: true,
    },
    {
      id: 2,
      title: "New Quantum Lab Inaugurated",
      excerpt: "State-of-the-art quantum computing laboratory opens with cutting-edge equipment.",
      content:
        "The university has inaugurated a new quantum computing laboratory equipped with the latest quantum simulators...",
      author: "Dr. Sarah Chen",
      date: "2024-01-10",
      category: "Announcement",
      status: "published",
      featured: false,
    },
  ])

  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      title: "Quantum Workshop 2024",
      category: "Workshops",
      date: "2024-01-15",
      url: "/quantum-computing-workshop.png",
      description: "Students learning quantum algorithms",
    },
    {
      id: 2,
      title: "IBM Lab Visit",
      category: "Events",
      date: "2024-01-10",
      url: "/ibm-quantum-lab.png",
      description: "Club members at IBM quantum facility",
    },
  ])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const showError = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(""), 3000)
  }

  // Event Management Functions
  const handleEventSubmit = (eventData: any) => {
    if (editingEvent) {
      setEvents(events.map((event) => (event.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : event)))
      showSuccess("Event updated successfully!")
      setEditingEvent(null)
    } else {
      const newEvent = { ...eventData, id: Date.now(), registered: 0, status: "upcoming" }
      setEvents([...events, newEvent])
      showSuccess("Event created successfully!")
    }
    setShowEventForm(false)
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
    showSuccess("Event deleted successfully!")
  }

  // News Management Functions
  const handleNewsSubmit = (newsData: any) => {
    if (editingNews) {
      setNewsArticles(
        newsArticles.map((article) => (article.id === editingNews.id ? { ...newsData, id: editingNews.id } : article)),
      )
      showSuccess("News article updated successfully!")
      setEditingNews(null)
    } else {
      const newArticle = { ...newsData, id: Date.now(), status: "published" }
      setNewsArticles([...newsArticles, newArticle])
      showSuccess("News article published successfully!")
    }
    setShowNewsForm(false)
  }

  const handleDeleteNews = (newsId: number) => {
    setNewsArticles(newsArticles.filter((article) => article.id !== newsId))
    showSuccess("News article deleted successfully!")
  }

  // Gallery Management Functions
  const handleImageUpload = (imageData: any) => {
    const newImage = { ...imageData, id: Date.now() }
    setGalleryImages([...galleryImages, newImage])
    showSuccess("Image uploaded successfully!")
  }

  const handleDeleteImage = (imageId: number) => {
    setGalleryImages(galleryImages.filter((image) => image.id !== imageId))
    showSuccess("Image deleted successfully!")
  }

  const stats = [
    { title: "Total Members", value: "52", icon: Users, color: "text-blue-400" },
    {
      title: "Upcoming Events",
      value: events.filter((e) => e.status === "upcoming").length.toString(),
      icon: Calendar,
      color: "text-purple-400",
    },
    { title: "News Articles", value: newsArticles.length.toString(), icon: FileText, color: "text-green-400" },
    { title: "Gallery Images", value: galleryImages.length.toString(), icon: ImageIcon, color: "text-orange-400" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-purple-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Quantum Club
              </span>
            </Link>
            <span className="text-gray-400">Admin Dashboard</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Welcome, {user?.displayName || user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-red-500/50 text-red-300 hover:bg-red-500/10 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="px-6 pt-4">
          <Alert className="border-green-500/50 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300">{successMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {errorMessage && (
        <div className="px-6 pt-4">
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">{errorMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-purple-500/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-purple-500/20">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-purple-500/20">
              <FileText className="h-4 w-4 mr-2" />
              News
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-500/20">
              <ImageIcon className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.title} className="bg-slate-800/50 border-purple-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">{stat.title}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => {
                      setShowEventForm(true)
                      setEditingEvent(null)
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                  <Button
                    onClick={() => {
                      setShowNewsForm(true)
                      setEditingNews(null)
                    }}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post News
                  </Button>
                  <Button
                    onClick={() => setActiveTab("gallery")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Members
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm">New event registration: Quantum Algorithms Workshop</p>
                      <p className="text-gray-400 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FileText className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm">News article published: IBM Qiskit Challenge Win</p>
                      <p className="text-gray-400 text-xs">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <ImageIcon className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm">New images uploaded to gallery</p>
                      <p className="text-gray-400 text-xs">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Event Management</h2>
                <Button
                  onClick={() => {
                    setShowEventForm(true)
                    setEditingEvent(null)
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Event
                </Button>
              </div>

              {/* Events List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="bg-slate-800/50 border-purple-500/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{event.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{event.type}</Badge>
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                              {event.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingEvent(event)
                              setShowEventForm(true)
                            }}
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300">{event.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-gray-400">
                          <span>Date: {event.date}</span>
                          <span>Time: {event.time}</span>
                          <span>Location: {event.location}</span>
                          <span>
                            Registered: {event.registered}/{event.capacity}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">News Management</h2>
                <Button
                  onClick={() => {
                    setShowNewsForm(true)
                    setEditingNews(null)
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Article
                </Button>
              </div>

              {/* News Articles List */}
              <div className="space-y-4">
                {newsArticles.map((article) => (
                  <Card key={article.id} className="bg-slate-800/50 border-purple-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                            {article.featured && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Featured</Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{article.excerpt}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>By {article.author}</span>
                            <span>{article.date}</span>
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingNews(article)
                              setShowNewsForm(true)
                            }}
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNews(article.id)}
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {galleryImages.map((image) => (
                  <Card key={image.id} className="bg-slate-800/50 border-purple-500/20 overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteImage(image.id)}
                          className="border-red-500/30 text-red-300 hover:bg-red-500/10 bg-black/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-1">{image.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{image.category}</Badge>
                        <span>{image.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Settings</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Club Information */}
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Club Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Club Name</Label>
                      <Input
                        defaultValue="Quantum Computing Club"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">University</Label>
                      <Input
                        defaultValue="CV Raman Global University"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Contact Email</Label>
                      <Input defaultValue="hyusa97@gmail.com" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                {/* Data Export */}
                <Card className="bg-slate-800/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Export Data</h4>
                      <p className="text-gray-400 text-sm mb-4">Download your club data for backup or analysis.</p>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full border-green-500/30 text-green-300 hover:bg-green-500/10 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export Events Data
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export News Articles
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export Member List
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventFormModal
          event={editingEvent}
          onSubmit={handleEventSubmit}
          onClose={() => {
            setShowEventForm(false)
            setEditingEvent(null)
          }}
        />
      )}

      {/* News Form Modal */}
      {showNewsForm && (
        <NewsFormModal
          article={editingNews}
          onSubmit={handleNewsSubmit}
          onClose={() => {
            setShowNewsForm(false)
            setEditingNews(null)
          }}
        />
      )}
    </div>
  )
}

// Event Form Modal Component
function EventFormModal({ event, onSubmit, onClose }: any) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    capacity: event?.capacity || "",
    description: event?.description || "",
    type: event?.type || "Workshop",
    difficulty: event?.difficulty || "Beginner",
    instructor: event?.instructor || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="bg-slate-800 border-purple-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">{event ? "Edit Event" : "Create New Event"}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Event Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Instructor</Label>
                <Input
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Time</Label>
                <Input
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="2:00 PM - 5:00 PM"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Capacity</Label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Event Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Certification">Certification</SelectItem>
                    <SelectItem value="Panel">Panel Discussion</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {event ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// News Form Modal Component
function NewsFormModal({ article, onSubmit, onClose }: any) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    author: article?.author || "",
    date: article?.date || new Date().toISOString().split("T")[0],
    category: article?.category || "Announcement",
    featured: article?.featured || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="bg-slate-800 border-purple-500/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">{article ? "Edit Article" : "Create New Article"}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">Article Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-gray-300">Excerpt</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                rows={2}
                placeholder="Brief summary of the article..."
                required
              />
            </div>

            <div>
              <Label className="text-gray-300">Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                rows={8}
                placeholder="Full article content..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Achievement">Achievement</SelectItem>
                    <SelectItem value="Announcement">Announcement</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-slate-600 bg-slate-700"
              />
              <Label htmlFor="featured" className="text-gray-300">
                Feature this article
              </Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {article ? "Update Article" : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
