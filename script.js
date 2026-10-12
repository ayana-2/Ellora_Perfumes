/* ==========================================================
   ELLORA PARFUMS — Interactive Script
   ========================================================== */

const products = [
  {
    id: 1, name: "Noir Élixir", category: "Woody", badge: "BESTSELLER",
    subtitle: "Warm woods · Amber · Musk",
    description: "A captivating warm fragrance with a sophisticated character, created for moments when quiet confidence says everything.",
    top: "Bergamot, Pink Pepper", heart: "Cedarwood, Iris", base: "Amber, Musk, Sandalwood",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 1299, "50 ml": 2199, "100 ml": 3499 }
  },
  {
    id: 2, name: "Rose Velours", category: "Floral", badge: "SIGNATURE",
    subtitle: "Rose petals · Peony · Soft musk",
    description: "A graceful floral fragrance inspired by fresh petals and soft luxurious textures. Delicate, elegant and memorable.",
    top: "Pink Pepper, Mandarin", heart: "Rose, Peony, Jasmine", base: "White Musk, Cashmere Woods",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 1199, "50 ml": 1999, "100 ml": 3299 }
  },
  {
    id: 3, name: "Oud Royale", category: "Oud", badge: "EXCLUSIVE",
    subtitle: "Rich oud · Saffron · Amber",
    description: "Deep, luxurious and mysterious. A statement fragrance inspired by rich woods and golden warmth.",
    top: "Saffron, Cardamom", heart: "Oud, Rose", base: "Amber, Patchouli, Woods",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 1499, "50 ml": 2499, "100 ml": 3999 }
  },
  {
    id: 4, name: "Azure Mist", category: "Fresh", badge: "EVERYDAY",
    subtitle: "Citrus · Sea breeze · Clean musk",
    description: "A bright, refreshing scent that feels like a breath of fresh air. Effortless for everyday wear.",
    top: "Bergamot, Lemon", heart: "Marine Notes, Neroli", base: "White Musk, Driftwood",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 999, "50 ml": 1799, "100 ml": 2899 }
  },
  {
    id: 5, name: "Velvet Amber", category: "Oud", badge: "NEW ARRIVAL",
    subtitle: "Golden amber · Vanilla · Tonka",
    description: "Smooth amber and creamy vanilla create a comforting fragrance with a sophisticated finish.",
    top: "Mandarin, Nutmeg", heart: "Amber, Cinnamon", base: "Vanilla, Tonka Bean, Musk",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 1299, "50 ml": 2199, "100 ml": 3599 }
  },
  {
    id: 6, name: "Bloom No. 5", category: "Floral", badge: "SOFT & ELEGANT",
    subtitle: "Jasmine · White flowers · Musk",
    description: "A luminous floral blend with a soft, elegant finish, made for anyone who loves understated beauty.",
    top: "Pear, Mandarin", heart: "Jasmine, Orange Blossom", base: "White Musk, Vanilla",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 1099, "50 ml": 1899, "100 ml": 3099 }
  },
  {
    id: 7, name: "Cedar Dusk", category: "Woody", badge: "EVENING EDIT",
    subtitle: "Cedar · Vetiver · Smoky woods",
    description: "Earthy woods and refined spice form a confident fragrance for evenings and special occasions.",
    top: "Black Pepper, Bergamot", heart: "Cedarwood, Vetiver", base: "Smoky Woods, Amber",
    image: "https://images.unsplash.com/photo-1595535373192-fc8935bacd89?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 1299, "50 ml": 2299, "100 ml": 3699 }
  },
  {
    id: 8, name: "Pure Lumière", category: "Fresh", badge: "FRESH PICK",
    subtitle: "Citrus blossom · Green notes · Musk",
    description: "Clean, bright and effortlessly refined. A fresh fragrance designed for everyday moments.",
    top: "Lemon, Green Mandarin", heart: "Neroli, Green Tea", base: "Soft Musk, Light Woods",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85",
    prices: { "30 ml": 999, "50 ml": 1699, "100 ml": 2799 }
  }
];

const FREE_SHIPPING_LIMIT = 2500;
const SHIPPING_FEE = 99;

