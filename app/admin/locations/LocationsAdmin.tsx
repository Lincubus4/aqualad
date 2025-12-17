'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, MapPin, Phone, ToggleLeft, ToggleRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import { createLocation, updateLocation, toggleLocation, removeLocation } from '../actions'

const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false
})

interface Location {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone: string | null
  hours: string | null
  active: number
  created_at: string
}

interface LocationsAdminProps {
  initialLocations: Location[]
}

export default function LocationsAdmin({ initialLocations }: LocationsAdminProps) {
  const [locations, setLocations] = useState(initialLocations)
  const [showForm, setShowForm] = useState(false)
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    phone: '',
    hours: ''
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', formData.name)
    data.append('address', formData.address)
    data.append('latitude', formData.latitude)
    data.append('longitude', formData.longitude)
    data.append('phone', formData.phone)
    data.append('hours', formData.hours)

    let result
    if (editingId) {
      result = await updateLocation(editingId, data)
    } else {
      result = await createLocation(data)
    }

    if (result.success) {
      setMessage({ type: 'success', text: result.message })
      setShowForm(false)
      setEditingId(null)
      setFormData({ name: '', address: '', latitude: '', longitude: '', phone: '', hours: '' })
      // Refresh page to show new data
      window.location.reload()
    } else {
      setMessage({ type: 'error', text: result.message })
    }
  }

  const handleEdit = (location: Location) => {
    setEditingId(location.id)
    setFormData({
      name: location.name,
      address: location.address,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      phone: location.phone || '',
      hours: location.hours || ''
    })
    setShowForm(true)
  }

  const handleToggle = async (id: number) => {
    const result = await toggleLocation(id)
    if (result.success) {
      setMessage({ type: 'success', text: result.message })
      window.location.reload()
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta ubicación?')) {
      const result = await removeLocation(id)
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        window.location.reload()
      }
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lista de Acopios</h3>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ name: '', address: '', latitude: '', longitude: '', phone: '', hours: '' })
          }}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          {showForm ? 'Cancelar' : 'Agregar Acopio'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border-2 border-primary-500 rounded-lg p-6">
          <h4 className="font-semibold text-lg mb-4">
            {editingId ? 'Editar Acopio' : 'Nuevo Acopio'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Acopio *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ej: Acopio Centro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ej: Av. Principal 123, Colonia Centro"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitud *
                </label>
                <input
                  type="text"
                  required
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="19.432608"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitud *
                </label>
                <input
                  type="text"
                  required
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="-99.133209"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMapPicker(true)}
              className="w-full py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 flex items-center justify-center gap-2"
            >
              <MapPin className="h-5 w-5" />
              Seleccionar en el Mapa
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="555-1234-5678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horarios de Atención
              </label>
              <textarea
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ej: Lun-Vie: 8:00-18:00, Sáb: 9:00-14:00"
                rows={2}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: '', address: '', latitude: '', longitude: '', phone: '', hours: '' })
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
              >
                {editingId ? 'Actualizar' : 'Crear'} Acopio
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-lg">{location.name}</h4>
                  {location.active === 1 ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Activo
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                      Inactivo
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </span>
                  {location.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {location.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(location.id)}
                  className="p-2 text-gray-600 hover:text-primary-500"
                  title={location.active === 1 ? 'Desactivar' : 'Activar'}
                >
                  {location.active === 1 ? (
                    <ToggleRight className="h-6 w-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(location)}
                  className="p-2 text-gray-600 hover:text-primary-500"
                  title="Editar"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(location.id)}
                  className="p-2 text-gray-600 hover:text-red-500"
                  title="Eliminar"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {locations.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay acopios registrados
            </h3>
            <p className="text-gray-500">
              Agrega el primer acopio de agua para que los usuarios puedan verlo en el mapa
            </p>
          </div>
        )}
      </div>

      {showMapPicker && (
        <LocationPicker
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowMapPicker(false)}
        />
      )}
    </div>
  )
}
