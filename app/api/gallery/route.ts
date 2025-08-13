import { type NextRequest, NextResponse } from "next/server"
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "@/lib/database"

export async function GET() {
  try {
    const images = await getGalleryImages()
    return NextResponse.json({ images })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const imageData = await request.json()
    const newImage = await addGalleryImage(imageData)
    return NextResponse.json({ image: newImage }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add gallery image" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const deleted = await deleteGalleryImage(id)

    if (!deleted) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Gallery image deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}