let category = "All";
let searchTerm = "";
let cart = [];
let currentProduct = null;
let currentSize = "50 ml";
let quantity = 1;
let toastTimer;
let modalHistoryOpen = false;
let lastFocusedElement = null;

const $ = (id) => document.getElementById(id);

const money = (amount) => "₹" + amount.toLocaleString("en-IN");

const FALLBACK_IMG = "https://placehold.co/600x720/17120c/c9a568?text=ELLORA";
const FALLBACK_THUMB = "https://placehold.co/200x240/17120c/c9a568?text=ELLORA";

/* ========== TOAST ========== */
function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ========== RENDER PRODUCTS ========== */
function renderProducts() {
  const grid = $("productGrid");
  const sort = $("sortSelect").value;

  let list = products.filter((product) => {
    const categoryMatch = category === "All" || product.category === category;

    const haystack = (
      product.name + " " +
      product.category + " " +
      product.subtitle + " " +
      product.top + " " +
      product.heart + " " +
      product.base
    ).toLowerCase();

    return categoryMatch && haystack.includes(searchTerm.toLowerCase());
  });

  if (sort === "low") list.sort((a, b) => a.prices["50 ml"] - b.prices["50 ml"]);
  if (sort === "high") list.sort((a, b) => b.prices["50 ml"] - a.prices["50 ml"]);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  grid.innerHTML = "";
  $("resultCount").textContent = list.length + " FRAGRANCES";
  $("emptyMessage").hidden = list.length > 0;

  list.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.animationDelay = index * 50 + "ms";

    card.innerHTML = `
      <div class="product-photo" data-view="${product.id}" role="button" tabindex="0" aria-label="View ${product.name}">
        <img src="${product.image}" alt="${product.name} perfume" loading="lazy">
        <span class="product-badge">${product.badge}</span>
        <button class="quick-view" data-view="${product.id}" type="button">DISCOVER FRAGRANCE ↗</button>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category} COLLECTION</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-subtitle">${product.subtitle}</p>
        <div class="product-bottom">
          <span class="product-price">${money(product.prices["50 ml"])}</span>
          <button class="add-button" data-add="${product.id}" type="button">ADD TO BAG +</button>
        </div>
      </div>
    `;

    const image = card.querySelector("img");
    image.onerror = function () {
      this.onerror = null;
      this.src = FALLBACK_IMG;
    };

    grid.appendChild(card);
  });
}

/* ========== CATEGORY FILTER ========== */
function setCategory(value) {
  category = value;

  document.querySelectorAll(".filter").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === value);
  });

  renderProducts();
}

/* ========== BODY SCROLL LOCK ========== */
function lockBody() {
  if (!document.body.classList.contains("lock")) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty("--scrollbar-width", scrollbarWidth + "px");
    document.body.classList.add("lock");
  }
}

function unlockBody() {
  if (
    !$("cartDrawer").classList.contains("open") &&
    !$("productModal").classList.contains("open")
  ) {
    document.body.classList.remove("lock");
    document.body.style.removeProperty("--scrollbar-width");
  }
}

/* ========== CART DRAWER ========== */
function openCart() {
  closeModal(false, true);

  $("cartDrawer").classList.add("open");
  $("cartDrawer").setAttribute("aria-hidden", "false");
  $("overlay").classList.add("visible");
  lockBody();

  setTimeout(() => $("closeCart").focus(), 100);
}

function closeCart() {
  $("cartDrawer").classList.remove("open");
  $("cartDrawer").setAttribute("aria-hidden", "true");
  $("overlay").classList.remove("visible");
  unlockBody();
}

