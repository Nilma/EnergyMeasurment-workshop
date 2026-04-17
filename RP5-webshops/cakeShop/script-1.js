const products = [
  { id: 1, name: "Chocolate Dream Cake", price: 24.99, image: "images/cake1.jpg" },
  { id: 2, name: "Vanilla Strawberry Cake", price: 22.99, image: "images/cake2.jpg" },
  { id: 3, name: "Red Velvet Cake", price: 26.99, image: "images/cake3.jpg" },
  { id: 4, name: "Lemon Delight Cake", price: 21.99, image: "images/cake4.jpg" },
  { id: 5, name: "Caramel Crunch Cake", price: 27.99, image: "images/cake5.jpg" },
  { id: 6, name: "Blueberry Bliss Cake", price: 23.49, image: "images/cake6.jpg" },
  { id: 7, name: "Black Forest Cake", price: 28.99, image: "images/cake7.jpg" },
  { id: 8, name: "Rainbow Celebration Cake", price: 29.99, image: "images/cake8.jpg" },
  { id: 9, name: "Coffee Cream Cake", price: 25.49, image: "images/cake9.jpg" },
  { id: 10, name: "Mango Sunshine Cake", price: 24.49, image: "images/cake10.jpg" },
  { id: 11, name: "Cookies & Cream Cake", price: 27.49, image: "images/cake11.jpg" },
  { id: 12, name: "Pistachio Delight Cake", price: 26.49, image: "images/cake12.jpg" }
];

let cart = [];
let currentUser = null;

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutForm = document.getElementById("checkout-form");
const orderMessage = document.getElementById("order-message");
const orderSummary = document.getElementById("order-summary");
const authMessage = document.getElementById("auth-message");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

function renderProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
        onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;400&quot; height=&quot;300&quot;><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;%23f3d9df&quot;/><text x=&quot;50%&quot; y=&quot;50%&quot; dominant-baseline=&quot;middle&quot; text-anchor=&quot;middle&quot; font-size=&quot;24&quot; fill=&quot;%238a4b5b&quot;>Add Cake Image</text></svg>';"
      />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p>Delicious cake perfect for birthdays and celebrations.</p>
        <button class="primary-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "$0.00";
    cartCount.textContent = "0";
    return;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <img
        src="${item.image}"
        alt="${item.name}"
        onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;200&quot; height=&quot;150&quot;><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;%23f3d9df&quot;/><text x=&quot;50%&quot; y=&quot;50%&quot; dominant-baseline=&quot;middle&quot; text-anchor=&quot;middle&quot; font-size=&quot;18&quot; fill=&quot;%238a4b5b&quot;>Cake Image</text></svg>';"
      />
      <div>
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <p><strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartItems.appendChild(itemDiv);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = totalItems.toString();
}

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  currentUser = email;

  authMessage.textContent = `Logged in as ${email}`;
  loginForm.reset();
});

signupForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();

  currentUser = email;
  authMessage.textContent = `Welcome ${name}! Your account has been created.`;
  signupForm.reset();
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) {
    orderMessage.textContent = "Your cart is empty. Please add some cakes first.";
    orderMessage.style.color = "red";
    orderSummary.innerHTML = "";
    return;
  }

  const name = document.getElementById("name").value.trim();

  let total = 0;
  let summaryHtml = "<h3>Order Summary</h3><ul>";

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    summaryHtml += `<li>${item.name} x ${item.quantity} - $${itemTotal.toFixed(2)}</li>`;
  });

  summaryHtml += `</ul><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  summaryHtml += `<p>Enjoy your cake, ${name}! We hope to see you again soon.</p>`;

  orderMessage.textContent = `Thank you, ${name}! Your order has been placed successfully.`;
  orderMessage.style.color = "green";
  orderSummary.innerHTML = summaryHtml;

  cart = [];
  renderCart();
  checkoutForm.reset();
});

renderProducts();
renderCart();