
const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/image', express.static('image'));


const products = [
    {
        id: 1,
        name: "Quần Kaki Bảnh",
        category: "Quần",
        price: 319000,
        image_path: "/image/sp_kaki.jpg", 
        rating: 4,
        sold: '4.8k'
    },
    {
        id: 2,
        name: "Áo Thun",
        category: "Áo",
        price: 299000,
        image_path: "/image/sp_thun.jpg",
        rating: 5,
        sold: '5.2k'
    },
    {
        id: 3,
        name: "Áo Bóng Rổ",
        category: "Áo",
        price: 499000,
        image_path: "/image/sp_bongro.jpg",
        rating: 4,
        sold: '3.1k'
    }
];
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
    console.log(`Xem trang web tại: http://localhost:${PORT}/`);
    console.log(`API sản phẩm: http://localhost:${PORT}/api/products`);
});