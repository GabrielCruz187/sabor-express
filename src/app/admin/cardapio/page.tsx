"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import AdminNav from "@/components/admin-nav"

// Mock data for menu items
const initialMenuItems = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela e manjericão",
    price: 45.9,
    image: "/placeholder.svg?height=50&width=50",
    category: "pizzas",
    active: true,
  },
  {
    id: 2,
    name: "Pizza Pepperoni",
    description: "Molho de tomate, mussarela e pepperoni",
    price: 49.9,
    image: "/placeholder.svg?height=50&width=50",
    category: "pizzas",
    active: true,
  },
  {
    id: 3,
    name: "Pizza Quatro Queijos",
    description: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão",
    price: 52.9,
    image: "/placeholder.svg?height=50&width=50",
    category: "pizzas",
    active: true,
  },
  {
    id: 4,
    name: "Refrigerante 2L",
    description: "Coca-Cola, Guaraná ou Sprite",
    price: 12.9,
    image: "/placeholder.svg?height=50&width=50",
    category: "bebidas",
    active: true,
  },
  {
    id: 5,
    name: "Suco Natural 500ml",
    description: "Laranja, Limão, Abacaxi ou Maracujá",
    price: 9.9,
    image: "/placeholder.svg?height=50&width=50",
    category: "bebidas",
    active: true,
  },
  {
    id: 6,
    name: "Picanha Grelhada",
    description: "Picanha suculenta grelhada com temperos especiais",
    price: 59.9,
    image: "/placeholder.svg?height=50&width=50",
    category: "carnes",
    active: true,
  },
]

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    active: true,
  })

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddItem = () => {
    const newId = Math.max(...menuItems.map((item) => item.id)) + 1
    const itemToAdd = {
      ...newItem,
      id: newId,
      price: Number.parseFloat(newItem.price),
      image: "/placeholder.svg?height=50&width=50",
    }

    setMenuItems([...menuItems, itemToAdd])
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "",
      active: true,
    })
    setIsAddDialogOpen(false)
  }

  const handleEditItem = () => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === currentItem.id ? { ...currentItem, price: Number.parseFloat(currentItem.price) } : item,
      ),
    )
    setIsEditDialogOpen(false)
  }

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const openEditDialog = (item) => {
    setCurrentItem({ ...item, price: item.price.toString() })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Gerenciar Cardápio</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <Plus className="mr-2 h-4 w-4" /> Adicionar Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Item</DialogTitle>
                <DialogDescription>Preencha os detalhes do novo item para o cardápio.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pizzas">Pizzas</SelectItem>
                      <SelectItem value="bebidas">Bebidas</SelectItem>
                      <SelectItem value="carnes">Carnes</SelectItem>
                      <SelectItem value="peixes">Peixes</SelectItem>
                      <SelectItem value="saladas">Saladas</SelectItem>
                      <SelectItem value="sobremesas">Sobremesas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleAddItem}>
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Item</DialogTitle>
                <DialogDescription>Edite os detalhes do item selecionado.</DialogDescription>
              </DialogHeader>
              {currentItem && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Nome</Label>
                    <Input
                      id="edit-name"
                      value={currentItem.name}
                      onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Descrição</Label>
                    <Textarea
                      id="edit-description"
                      value={currentItem.description}
                      onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Preço (R$)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      value={currentItem.price}
                      onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-category">Categoria</Label>
                    <Select
                      value={currentItem.category}
                      onValueChange={(value) => setCurrentItem({ ...currentItem, category: value })}
                    >
                      <SelectTrigger id="edit-category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pizzas">Pizzas</SelectItem>
                        <SelectItem value="bebidas">Bebidas</SelectItem>
                        <SelectItem value="carnes">Carnes</SelectItem>
                        <SelectItem value="peixes">Peixes</SelectItem>
                        <SelectItem value="saladas">Saladas</SelectItem>
                        <SelectItem value="sobremesas">Sobremesas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="edit-active">Ativo</Label>
                    <input
                      type="checkbox"
                      id="edit-active"
                      checked={currentItem.active}
                      onChange={(e) => setCurrentItem({ ...currentItem, active: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-600"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleEditItem}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar itens..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                  <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.active ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

