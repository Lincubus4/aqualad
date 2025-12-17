'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Settings } from 'lucide-react'
import dynamic from 'next/dynamic'
import LocationCard from '@/components/LocationCard'
import OrderModal from '@/components/OrderModal'

const LocationMap = dynamic(() => import('@/components/LocationMap'), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-200 animate-pulse flex items-center justify-center">
    <p className="text-gray-500">Cargando mapa...</p>
  </div>
})

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

export default function MapPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(true)
  const [orderModalLocation, setOrderModalLocation] = useState<{ id: number; name: string } | null>(null)

  useEffect(() => {
    // Fetch locations from API
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Get user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to Guayaquil (Junín y Malecón)
          setUserLocation([-2.1894, -79.8836])
        }
      )
    } else {
      // Default to Guayaquil (Junín y Malecón)
      setUserLocation([-2.1894, -79.8836])
    }
  }, [])

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleOrderClick = (location: Location) => {
    setOrderModalLocation({ id: location.id, name: location.name })
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const locationsWithDistance = userLocation
    ? locations.map(loc => ({
        ...loc,
        distance: calculateDistance(userLocation[0], userLocation[1], loc.latitude, loc.longitude)
      })).sort((a, b) => a.distance! - b.distance!)
    : locations

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-600 hover:text-primary-500">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Acopios Cercanos</h1>
                <p className="text-xs text-gray-500">{locations.length} puntos disponibles</p>
              </div>
            </div>
            <Link 
              href="/admin/locations"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-500"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Locations List */}
        <div className="w-full md:w-96 bg-gray-50 border-r overflow-y-auto">
          <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 border-b">
            <h2 className="font-semibold text-white flex items-center gap-2">
              📍 Acopios Cercanos
            </h2>
            {userLocation && (
              <p className="text-xs text-primary-100 mt-1">
                Ordenados por distancia a tu ubicación
              </p>
            )}
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Cargando acopios...</p>
            </div>
          ) : locationsWithDistance.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-4xl mb-3">📍</p>
              <p className="text-sm text-gray-600">No hay acopios registrados</p>
              <Link
                href="/admin/locations"
                className="inline-block mt-3 text-sm text-primary-500 hover:text-primary-600"
              >
                Agregar acopios
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {locationsWithDistance.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  isSelected={selectedLocation?.id === location.id}
                  onClick={() => handleLocationSelect(location)}
                  onOrderClick={handleOrderClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {locations.length > 0 ? (
            <LocationMap
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={handleLocationSelect}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <p className="text-6xl mb-4">🗺️</p>
                <p className="text-gray-600">No hay ubicaciones para mostrar</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      {orderModalLocation && (
        <OrderModal
          isOpen={true}
          onClose={() => setOrderModalLocation(null)}
          locationId={orderModalLocation.id}
          locationName={orderModalLocation.name}
        />
      )}
    </div>
  )
}
