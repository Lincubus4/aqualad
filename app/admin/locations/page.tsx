import { getAllDeliveryLocations } from '@/lib/location-queries'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LocationsAdmin from './LocationsAdmin'

export default async function AdminLocationsPage() {
  const locations = await getAllDeliveryLocations()

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-2 border-primary-500">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/map" className="text-gray-600 hover:text-primary-500">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Gestión de Acopios de Agua</p>
              </div>
            </div>
            <div className="bg-primary-100 px-3 py-1 rounded-full">
              <span className="text-primary-700 font-semibold text-sm">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Acopios de Agua Registrados</h2>
              <p className="text-gray-600 text-sm mt-1">
                Administra las ubicaciones donde los usuarios pueden recoger o pedir agua
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-500">{locations.length}</div>
              <div className="text-sm text-gray-600">Ubicaciones</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {locations.filter(l => l.active === true).length}
              </div>
              <div className="text-sm text-green-700">Activos</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">
                {locations.filter(l => l.active === false).length}
              </div>
              <div className="text-sm text-gray-700">Inactivos</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {locations.length}
              </div>
              <div className="text-sm text-blue-700">Total</div>
            </div>
          </div>
        </div>

        <LocationsAdmin initialLocations={locations} />
      </div>
    </main>
  )
}
