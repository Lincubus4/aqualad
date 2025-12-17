import db from './database'

export interface DeliveryLocation {
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

// Get all delivery locations
export const getDeliveryLocations = () => {
  return db.prepare('SELECT * FROM delivery_locations WHERE active = 1 ORDER BY name').all() as DeliveryLocation[]
}

// Get all locations (including inactive) - for admin
export const getAllDeliveryLocations = () => {
  return db.prepare('SELECT * FROM delivery_locations ORDER BY created_at DESC').all() as DeliveryLocation[]
}

// Add new delivery location
export const addDeliveryLocation = (
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  phone: string | null,
  hours: string | null
) => {
  const stmt = db.prepare(`
    INSERT INTO delivery_locations (name, address, latitude, longitude, phone, hours)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(name, address, latitude, longitude, phone, hours)
  return result.lastInsertRowid
}

// Update delivery location
export const updateDeliveryLocation = (
  id: number,
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  phone: string | null,
  hours: string | null
) => {
  const stmt = db.prepare(`
    UPDATE delivery_locations
    SET name = ?, address = ?, latitude = ?, longitude = ?, phone = ?, hours = ?
    WHERE id = ?
  `)
  stmt.run(name, address, latitude, longitude, phone, hours, id)
}

// Toggle location active status
export const toggleLocationActive = (id: number) => {
  const stmt = db.prepare(`
    UPDATE delivery_locations
    SET active = CASE WHEN active = 1 THEN 0 ELSE 1 END
    WHERE id = ?
  `)
  stmt.run(id)
}

// Delete delivery location
export const deleteDeliveryLocation = (id: number) => {
  const stmt = db.prepare('DELETE FROM delivery_locations WHERE id = ?')
  stmt.run(id)
}

// Calculate distance between two points (Haversine formula)
export const calculateDistance = (
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

// Get nearest locations to user
export const getNearestLocations = (userLat: number, userLon: number, limit: number = 5) => {
  const locations = getDeliveryLocations()
  
  const locationsWithDistance = locations.map(loc => ({
    ...loc,
    distance: calculateDistance(userLat, userLon, loc.latitude, loc.longitude)
  }))
  
  return locationsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}
