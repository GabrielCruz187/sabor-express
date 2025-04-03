import Link from "next/link"
import { ChevronRight, ShoppingBag, Star, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FeaturedDishes from "@/components/featured-dishes"
import CategoryList from "@/components/category-list"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-gradient-to-r from-rose-500 to-orange-500">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Deliciosos pratos direto na sua casa</h1>
            <p className="text-xl text-white/90 mb-8">
              Peça agora e receba em minutos. Comida fresca e saborosa com apenas alguns cliques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-white/90">
                Ver Cardápio <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Fazer Pedido <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Featured Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Destaques do Dia</h2>
            <Link href="/menu" className="text-rose-600 hover:underline flex items-center">
              Ver todos <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FeaturedDishes />
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Categorias</h2>
          <CategoryList />
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-rose-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Utensils className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Escolha seus pratos</h3>
                <p className="text-center text-muted-foreground">
                  Navegue pelo nosso cardápio e selecione seus pratos favoritos.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-rose-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <ShoppingBag className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Faça seu pedido</h3>
                <p className="text-center text-muted-foreground">
                  Adicione ao carrinho e finalize seu pedido com poucos cliques.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-rose-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Star className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Receba e desfrute</h3>
                <p className="text-center text-muted-foreground">
                  Receba seu pedido rapidamente e aproveite sua refeição.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

