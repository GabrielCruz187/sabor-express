"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 45.9,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
  },
  {
    id: 6,
    name: "Picanha Grelhada",
    price: 59.9,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 2,
    discount: 15,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount ? (item.price * (100 - item.discount)) / 100 : item.price
      return total + itemPrice * item.quantity
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const deliveryFee = 10.0
  const total = subtotal + deliveryFee

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/menu" className="flex items-center text-rose-600 hover:text-rose-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continuar comprando
        </Link>
        <h1 className="text-3xl font-bold ml-auto">Seu Carrinho</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-6">Adicione alguns itens deliciosos do nosso cardápio</p>
          <Link href="/menu">
            <Button className="bg-rose-600 hover:bg-rose-700">Ver Cardápio</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        {item.discount ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-rose-600">
                              R$ {((item.price * (100 - item.discount)) / 100).toFixed(2)}
                            </span>
                            <span className="text-sm line-through text-muted-foreground">
                              R$ {item.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-rose-600">R$ {item.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <Input placeholder="Cupom de desconto" className="flex-1 mr-2" />
                  <Button variant="outline">Aplicar</Button>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-rose-600">R$ {total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Finalizar Pedido</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