/* ========== PRODUCT MODAL ========== */
function openModal(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;

  const modalWasOpen = $("productModal").classList.contains("open");

  closeCart();

  currentProduct = product;
  currentSize = "50 ml";
  quantity = 1;

  $("modalCategory").textContent = product.category + " COLLECTION";
  $("modalName").textContent = product.name;
  $("modalSubtitle").textContent = product.subtitle;
  $("modalDescription").textContent = product.description;
  $("modalTop").textContent = product.top;
  $("modalHeart").textContent = product.heart;
  $("modalBase").textContent = product.base;

  $("modalImage").innerHTML = "";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name + " perfume";
  image.onerror = function () {
    this.onerror = null;
    this.src = FALLBACK_IMG;
  };
  $("modalImage").appendChild(image);

  $("sizeOptions").innerHTML = "";
  Object.keys(product.prices).forEach((size) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "size-option";
    button.dataset.size = size;
    button.textContent = size + " · " + money(product.prices[size]);

    button.addEventListener("click", () => {
      currentSize = size;
      updateModal();
    });

    $("sizeOptions").appendChild(button);
  });

  updateModal();

  lastFocusedElement = document.activeElement;

  $("productModal").classList.add("open");
  $("productModal").setAttribute("aria-hidden", "false");
  lockBody();

  if (!modalWasOpen && !modalHistoryOpen) {
    history.pushState({ elloraProductModal: true }, "");
    modalHistoryOpen = true;
  }

  setTimeout(() => $("closeModal").focus(), 100);
}

function updateModal() {
  if (!currentProduct) return;

  const price = currentProduct.prices[currentSize];

  document.querySelectorAll(".size-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.size === currentSize);
  });

  $("modalPrice").textContent = money(price);
  $("modalQty").textContent = quantity;
  $("modalAdd").textContent = "ADD TO BAG — " + money(price * quantity);
}

function closeModal(fromHistory = false, keepFocus = false) {
  const wasOpen = $("productModal").classList.contains("open");

  $("productModal").classList.remove("open");
  $("productModal").setAttribute("aria-hidden", "true");
  unlockBody();

  if (modalHistoryOpen) {
    modalHistoryOpen = false;

    if (!fromHistory && wasOpen) {
      history.back();
    }
  }

  if (!keepFocus && lastFocusedElement && wasOpen) {
    const focusTarget = lastFocusedElement;
    lastFocusedElement = null;
    setTimeout(() => {
      if (focusTarget && document.contains(focusTarget)) {
        focusTarget.focus();
      }
    }, 50);
  } else {
    lastFocusedElement = null;
  }
}

/* ========== ADD TO CART ========== */
function addToCart(product, size, amount) {
  const existing = cart.find((item) => item.id === product.id && item.size === size);

  if (existing) {
    existing.quantity += amount;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      size: size,
      price: product.prices[size],
      quantity: amount,
      image: product.image
    });
  }

  renderCart();
  showToast(product.name + " added to your bag.");
}

function subtotalAmount() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function shippingAmount() {
  if (cart.length === 0 || subtotalAmount() >= FREE_SHIPPING_LIMIT) return 0;
  return SHIPPING_FEE;
}

/* ========== RENDER CART ========== */
function renderCart() {
  const cartItems = $("cartItems");
  cartItems.innerHTML = "";

  let count = 0;

  cart.forEach((item) => {
    count += item.quantity;

    const row = document.createElement("article");
    row.className = "cart-item";
    row.dataset.id = item.id;
    row.dataset.size = item.size;

    row.innerHTML = `
      <img alt="${item.name}" src="${item.image}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.size} · ${money(item.price)}</p>
        <div class="cart-controls">
          <div class="quantity">
            <button type="button" data-change="-1" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-change="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-button" data-remove type="button">Remove</button>
        </div>
      </div>
      <strong class="cart-item-price">${money(item.price * item.quantity)}</strong>
    `;

    row.querySelector("img").onerror = function () {
      this.onerror = null;
      this.src = FALLBACK_THUMB;
    };

    cartItems.appendChild(row);
  });

  const subtotal = subtotalAmount();
  const shipping = shippingAmount();

  $("cartCount").textContent = count;
  $("drawerCount").textContent = "(" + count + ")";
  $("cartEmpty").hidden = count > 0;
  $("cartSummary").hidden = count === 0;

  $("subtotal").textContent = money(subtotal);
  $("shipping").textContent = count > 0 && shipping === 0 ? "FREE" : money(shipping);
  $("total").textContent = money(subtotal + shipping);

  $("shippingInfo").textContent =
    count === 0
      ? "Your bag is waiting for something special."
      : subtotal >= FREE_SHIPPING_LIMIT
        ? "You've unlocked complimentary shipping!"
        : "Add " + money(FREE_SHIPPING_LIMIT - subtotal) + " more for free shipping.";
}

