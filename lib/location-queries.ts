import { sql } from '@vercel/postgres'

export interface DeliveryLocation {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone: string | null
  hours: string | null
  active?: boolean
  created_at?: string
}

// Get all delivery locations (active only)
export const getDeliveryLocations = async (): Promise<DeliveryLocation[]> => {
  const { rows } = await sql<DeliveryLocation>`
    SELECT * FROM delivery_locations 
    WHERE active = true 
    ORDER BY name
  `
  return rows
}

// Get all locations (including inactive) - for admin
export const getAllDeliveryLocations = async (): Promise<DeliveryLocation[]> => {
  const { rows } = await sql<DeliveryLocation>`
    SELECT * FROM delivery_locations 
    ORDER BY created_at DESC
  `
  return rows
}

// Add new delivery location
export const addDeliveryLocation = async (
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  phone: string | null,
  hours: string | null
): Promise<number> => {
  const { rows } = await sql`
    INSERT INTO delivery_locations (name, address, latitude, longitude, phone, hours)
    VALUES (${name}, ${address}, ${latitude}, ${longitude}, ${phone}, ${hours})
    RETURNING id
  `
  return rows[0].id
}

// Update delivery location
export const updateDeliveryLocation = async (
  id: number,
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  phone: string | null,
  hours: string | null
): Promise<void> => {
  await sql`
    UPDATE delivery_locations
    SET name = ${name}, 
        address = ${address}, 
        latitude = ${latitude}, 
        longitude = ${longitude}, 
        phone = ${phone}, 
        hours = ${hours}
    WHERE id = ${id}
  `
}

// Toggle location active status
export const toggleLocationActive = async (id: number): Promise<void> => {
  await sql`
    UPDATE delivery_locations
    SET active = NOT active
    WHERE id = ${id}
  `
}

// Delete delivery location
export const deleteDeliveryLocation = async (id: number): Promise<void> => {
  await sql`
    DELETE FROM delivery_locations 
    WHERE id = ${id}
  `
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
export const getNearestLocations = async (
  userLat: number, 
  userLon: number, 
  limit: number = 5
): Promise<Array<DeliveryLocation & { distance: number }>> => {
  const locations = await getDeliveryLocations()
  
  const locationsWithDistance = locations.map(loc => ({
    ...loc,
    distance: calculateDistance(userLat, userLon, loc.latitude, loc.longitude)
  }))
  
  return locationsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

