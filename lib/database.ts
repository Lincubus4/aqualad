import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'aqualad.db')
const db = new Database(dbPath)

// Initialize database tables
export function initDatabase() {
  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      size INTEGER NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      points_reward INTEGER DEFAULT 10,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Customers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      loyalty_points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Addresses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      address TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      is_default INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `)

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      address_id INTEGER NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      points_earned INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id),
      FOREIGN KEY (address_id) REFERENCES addresses(id)
    )
  `)

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `)

  // Delivery locations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS delivery_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      phone TEXT,
      hours TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Seed initial data if empty
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number }
  
  if (productCount.count === 0) {
    const insertProduct = db.prepare(`
      INSERT INTO products (name, size, price, description, points_reward)
      VALUES (?, ?, ?, ?, ?)
    `)

    insertProduct.run('Botellón 5L', 5, 3.50, 'Ideal para uso personal', 5)
    insertProduct.run('Botellón 10L', 10, 6.00, 'Perfecto para familias', 10)
    insertProduct.run('Botellón 20L', 20, 10.50, 'Máxima capacidad', 20)

    // Seed delivery locations (Guayaquil, Ecuador - cerca de Junín y Malecón)
    const insertLocation = db.prepare(`
      INSERT INTO delivery_locations (name, address, latitude, longitude, phone, hours)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    insertLocation.run('Acopio Centro - Malecón', 'Malecón Simón Bolívar y Junín', -2.1894, -79.8836, '04-234-5678', 'Lun-Vie: 8:00-19:00, Sáb: 9:00-15:00')
    insertLocation.run('Acopio Norte - Kennedy', 'Av. Francisco de Orellana y Av. Del Periodista', -2.1483, -79.8903, '04-345-6789', 'Lun-Vie: 7:00-20:00, Sáb-Dom: 8:00-16:00')
    insertLocation.run('Acopio Sur - Urdesa', 'Av. Víctor Emilio Estrada y Las Monjas', -2.1745, -79.9087, '04-456-7890', 'Lun-Sáb: 8:00-18:00')
    insertLocation.run('Acopio Urdaneta', 'Av. 9 de Octubre y Rumichaca', -2.1956, -79.8869, '04-567-8901', 'Lun-Vie: 8:00-19:00, Sáb: 9:00-14:00')
    insertLocation.run('Acopio Alborada', 'Av. Rodolfo Baquerizo Nazur (La Puntilla)', -2.1286, -79.9015, '04-678-9012', 'Lun-Dom: 7:00-21:00')
  }
}

// Initialize on import
initDatabase()

export default db
