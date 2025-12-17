import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db-postgres';

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({ 
      success: true, 
      message: 'Base de datos inicializada correctamente' 
    });
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al inicializar la base de datos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
