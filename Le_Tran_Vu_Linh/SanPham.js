const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ------------------ DATA DEMO ------------------
let products = [
    {
        id: 1,
        name: "Áo khoác thời trang Nam/Nữ",
        price: 999000,
        code: "58M9196",
        images: ["img/item.jpg", "img/item.jpg", "img/item.jpg"]
    },
    {
        id: 2,
        name: "Áo Thun Nam",
        price: 150000,
        code: "AT001",
        images: ["img/item.jpg"]
    },
    {
        id: 3,
        name: "Quần Short",
        price: 180000,
        code: "QS002",
        images: ["img/item.jpg"]
    }
];

let cart = []; // lưu tạm trên server

// ------------------ API ------------------

// Lấy danh sách sản phẩm
app.get("/products", (req, res) => {
    res.json(products);
});

// Lấy chi tiết sản phẩm
app.get("/products/:id", (req, res) => {
    const p = products.find(x => x.id == req.params.id);
    p ? res.json(p) : res.status(404).json({ message: "Không tìm thấy sản phẩm" });
});

// Tìm kiếm sản phẩm
app.get("/search", (req, res) => {
    const keyword = req.query.q.toLowerCase();
    const result = products.filter(p => p.name.toLowerCase().includes(keyword));
    res.json(result);
});

// Thêm vào giỏ
app.post("/cart", (req, res) => {
    const { id, quantity } = req.body;

    const product = products.find(p => p.id == id);
    if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });

    cart.push({ id, quantity });

    res.json({ message: "Đã thêm vào giỏ hàng", cart });
});

// Lấy giỏ hàng
app.get("/cart", (req, res) => {
    const result = cart.map(c => {
        const product = products.find(p => p.id == c.id);
        return {
            ...product,
            quantity: c.quantity
        };
    });

    res.json(result);
});

// Xóa giỏ hàng
app.delete("/cart", (req, res) => {
    cart = [];
    res.json({ message: "Đã xóa giỏ hàng" });
});

// ------------------
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
