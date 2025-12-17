import { sql } from '@vercel/postgres'

export interface Product {
  id: number
  name: string
  size: number
  price: number
  description: string | null
  points_reward?: number
  created_at?: string
}

export interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
  loyalty_points?: number
  created_at?: string
}

export interface Address {
  id: number
  customer_id: number
  address: string
  latitude: number | null
  longitude: number | null
  is_default?: boolean
  created_at?: string
}

export interface Order {
  id: number
  customer_id: number
  address_id?: number
  total: number
  status: string
  points_earned?: number
  created_at?: string
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
  active?: boolean
  created_at?: string
}

// Product queries
export const getProducts = async (): Promise<Product[]> => {
  const { rows } = await sql<Product>`
    SELECT * FROM products ORDER BY size
  `
  return rows
}

export const getProductById = async (id: number): Promise<Product | undefined> => {
  const { rows } = await sql<Product>`
    SELECT * FROM products WHERE id = ${id}
  `
  return rows[0]
}

// Customer queries
export const getCustomerById = async (id: number): Promise<Customer | undefined> => {
  const { rows } = await sql<Customer>`
    SELECT * FROM customers WHERE id = ${id}
  `
  return rows[0]
}

export const createCustomer = async (name: string, email: string, phone: string): Promise<number> => {
  const { rows } = await sql`
    INSERT INTO customers (name, email, phone)
    VALUES (${name}, ${email}, ${phone})
    RETURNING id
  `
  return rows[0].id
}

export const updateCustomerPoints = async (customerId: number, points: number): Promise<void> => {
  await sql`
    UPDATE customers 
    SET loyalty_points = COALESCE(loyalty_points, 0) + ${points}
    WHERE id = ${customerId}
  `
}

// Order queries
export const getOrdersByCustomerId = async (customerId: number): Promise<Order[]> => {
  const { rows } = await sql<Order>`
    SELECT * FROM orders 
    WHERE customer_id = ${customerId}
    ORDER BY created_at DESC
  `
  return rows
}

export const createOrder = async (
  customerId: number, 
  addressId: number, 
  total: number, 
  pointsEarned: number
): Promise<number> => {
  const { rows } = await sql`
    INSERT INTO orders (customer_id, address_id, total, points_earned)
    VALUES (${customerId}, ${addressId}, ${total}, ${pointsEarned})
    RETURNING id
  `
  return rows[0].id
}

export const addOrderItem = async (
  orderId: number, 
  productId: number, 
  quantity: number, 
  price: number
): Promise<void> => {
  await sql`
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (${orderId}, ${productId}, ${quantity}, ${price})
  `
}

// Delivery location queries
export const getDeliveryLocations = async (): Promise<DeliveryLocation[]> => {
  const { rows } = await sql<DeliveryLocation>`
    SELECT * FROM delivery_locations 
    WHERE active = true
  `
  return rows
}

