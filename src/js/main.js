// Cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

function changeQuantity(productId, change) {
    const qtyInput = document.getElementById(productId + '-qty');
    let currentQty = parseInt(qtyInput.value);
    currentQty += change;
    if (currentQty < 1) currentQty = 1;
    qtyInput.value = currentQty;
}

function addToCart(productId, productName, price) {
    const qtyInput = document.getElementById(productId + '-qty');
    const quantity = parseInt(qtyInput.value);

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: quantity
        });
    }

    updateCartDisplay();

    // Reset quantity to 1
    qtyInput.value = 1;

    // Show success message
    alert(`${productName} added to cart!`);
}

function updateCartDisplay() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = `Total: $${cartTotal.toFixed(2)}`;

    const cartItemsDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    $${item.price.toFixed(2)} x ${item.quantity}
                </div>
                <div>
                    <button onclick="removeFromCart('${item.id}')" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `).join('');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Create order summary
    const orderSummary = cart.map(item =>
        `${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const orderTotal = `\nTotal: $${cartTotal.toFixed(2)}`;

    // For now, we'll create a mailto link with the order
    const subject = 'Nut Barn Online Order';
    const body = `Hello! I'd like to place an order:\n\n${orderSummary}${orderTotal}\n\nPlease let me know how to proceed with payment and shipping. Thank you!`;

    const mailtoLink = `mailto:thenutbarnllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    // Clear cart after checkout
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Close cart when clicking outside
document.getElementById('cart-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        toggleCart();
    }
});