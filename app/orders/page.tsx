import Link from 'next/link'
import { ArrowLeft, Package, CheckCircle, Clock, Truck } from 'lucide-react'

// Mock data - in real app, this would come from database
const mockOrders = [
  {
    id: 1,
    date: '2025-12-16',
    total: 240,
    status: 'delivered',
    items: [
      { name: 'Botellón 20L', quantity: 2, price: 120 }
    ],
    points: 40
  },
  {
    id: 2,
    date: '2025-12-10',
    total: 160,
    status: 'in_transit',
    items: [
      { name: 'Botellón 10L', quantity: 2, price: 80 }
    ],
    points: 20
  },
  {
    id: 3,
    date: '2025-12-05',
    total: 50,
    status: 'delivered',
    items: [
      { name: 'Botellón 5L', quantity: 1, price: 50 }
    ],
    points: 5
  }
]

function getStatusInfo(status: string) {
  switch (status) {
    case 'delivered':
      return { icon: CheckCircle, text: 'Entregado', color: 'text-green-600', bg: 'bg-green-50' }
    case 'in_transit':
      return { icon: Truck, text: 'En camino', color: 'text-blue-600', bg: 'bg-blue-50' }
    case 'pending':
      return { icon: Clock, text: 'Pendiente', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    default:
      return { icon: Package, text: 'Procesando', color: 'text-gray-600', bg: 'bg-gray-50' }
  }
}

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-primary-500">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Mis Pedidos</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Historial de Pedidos</h2>
          <Link
            href="/orders/new"
            className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition"
          >
            Nuevo Pedido
          </Link>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status)
            const StatusIcon = statusInfo.icon

            return (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Pedido #{order.id}</h3>
                    <p className="text-gray-500 text-sm">{order.date}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                    <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                    <span className={`text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.text}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2">
                      <span className="text-gray-700">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold">Total: ${order.total}</p>
                      <p className="text-sm text-green-600">+{order.points} puntos ganados</p>
                    </div>
                    <button className="text-primary-500 hover:text-primary-600 font-semibold">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {mockOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tienes pedidos aún
            </h3>
            <p className="text-gray-500 mb-6">
              Realiza tu primer pedido y comienza a ganar puntos
            </p>
            <Link
              href="/orders/new"
              className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
            >
              Hacer mi primer pedido
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
