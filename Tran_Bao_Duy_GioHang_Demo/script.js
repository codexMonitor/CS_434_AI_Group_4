// Backend simulation - Products database
const PRODUCTS = [
    {
        id: 1,
        name: 'Faded Skinny Jeans (Black)',
        description: 'Classic black skinny jeans with a faded finish',
        price: 35,
        emoji: '👖',
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 2,
        name: 'Casual T-Shirt (White)',
        description: 'Comfortable cotton t-shirt',
        price: 15,
        emoji: '👕',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 3,
        name: 'Denim Jacket',
        description: 'Vintage style denim jacket',
        price: 65,
        emoji: '🧥',
        sizes: ['M', 'L', 'XL']
    },
    {
        id: 4,
        name: 'Sneakers (White)',
        description: 'Comfortable everyday sneakers',
        price: 80,
        emoji: '👟',
        sizes: ['7', '8', '9', '10', '11']
    },
    {
        id: 5,
        name: 'Leather Belt',
        description: 'Premium leather belt',
        price: 25,
        emoji: '👔',
        sizes: ['S', 'M', 'L']
    },
    {
        id: 6,
        name: 'Baseball Cap',
        description: 'Classic baseball cap',
        price: 20,
        emoji: '🧢',
        sizes: ['One Size']
    }
];

// Backend - Cart state
let cart = [
    {
        id: 1,
        productId: 1,
        name: 'Faded Skinny Jeans (Black)',
        description: 'Brief description',
        size: 'XL',
        price: 35,
        quantity: 1,
        emoji: '👖'
    }
];

// Backend Functions
function addToCart(productId, size) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existingItem = cart.find(item => 
        item.productId === productId && item.size === size
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: Date.now(),
            productId: product.id,
            name: product.name,
            description: product.description,
            size: size,
            price: product.price,
            quantity: 1,
            emoji: product.emoji
        });
    }
    
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
    }
    
    renderCart();
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// UI Rendering Functions
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = PRODUCTS.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-size">
                <label>Size:</label>
                <select id="size-${product.id}">
                    ${product.sizes.map(size => 
                        `<option value="${size}">${size}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="product-footer">
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartItemsCount = document.getElementById('cart-items-count');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
    cartItemsCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <div class="cart-item-name">${item.name}</div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
                    </div>
                    <div class="cart-item-description">${item.description}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-size-price">
                            <div class="cart-item-size">Size: ${item.size}</div>
                            <div class="cart-item-price">Price: $${item.price}</div>
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const total = calculateTotal();
    subtotalEl.textContent = `$${total}`;
    totalEl.textContent = `$${total}`;
}

function handleAddToCart(productId) {
    const sizeSelect = document.getElementById(`size-${productId}`);
    const size = sizeSelect.value;
    addToCart(productId, size);
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('hidden');
}

function purchase() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert(`Thank you for your purchase! Total: $${calculateTotal()}`);
    cart = [];
    renderCart();
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderCart();
});