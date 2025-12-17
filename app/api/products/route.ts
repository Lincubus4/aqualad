import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/product-queries'

export async function GET() {
  try {
    const products = getProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
