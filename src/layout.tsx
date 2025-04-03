import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import MainNav from "@/components/main-nav"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sabor Express - Sistema de Pedidos",
  description: "Sistema de pedidos online para restaurantes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MainNav />
          {children}
          <footer className="border-t py-6 md:py-10">
            <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2024 Sabor Express. Todos os direitos reservados.
              </p>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

