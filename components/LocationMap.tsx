'use client'

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Navigation } from 'lucide-react'

// Import Leaflet dynamically to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
    <p className="text-gray-500">Cargando mapa...</p>
  </div>
})

export interface Location {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone: string | null
  hours: string | null
  distance?: number
}

interface LocationMapProps {
  locations: Location[]
  center?: [number, number]
  zoom?: number
  selectedLocation?: Location | null
  onLocationSelect?: (location: Location) => void
}

export default function LocationMap({ 
  locations, 
  center = [-0.1807, -78.4678], // Quito, Ecuador default
  zoom = 12,
  selectedLocation,
  onLocationSelect 
}: LocationMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt')
  const [nearestLocations, setNearestLocations] = useState<Location[]>([])
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  useEffect(() => {
    // Request user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLon = position.coords.longitude
          setUserLocation([userLat, userLon])
          setLocationPermission('granted')
          setIsLoadingLocation(false)

          // Calculate distances and find nearest locations
          const locationsWithDistance = locations.map(loc => ({
            ...loc,
            distance: calculateDistance(userLat, userLon, loc.latitude, loc.longitude)
          }))

          const sorted = locationsWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3)

          setNearestLocations(sorted)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationPermission('denied')
          setIsLoadingLocation(false)
        }
      )
    } else {
      setIsLoadingLocation(false)
    }
  }, [locations])

  return (
    <div className="space-y-4">
      {locationPermission === 'prompt' && isLoadingLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Navigation className="h-5 w-5 text-blue-600 mt-0.5 animate-pulse" />
          <div>
            <p className="text-sm text-blue-800 font-medium">
              Obteniendo tu ubicación...
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Esto nos ayudará a mostrarte los acopios más cercanos
            </p>
          </div>
        </div>
      )}

      {locationPermission === 'denied' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <MapPin className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800 font-medium">
              Permisos de ubicación no otorgados
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              Para ver los locales cercanos a ti, por favor, asegúrate de dar los permisos de Ubicación a tu navegador y luego refresca la página.
            </p>
          </div>
        </div>
      )}

      {locationPermission === 'granted' && nearestLocations.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-green-800 mb-3">
            🎯 Acopios más cercanos a ti:
          </h4>
          <div className="space-y-2">
            {nearestLocations.map((loc, idx) => (
              <div key={loc.id} className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium text-green-900">{idx + 1}. {loc.name}</span>
                  <span className="text-green-700 ml-2">{loc.address}</span>
                </div>
                <span className="text-green-600 font-semibold">
                  {loc.distance!.toFixed(1)} km
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {locations.length > 0 && (
        <MapComponent
          key={`map-${userLocation ? 'user' : 'default'}`}
          locations={locations}
          center={selectedLocation ? [selectedLocation.latitude, selectedLocation.longitude] : (userLocation || center)}
          zoom={selectedLocation ? 15 : (userLocation ? 13 : zoom)}
          userLocation={userLocation}
          selectedLocation={selectedLocation}
          onLocationSelect={onLocationSelect}
        />
      )}
    </div>
  )
}
