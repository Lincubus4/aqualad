# 📋 Guía Rápida - Panel de Administración de Acopios

## 🎯 Objetivo
Permite al administrador registrar y gestionar las ubicaciones de los acopios de agua que los usuarios podrán ver en el mapa.

## 🚀 Acceso al Panel

Hay dos formas de acceder:

1. **Desde el Header**: Click en el botón "Admin" (icono de engranaje) en cualquier página
2. **URL Directa**: Ir a `/admin/locations`

## ➕ Agregar un Nuevo Acopio

### Paso 1: Abrir el Formulario
1. Click en el botón **"Agregar Acopio"** (verde, arriba a la derecha)
2. Se abrirá un formulario

### Paso 2: Llenar la Información
- **Nombre del Acopio** *(obligatorio)*: Ej. "Acopio Centro", "Purificadora Norte"
- **Dirección** *(obligatorio)*: Dirección completa del lugar
- **Latitud y Longitud** *(obligatorio)*: Coordenadas GPS

### Paso 3: Seleccionar Ubicación en el Mapa
1. Click en **"Seleccionar en el Mapa"**
2. Se abrirá un mapa interactivo
3. **Haz click en el mapa** donde está ubicado el acopio
4. Verás un marcador aparecer
5. Las coordenadas se llenarán automáticamente
6. Click en **"Confirmar Ubicación"**

### Paso 4: Información Adicional (Opcional)
- **Teléfono**: Número de contacto del acopio

### Paso 5: Guardar
- Click en **"Crear Acopio"**
- El acopio aparecerá en la lista y será visible en el mapa para los usuarios

## ✏️ Editar un Acopio Existente

1. Busca el acopio en la lista
2. Click en el icono de **lápiz** (Edit)
3. Modifica la información necesaria
4. Puedes cambiar la ubicación usando "Seleccionar en el Mapa"
5. Click en **"Actualizar Acopio"**

## 🔄 Activar/Desactivar un Acopio

Los acopios pueden estar:
- **Activos** (🟢): Visibles para los usuarios en el mapa
- **Inactivos** (⚪): Ocultos, pero guardados en el sistema

Para cambiar el estado:
1. Click en el icono de **toggle** (interruptor)
2. El estado cambiará automáticamente
3. Los usuarios solo verán los acopios activos

**💡 Tip**: Útil cuando un acopio está temporalmente cerrado o en mantenimiento

## 🗑️ Eliminar un Acopio

1. Click en el icono de **basura** (rojo)
2. Confirma la eliminación
3. ⚠️ **Esta acción es permanente**

## 📊 Estadísticas

En la parte superior verás:
- **Total de ubicaciones** registradas
- **Acopios activos** (visibles para usuarios)
- **Acopios inactivos** (ocultos)

## 🗺️ Cómo los Usuarios Ven los Acopios

Cuando un usuario visita `/map`:

1. **Solicitud de Ubicación**: El navegador pide permiso para acceder a su ubicación
2. **Si acepta**: 
   - Se muestra su ubicación actual en el mapa (punto azul)
   - Se calculan automáticamente los **3 acopios más cercanos**
   - Se muestra la distancia en kilómetros
3. **Marcadores en el Mapa**: 
   - Cada acopio aparece con un marcador rojo
   - Al hacer click se muestra: nombre, dirección y teléfono

## 💡 Consejos de Uso

### ✅ Buenas Prácticas

1. **Nombres Claros**: Usa nombres descriptivos que identifiquen fácilmente el lugar
   - ✅ "Purificadora La Gota - Sucursal Centro"
   - ❌ "Acopio 1"

2. **Direcciones Completas**: Incluye calle, número, colonia, ciudad
   - ✅ "Av. Juárez 123, Col. Centro, Ciudad"
   - ❌ "Av. Juárez"

3. **Ubicación Precisa**: Al seleccionar en el mapa, haz zoom y coloca el marcador exactamente donde está el acopio

4. **Mantén Actualizado**: 
   - Desactiva acopios que estén temporalmente cerrados
   - Actualiza teléfonos si cambian
   - Elimina acopios que ya no existan

5. **Verifica en el Mapa de Usuario**: Después de agregar un acopio, ve a `/map` para verificar que se muestra correctamente

### 🎯 Casos de Uso Comunes

**Acopio Temporal**
- Agregar como activo
- Cuando termine, desactivar (no eliminar)
- Puede reactivarse después

**Cambio de Ubicación**
- Editar el acopio existente
- Actualizar dirección y coordenadas
- No es necesario crear uno nuevo

**Múltiples Sucursales**
- Agregar cada una como acopio independiente
- Usar nombres que identifiquen la sucursal
- Ej: "Purificadora XYZ - Norte", "Purificadora XYZ - Sur"

## 🆘 Solución de Problemas

### El mapa no se ve en el selector
- Espera unos segundos a que cargue
- Verifica tu conexión a internet
- Refresca la página

### No puedo hacer click en el mapa
- Asegúrate de que el mapa haya cargado completamente
- El cursor debe cambiar cuando pasas sobre el mapa

### El acopio no aparece para los usuarios
- Verifica que esté marcado como **"Activo"**
- Refresca la página `/map`
- Verifica que las coordenadas sean correctas

### Las distancias no se calculan
- El usuario debe aceptar permisos de ubicación en su navegador
- Si deniega permisos, solo verá la lista sin distancias

## 🔐 Seguridad

**Nota**: Actualmente el panel de administración es de acceso público. En una versión de producción se recomienda:

- Implementar autenticación de administrador
- Proteger la ruta `/admin/*` con middleware
- Agregar roles y permisos de usuario

---

## 📞 Soporte

Para más información consulta el `README.md` del proyecto o contacta al equipo de desarrollo.
