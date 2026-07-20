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

const STORAGE_KEY = 'tobiTreatsCart';
const WHATSAPP_NUMBER = '2349015636246';

const products = [
  {
    id: 'cake-birthday',
    category: 'Cake',
    name: "Tobi Treats Birthday Cake",
    price: 40000,
    image: 'image/cake 2.jpeg',
    alt: 'Birthday cake',
  },
  {
    id: 'cake-redvelvet',
    category: 'Cake',
    name: "Tobi Treats Red Velvet Small Naked Cake",
    price: 1500,
    image: 'image/cake 5.jpeg',
    alt: 'Red velvet cake',
  },
  {
    id: 'cake-whipped',
    category: 'Cake',
    name: 'Size 7 Layers Whipped Cream Cake',
    price: 35000,
    image: 'image/cake 3.jpeg',
    alt: 'Whipped cream cake',
  },
  {
    id: 'parfait-fruit',
    category: 'Parfait',
    name: "Tobi Treats Big Size Fruit Parfait",
    price: 4500,
    image: 'image/cake pic 1.jpeg',
    alt: 'Fruit parfait',
  },
  {
    id: 'parfait-cake',
    category: 'Parfait',
    name: "Tobi Treats Cake Parfait",
    price: 3500,
    image: 'image/parfait 1.jpeg',
    alt: 'Cake parfait',
  },
  {
    id: 'pancake-simple',
    category: 'Pancake',
    name: "Tobi Treats Breakfast Box (Fluffy Buttermilk Pancakes)",
    price: 2800,
    image: 'image/pancakes 4.jpeg',
    alt: 'Fluffy pancakes',
  },
  {
    id: 'pancake-full',
    category: 'Pancake',
    name: "Tobi Treats Breakfast Box (Fluffy Buttermilk Pancakes, Signature Scrambled Eggs and Signature Glazed Sausage Maple Syrup)",
    price: 3500,
    image: 'image/pancakes 3.jpeg',
    alt: 'Breakfast box pancakes',
  },
  {
    id: 'bread-two',
    category: 'Bread',
    name: "Tobi Treats Banana Bread Minimum of Two",
    price: 1500,
    image: 'image/Bread 2.jpeg',
    alt: 'Banana bread',
  },
  {
    id: 'bread-loaf',
    category: 'Bread',
    name: "Tobi Treats Banana Bread Loaf Plain Flavor",
    price: 5000,
    image: 'image/Bread 1.jpeg',
    alt: 'Banana bread loaf',
  },
];

let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const categories = ['Cake', 'Parfait', 'Pancake', 'Bread'];

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

function buildCartSummaryText() {
  return cart
    .map((item) => `- ${item.quantity} x ${item.name} (${formatPrice(item.price)} each)`)
    .join('\n');
}

function buildOrderMessage(details = {}) {
  const messageLines = [
    'Hello Tobi Treats,',
    'I would like to place an order.',
    '',
    'Order details:',
    buildCartSummaryText(),
    `Total: ${formatPrice(getCartTotal())}`,
    '',
    `Delivery location: ${details.location || 'Not provided'}`,
    `Customer WhatsApp: ${details.phone || 'Not provided'}`,
    details.name ? `Customer name: ${details.name}` : '',
    details.email ? `Customer email: ${details.email}` : '',
    '',
    'Please confirm my request and delivery details.',
  ];
  return messageLines.filter(Boolean).join('\n');
}

function sendWhatsAppMessage(message) {
  window.open(createWhatsAppLink(message), '_blank');
}

