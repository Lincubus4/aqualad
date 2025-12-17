# 🚀 Guía de Deploy con Vercel Postgres

## 📋 Pasos para Deploy

### 1️⃣ **Instalar Dependencias Localmente**
```bash
npm install
```

### 2️⃣ **Hacer Commit de los Cambios**
```bash
git add .
git commit -m "🔄 Migrar a Vercel Postgres"
git push
```

### 3️⃣ **Configurar Vercel Postgres**

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto **aqualad**
3. Ve a la pestaña **Storage**
4. Click en **Create Database**
5. Selecciona **Postgres**
6. Nombra tu base de datos: `aqualad-db`
7. Región: **US East (N. Virginia)** o la más cercana
8. Click en **Create**

✅ **Vercel automáticamente configurará las variables de entorno**

### 4️⃣ **Hacer Deploy**

1. Ve a la pestaña **Deployments**
2. Click en **Redeploy** en el último deployment
3. Marca la opción **Use existing Build Cache** (opcional)
4. Click en **Redeploy**

⏳ Espera 2-3 minutos...

### 5️⃣ **Inicializar Base de Datos**

Una vez desplegado, visita:
```
https://tu-proyecto.vercel.app/api/init-db
```

Deberías ver:
```json
{
  "success": true,
  "message": "Base de datos inicializada correctamente"
}
```

✅ **¡Listo! Tu app está funcionando con Postgres**

---

## 🧪 Verificar que Funciona

Visita tu sitio:
- **Mapa**: `https://tu-proyecto.vercel.app/map`
- **Productos**: `https://tu-proyecto.vercel.app/api/products`
- **Ubicaciones**: `https://tu-proyecto.vercel.app/api/locations`

---

## 🔧 Desarrollo Local (Opcional)

Si quieres correr el proyecto localmente:

1. Copia `.env.example` a `.env.local`
2. Ve a tu proyecto en Vercel → **Settings** → **Environment Variables**
3. Copia las variables `POSTGRES_*` a tu `.env.local`
4. Corre el proyecto:
```bash
npm run dev
```
5. Inicializa la base de datos local:
```
http://localhost:3000/api/init-db
```

---

## 📊 Acceso a la Base de Datos

Para ver tus datos en Vercel:

1. Ve a **Storage** en tu proyecto
2. Click en tu base de datos **aqualad-db**
3. Pestaña **Data** para ver tablas
4. Pestaña **Query** para ejecutar SQL

---

## ❓ Solución de Problemas

### Error: "Cannot find module '@vercel/postgres'"
✅ Solución: Vercel lo instalará automáticamente en deploy

### Error: "Database connection failed"
✅ Solución: 
1. Verifica que creaste la base de datos en Vercel
2. Asegúrate de que las variables de entorno están configuradas
3. Redeploy el proyecto

### No veo datos
✅ Solución: Visita `/api/init-db` para inicializar

---

## 🎉 ¡Éxito!

Tu webapp ahora usa Vercel Postgres y está lista para producción.

**Stack Final:**
- ✅ Next.js 15
- ✅ Vercel Postgres (Neon)
- ✅ React Leaflet
- ✅ Tailwind CSS
- ✅ TypeScript
