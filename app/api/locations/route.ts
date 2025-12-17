import { getLocations } from '@/lib/db-postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const locations = await getLocations()
    return NextResponse.json(locations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
  }
}
