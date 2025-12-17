'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { X, MapPin } from 'lucide-react'
import { useMapEvents } from 'react-leaflet'
import type { LeafletMouseEvent } from 'leaflet'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void
  initialPosition?: [number, number]
  onClose: () => void
}

function LocationMarker({ 
  position, 
  onPositionChange 
}: { 
  position: [number, number] | null
  onPositionChange: (lat: number, lng: number) => void 
}) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      onPositionChange(e.latlng.lat, e.latlng.lng)
    },
  })

  return position === null ? null : <Marker position={position} />
}

export default function LocationPicker({ 
  onLocationSelect, 
  initialPosition = [-0.1807, -78.4678], // Quito, Ecuador
  onClose 
}: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition([lat, lng])
  }

  const handleConfirm = () => {
    if (position) {
      onLocationSelect(position[0], position[1])
      onClose()
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-500" />
            <h3 className="text-lg font-semibold">Selecciona la ubicación en el mapa</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 bg-blue-50 border-b">
          <p className="text-sm text-blue-800">
            💡 Haz clic en el mapa para marcar la ubicación del acopio de agua
          </p>
          {position && (
            <p className="text-xs text-gray-600 mt-2">
              Ubicación seleccionada: {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          )}
        </div>

        <div className="flex-1 relative min-h-[400px]">
          <MapContainer
            center={initialPosition}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} onPositionChange={handlePositionChange} />
          </MapContainer>
        </div>

        <div className="p-4 border-t flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!position}
            className={`px-6 py-2 rounded-lg font-semibold ${
              position
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirmar Ubicación
          </button>
        </div>
      </div>
    </div>
  )
}
