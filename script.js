const cartToggle = document.getElementById('cartToggle');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const orderPhoneInput = document.getElementById('orderPhone');
const orderLocationInput = document.getElementById('orderLocation');
const cartOrderNote = document.getElementById('cartOrderNote');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const siteNav = document.getElementById('siteNav');
const productGrid = document.getElementById('productGrid');
const featuredGrid = document.getElementById('featuredGrid');
const galleryGrid = document.getElementById('galleryGrid');
const accountToggle = document.getElementById('accountToggle');
const accountCta = document.getElementById('accountCta');
const accountOverlay = document.getElementById('accountOverlay');
const closeAccount = document.getElementById('closeAccount');
const accountStatus = document.getElementById('accountStatus');
const recentPurchasesContainer = document.getElementById('recentPurchases');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginNote = document.getElementById('loginNote');
const signupNote = document.getElementById('signupNote');
const passwordToggles = Array.from(document.querySelectorAll('.password-toggle'));
const accountTabs = Array.from(document.querySelectorAll('[data-account-tab]'));
const accountViews = Array.from(document.querySelectorAll('[data-account-view]'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');

const STORAGE_KEY = 'tobiTreatsCart';
const USERS_KEY = 'tobiTreatsUsers';
const SESSION_KEY = 'tobiTreatsCurrentUser';
const PURCHASES_KEY = 'tobiTreatsPurchaseHistory';
const WHATSAPP_NUMBER = '2349015636246';
const CATEGORIES = ['All', 'Cake', 'Parfait', 'Pancake', 'Bread'];

const products = [
  {
    id: 'cake-birthday',
    category: 'Cake',
    name: "Tobi Treats Birthday Cake",
    price: 40000,
    image: 'image/cake 2.jpeg',
    alt: 'Birthday cake',
    description: 'Classic celebration cake with rich buttercream and elegant finish.',
    featured: true,
  },
  {
    id: 'cake-redvelvet',
    category: 'Cake',
    name: "Tobi Treats Red Velvet Small Naked Cake",
    price: 1500,
    image: 'image/cake 5.jpeg',
    alt: 'Red velvet cake',
    description: 'Soft red velvet layers with creamy filling and silky texture.',
    featured: false,
  },
  {
    id: 'cake-whipped',
    category: 'Cake',
    name: 'Size 7 Layers Whipped Cream Cake',
    price: 35000,
    image: 'image/cake 3.jpeg',
    alt: 'Whipped cream cake',
    description: 'Elegant seven-layer cake topped with whipped cream and petals.',
    featured: true,
  },
  {
    id: 'parfait-fruit',
    category: 'Parfait',
    name: "Tobi Treats Big Size Fruit Parfait",
    price: 4500,
    image: 'image/cake pic 1.jpeg',
    alt: 'Fruit parfait',
    description: 'Fresh fruit, creamy layers, and crunchy texture in every bite.',
    featured: true,
  },
  {
    id: 'parfait-cake',
    category: 'Parfait',
    name: "Tobi Treats Cake Parfait",
    price: 3500,
    image: 'image/parfait 1.jpeg',
    alt: 'Cake parfait',
    description: 'Creamy parfait layered with cake pieces and berry sauce.',
    featured: false,
  },
  {
    id: 'pancake-simple',
    category: 'Pancake',
    name: "Tobi Treats Breakfast Box (Fluffy Buttermilk Pancakes)",
    price: 2800,
    image: 'image/pancakes 4.jpeg',
    alt: 'Fluffy pancakes',
    description: 'Light pancakes with syrup, berries, and warm comfort.',
    featured: false,
  },
  {
    id: 'pancake-full',
    category: 'Pancake',
    name: "Tobi Treats Breakfast Box (Fluffy Buttermilk Pancakes, Signature Scrambled Eggs and Signature Glazed Sausage Maple Syrup)",
    price: 3500,
    image: 'image/pancakes 3.jpeg',
    alt: 'Breakfast box pancakes',
    description: 'A hearty breakfast box with pancakes, eggs, and glazed sausage.',
    featured: true,
  },
  {
    id: 'bread-two',
    category: 'Bread',
    name: "Tobi Treats Banana Bread Minimum of Two",
    price: 1500,
    image: 'image/Bread 2.jpeg',
    alt: 'Banana bread',
    description: 'Moist banana bread loaves with warm cinnamon and honey notes.',
    featured: false,
  },
  {
    id: 'bread-loaf',
    category: 'Bread',
    name: "Tobi Treats Banana Bread Loaf Plain Flavor",
    price: 5000,
    image: 'image/Bread 1.jpeg',
    alt: 'Banana bread loaf',
    description: 'Premium loaf with golden crust and tender crumb.',
    featured: false,
  },
];

let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
let currentUser = JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
let purchaseHistory = JSON.parse(localStorage.getItem(PURCHASES_KEY)) || [];
let testimonialIndex = 0;

function formatPrice(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function sendWhatsAppMessage(message) {
  const whatsappUrl = createWhatsAppLink(message);
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function saveUsers() {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveCurrentUser() {
  if (currentUser) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function savePurchaseHistory() {
  localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchaseHistory));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

function updateCartCount() {
  cartCount.textContent = getCartCount();
}

function renderFeaturedProducts() {
  const featuredItems = products.filter((product) => product.featured);
  featuredGrid.innerHTML = featuredItems
    .map(
      (product) => `
        <article class="feature-card">
          <img src="${product.image}" alt="${product.alt}" onerror="this.onerror=null;this.src='https://via.placeholder.com/420x320?text=Product'" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="feature-footer">
            <span>${formatPrice(product.price)}</span>
            <button class="button button-primary add-cart" data-product-id="${product.id}">Add to Cart</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderCategoryFilters(activeCategory = 'All') {
  const filterContainer = document.getElementById('categoryFilters');
  filterContainer.innerHTML = CATEGORIES.map((category) => `
    <button type="button" class="filter-button ${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>
  `).join('');
}

function renderProducts(category = 'All') {
  const visibleProducts = category === 'All' ? products : products.filter((product) => product.category === category);
  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.alt}" onerror="this.onerror=null;this.src='https://via.placeholder.com/440x320?text=Replace+Image'" />
          <div class="product-card-content">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="product-price">${formatPrice(product.price)}</p>
            <div class="product-actions">
              <div class="product-quantity">
                <button type="button" class="quantity-btn decrease">-</button>
                <span class="quantity-value">1</span>
                <button type="button" class="quantity-btn increase">+</button>
              </div>
              <button type="button" class="button add-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function renderCart() {
  if (!cart.length) {
    cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty. Add a treat to get started.</p>';
    cartTotalElement.textContent = formatPrice(0);
    updateCartCount();
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.alt}" onerror="this.onerror=null;this.src='https://via.placeholder.com/120x120?text=Replace+Image'" />
          <div class="cart-item-content">
            <h4>${item.name}</h4>
            <span>${formatPrice(item.price)} each</span>
            <div class="quantity-controls" data-product-id="${item.id}">
              <button class="decrease" type="button" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button class="increase" type="button" aria-label="Increase quantity">+</button>
              <button class="remove-item" type="button">Remove</button>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  cartTotalElement.textContent = formatPrice(getCartTotal());
  updateCartCount();
}

function formatOrderDate(dateString) {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

function getUserPurchaseOrders() {
  if (!currentUser) return [];
  const email = currentUser.email.toLowerCase();
  return purchaseHistory
    .filter((order) => order.email.toLowerCase() === email)
    .sort((left, right) => new Date(right.date) - new Date(left.date));
}

function renderAccountStatus() {
  if (!accountStatus) return;

  if (!currentUser) {
    accountStatus.innerHTML = `
      <div class="account-status-card">
        <div>
          <span class="eyebrow">Guest mode</span>
          <h4>Sign in to keep your recent orders</h4>
          <p>Create an account to store your details, view recent purchases, and reorder faster next time.</p>
        </div>
      </div>
    `;
    return;
  }

  accountStatus.innerHTML = `
    <div class="account-status-card account-status-card-active">
      <div>
        <span class="eyebrow">Signed in</span>
        <h4>${currentUser.name}</h4>
        <p>${currentUser.email} · ${currentUser.phone}</p>
      </div>
      <button type="button" class="button button-secondary account-signout" data-action="signout">Sign Out</button>
    </div>
  `;
}

function renderRecentPurchases() {
  if (!recentPurchasesContainer) return;

  if (!currentUser) {
    recentPurchasesContainer.innerHTML = `
      <div class="empty-state">
        <h4>Sign in to view your purchase history</h4>
        <p>Your recent cake and pastry orders will appear here after you log in.</p>
      </div>
    `;
    return;
  }

  const recentItems = getUserPurchaseOrders()
    .reduce((items, order) => {
      order.items.forEach((item) => {
        items.push({ ...item, purchasedAt: order.date });
      });
      return items;
    }, [])
    .slice(0, 6);

  if (!recentItems.length) {
    recentPurchasesContainer.innerHTML = `
      <div class="empty-state">
        <h4>No purchases yet</h4>
        <p>Once you place an order, the products you bought before will be ready to reorder here.</p>
      </div>
    `;
    return;
  }

  recentPurchasesContainer.innerHTML = recentItems
    .map(
      (item) => `
        <article class="purchase-card">
          <img src="${item.image}" alt="${item.alt}" onerror="this.onerror=null;this.src='https://via.placeholder.com/220x180?text=Recent+Order'" />
          <div class="purchase-card-content">
            <div>
              <span class="purchase-date">Bought ${formatOrderDate(item.purchasedAt)}</span>
              <h4>${item.name}</h4>
              <p>${item.quantity} item${item.quantity > 1 ? 's' : ''} · ${formatPrice(item.price * item.quantity)}</p>
            </div>
            <button type="button" class="button button-secondary reorder-button" data-product-id="${item.id}" data-quantity="${item.quantity}">Order Again</button>
          </div>
        </article>
      `
    )
    .join('');
}

function setAccountView(viewName) {
  accountTabs.forEach((tab) => {
    const isActive = tab.dataset.accountTab === viewName;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  accountViews.forEach((view) => {
    view.classList.toggle('active', view.dataset.accountView === viewName);
  });
}

function openAccountPanel(viewName = 'signin') {
  setAccountView(viewName);
  renderAccountStatus();
  renderRecentPurchases();
  accountOverlay.classList.add('open');
  accountOverlay.setAttribute('aria-hidden', 'false');
}

function closeAccountPanel() {
  accountOverlay.classList.remove('open');
  accountOverlay.setAttribute('aria-hidden', 'true');
}

function setCurrentUser(user) {
  currentUser = user;
  saveCurrentUser();
  renderAccountStatus();
  renderRecentPurchases();
}

function recordPurchaseHistory() {
  if (!cart.length) return;

  purchaseHistory.unshift({
    id: `${Date.now()}`,
    email: currentUser?.email || 'guest@tobitreats.com',
    name: currentUser?.name || 'Guest Customer',
    date: new Date().toISOString(),
    items: cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      alt: item.alt,
    })),
  });

  savePurchaseHistory();
  renderRecentPurchases();
}

function findProduct(productId) {
  return products.find((product) => product.id === productId);
}

function addToCart(productId, quantity = 1) {
  const product = findProduct(productId);
  if (!product) return;
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart();
  renderCart();
}

function reorderPurchasedItem(productId, quantity = 1) {
  const product = findProduct(productId);
  if (!product) return;
  addToCart(productId, quantity);
}

function changeCartQuantity(productId, delta) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) {
    cart = cart.filter((entry) => entry.id !== productId);
  }
  saveCart();
  renderCart();
}

function removeCartItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function openCartDrawer() {
  cartDrawer.classList.add('open');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
}

function openLightbox(src, caption) {
  lightboxImage.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightboxModal() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxCaption.textContent = '';
}

function handleMenuClick(event) {
  const quantityBtn = event.target.closest('.quantity-btn');
  if (quantityBtn) {
    const card = quantityBtn.closest('.product-card');
    const counter = card.querySelector('.quantity-value');
    let value = Number(counter.textContent);
    if (quantityBtn.classList.contains('increase')) {
      value += 1;
    } else if (quantityBtn.classList.contains('decrease')) {
      value = Math.max(1, value - 1);
    }
    counter.textContent = value;
    return;
  }

  const addButton = event.target.closest('.add-cart');
  if (addButton) {
    const productId = addButton.dataset.productId;
    const card = addButton.closest('.product-card');
    const quantity = Number(card.querySelector('.quantity-value').textContent) || 1;
    addToCart(productId, quantity);
    card.querySelector('.quantity-value').textContent = 1;
    return;
  }
}

function handleCartControls(event) {
  const cartItem = event.target.closest('.quantity-controls');
  if (!cartItem) return;
  const productId = cartItem.dataset.productId;
  if (event.target.classList.contains('increase')) {
    changeCartQuantity(productId, 1);
  } else if (event.target.classList.contains('decrease')) {
    changeCartQuantity(productId, -1);
  } else if (event.target.classList.contains('remove-item')) {
    removeCartItem(productId);
  }
}

function handleCheckout() {
  if (!cart.length) {
    alert('Your cart is empty. Add some treats first.');
    return;
  }

  const phone = orderPhoneInput.value.trim();
  const location = orderLocationInput.value.trim();
  if (!phone || !location) {
    cartOrderNote.textContent = 'Please add your WhatsApp number and delivery location before placing your order.';
    cartOrderNote.style.color = '#c0392b';
    return;
  }

  const messageLines = [
    "Hello Tobi Treats,",
    'I would like to place an order:',
    '',
    ...cart.map((item) => `${item.quantity} × ${item.name} — ${formatPrice(item.price * item.quantity)}`),
    '',
    `Total: ${formatPrice(getCartTotal())}`,
    '',
    `Delivery location: ${location}`,
    `WhatsApp: ${phone}`,
    '',
    'Please confirm availability and delivery details.',
  ];

  sendWhatsAppMessage(messageLines.join('\n'));
  recordPurchaseHistory();
  cartOrderNote.textContent = 'Your order request is being sent. Please complete it in WhatsApp.';
  cartOrderNote.style.color = '#2f855a';
  cart = [];
  saveCart();
  renderCart();
  closeCartDrawer();
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const phone = contactForm.phone.value.trim();
  const message = contactForm.message.value.trim();
  if (!name || !email || !phone || !message) {
    formNote.textContent = 'Please fill in all required fields before sending your request.';
    formNote.style.color = '#c0392b';
    return;
  }

  const orderSummary = cart.length
    ? `\n\nOrder request:\n${cart.map((item) => `${item.quantity} × ${item.name} — ${formatPrice(item.price * item.quantity)}`).join('\n')}\nTotal: ${formatPrice(getCartTotal())}`
    : '';

  const whatsappMessage = [
    "Hello Tobi Treats,",
    `My name is ${name}.`,
    `Email: ${email}`,
    `WhatsApp: ${phone}`,
    '',
    `Message: ${message}`,
    orderSummary,
    '',
    'Please confirm that you received my request and provide delivery details.',
  ]
    .filter(Boolean)
    .join('\n');

  sendWhatsAppMessage(whatsappMessage);
  formNote.textContent = 'Thanks! Your request has been sent to WhatsApp. We will reply soon.';
  formNote.style.color = '#2f855a';
  contactForm.reset();
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = loginForm.email.value.trim().toLowerCase();
  const password = loginForm.password.value.trim();
  const matchedUser = users.find((user) => user.email.toLowerCase() === email && user.password === password);

  if (!matchedUser) {
    loginNote.textContent = 'That email and password do not match our records.';
    loginNote.style.color = '#c0392b';
    return;
  }

  loginNote.textContent = 'Welcome back. Your recent purchases are ready.';
  loginNote.style.color = '#2f855a';
  loginForm.reset();
  setCurrentUser({
    name: matchedUser.name,
    email: matchedUser.email,
    phone: matchedUser.phone,
  });
  openAccountPanel('history');
}

function handleSignupSubmit(event) {
  event.preventDefault();
  const name = signupForm.name.value.trim();
  const email = signupForm.email.value.trim().toLowerCase();
  const phone = signupForm.phone.value.trim();
  const password = signupForm.password.value.trim();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    signupNote.textContent = 'An account already exists with that email address.';
    signupNote.style.color = '#c0392b';
    return;
  }

  const newUser = { name, email, phone, password };
  users = [...users, newUser];
  saveUsers();
  signupNote.textContent = 'Account created successfully. You are now signed in.';
  signupNote.style.color = '#2f855a';
  signupForm.reset();
  setCurrentUser({ name, email, phone });
  openAccountPanel('history');
}

function handleAccountStatusClick(event) {
  const signOutButton = event.target.closest('[data-action="signout"]');
  if (!signOutButton) return;
  setCurrentUser(null);
  renderRecentPurchases();
  renderAccountStatus();
  openAccountPanel('signin');
}

function handleRecentPurchasesClick(event) {
  const reorderButton = event.target.closest('.reorder-button');
  if (!reorderButton) return;
  const productId = reorderButton.dataset.productId;
  const quantity = Number(reorderButton.dataset.quantity) || 1;
  reorderPurchasedItem(productId, quantity);
  openCartDrawer();
}

function updateMenuToggleState() {
  const isOpen = siteNav.classList.contains('open');
  mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
}

function handleAccountTabClick(event) {
  const button = event.target.closest('[data-account-tab]');
  if (!button) return;
  setAccountView(button.dataset.accountTab);
}

function handleMobileMenuToggle() {
  siteNav.classList.toggle('open');
  updateMenuToggleState();
}

function closeMobileMenu() {
  siteNav.classList.remove('open');
  updateMenuToggleState();
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMobileMenu();
    });
  });
}

function handleCategoryFilter(event) {
  const button = event.target.closest('.filter-button');
  if (!button) return;
  const category = button.dataset.category;
  renderCategoryFilters(category);
  renderProducts(category);
}

function initTestimonials() {
  const slides = Array.from(document.querySelectorAll('.testimonial-card'));
  setInterval(() => {
    slides[testimonialIndex].classList.remove('active');
    testimonialIndex = (testimonialIndex + 1) % slides.length;
    slides[testimonialIndex].classList.add('active');
  }, 6000);
}

function initGallery() {
  galleryGrid.addEventListener('click', (event) => {
    const item = event.target.closest('.gallery-item');
    if (!item) return;
    openLightbox(item.dataset.src, item.dataset.caption);
  });
  closeLightbox.addEventListener('click', closeLightboxModal);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightboxModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightboxModal();
  });
}

// Admin Dashboard Functions
function togglePasswordVisibility(button) {
  const targetId = button.dataset.passwordToggle;
  const input = document.getElementById(targetId);
  if (!input) return;

  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  button.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
  button.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
}

function init() {
  renderFeaturedProducts();
  renderCategoryFilters('All');
  renderProducts('All');
  renderCart();
  initSmoothScrolling();
  initTestimonials();
  initGallery();
  document.addEventListener('click', handleMenuClick);
  cartItemsContainer.addEventListener('click', handleCartControls);
  recentPurchasesContainer.addEventListener('click', handleRecentPurchasesClick);
  cartToggle.addEventListener('click', openCartDrawer);
  closeCart.addEventListener('click', closeCartDrawer);
  checkoutButton.addEventListener('click', handleCheckout);
  contactForm.addEventListener('submit', handleContactSubmit);
  loginForm.addEventListener('submit', handleLoginSubmit);
  signupForm.addEventListener('submit', handleSignupSubmit);
  mobileMenuToggle.addEventListener('click', handleMobileMenuToggle);
  document.getElementById('categoryFilters').addEventListener('click', handleCategoryFilter);
  accountToggle.addEventListener('click', () => openAccountPanel('signin'));
  accountCta.addEventListener('click', () => openAccountPanel('signin'));
  closeAccount.addEventListener('click', closeAccountPanel);
  accountOverlay.addEventListener('click', (event) => {
    if (event.target === accountOverlay) closeAccountPanel();
  });
  accountTabs.forEach((tab) => tab.addEventListener('click', handleAccountTabClick));
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => togglePasswordVisibility(toggle));
  });
  accountStatus.addEventListener('click', handleAccountStatusClick);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCartDrawer();
      closeMobileMenu();
      closeAccountPanel();
    }
  });

  renderAccountStatus();
  renderRecentPurchases();
}

window.addEventListener('DOMContentLoaded', init);
