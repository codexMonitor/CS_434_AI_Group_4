const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Danh sách tài khoản mẫu
const users = [
    { username: "admin", password: "123456" },
    { username: "user", password: "password" }
];

// API login không dùng database
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        res.json({ success: true, message: "Đăng nhập thành công!" });
    } else {
        res.json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu." });
    }
});

// ⭐ Thêm route GET / để hết lỗi "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Server chạy OK! Hãy mở file dangnhap.html để đăng nhập.");
});

// Chạy server
app.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000");
});
