import { NextResponse } from "next/server"

// Mock database for menu items
let menuItems = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela e manjericão",
    price: 45.9,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    category: "pizzas",
  },
  {
    id: 2,
    name: "Pizza Pepperoni",
    description: "Molho de tomate, mussarela e pepperoni",
    price: 49.9,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    category: "pizzas",
  },
  {
    id: 3,
    name: "Pizza Quatro Queijos",
    description: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão",
    price: 52.9,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    category: "pizzas",
    discount: 10,
  },
  // More items...
]

export async function GET() {
  return NextResponse.json(menuItems)
}

export async function POST(request: Request) {
  try {
    const newItem = await request.json()

    // Validate required fields
    if (!newItem.name || !newItem.price || !newItem.category) {
      return NextResponse.json({ error: "Nome, preço e categoria são obrigatórios" }, { status: 400 })
    }

    // Generate a new ID
    const newId = Math.max(...menuItems.map((item) => item.id)) + 1

    // Create the new item
    const itemToAdd = {
      ...newItem,
      id: newId,
      image: newItem.image || "/placeholder.svg?height=200&width=300",
      rating: newItem.rating || 0,
    }

    // Add to the "database"
    menuItems.push(itemToAdd)

    return NextResponse.json(itemToAdd, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const updatedItem = await request.json()

    // Validate required fields
    if (!updatedItem.id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    // Find the item
    const index = menuItems.findIndex((item) => item.id === updatedItem.id)

    if (index === -1) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 })
    }

    // Update the item
    menuItems[index] = { ...menuItems[index], ...updatedItem }

    return NextResponse.json(menuItems[index])
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get("id"))

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    // Find the item
    const index = menuItems.findIndex((item) => item.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 })
    }

    // Remove the item
    menuItems = menuItems.filter((item) => item.id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