function renderProducts() {
  const html = categories
    .map((category) => {
      const items = products.filter((product) => product.category === category);
      if (!items.length) return '';
      const cards = items
        .map(
          (product) => `
            <article class="product-card">
              <img src="${product.image}" alt="${product.alt}" onerror="this.onerror=null;this.src='https://via.placeholder.com/440x320?text=Replace+Image'" />
              <div class="product-card-content">
                <h3>${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="button add-cart" data-product-id="${product.id}">Add to Cart</button>
              </div>
            </article>
          `
        )
        .join('');
      return `
        <div class="category-block">
          <h3>${category} Collection</h3>
          <div class="products-grid-inner">${cards}</div>
        </div>
      `;
    })
    .join('');
  productGrid.innerHTML = html;
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  cartCount.textContent = getCartCount();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
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
              <button class="decrease" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button class="increase" aria-label="Increase quantity">+</button>
              <button class="remove-item" data-action="remove">Remove</button>
            </div>
          </div>
        </div>
      `
    )
    .join('');
  cartTotalElement.textContent = formatPrice(getCartTotal());
  updateCartCount();
}

function findProduct(productId) {
  return products.find((product) => product.id === productId);
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
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

function handleProductButtonClick(event) {
  const button = event.target.closest('button[data-product-id]');
  if (!button) return;
  addToCart(button.dataset.productId);
}

function handleCartClick(event) {
  const control = event.target.closest('button');
  if (!control) return;
  const wrapper = control.closest('.quantity-controls');
  if (!wrapper) return;
  const productId = wrapper.dataset.productId;
  if (control.classList.contains('increase')) {
    changeCartQuantity(productId, 1);
  } else if (control.classList.contains('decrease')) {
    changeCartQuantity(productId, -1);
  } else if (control.dataset.action === 'remove') {
    removeCartItem(productId);
  }
}

function handleCheckout() {
  if (!cart.length) {
    alert('Your cart is empty. Add some treats first.');
    return;
  }

  const phone = orderPhoneInput?.value.trim();
  const location = orderLocationInput?.value.trim();

  if (!phone || !location) {
    cartOrderNote.textContent = 'Please add your WhatsApp number and delivery location before placing your order.';
    cartOrderNote.style.color = '#c0392b';
    return;
  }

  const message = buildOrderMessage({ phone, location });
  sendWhatsAppMessage(message);

  cartOrderNote.textContent = 'Your order request has been sent. The owner will respond via WhatsApp with delivery details.';
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
  const location = contactForm.location.value.trim();
  const messageDraft = contactForm.message.value.trim();

  if (!name || !email || !phone || !messageDraft) {
    formNote.textContent = 'Please fill in all required fields before sending your request.';
    formNote.style.color = '#c0392b';
    return;
  }

  const orderSummary = cart.length
    ? `\n\nOrder request:\n${buildCartSummaryText()}\nTotal: ${formatPrice(getCartTotal())}`
    : '';

  const message = [
    `Hello Tobi Treats,`,
    `My name is ${name}.`, 
    `Email: ${email}`,
    `WhatsApp: ${phone}`,
    location ? `Delivery location: ${location}` : '',
    '',
    `Message: ${messageDraft}`,
    orderSummary,
    '',
    'Please confirm that you received my request and provide delivery details.',
  ]
    .filter(Boolean)
    .join('\n');

  sendWhatsAppMessage(message);
  formNote.textContent = 'Thanks! Your request has been sent to WhatsApp. We will reply soon.';
  formNote.style.color = '#2f855a';
  contactForm.reset();
}

function updateMenuToggleState() {
  const isOpen = siteNav.classList.contains('open');
  mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
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

function init() {
  renderProducts();
  renderCart();
  initSmoothScrolling();
  document.addEventListener('click', handleProductButtonClick);
  cartItemsContainer.addEventListener('click', handleCartClick);
  cartToggle.addEventListener('click', openCartDrawer);
  closeCart.addEventListener('click', closeCartDrawer);
  checkoutButton.addEventListener('click', handleCheckout);
  contactForm.addEventListener('submit', handleContactSubmit);
  mobileMenuToggle.addEventListener('click', handleMobileMenuToggle);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCartDrawer();
      closeMobileMenu();
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
