# Aqualad - Water Bottle Delivery WebApp

Sistema de entrega de botellones de agua con geolocalización, gestión de pedidos y programa de lealtad.

## 🚀 Características

- ✅ **Catálogo de Productos**: Botellones de 5L, 10L y 20L
- ✅ **Sistema de Pedidos**: Interfaz intuitiva para realizar pedidos
- ✅ **Geolocalización**: Mapa interactivo con OpenStreetMap/Leaflet (100% gratuito)
- ✅ **Puntos de Entrega**: Visualiza sucursales cercanas en el mapa
- ✅ **Cálculo de Distancia**: Muestra automáticamente los 3 acopios más cercanos
- ✅ **Panel de Administración**: Gestiona ubicaciones de acopios de agua
- ✅ **Selector de Ubicación en Mapa**: Click en el mapa para marcar ubicaciones
- ✅ **Programa de Lealtad**: Acumula puntos y canjea recompensas
- ✅ **Base de Datos Local**: SQLite para almacenamiento persistente
- ✅ **Diseño Responsivo**: Optimizado para móviles y desktop

## 🗺️ Panel de Administración

El administrador puede:
- ✨ **Agregar nuevos acopios** haciendo click en el mapa
- ✏️ **Editar información** de acopios existentes
- 🔄 **Activar/Desactivar** acopios (los inactivos no se muestran a usuarios)
- 🗑️ **Eliminar** acopios
- 📊 **Ver estadísticas** de acopios activos/inactivos

**Acceso:** `/admin/locations` o desde el botón "Admin" en el header

## 🛠️ Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Mapas**: Leaflet + React Leaflet (OpenStreetMap)
- **Base de Datos**: SQLite con better-sqlite3
- **Iconos**: Lucide React

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

## 🗂️ Estructura del Proyecto

```
aqualad/
├── app/                      # Páginas de Next.js (App Router)
│   ├── page.tsx             # Página principal
│   ├── layout.tsx           # Layout principal
│   ├── globals.css          # Estilos globales
│   ├── map/                 # Página de mapa
│   ├── orders/              # Páginas de pedidos
│   │   ├── page.tsx        # Lista de pedidos
│   │   └── new/page.tsx    # Nuevo pedido
│   ├── loyalty/             # Programa de lealtad
│   │   └── page.tsx
│   └── admin/               # Panel de administración
│       ├── actions.ts       # Server actions
│       └── locations/       # Gestión de acopios
│           ├── page.tsx
│           └── LocationsAdmin.tsx
├── components/              # Componentes React
│   ├── LocationMap.tsx      # Componente de mapa (wrapper)
│   ├── MapComponent.tsx     # Componente de mapa (Leaflet)
│   └── LocationPicker.tsx   # Selector de ubicación
├── lib/                     # Utilidades y lógica
│   ├── database.ts          # Configuración de SQLite
│   ├── queries.ts           # Consultas a la base de datos
│   └── location-queries.ts  # Consultas de ubicaciones
├── public/                  # Archivos estáticos
├── aqualad.db              # Base de datos SQLite (generada automáticamente)
└── package.json
```

## 💾 Base de Datos

La base de datos SQLite se crea automáticamente al iniciar la aplicación con las siguientes tablas:

- **products**: Catálogo de botellones
- **customers**: Información de clientes
- **addresses**: Direcciones de entrega
- **orders**: Pedidos realizados
- **order_items**: Detalles de cada pedido
- **delivery_locations**: Puntos de entrega/sucursales (gestionados por admin)

## 🗺️ Sistema de Mapas

- Usa **OpenStreetMap** (gratuito, sin límites de API)
- **Geolocalización del usuario** para mostrar ubicación actual
- **Cálculo automático de distancias** usando fórmula Haversine
- **Muestra los 3 acopios más cercanos** con distancia en km
- **Marcadores personalizados** para sucursales y usuario
- **Popups informativos** con detalles de cada ubicación
- **Click en el mapa** para seleccionar ubicaciones (modo admin)

## 🎯 Programa de Lealtad

- Gana puntos con cada compra
- Sistema de niveles (Bronze, Silver, Gold)
- Recompensas canjeables
- Historial de actividad

## 👨‍💼 Guía de Uso - Administrador

1. Accede a `/admin/locations` desde cualquier página
2. Click en "Agregar Acopio"
3. Llena el formulario con nombre y dirección
4. Click en "Seleccionar en el Mapa"
5. Haz click en el mapa donde está el acopio
6. Confirma la ubicación
7. Guarda el acopio

Los usuarios verán automáticamente los acopios más cercanos en la página `/map`

## 🚀 Próximos Pasos

- [ ] Implementar carrito de compras funcional
- [ ] Sistema de autenticación (login/registro real)
- [ ] API Routes para manejo de pedidos
- [ ] Pasarela de pagos
- [ ] Notificaciones de pedidos
- [ ] Tracking en tiempo real de entregas
- [ ] Dashboard de analíticas para admin

## 📝 Notas

- La base de datos se inicializa con datos de ejemplo (3 productos y 3 sucursales)
- Los permisos de geolocalización deben ser otorgados por el usuario
- El mapa requiere conexión a internet para cargar los tiles de OpenStreetMap
- Solo los acopios marcados como "activos" se muestran a los usuarios

## 🤝 Contribuciones

Este es un proyecto de demostración. Puedes adaptarlo según las necesidades de tu negocio.

## 📄 Licencia

MIT
