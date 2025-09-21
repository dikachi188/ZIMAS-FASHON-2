function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if item already exists
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart`);
}
