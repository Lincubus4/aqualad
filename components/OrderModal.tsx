'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Minus, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  size: number
  price: number
  description: string | null
  points_reward: number
}

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  locationId: number
  locationName: string
}

export default function OrderModal({ isOpen, onClose, locationId, locationName }: OrderModalProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart, setSelectedLocation } = useCart()
  const [quantities, setQuantities] = useState<Record<number, number>>({})

  useEffect(() => {
    if (isOpen) {
      // Fetch products
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))

      // Set selected location in cart context
      setSelectedLocation({ id: locationId, name: locationName })
    }
  }, [isOpen, locationId, locationName, setSelectedLocation])

  if (!isOpen) return null

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }))
  }

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1
    addToCart(product, quantity)
    setQuantities(prev => ({ ...prev, [product.id]: 0 }))
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-bold">Selecciona tus productos</h2>
              <p className="text-sm text-primary-100 mt-1">📍 {locationName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="text-gray-500 mt-4">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">💧</p>
                <p className="text-gray-600">No hay productos disponibles</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-3xl">💧</span>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-2xl font-bold text-primary-600">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            +{product.points_reward} puntos
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="bg-white rounded-md p-2 hover:bg-gray-200 transition disabled:opacity-50"
                            disabled={!quantities[product.id]}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {quantities[product.id] || 0}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="bg-white rounded-md p-2 hover:bg-gray-200 transition"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!quantities[product.id]}
                          className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <ShoppingCart className="h-5 w-5" />
              Ver Carrito
            </Link>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Seguir viendo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