function changeQuantity(id, size, change) {
  const item = cart.find((product) => product.id === id && product.size === size);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => !(product.id === id && product.size === size));
  }

  renderCart();
}

/* ========== EVENT LISTENERS ========== */
$("filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) setCategory(button.dataset.category);
});

$("productGrid").addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const viewButton = event.target.closest("[data-view]");

  if (addButton) {
    const product = products.find((item) => item.id === Number(addButton.dataset.add));
    if (product) addToCart(product, "50 ml", 1);
  } else if (viewButton) {
    openModal(viewButton.dataset.view);
  }
});

$("productGrid").addEventListener("keydown", (event) => {
  if (
    (event.key === "Enter" || event.key === " ") &&
    event.target.matches(".product-photo")
  ) {
    event.preventDefault();
    openModal(event.target.dataset.view);
  }
});

$("searchToggle").addEventListener("click", () => {
  const row = $("searchRow");
  const isHidden = row.hidden;
  row.hidden = !isHidden;

  if (isHidden) {
    $("searchInput").focus();
    row.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

$("searchInput").addEventListener("input", function () {
  searchTerm = this.value;
  renderProducts();
});

$("clearSearch").addEventListener("click", () => {
  $("searchInput").value = "";
  searchTerm = "";
  renderProducts();
  $("searchInput").focus();
});

$("sortSelect").addEventListener("change", renderProducts);
$("cartToggle").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("overlay").addEventListener("click", closeCart);

$("continueShopping").addEventListener("click", () => {
  closeCart();
  $("shop").scrollIntoView({ behavior: "smooth" });
});

$("cartItems").addEventListener("click", (event) => {
  const row = event.target.closest(".cart-item");
  if (!row) return;

  const id = Number(row.dataset.id);
  const size = row.dataset.size;
  const changeButton = event.target.closest("[data-change]");
  const removeButton = event.target.closest("[data-remove]");

  if (changeButton) {
    changeQuantity(id, size, Number(changeButton.dataset.change));
  }

  if (removeButton) {
    cart = cart.filter((item) => !(item.id === id && item.size === size));
    renderCart();
    showToast("Item removed from your bag.");
  }
});

$("closeModal").addEventListener("click", () => closeModal());

$("productModal").addEventListener("click", function (event) {
  if (event.target === this) closeModal();
});

$("qtyMinus").addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateModal();
  }
});

$("qtyPlus").addEventListener("click", () => {
  if (quantity < 20) {
    quantity++;
    updateModal();
  }
});

$("modalAdd").addEventListener("click", () => {
  if (!currentProduct) return;

  addToCart(currentProduct, currentSize, quantity);
  closeModal();
  openCart();
});

$("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your bag is empty.");
    return;
  }

  let details = "";
  cart.forEach((item) => {
    details += item.name + " — " + item.size + " × " + item.quantity + "\n";
  });

  alert(
    "ELLORA — DEMO CHECKOUT\n\n" +
    details +
    "\nSubtotal: " + money(subtotalAmount()) +
    "\nShipping: " + money(shippingAmount()) +
    "\nTotal: " + money(subtotalAmount() + shippingAmount()) +
    "\n\nDemo only. No payment has been taken and no order has been placed."
  );
});

$("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!$("emailInput").checkValidity()) {
    $("emailInput").reportValidity();
    return;
  }

  $("newsletterMessage").textContent = "Thank you for your interest in ELLORA!";
  $("emailInput").value = "";
});

$("menuToggle").addEventListener("click", function () {
  const nav = $("nav");
  nav.classList.toggle("open");
  this.setAttribute("aria-expanded", nav.classList.contains("open"));
});

document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", () => {
    $("nav").classList.remove("open");
    $("menuToggle").setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeModal();
    $("nav").classList.remove("open");
    $("menuToggle").setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("popstate", () => {
  if (modalHistoryOpen && $("productModal").classList.contains("open")) {
    closeModal(true);
  }
});

/* ========== INIT ========== */
$("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();