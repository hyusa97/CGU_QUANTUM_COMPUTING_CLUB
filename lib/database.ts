import fs from "fs/promises"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "workshop" | "lecture" | "competition" | "meeting"
  status: "upcoming" | "completed" | "cancelled"
  registrationLink: string
  maxParticipants: number
  currentParticipants: number
  image: string
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  date: string
  category: "announcement" | "achievement" | "news"
  author: string
  image: string
  featured: boolean
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  url: string
  category: "workshops" | "events" | "achievements" | "general"
  date: string
  event: string
}

// Events CRUD operations
export async function getEvents(): Promise<Event[]> {
  try {
    const filePath = path.join(DATA_DIR, "events.json")
    const fileContent = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(fileContent)
    return data.events || []
  } catch (error) {
    console.error("Error reading events:", error)
    return []
  }
}

export async function saveEvents(events: Event[]): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, "events.json")
    await fs.writeFile(filePath, JSON.stringify({ events }, null, 2))
  } catch (error) {
    console.error("Error saving events:", error)
    throw error
  }
}

export async function addEvent(event: Omit<Event, "id">): Promise<Event> {
  const events = await getEvents()
  const newEvent: Event = {
    ...event,
    id: Date.now().toString(),
  }
  events.push(newEvent)
  await saveEvents(events)
  return newEvent
}

export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
  const events = await getEvents()
  const index = events.findIndex((event) => event.id === id)
  if (index === -1) return null

  events[index] = { ...events[index], ...updates }
  await saveEvents(events)
  return events[index]
}

export async function deleteEvent(id: string): Promise<boolean> {
  const events = await getEvents()
  const filteredEvents = events.filter((event) => event.id !== id)
  if (filteredEvents.length === events.length) return false

  await saveEvents(filteredEvents)
  return true
}

// News CRUD operations
export async function getNews(): Promise<NewsArticle[]> {
  try {
    const filePath = path.join(DATA_DIR, "news.json")
    const fileContent = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(fileContent)
    return data.news || []
  } catch (error) {
    console.error("Error reading news:", error)
    return []
  }
}

export async function saveNews(news: NewsArticle[]): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, "news.json")
    await fs.writeFile(filePath, JSON.stringify({ news }, null, 2))
  } catch (error) {
    console.error("Error saving news:", error)
    throw error
  }
}

export async function addNews(article: Omit<NewsArticle, "id">): Promise<NewsArticle> {
  const news = await getNews()
  const newArticle: NewsArticle = {
    ...article,
    id: Date.now().toString(),
  }
  news.unshift(newArticle) // Add to beginning for latest first
  await saveNews(news)
  return newArticle
}

export async function updateNews(id: string, updates: Partial<NewsArticle>): Promise<NewsArticle | null> {
  const news = await getNews()
  const index = news.findIndex((article) => article.id === id)
  if (index === -1) return null

  news[index] = { ...news[index], ...updates }
  await saveNews(news)
  return news[index]
}

export async function deleteNews(id: string): Promise<boolean> {
  const news = await getNews()
  const filteredNews = news.filter((article) => article.id !== id)
  if (filteredNews.length === news.length) return false

  await saveNews(filteredNews)
  return true
}

// Gallery CRUD operations
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const filePath = path.join(DATA_DIR, "gallery.json")
    const fileContent = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(fileContent)
    return data.images || []
  } catch (error) {
    console.error("Error reading gallery:", error)
    return []
  }
}

export async function saveGalleryImages(images: GalleryImage[]): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, "gallery.json")
    await fs.writeFile(filePath, JSON.stringify({ images }, null, 2))
  } catch (error) {
    console.error("Error saving gallery:", error)
    throw error
  }
}

export async function addGalleryImage(image: Omit<GalleryImage, "id">): Promise<GalleryImage> {
  const images = await getGalleryImages()
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString(),
  }
  images.unshift(newImage) // Add to beginning for latest first
  await saveGalleryImages(images)
  return newImage
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const images = await getGalleryImages()
  const filteredImages = images.filter((image) => image.id !== id)
  if (filteredImages.length === images.length) return false

  await saveGalleryImages(filteredImages)
  return true
}
