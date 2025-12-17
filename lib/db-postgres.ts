import { sql } from '@vercel/postgres';

export interface Product {
  id: number;
  name: string;
  size: number;
  price: number;
  description?: string;
}

export interface DeliveryLocation {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  hours?: string;
}

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: number;
  customer_id: number;
  location_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
}

// Inicializar base de datos
export async function initDatabase() {
  try {
    // Crear tabla de productos
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        size INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT
      );
    `;

    // Crear tabla de ubicaciones de entrega
    await sql`
      CREATE TABLE IF NOT EXISTS delivery_locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        address TEXT NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        phone VARCHAR(20),
        hours VARCHAR(100)
      );
    `;

    // Crear tabla de clientes
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200),
        phone VARCHAR(20),
        address TEXT
      );
    `;

    // Crear tabla de órdenes
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id),
        location_id INTEGER REFERENCES delivery_locations(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('✅ Tablas creadas correctamente');

    // Verificar si ya hay datos
    const { rows: existingProducts } = await sql`SELECT COUNT(*) as count FROM products`;
    
    if (parseInt(existingProducts[0].count) === 0) {
      // Insertar productos de muestra
      await sql`
        INSERT INTO products (name, size, price, description) VALUES
        ('Botellón 5L', 5, 3.50, 'Botellón de agua purificada de 5 litros'),
        ('Botellón 10L', 10, 6.00, 'Botellón de agua purificada de 10 litros'),
        ('Botellón 20L', 20, 10.50, 'Botellón de agua purificada de 20 litros');
      `;

      // Insertar ubicaciones en Guayaquil
      await sql`
        INSERT INTO delivery_locations (name, address, latitude, longitude, phone, hours) VALUES
        ('Acopio Centro - Malecón', 'Junín y Malecón 2000, Centro', -2.1894, -79.8836, '04-2501234', '08:00 - 18:00'),
        ('Acopio Kennedy', 'Av. San Jorge y Calle 1ra, Kennedy Norte', -2.1456, -79.9012, '04-2501235', '08:00 - 19:00'),
        ('Acopio Urdesa', 'Av. Víctor Emilio Estrada, Urdesa', -2.1678, -79.9234, '04-2501236', '08:00 - 18:30'),
        ('Acopio Urdaneta', 'Av. Benjamín Carrión, Urdaneta', -2.2012, -79.8923, '04-2501237', '07:30 - 19:00'),
        ('Acopio Alborada', 'Av. Rodolfo Baquerizo, Alborada', -2.1123, -79.9145, '04-2501238', '08:00 - 18:00');
      `;

      console.log('✅ Datos iniciales insertados');
    } else {
      console.log('ℹ️ Base de datos ya contiene datos');
    }

    return true;
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    throw error;
  }
}

// Queries de productos
export async function getProducts(): Promise<Product[]> {
  const { rows } = await sql<Product>`
    SELECT * FROM products ORDER BY size ASC
  `;
  return rows;
}

export async function getProductById(id: number): Promise<Product | null> {
  const { rows } = await sql<Product>`
    SELECT * FROM products WHERE id = ${id}
  `;
  return rows[0] || null;
}

// Queries de ubicaciones
export async function getLocations(): Promise<DeliveryLocation[]> {
  const { rows } = await sql<DeliveryLocation>`
    SELECT * FROM delivery_locations ORDER BY name ASC
  `;
  return rows;
}

export async function getLocationById(id: number): Promise<DeliveryLocation | null> {
  const { rows } = await sql<DeliveryLocation>`
    SELECT * FROM delivery_locations WHERE id = ${id}
  `;
  return rows[0] || null;
}

// Queries de clientes
export async function createCustomer(
  name: string,
  email?: string,
  phone?: string,
  address?: string
): Promise<Customer> {
  const { rows } = await sql<Customer>`
    INSERT INTO customers (name, email, phone, address)
    VALUES (${name}, ${email || null}, ${phone || null}, ${address || null})
    RETURNING *
  `;
  return rows[0];
}

// Queries de órdenes
export async function createOrder(
  customerId: number,
  locationId: number,
  productId: number,
  quantity: number,
  totalPrice: number
): Promise<Order> {
  const { rows } = await sql<Order>`
    INSERT INTO orders (customer_id, location_id, product_id, quantity, total_price)
    VALUES (${customerId}, ${locationId}, ${productId}, ${quantity}, ${totalPrice})
    RETURNING *
  `;
  return rows[0];
}

export async function getOrdersByCustomer(customerId: number): Promise<Order[]> {
  const { rows } = await sql<Order>`
    SELECT * FROM orders 
    WHERE customer_id = ${customerId}
    ORDER BY created_at DESC
  `;
  return rows;
}
