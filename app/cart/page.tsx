'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, MapPin } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, selectedLocation, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <Link href="/map" className="text-gray-600 hover:text-primary-500">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-lg font-bold text-gray-900">Carrito de Compras</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Agrega productos desde un acopio para comenzar</p>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <MapPin className="h-5 w-5" />
            Ver Acopios
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/map" className="text-gray-600 hover:text-primary-500">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Carrito de Compras</h1>
                <p className="text-xs text-gray-500">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
        {/* Selected Location */}
        {selectedLocation && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-primary-900">
              <MapPin className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Punto de retiro seleccionado</p>
                <p className="font-bold">{selectedLocation.name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md divide-y">
          {cart.map((item) => (
            <div key={item.product.id} className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                {/* Product Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">💧</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.product.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-lg font-bold text-primary-600">
                      ${item.product.price.toFixed(2)}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      +{item.product.points_reward} pts c/u
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Eliminar"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="bg-white rounded-md p-2 hover:bg-gray-200 transition"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="bg-white rounded-md p-2 hover:bg-gray-200 transition"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-gray-900">
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Productos ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span className="text-green-600 font-medium">GRATIS</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Puntos a ganar</span>
              <span className="font-semibold">
                +{cart.reduce((total, item) => total + (item.product.points_reward * item.quantity), 0)} puntos
              </span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-6 w-6" />
            Proceder al Pago
          </button>

          <Link
            href="/map"
            className="block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Agregar más productos
          </Link>
        </div>
      </div>

      {/* Checkout Modal - Placeholder */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximamente</h2>
            <p className="text-gray-600 mb-6">
              El proceso de pago estará disponible próximamente. Aquí podrás:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Ingresar datos de entrega
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Seleccionar método de pago
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Confirmar tu pedido
              </li>
            </ul>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
