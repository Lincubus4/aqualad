'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState, useMemo } from 'react'
import L from 'leaflet'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in react-leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Custom icon for selected location (red with animation)
const selectedIcon = L.divIcon({
  className: 'custom-selected-marker',
  html: `
    <div class="relative">
      <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" style="width: 40px; height: 40px; margin-left: -7.5px; margin-top: -7.5px;"></div>
      <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" style="width: 25px; height: 41px;" />
    </div>
  `,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

L.Marker.prototype.options.icon = defaultIcon

// Custom icon for user location (blue circle with pulse)
const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `
    <div class="relative">
      <div class="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" style="width: 24px; height: 24px; margin-left: -2px; margin-top: -2px;"></div>
      <div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); position: relative; z-index: 10;"></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

interface Location {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone: string | null
  hours: string | null
}

interface MapComponentProps {
  locations: Location[]
  center: [number, number]
  zoom: number
  userLocation: [number, number] | null
  selectedLocation?: Location | null
  onLocationSelect?: (location: Location) => void
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  
  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom())
    }
  }, [center, map])
  
  return null
}

let mapInstanceCounter = 0

export default function MapComponent({ 
  locations, 
  center, 
  zoom, 
  userLocation,
  selectedLocation,
  onLocationSelect 
}: MapComponentProps) {
  const [isClient, setIsClient] = useState(false)
  const mapId = useMemo(() => `map-${++mapInstanceCounter}`, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    )
  }

  return (
    <div key={mapId} className="h-96 rounded-lg overflow-hidden shadow-lg z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        style={{ height: '100%', width: '100%' }}
      >
        <MapUpdater center={center} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">Tu ubicación</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Delivery location markers */}
        {locations.map((location) => {
          const isSelected = selectedLocation?.id === location.id
          
          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={isSelected ? selectedIcon : defaultIcon}
              eventHandlers={{
                click: () => onLocationSelect?.(location),
              }}
            >
              <Popup autoClose={false} closeOnClick={false}>
                <div className="text-sm space-y-2 min-w-[200px]">
                  <p className="font-bold text-primary-600 text-base">{location.name}</p>
                  <div className="space-y-1">
                    <p className="flex items-start gap-1 text-gray-700">
                      <span className="text-xs">📍</span>
                      <span>{location.address}</span>
                    </p>
                    {location.hours && (
                      <p className="flex items-start gap-1 text-gray-700">
                        <span className="text-xs">🕐</span>
                        <span>{location.hours}</span>
                      </p>
                    )}
                    {location.phone && (
                      <p className="flex items-start gap-1 text-gray-700">
                        <span className="text-xs">📞</span>
                        <span>{location.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
