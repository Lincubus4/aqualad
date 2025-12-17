import db from './database'

export interface Product {
  id: number
  name: string
  size: number
  price: number
  description: string | null
  points_reward: number
  created_at: string
}

export interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
  loyalty_points: number
  created_at: string
}

export interface Address {
  id: number
  customer_id: number
  address: string
  latitude: number | null
  longitude: number | null
  is_default: number
  created_at: string
}

export interface Order {
  id: number
  customer_id: number
  address_id: number
  total: number
  status: string
  points_earned: number
  created_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
}

export interface DeliveryLocation {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone: string | null
  active: number
  created_at: string
}

// Product queries
export const getProducts = () => {
  return db.prepare('SELECT * FROM products ORDER BY size').all() as Product[]
}

export const getProductById = (id: number) => {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id) as Product | undefined
}

// Customer queries
export const getCustomerById = (id: number) => {
  return db.prepare('SELECT * FROM customers WHERE id = ?').get(id) as Customer | undefined
}

export const createCustomer = (name: string, email: string, phone: string) => {
  const stmt = db.prepare('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)')
  const result = stmt.run(name, email, phone)
  return result.lastInsertRowid
}

export const updateCustomerPoints = (customerId: number, points: number) => {
  const stmt = db.prepare('UPDATE customers SET loyalty_points = loyalty_points + ? WHERE id = ?')
  stmt.run(points, customerId)
}

// Order queries
export const getOrdersByCustomerId = (customerId: number) => {
  return db.prepare('SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC').all(customerId) as Order[]
}

export const createOrder = (customerId: number, addressId: number, total: number, pointsEarned: number) => {
  const stmt = db.prepare('INSERT INTO orders (customer_id, address_id, total, points_earned) VALUES (?, ?, ?, ?)')
  const result = stmt.run(customerId, addressId, total, pointsEarned)
  return result.lastInsertRowid
}

export const addOrderItem = (orderId: number, productId: number, quantity: number, price: number) => {
  const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)')
  stmt.run(orderId, productId, quantity, price)
}

// Delivery location queries
export const getDeliveryLocations = () => {
  return db.prepare('SELECT * FROM delivery_locations WHERE active = 1').all() as DeliveryLocation[]
}
