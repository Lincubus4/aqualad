import Link from 'next/link'
import { ArrowLeft, Award, Gift, TrendingUp, Star } from 'lucide-react'

// Mock data - in real app, this would come from database
const mockCustomer = {
  name: 'Usuario Demo',
  points: 125,
  level: 'Silver',
  nextLevelPoints: 250
}

const rewards = [
  {
    id: 1,
    name: 'Botellón 5L Gratis',
    points: 100,
    description: 'Canjea por un botellón de 5L',
    available: true
  },
  {
    id: 2,
    name: '20% de Descuento',
    points: 150,
    description: 'Descuento en tu próxima compra',
    available: false
  },
  {
    id: 3,
    name: 'Botellón 10L Gratis',
    points: 200,
    description: 'Canjea por un botellón de 10L',
    available: false
  },
  {
    id: 4,
    name: 'Entrega Gratis (1 mes)',
    points: 300,
    description: 'Envíos gratis por 30 días',
    available: false
  }
]

const recentActivity = [
  { date: '2025-12-16', action: 'Compra de 2 botellones 20L', points: 40 },
  { date: '2025-12-10', action: 'Compra de 2 botellones 10L', points: 20 },
  { date: '2025-12-05', action: 'Compra de 1 botellón 5L', points: 5 },
  { date: '2025-12-01', action: 'Bono de bienvenida', points: 50 }
]

export default function LoyaltyPage() {
  const progressPercent = (mockCustomer.points / mockCustomer.nextLevelPoints) * 100

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-primary-500">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Programa de Lealtad</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Points Card */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary-100 mb-1">Hola, {mockCustomer.name}</p>
              <h2 className="text-3xl font-bold">Nivel {mockCustomer.level}</h2>
            </div>
            <div className="bg-white/20 p-4 rounded-full">
              <Award className="h-12 w-12" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tus puntos</span>
              <span>{mockCustomer.points} / {mockCustomer.nextLevelPoints}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-primary-100">
              {mockCustomer.nextLevelPoints - mockCustomer.points} puntos para el siguiente nivel
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">{mockCustomer.points}</div>
              <div className="text-xs text-primary-100">Puntos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-primary-100">Pedidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1</div>
              <div className="text-xs text-primary-100">Recompensas</div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-6 w-6 text-primary-500" />
            <h3 className="text-2xl font-bold">Recompensas Disponibles</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  !reward.available ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{reward.name}</h4>
                    <p className="text-gray-600 text-sm">{reward.description}</p>
                  </div>
                  {reward.available && (
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-primary-500 font-bold text-lg">
                    {reward.points} puntos
                  </span>
                  <button
                    disabled={!reward.available}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      reward.available
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {reward.available ? 'Canjear' : 'Bloqueado'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary-500" />
            <h3 className="text-2xl font-bold">Actividad Reciente</h3>
          </div>

          <div className="bg-white rounded-lg shadow-md divide-y">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="text-green-600 font-bold">+{activity.points}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">¿Cómo funciona?</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="font-bold text-primary-500">1.</span>
              <p>Gana puntos con cada compra (1 punto por cada peso gastado)</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary-500">2.</span>
              <p>Acumula puntos para desbloquear recompensas exclusivas</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary-500">3.</span>
              <p>Canjea tus puntos por descuentos, productos gratis y más</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary-500">4.</span>
              <p>Sube de nivel para obtener beneficios adicionales</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
