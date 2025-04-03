import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuItems from "@/components/menu-items"

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nosso Cardápio</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar no cardápio..." className="pl-8 w-full" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-full h-auto flex flex-wrap justify-start mb-8 bg-transparent gap-2">
          <TabsTrigger value="all" className="rounded-full">
            Todos
          </TabsTrigger>
          <TabsTrigger value="pizzas" className="rounded-full">
            Pizzas
          </TabsTrigger>
          <TabsTrigger value="bebidas" className="rounded-full">
            Bebidas
          </TabsTrigger>
          <TabsTrigger value="carnes" className="rounded-full">
            Carnes
          </TabsTrigger>
          <TabsTrigger value="peixes" className="rounded-full">
            Peixes
          </TabsTrigger>
          <TabsTrigger value="saladas" className="rounded-full">
            Saladas
          </TabsTrigger>
          <TabsTrigger value="sobremesas" className="rounded-full">
            Sobremesas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <MenuItems category="all" />
        </TabsContent>
        <TabsContent value="pizzas" className="mt-0">
          <MenuItems category="pizzas" />
        </TabsContent>
        <TabsContent value="bebidas" className="mt-0">
          <MenuItems category="bebidas" />
        </TabsContent>
        <TabsContent value="carnes" className="mt-0">
          <MenuItems category="carnes" />
        </TabsContent>
        <TabsContent value="peixes" className="mt-0">
          <MenuItems category="peixes" />
        </TabsContent>
        <TabsContent value="saladas" className="mt-0">
          <MenuItems category="saladas" />
        </TabsContent>
        <TabsContent value="sobremesas" className="mt-0">
          <MenuItems category="sobremesas" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

