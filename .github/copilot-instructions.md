# Aqualad - Water Bottle Delivery WebApp

## Project Overview
Water bottle delivery service webapp with geolocation, order management, and loyalty program.

## Technology Stack
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Leaflet/OpenStreetMap (free maps API)
- SQLite (local database)
- React Leaflet for map components
- React Context API for global state

## Project Status
✅ Project structure created
✅ Database with Guayaquil locations
✅ Interactive map with animations
✅ Accordion sidebar with location details
✅ Animated markers (pulse/bounce)
✅ Product catalog system
✅ Shopping cart with global state
✅ Order modal
✅ Complete order flow
🚧 Payment system (coming soon)

## Location
- **City**: Guayaquil, Ecuador
- **Default coords**: Junín y Malecón (-2.1894, -79.8836)
- **5 sample locations** near downtown area

## Key Features
1. **Map Page** (`/map`):
   - Sidebar with expandable location cards
   - Smooth accordion animations
   - Distance calculation from user location
   - Animated markers on selection
   - "Hacer Pedido" button per location

2. **Order Modal**:
   - Product catalog (5L, 10L, 20L bottles)
   - Quantity selectors
   - Add to cart functionality
   - Prices in USD

3. **Shopping Cart** (`/cart`):
   - View all items
   - Update quantities
   - Remove items
   - Total calculation
   - Loyalty points display
   - Checkout flow (placeholder)

4. **Admin Panel** (`/admin/locations`):
   - Add/edit locations
   - Set operating hours
   - Phone numbers
   - Map picker for coordinates

## Important Notes
- React Strict Mode is DISABLED (Leaflet compatibility)
- No API keys needed (OpenStreetMap is free)
- Database regenerates automatically with seed data
- Prices in USD (Ecuador's currency)
