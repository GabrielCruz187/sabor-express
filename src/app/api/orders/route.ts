import { NextResponse } from "next/server"

// Mock database for orders
const orders = [
  {
    id: 1234,
    customer: {
      name: "João Silva",
      email: "joao@example.com",
      phone: "11987654321",
      address: "Rua das Flores, 123",
    },
    items: [
      { id: 1, name: "Pizza Margherita", price: 45.9, quantity: 1 },
      { id: 6, name: "Picanha Grelhada", price: 59.9, quantity: 2 },
    ],
    total: 165.7,
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
  },
  {
    id: 1233,
    customer: {
      name: "Maria Oliveira",
      email: "maria@example.com",
      phone: "11976543210",
      address: "Av. Paulista, 1000",
    },
    items: [
      { id: 2, name: "Pizza Pepperoni", price: 49.9, quantity: 1 },
      { id: 4, name: "Refrigerante 2L", price: 12.9, quantity: 1 },
    ],
    total: 62.8,
    status: "completed",
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(), // 12 minutes ago
  },
  // More orders...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const status = searchParams.get("status")

  if (id) {
    const order = orders.find((o) => o.id === Number(id))

    if (!order) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
    }

    return NextResponse.json(order)
  }

  let filteredOrders = [...orders]

  if (status) {
    filteredOrders = filteredOrders.filter((o) => o.status === status)
  }

  // Sort by most recent
  filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(filteredOrders)
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    // Validate required fields
    if (!orderData.customer || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json({ error: "Dados do cliente e itens são obrigatórios" }, { status: 400 })
    }

    // Generate a new ID
    const newId = Math.max(...orders.map((order) => order.id)) + 1

    // Calculate total
    const total = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Create the new order
    const newOrder = {
      id: newId,
      customer: orderData.customer,
      items: orderData.items,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Add to the "database"
    orders.unshift(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const updatedOrder = await request.json()

    // Validate required fields
    if (!updatedOrder.id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    // Find the order
    const index = orders.findIndex((order) => order.id === updatedOrder.id)

    if (index === -1) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
    }

    // Update the order
    orders[index] = { ...orders[index], ...updatedOrder }

    return NextResponse.json(orders[index])
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

