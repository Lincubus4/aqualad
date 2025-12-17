'use server'

import { 
  addDeliveryLocation, 
  updateDeliveryLocation, 
  toggleLocationActive,
  deleteDeliveryLocation 
} from '@/lib/location-queries'
import { revalidatePath } from 'next/cache'

export async function createLocation(formData: FormData) {
  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const latitude = parseFloat(formData.get('latitude') as string)
  const longitude = parseFloat(formData.get('longitude') as string)
  const phone = formData.get('phone') as string || null
  const hours = formData.get('hours') as string || null

  try {
    await addDeliveryLocation(name, address, latitude, longitude, phone, hours)
    revalidatePath('/admin/locations')
    revalidatePath('/map')
    return { success: true, message: 'Ubicación creada exitosamente' }
  } catch (error) {
    return { success: false, message: 'Error al crear ubicación' }
  }
}

export async function updateLocation(id: number, formData: FormData) {
  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const latitude = parseFloat(formData.get('latitude') as string)
  const longitude = parseFloat(formData.get('longitude') as string)
  const phone = formData.get('phone') as string || null
  const hours = formData.get('hours') as string || null

  try {
    await updateDeliveryLocation(id, name, address, latitude, longitude, phone, hours)
    revalidatePath('/admin/locations')
    revalidatePath('/map')
    return { success: true, message: 'Ubicación actualizada exitosamente' }
  } catch (error) {
    return { success: false, message: 'Error al actualizar ubicación' }
  }
}

export async function toggleLocation(id: number) {
  try {
    await toggleLocationActive(id)
    revalidatePath('/admin/locations')
    revalidatePath('/map')
    return { success: true, message: 'Estado actualizado' }
  } catch (error) {
    return { success: false, message: 'Error al cambiar estado' }
  }
}

export async function removeLocation(id: number) {
  try {
    await deleteDeliveryLocation(id)
    revalidatePath('/admin/locations')
    revalidatePath('/map')
    return { success: true, message: 'Ubicación eliminada' }
  } catch (error) {
    return { success: false, message: 'Error al eliminar ubicación' }
  }
}
