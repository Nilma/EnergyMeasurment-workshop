document.addEventListener("DOMContentLoaded", () => {

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

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const clearCartBtn = document.getElementById("clear-cart-btn");
  const checkoutForm = document.getElementById("checkout-form");
  const orderMessage = document.getElementById("order-message");
  const orderSummary = document.getElementById("order-summary");

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const authMessage = document.getElementById("auth-message");

  // ---------- PRODUCTS ----------
  function renderProducts() {
    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
          onerror="this.src='https://via.placeholder.com/400x300?text=Cake+Image'"
        />
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p>Delicious cake for any occasion.</p>
          <button class="primary-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      `;

      productList.appendChild(card);
    });

    // Attach event listeners AFTER rendering
    document.querySelectorAll(".product-card button").forEach(button => {
      button.addEventListener("click", () => {
        addToCart(parseInt(button.dataset.id));
      });
    });
  }

  // ---------- CART ----------
  function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.quantity++;
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
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "$0.00";
      cartCount.textContent = "0";
      return;
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      count += item.quantity;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <div>
          <h4>${item.name}</h4>
          <p>${item.quantity} × $${item.price.toFixed(2)}</p>
        </div>
        <button data-id="${item.id}">Remove</button>
      `;

      div.querySelector("button").addEventListener("click", () => {
        removeFromCart(item.id);
      });

      cartItems.appendChild(div);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = count;
  }

  // ---------- CLEAR CART ----------
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      renderCart();
    });
  }

  // ---------- CHECKOUT ----------
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();

      if (cart.length === 0) {
        orderMessage.textContent = "Your cart is empty.";
        orderSummary.innerHTML = "";
        return;
      }

      const name = document.getElementById("name").value;

      let total = 0;
      let summary = "<h3>🧾 Order Summary</h3><ul>";

      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        summary += `<li>${item.name} × ${item.quantity} — $${itemTotal.toFixed(2)}</li>`;
      });

      summary += `</ul><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
      summary += `<p>🎂 Enjoy your cake, ${name}! We hope to see you again soon.</p>`;

      orderMessage.textContent = `✅ Thank you, ${name}!`;
      orderSummary.innerHTML = summary;

      cart = [];
      renderCart();
      checkoutForm.reset();
    });
  }

  // ---------- LOGIN ----------
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      if (authMessage) {
        authMessage.textContent = `Logged in as ${email}`;
      }
      loginForm.reset();
    });
  }

  // ---------- SIGNUP ----------
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value;
      if (authMessage) {
        authMessage.textContent = `Welcome ${name}! Account created.`;
      }
      signupForm.reset();
    });
  }

  // ---------- INIT ----------
  renderProducts();
  renderCart();

});