require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const Database = require('better-sqlite3');
const path = require('path');

// Config
const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DB_FILE || './data/orders.db';
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || '*').split(',');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow curl/postman
    if (ALLOWED_ORIGINS.indexOf('*') !== -1) return callback(null, true);
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  }
}));

// Rate limiter (basic)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60 // limit each IP to 60 requests per windowMs
});
app.use(limiter);

// Initialize DB
const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');

// Create table if not exists
db.prepare(`
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  items_json TEXT NOT NULL,
  total_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  meta_json TEXT,
  created_at TEXT NOT NULL
)`).run();

// Helper: compute total cents from items array [{name, price, quantity}]
function computeTotalCents(items) {
  // assume price in dollars or number; we'll convert to cents
  let total = 0;
  for (const it of items) {
    const price = Number(it.price || 0);
    const qty = Number(it.quantity || 1);
    if (!isFinite(price) || !isFinite(qty) || qty < 0) {
      throw new Error('Invalid item price/quantity');
    }
    total += price * qty;
  }
  // convert to cents and round
  return Math.round(total * 100);
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Create order
app.post('/api/orders',
  // validation chain
  body('customer_name').trim().isLength({ min: 2 }).withMessage('Tên phải >= 2 ký tự'),
  body('phone').trim().isLength({ min: 7 }).withMessage('Số điện thoại không hợp lệ'),
  body('address').trim().isLength({ min: 5 }).withMessage('Địa chỉ không hợp lệ'),
  body('city').trim().notEmpty().withMessage('Tỉnh/Thành không được để trống'),
  body('payment_method').isIn(['COD', 'BANK', 'CARD']).withMessage('Phương thức thanh toán không hợp lệ'),
  body('items').isArray({ min: 1 }).withMessage('Cần ít nhất 1 sản phẩm'),
  body('items.*.name').exists(),
  body('items.*.price').isNumeric(),
  body('items.*.quantity').optional().isInt({ min: 1 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { customer_name, phone, address, city, payment_method, items, meta } = req.body;

      // compute total
      let totalCents;
      try {
        totalCents = computeTotalCents(items);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

      const createdAt = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO orders
          (customer_name, phone, address, city, payment_method, items_json, total_cents, meta_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const info = stmt.run(
        customer_name,
        phone,
        address,
        city,
        payment_method,
        JSON.stringify(items),
        totalCents,
        meta ? JSON.stringify(meta) : null,
        createdAt
      );

      const orderId = info.lastInsertRowid;

      // For CARD payment we would normally create a payment intent here (stripe, etc.)
      // For demo: if payment_method === 'CARD' return a fake `payment_url` or token
      let payment = null;
      if (payment_method === 'CARD') {
        payment = {
          provider: 'demo',
          payment_url: `https://demo-pay.example.com/pay?order=${orderId}&amount=${totalCents}`
        };
      }

      res.status(201).json({
        orderId,
        total: totalCents,
        currency: 'cents',
        status: 'created',
        payment
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get order
app.get('/api/orders/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Order not found' });

  const order = {
    id: row.id,
    customer_name: row.customer_name,
    phone: row.phone,
    address: row.address,
    city: row.city,
    payment_method: row.payment_method,
    items: JSON.parse(row.items_json),
    total_cents: row.total_cents,
    status: row.status,
    meta: row.meta_json ? JSON.parse(row.meta_json) : null,
    created_at: row.created_at
  };

  res.json(order);
});

// Serve static frontend if present (assumes your HTML placed under /public)
app.use('/', express.static(path.join(__dirname, 'public')));

// Start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`DB file: ${DB_FILE}`);
});
