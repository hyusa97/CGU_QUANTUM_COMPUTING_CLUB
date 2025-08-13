import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Trophy, Newspaper, Users, Zap } from "lucide-react"

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "Quantum Computing Club Wins IBM Qiskit Global Challenge",
      excerpt:
        "Our team secured first place in the international quantum programming competition, showcasing innovative algorithms for quantum machine learning.",
      content:
        "In a remarkable achievement, the Quantum Computing Club at CV Raman Global University has won the prestigious IBM Qiskit Global Challenge 2024...",
      author: "Hyusa",
      date: "2024-01-15",
      category: "Achievement",
      image: "/placeholder-8lmfg.png",
      featured: true,
    },
    {
      id: 2,
      title: "New Quantum Lab Inaugurated at CV Raman Global University",
      excerpt:
        "State-of-the-art quantum computing laboratory opens with cutting-edge equipment and IBM Quantum Network access.",
      content:
        "The university has inaugurated a new quantum computing laboratory equipped with the latest quantum simulators and direct access to IBM Quantum computers...",
      author: "Dr. Sarah Chen",
      date: "2024-01-10",
      category: "Announcement",
      image: "/placeholder-g4rcf.png",
      featured: false,
    },
    {
      id: 3,
      title: "Quantum Workshop Series Attracts 200+ Students",
      excerpt:
        "Our monthly quantum computing workshops continue to grow, with record attendance from students across multiple disciplines.",
      content:
        "The Quantum Computing Club's educational outreach has reached new heights with over 200 students participating in our latest workshop series...",
      author: "Alex Kumar",
      date: "2024-01-05",
      category: "Event",
      image: "/quantum-computing-workshop.png",
      featured: false,
    },
    {
      id: 4,
      title: "Partnership with Google Quantum AI Announced",
      excerpt:
        "Exciting collaboration will provide students with access to Google's quantum processors and research opportunities.",
      content:
        "We are thrilled to announce our new partnership with Google Quantum AI, which will provide unprecedented access to quantum computing resources...",
      author: "Hyusa",
      date: "2023-12-20",
      category: "Partnership",
      image: "/google-quantum-partnership.png",
      featured: false,
    },
    {
      id: 5,
      title: "Student Research Paper Published in Nature Quantum",
      excerpt:
        "Club member Maya Patel's research on quantum cryptography protocols has been accepted for publication in a prestigious journal.",
      content:
        "Maya Patel, a dedicated member of our Quantum Computing Club, has achieved a significant milestone with her research paper being accepted...",
      author: "Maya Patel",
      date: "2023-12-15",
      category: "Research",
      image: "/quantum-cryptography-research.png",
      featured: false,
    },
    {
      id: 6,
      title: "Quantum Hackathon 2024 Registration Now Open",
      excerpt:
        "Join us for a 48-hour quantum programming marathon with prizes worth ₹50,000 and internship opportunities.",
      content:
        "Get ready for the most exciting quantum computing event of the year! Our Quantum Hackathon 2024 is set to bring together the brightest minds...",
      author: "Club Team",
      date: "2023-12-10",
      category: "Event",
      image: "/quantum-hackathon.png",
      featured: false,
    },
  ]

  const categories = ["All", "Achievement", "Announcement", "Event", "Partnership", "Research"]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Achievement":
        return Trophy
      case "Announcement":
        return Newspaper
      case "Event":
        return Users
      case "Partnership":
        return Zap
      case "Research":
        return User
      default:
        return Newspaper
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Achievement":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "Announcement":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Event":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Partnership":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "Research":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const featuredArticle = newsArticles.find((article) => article.featured)
  const regularArticles = newsArticles.filter((article) => !article.featured)

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
              Latest News
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest developments, achievements, and events from our quantum computing community.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Featured Story</h2>
            <Card className="bg-slate-800/50 border-purple-500/20 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(featuredArticle.category)}>{featuredArticle.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <CardTitle className="text-2xl text-white mb-4">{featuredArticle.title}</CardTitle>
                  <p className="text-gray-300 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => {
              const CategoryIcon = getCategoryIcon(article.category)
              return (
                <Card
                  key={article.id}
                  className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(article.category)}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-lg text-white mb-3 line-clamp-2">{article.title}</CardTitle>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <div className="flex items-center mb-1">
                          <User className="h-3 w-3 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter to get the latest news and updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-500"
            />
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
