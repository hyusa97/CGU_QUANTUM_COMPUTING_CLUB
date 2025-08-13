import { type NextRequest, NextResponse } from "next/server"
import { getNews, addNews, updateNews, deleteNews } from "@/lib/database"

export async function GET() {
  try {
    const news = await getNews()
    return NextResponse.json({ news })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newsData = await request.json()
    const newArticle = await addNews(newsData)
    return NextResponse.json({ article: newArticle }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create news article" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()
    const updatedArticle = await updateNews(id, updates)

    if (!updatedArticle) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 })
    }

    return NextResponse.json({ article: updatedArticle })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update news article" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const deleted = await deleteNews(id)

    if (!deleted) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "News article deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete news article" }, { status: 500 })
  }
}
