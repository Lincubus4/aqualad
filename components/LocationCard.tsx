'use client'

import { useState } from 'react'
import { MapPin, Phone, Clock, ChevronDown, ShoppingCart } from 'lucide-react'

interface Location {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone: string | null
  hours: string | null
  distance?: number
}

interface LocationCardProps {
  location: Location
  isSelected: boolean
  onClick: () => void
  onOrderClick: (location: Location) => void
}

export default function LocationCard({ location, isSelected, onClick, onOrderClick }: LocationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
    onClick()
  }

  return (
    <div
      className={`
        bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer
        ${isSelected ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-xl'}
      `}
    >
      {/* Header - Always visible */}
      <div 
        onClick={handleClick}
        className="p-4 flex items-start justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className={`h-5 w-5 ${isSelected ? 'text-primary-500' : 'text-gray-400'}`} />
            <h3 className="font-semibold text-gray-900">{location.name}</h3>
          </div>
          <p className="text-sm text-gray-600 ml-7">{location.address}</p>
          {location.distance !== undefined && (
            <span className="inline-block mt-2 ml-7 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              📍 {location.distance.toFixed(1)} km
            </span>
          )}
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Expandable content */}
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
          {/* Hours */}
          {location.hours && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">Horarios de atención</p>
                <p className="text-sm text-gray-700">{location.hours}</p>
              </div>
            </div>
          )}

          {/* Phone */}
          {location.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">Teléfono</p>
                <a 
                  href={`tel:${location.phone}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {location.phone}
                </a>
              </div>
            </div>
          )}

          {/* Order Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onOrderClick(location)
            }}
            className="w-full mt-2 bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            Hacer Pedido
          </button>
        </div>
      </div>
    </div>
  )
}
