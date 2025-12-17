import Link from 'next/link'
import { Droplet, MapPin, Award, ShoppingCart, Settings } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="h-8 w-8 text-primary-500" />
              <h1 className="text-2xl font-bold text-gray-900">Aqualad</h1>
            </div>
            <nav className="flex gap-4 items-center">
              <Link href="/orders" className="text-gray-600 hover:text-primary-500">
                Pedidos
              </Link>
              <Link href="/loyalty" className="text-gray-600 hover:text-primary-500">
                Puntos
              </Link>
              <Link 
                href="/admin/locations" 
                className="flex items-center gap-1 text-gray-600 hover:text-primary-500"
                title="Panel de Administración"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">Admin</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Agua Pura a tu Puerta
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Pedidos rápidos de botellones de agua con entrega a domicilio
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/orders/new"
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
            >
              Hacer Pedido
            </Link>
            <Link
              href="/map"
              className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition"
            >
              Ver Mapa
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MapPin className="h-12 w-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Geolocalización</h3>
            <p className="text-gray-600">
              Encuentra puntos de entrega cercanos a tu ubicación
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <ShoppingCart className="h-12 w-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pedidos Fáciles</h3>
            <p className="text-gray-600">
              Ordena botellones de 5L, 10L o 20L en segundos
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-12 w-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Programa de Lealtad</h3>
            <p className="text-gray-600">
              Gana puntos con cada compra y obtén recompensas
            </p>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">Nuestros Productos</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-center">
              <Droplet className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Botellón 5L</h4>
              <p className="text-gray-600 mb-4">Ideal para uso personal</p>
              <p className="text-2xl font-bold text-primary-500">$50</p>
              <button className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600">
                Agregar
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-2 border-primary-500">
            <div className="text-center">
              <div className="relative">
                <Droplet className="h-20 w-20 text-blue-500 mx-auto mb-4" />
                <span className="absolute top-0 right-1/4 bg-yellow-400 text-xs px-2 py-1 rounded-full font-bold">
                  Popular
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Botellón 10L</h4>
              <p className="text-gray-600 mb-4">Perfecto para familias</p>
              <p className="text-2xl font-bold text-primary-500">$80</p>
              <button className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600">
                Agregar
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-center">
              <Droplet className="h-24 w-24 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Botellón 20L</h4>
              <p className="text-gray-600 mb-4">Máxima capacidad</p>
              <p className="text-2xl font-bold text-primary-500">$120</p>
              <button className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
