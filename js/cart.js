// cart.js

// Load cart items from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  displayCartItems();
  updateCartTotal();
});

// Get cart from localStorage or return an empty array
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Display cart items in the cart page
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cart = getCart();
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span>${item.name}</span>
      <span>₦${item.price.toFixed(2)}</span>
      <div class="cart-controls">
        <button onclick="decreaseQty(${index})">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${index})">+</button>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
}

// Add an item to the cart
function addToCart(name, price) {
  const cart = getCart();
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  alert(`${name} added to cart`);
}

// Increase item quantity
function increaseQty(index) {
  const cart = getCart();
  cart[index].quantity += 1;
  saveCart(cart);
  displayCartItems();
  updateCartTotal();
}

// Decrease item quantity
function decreaseQty(index) {
  const cart = getCart();
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart(cart);
  displayCartItems();
  updateCartTotal();
}

// Remove item from cart
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCartItems();
  updateCartTotal();
}

// Update total price in the cart summary
function updateCartTotal() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalElement = document.getElementById('cart-total');
  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }
}

// Handle WhatsApp checkout
function checkoutViaWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message = "Hello, I would like to order the following items:\n\n";
  cart.forEach(item => {
    message += `• ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toFixed(2)}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal: ₦${total.toFixed(2)}\n\nThank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/2348163381526?text=${encodedMessage}`; // Replace with real number
  window.open(whatsappLink, '_blank');

  // Clear cart after checkout
  localStorage.removeItem('cart');
  displayCartItems();
  updateCartTotal();
}

// Optional: Attach event to button (if using dynamic inline onclick)
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', checkoutViaWhatsApp);
}

