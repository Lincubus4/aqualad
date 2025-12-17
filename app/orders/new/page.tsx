import { getProducts } from '@/lib/queries'
import Link from 'next/link'
import { ArrowLeft, Droplet, Plus } from 'lucide-react'

export default async function NewOrderPage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-primary-500">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Pedido</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            ℹ️ Selecciona los productos que deseas ordenar. Ganarás puntos de lealtad con cada compra.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Selecciona tus productos</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Droplet
                    className={`h-12 w-12 ${
                      product.size === 5
                        ? 'text-blue-400'
                        : product.size === 10
                        ? 'text-blue-500'
                        : 'text-blue-600'
                    }`}
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-primary-500">
                    ${product.price}
                  </p>
                  <p className="text-sm text-green-600">
                    +{product.points_reward} puntos
                  </p>
                </div>
              </div>

              <button className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Información de Entrega</h3>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="555-1234-5678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección de entrega
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                placeholder="Calle, número, colonia, ciudad"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="/"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition"
              >
                Confirmar Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
