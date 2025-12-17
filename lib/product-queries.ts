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

export function getProducts(): Product[] {
  const stmt = db.prepare('SELECT * FROM products ORDER BY size ASC')
  return stmt.all() as Product[]
}

export function getProductById(id: number): Product | undefined {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?')
  return stmt.get(id) as Product | undefined
}
