// Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Đối tượng lưu trữ sản phẩm hiện tại
let currentProduct = {
    id: '58M9196',
    name: 'Áo khoác thời trang Nam/Nữ',
    price: 999000,
    image: 'img/item.jpg',
    selectedColor: null,
    selectedSize: null,
    quantity: 1
};

// Chờ DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    initializeColorSelection();
    initializeSizeSelection();
    initializeQuantity();
    initializeCartButtons();
    updateCartDisplay();
});

// Xử lý chọn màu sắc
function initializeColorSelection() {
    const colorSpans = document.querySelectorAll('.color-options span');
    
    colorSpans.forEach(span => {
        span.addEventListener('click', function() {
            // Xóa border của tất cả màu
            colorSpans.forEach(s => s.style.border = '1px solid black');
            
            // Thêm border cho màu được chọn
            this.style.border = '3px solid #ff6600';
            
            // Lưu màu đã chọn
            currentProduct.selectedColor = this.style.backgroundColor;
        });
    });
}

// Xử lý chọn size
function initializeSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-options button');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xóa style của tất cả size
            sizeButtons.forEach(btn => {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            });
            
            // Thêm style cho size được chọn
            this.style.backgroundColor = 'black';
            this.style.color = 'white';
            
            // Lưu size đã chọn
            currentProduct.selectedSize = this.textContent;
        });
    });
}

// Xử lý số lượng
function initializeQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            
            // Đảm bảo số lượng >= 1
            if (value < 1 || isNaN(value)) {
                value = 1;
                this.value = 1;
            }
            
            currentProduct.quantity = value;
        });
    }
}

// Xử lý nút giỏ hàng
function initializeCartButtons() {
    const addToCartBtn = document.querySelector('.buy-button');
    const buyNowBtn = document.querySelector('.addcart-button');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', addToCart);
    }
}

// Thêm vào giỏ hàng
function addToCart() {
    // Kiểm tra đã chọn màu và size chưa
    if (!currentProduct.selectedColor) {
        alert('Vui lòng chọn màu sắc!');
        return;
    }
    
    if (!currentProduct.selectedSize) {
        alert('Vui lòng chọn size!');
        return;
    }
    
    // Tạo sản phẩm mới
    const product = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        color: currentProduct.selectedColor,
        size: currentProduct.selectedSize,
        quantity: currentProduct.quantity
    };
    
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size
    );
    
    if (existingProductIndex > -1) {
        // Nếu đã có thì tăng số lượng
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Nếu chưa có thì thêm mới
        cart.push(product);
    }
    
    // Lưu vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật hiển thị giỏ hàng
    updateCartDisplay();
    
    // Thông báo thành công
    alert('Đã thêm sản phẩm vào giỏ hàng!');
}

// Cập nhật hiển thị giỏ hàng
function updateCartDisplay() {
    const listCart = document.querySelector('.list-cart');
    
    if (!listCart) return;
    
    // Xóa nội dung cũ
    listCart.innerHTML = '';
    
    if (cart.length === 0) {
        listCart.innerHTML = '<img src="img/nocart.png" alt=""> Không có sản phẩm';
        return;
    }
    
    // Tạo HTML cho giỏ hàng
    let cartHTML = '<div style="max-height: 400px; overflow-y: auto;">';
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHTML += `
            <div style="display: flex; gap: 10px; padding: 10px; border-bottom: 1px solid #ccc; align-items: center;">
                <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover;">
                <div style="flex: 1; font-size: 14px;">
                    <div style="font-weight: bold;">${item.name}</div>
                    <div>Màu: <span style="display: inline-block; width: 15px; height: 15px; background-color: ${item.color}; border: 1px solid #000; border-radius: 50%; vertical-align: middle;"></span></div>
                    <div>Size: ${item.size}</div>
                    <div>SL: ${item.quantity}</div>
                    <div style="color: red; font-weight: bold;">${formatPrice(itemTotal)}₫</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Xóa</button>
            </div>
        `;
    });
    
    cartHTML += `
        <div style="padding: 15px; font-weight: bold; text-align: right; font-size: 16px;">
            Tổng cộng: <span style="color: red;">${formatPrice(totalPrice)}₫</span>
        </div>
    </div>`;
    
    listCart.innerHTML = cartHTML;
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Format giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}