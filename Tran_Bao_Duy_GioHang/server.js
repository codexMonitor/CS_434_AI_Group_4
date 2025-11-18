// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'cart-data.json');

app.use(cors()); // allow frontend to call this server during dev
app.use(bodyParser.json());

// --- Utility: read/write persistence (very small scale) ---
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return null;
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('readData error', err);
    return null;
  }
}
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('writeData error', err);
    return false;
  }
}

// --- Initialize default cart if not present ---
let store = readData();
if (!store) {
  store = {
    items: [
      {
        id: 'p1',
        sku: 'JEANS-BLK-XL',
        title: 'Faded Skinny Jeans (Black)',
        description: 'Brief description',
        size: 'XL',
        price: 35.0,
        qty: 1,
        image: 'https://i.imgur.com/lYVZx4w.jpeg'
      }
    ],
    currency: '$',
    lastUpdated: new Date().toISOString()
  };
  writeData(store);
}

// --- Helpers ---
function recalcTotals(storeObj) {
  const subtotal = storeObj.items.reduce((s, it) => s + (it.price * (it.qty || 0)), 0);
  storeObj.subtotal = Number(subtotal.toFixed(2));
  storeObj.total = storeObj.subtotal; // no taxes/shipping in this simple demo
}

// ensure totals up to date on startup
recalcTotals(store);
writeData(store);

// --- Routes ---

// GET /cart
app.get('/cart', (req, res) => {
  const data = readData() || store;
  recalcTotals(data);
  res.json({ ok: true, cart: data });
});

// POST /cart/items  -> add item (body: { sku, title, price, qty, ... })
app.post('/cart/items', (req, res) => {
  const body = req.body || {};
  const required = ['sku', 'title', 'price'];
  for (const k of required) {
    if (body[k] === undefined) {
      return res.status(400).json({ ok: false, error: `Missing field ${k}` });
    }
  }

  const item = {
    id: uniqid(),
    sku: body.sku,
    title: body.title,
    description: body.description || '',
    size: body.size || null,
    price: Number(body.price),
    qty: Math.max(1, Number(body.qty) || 1),
    image: body.image || null
  };

  const data = readData() || store;
  // If item with same sku exists, increase qty
  const existing = data.items.find(i => i.sku === item.sku);
  if (existing) {
    existing.qty = existing.qty + item.qty;
  } else {
    data.items.push(item);
  }
  data.lastUpdated = new Date().toISOString();
  recalcTotals(data);
  writeData(data);
  res.json({ ok: true, cart: data });
});

// PUT /cart/items/:id  -> update quantity or fields (body: { qty, size, price })
app.put('/cart/items/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body || {};
  const data = readData() || store;
  const item = data.items.find(i => i.id === id);
  if (!item) return res.status(404).json({ ok: false, error: 'Item not found' });

  if (body.qty !== undefined) {
    const newQty = Number(body.qty);
    if (Number.isNaN(newQty) || newQty < 0) {
      return res.status(400).json({ ok: false, error: 'Invalid qty' });
    }
    item.qty = newQty;
  }
  if (body.size !== undefined) item.size = body.size;
  if (body.price !== undefined) item.price = Number(body.price);

  data.lastUpdated = new Date().toISOString();
  recalcTotals(data);
  writeData(data);
  res.json({ ok: true, cart: data });
});

// DELETE /cart/items/:id  -> remove item
app.delete('/cart/items/:id', (req, res) => {
  const id = req.params.id;
  const data = readData() || store;
  const before = data.items.length;
  data.items = data.items.filter(i => i.id !== id);
  const after = data.items.length;
  data.lastUpdated = new Date().toISOString();
  recalcTotals(data);
  writeData(data);
  res.json({ ok: true, removed: before - after, cart: data });
});

// POST /checkout -> mock checkout (body could contain payment info)
app.post('/checkout', (req, res) => {
  const data = readData() || store;
  // In a real app you'd call payment APIs and create an order record.
  // Here we'll simulate success and clear the cart.
  const order = {
    id: uniqid('order-'),
    items: data.items,
    total: data.total,
    createdAt: new Date().toISOString()
  };

  // clear cart
  data.items = [];
  recalcTotals(data);
  data.lastUpdated = new Date().toISOString();
  writeData(data);

  res.json({ ok: true, message: 'Mock checkout complete', order });
});

// Simple health check
app.get('/', (req, res) => res.send('Simple cart backend is running'));

// Start server
app.listen(PORT, () => {
  console.log(`Cart backend listening on http://localhost:${PORT}`);
});