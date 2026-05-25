/**
 * Product Model
 *
 * Handles all database operations for the products table.
 * Falls back to in-memory store when MySQL is unavailable.
 */

const { pool } = require('../config/db');
const logger = require('../utils/logger');

const seedProducts = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.', price: 149.99, original_price: 199.99, category_id: 1, category_name: 'Electronics', stock_quantity: 50, badge: 'Best Seller', rating: 4.80, review_count: 234, is_active: 1, image_url: null },
  { id: 2, name: 'Premium Cotton T-Shirt', description: 'Soft organic cotton t-shirt available in multiple colors.', price: 29.99, original_price: null, category_id: 2, category_name: 'Clothing', stock_quantity: 200, badge: null, rating: 4.50, review_count: 89, is_active: 1, image_url: null },
  { id: 3, name: 'Smart Home Security Camera', description: '1080p HD security camera with night vision and motion detection.', price: 79.99, original_price: 99.99, category_id: 1, category_name: 'Electronics', stock_quantity: 75, badge: 'Sale', rating: 4.70, review_count: 156, is_active: 1, image_url: null },
  { id: 4, name: 'Organic Skincare Set', description: 'Complete skincare routine with cleanser, toner, moisturizer, and serum.', price: 54.99, original_price: null, category_id: 6, category_name: 'Beauty', stock_quantity: 120, badge: 'Top Rated', rating: 4.90, review_count: 312, is_active: 1, image_url: null },
  { id: 5, name: 'Running Shoes Pro', description: 'Lightweight running shoes with responsive cushioning.', price: 119.99, original_price: 149.99, category_id: 4, category_name: 'Sports', stock_quantity: 80, badge: null, rating: 4.60, review_count: 178, is_active: 1, image_url: null },
  { id: 6, name: 'Bestselling Novel Collection', description: 'Curated collection of this year\'s top bestselling novels.', price: 39.99, original_price: null, category_id: 5, category_name: 'Books', stock_quantity: 300, badge: 'New', rating: 4.40, review_count: 67, is_active: 1, image_url: null },
  { id: 7, name: 'Ergonomic Office Chair', description: 'Adjustable ergonomic chair with lumbar support and headrest.', price: 299.99, original_price: 399.99, category_id: 3, category_name: 'Home & Garden', stock_quantity: 30, badge: 'Best Seller', rating: 4.70, review_count: 423, is_active: 1, image_url: null },
  { id: 8, name: 'Bluetooth Portable Speaker', description: 'Waterproof portable speaker with 360-degree sound.', price: 49.99, original_price: 69.99, category_id: 1, category_name: 'Electronics', stock_quantity: 150, badge: 'Sale', rating: 4.30, review_count: 198, is_active: 1, image_url: null },
];

let useMemory = false;

async function initMemoryCheck() {
  try {
    const conn = await pool.getConnection();
    conn.release();
    useMemory = false;
  } catch {
    useMemory = true;
    logger.info('Product model: using in-memory store (MySQL unavailable)');
  }
}

initMemoryCheck();

async function findAll({ category, search, page = 1, limit = 12 } = {}) {
  if (useMemory) {
    let filtered = [...seedProducts].filter((p) => p.is_active);
    if (category) {
      filtered = filtered.filter((p) => p.category_name.toLowerCase().replace(/\s&\s/g, '-').replace(/\s/g, '-') === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    const start = (page - 1) * limit;
    return { products: filtered.slice(start, start + limit), total: filtered.length };
  }

  let query = `SELECT p.*, pc.name as category_name FROM products p
    LEFT JOIN product_categories pc ON p.category_id = pc.id WHERE p.is_active = 1`;
  const params = [];

  if (category) {
    query += ' AND pc.slug = ?';
    params.push(category);
  }
  if (search) {
    query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  const countQuery = query.replace('SELECT p.*, pc.name as category_name', 'SELECT COUNT(*) as total');
  query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
  params.push(String(limit), String((page - 1) * limit));

  const [rows] = await pool.execute(query, params);
  const [countRows] = await pool.execute(countQuery, params.slice(0, -2));
  return { products: rows, total: countRows[0]?.total || 0 };
}

async function findById(id) {
  if (useMemory) {
    return seedProducts.find((p) => p.id === Number(id)) || null;
  }
  const [rows] = await pool.execute(
    `SELECT p.*, pc.name as category_name FROM products p
     LEFT JOIN product_categories pc ON p.category_id = pc.id WHERE p.id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function getCategories() {
  if (useMemory) {
    return [
      { id: 1, name: 'Electronics', slug: 'electronics', icon: 'FiMonitor', count: 3 },
      { id: 2, name: 'Clothing', slug: 'clothing', icon: 'FiShoppingBag', count: 1 },
      { id: 3, name: 'Home & Garden', slug: 'home-garden', icon: 'FiHome', count: 1 },
      { id: 4, name: 'Sports', slug: 'sports', icon: 'FiActivity', count: 1 },
      { id: 5, name: 'Books', slug: 'books', icon: 'FiBook', count: 1 },
      { id: 6, name: 'Beauty', slug: 'beauty', icon: 'FiHeart', count: 1 },
    ];
  }
  const [rows] = await pool.execute(
    `SELECT pc.*, COUNT(p.id) as count FROM product_categories pc
     LEFT JOIN products p ON p.category_id = pc.id AND p.is_active = 1
     GROUP BY pc.id ORDER BY pc.name`
  );
  return rows;
}

module.exports = {
  findAll,
  findById,
  getCategories,
};
