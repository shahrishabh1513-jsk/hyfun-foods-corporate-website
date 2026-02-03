// ============================================
// ONLINE ORDERING SYSTEM JAVASCRIPT
// ============================================

// Global Variables
let currentUser = null;
let cart = JSON.parse(localStorage.getItem('hyfun_cart')) || [];
let likedProducts = JSON.parse(localStorage.getItem('hyfun_liked')) || [];
let currentSection = 'hero';
let currentOrder = null;
let userRating = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initOrderSystem();
    updateCartCount();
    loadProducts();
    checkAuthStatus();
    
    console.log('HyFun Foods Ordering System Loaded!');
});

// Generate unique order ID
function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    const uniqueId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `HYFUN-${uniqueId}-${timestamp}-${random}`;
}

// Initialize all functionality
function initOrderSystem() {
    // Vertical progress indicator clicks
    document.querySelectorAll('.vertical-progress-indicator .progress-step').forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = this.getAttribute('data-step');
            const sections = ['auth', 'products', 'details', 'payment', 'tracking', 'review'];
            if (stepNum > 0 && stepNum <= sections.length) {
                loadSection(sections[stepNum - 1]);
            }
        });
    });
    
    // Start Ordering Button - auto redirect to login
    document.getElementById('startOrderBtn').addEventListener('click', function() {
        loadSection('auth');
    });
    
    // Auth Tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });
    
    // Login Form Submission - auto redirect to menu
    document.getElementById('loginFormContent').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (validateLogin(email, password)) {
            showLoading();
            setTimeout(() => {
                loginUser(email);
                hideLoading();
                loadSection('products'); // Auto redirect
            }, 1500);
        }
    });
    
    // Signup Form Submission - auto redirect to menu
    document.getElementById('signupFormContent').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (validateSignup(name, email, phone, password, confirmPassword)) {
            showLoading();
            setTimeout(() => {
                registerUser(name, email, phone);
                hideLoading();
                loadSection('products'); // Auto redirect
            }, 1500);
        }
    });
    
    // Google Login Button
    document.querySelector('.btn-google').addEventListener('click', function() {
        showLoading();
        setTimeout(() => {
            currentUser = {
                name: "Google User",
                email: "user@gmail.com",
                phone: "9876543210"
            };
            
            localStorage.setItem('hyfun_user', JSON.stringify(currentUser));
            updateUserInfo();
            
            hideLoading();
            showNotification('Logged in with Google!', 'success');
            loadSection('products'); // Auto redirect
        }, 1500);
    });
    
    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProductsByType(filter);
        });
    });
    
    // Category Tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });
    
    // Search Products
    document.getElementById('searchProducts').addEventListener('input', function() {
        searchProducts(this.value);
    });
    
    // Cart Toggle
    document.getElementById('cartToggle').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    
    // Customer Details Form - auto redirect to payment
    document.getElementById('customerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCustomerDetails()) {
            loadSection('payment'); // Auto redirect
        }
    });
    
    // Payment Method Selection
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            
            // Update active option
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.payment-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(method + 'Form').classList.add('active');
        });
    });
    
    // UPI App Selection
    document.querySelectorAll('.upi-app').forEach(app => {
        app.addEventListener('click', function() {
            document.querySelectorAll('.upi-app').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            const appName = this.querySelector('span').textContent;
            document.getElementById('upiId').value = `user@${appName.toLowerCase().replace(/\s+/g, '')}`;
        });
    });
    
    // Process Payment - auto redirect to tracking
    document.getElementById('processPayment').addEventListener('click', processPayment);
    
    // Checkout Button - auto redirect to details
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length > 0) {
            loadSection('details'); // Auto redirect
        }
    });
    
    // Back to Section Buttons
    document.querySelectorAll('.btn-back-section').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-back-to');
            loadSection(section);
        });
    });
    
    // Print Bill
    document.getElementById('printBill').addEventListener('click', printBill);
    
    // Share Bill
    document.getElementById('shareBill').addEventListener('click', shareBill);
    
    // Track Order
    document.getElementById('trackOrder').addEventListener('click', function() {
        document.getElementById('orderSuccess').style.display = 'none';
        document.getElementById('trackingProgress').style.display = 'block';
        startOrderTracking();
    });
    
    // Rating Stars
    document.querySelectorAll('.rating-stars i').forEach(star => {
        star.addEventListener('click', function() {
            userRating = parseInt(this.getAttribute('data-rating'));
            updateRatingStars(userRating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateRatingStars(rating, false);
        });
        
        star.addEventListener('mouseout', function() {
            updateRatingStars(userRating);
        });
    });
    
    // Review Form
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitReview();
    });
    
    // Modal Close
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Click outside modal to close
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Browse Button in Empty Cart
    document.querySelector('.btn-browse').addEventListener('click', function() {
        loadSection('products');
        toggleCart();
    });
    
    // Order Again Button
    document.querySelectorAll('.btn-action[onclick*="products"]').forEach(btn => {
        btn.addEventListener('click', function() {
            loadSection('products');
        });
    });
    
    // Rate & Review Button
    document.querySelectorAll('.btn-action[onclick*="review"]').forEach(btn => {
        btn.addEventListener('click', function() {
            loadSection('review');
        });
    });
}

// Load Products Data
function loadProducts() {
    const products = [
        // French Fries
        { id: 1, name: "French Fries", category: "french-fries", price: 199, image: "french_fries.png", desc: "Classic straight-cut fries with perfect crispiness", tag: "Best Seller", weight: "500g" },
        { id: 2, name: "XLF Fries", category: "french-fries", price: 249, image: "XLF Fries.png", desc: "Extra long fries for that premium restaurant feel", tag: "Extra Long", weight: "500g" },
        { id: 3, name: "Crinkle Fries", category: "french-fries", price: 179, image: "Crinkle fries.png", desc: "Fun crinkle-cut shape holds more seasoning", tag: "Crinkle Cut", weight: "500g" },
        { id: 4, name: "Skin on Fries", category: "french-fries", price: 189, image: "Skin on Fries.png", desc: "Fries with skin for extra nutrients and rustic taste", tag: "Natural", weight: "500g" },
        { id: 5, name: "Flavory Fries", category: "french-fries", price: 219, image: "Flavory Fries.png", desc: "Pre-seasoned fries with delicious flavors", tag: "Seasoned", weight: "500g" },
        
        // Potato Specialties
        { id: 6, name: "Potato Wedges", category: "potato-specialties", price: 229, image: "Potato Wedges.png", desc: "Thick-cut wedges with skin, perfect for dipping", tag: "Classic", weight: "500g" },
        { id: 7, name: "Classic Wedges", category: "potato-specialties", price: 209, image: "Classic Wedges.png", desc: "Traditional potato wedges with perfect seasoning", tag: "Classic", weight: "500g" },
        { id: 8, name: "Lime 'n' Mint Wedges", category: "potato-specialties", price: 239, image: "Lime 'n' Mint Wedges.png", desc: "Refreshing wedges with lime and mint flavor", tag: "Zesty", weight: "500g" },
        { id: 9, name: "Spicy Wedges", category: "potato-specialties", price: 219, image: "Spicy Wedges.png", desc: "Wedges with a bold spicy kick", tag: "Spicy", weight: "500g" },
        { id: 10, name: "Hash Brown Round", category: "potato-specialties", price: 189, image: "Hash Brown Round.png", desc: "Round-shaped crispy hash browns", tag: "Breakfast", weight: "300g" },
        { id: 11, name: "Hash Brown Triangle", category: "potato-specialties", price: 199, image: "Hash Brown Triangle.png", desc: "Classic triangle-shaped hash browns", tag: "Classic", weight: "300g" },
        { id: 12, name: "Tater Shotz", category: "potato-specialties", price: 179, image: "Tater Shotz.png", desc: "Bite-sized potato nuggets", tag: "Bite-sized", weight: "400g" },
        { id: 13, name: "Potatobets", category: "potato-specialties", price: 159, image: "PotatoBets-1.png", desc: "Crunchy potato bets with seasoning", tag: "New", weight: "400g" },
        { id: 14, name: "Chilli Garlic Poppers", category: "potato-specialties", price: 199, image: "Chilli Garlic Poppers.png", desc: "Spicy garlic flavored potato poppers", tag: "Spicy", weight: "350g" },
        
        // Veggie Specialties
        { id: 15, name: "Jalapeño Cheesy Pops", category: "veggie-specialties", price: 259, image: "Jalapeño Cheesy Pops.png", desc: "Spicy jalapeño and cheese bites", tag: "Spicy", weight: "300g" },
        { id: 16, name: "Veggie Stix", category: "veggie-specialties", price: 189, image: "Veggie Stix.png", desc: "Crispy vegetable sticks", tag: "Crunchy", weight: "400g" },
        { id: 17, name: "Cheesy Paneer Patty", category: "veggie-specialties", price: 279, image: "Cheesy Paneer Patty.png", desc: "Paneer and cheese filled patty", tag: "Cheese", weight: "250g" },
        { id: 18, name: "Veg Burger Patty", category: "veggie-specialties", price: 229, image: "Veg Burger Patty.png", desc: "Perfect patty for vegetarian burgers", tag: "Burger", weight: "250g" },
        { id: 19, name: "Mozzarella Cheese Stix", category: "veggie-specialties", price: 299, image: "Mozarella-Cheese-Stix.png", desc: "Breaded mozzarella cheese sticks", tag: "Cheesy", weight: "300g" },
        
        // Indian Ethnic
        { id: 20, name: "Aloo Tikki", category: "indian-ethnic", price: 179, image: "Aloo_Tikki.png", desc: "Classic Indian potato patties with spices", tag: "Traditional", weight: "400g" },
        { id: 21, name: "Sabudana Patty", category: "indian-ethnic", price: 199, image: "Sabudana-Patty.png", desc: "Sago and potato patties for fasting", tag: "Festive", weight: "350g" },
        { id: 22, name: "Mumbai Aloo Vada", category: "indian-ethnic", price: 189, image: "Mumbai Aloo Vada.png", desc: "Mumbai-style potato vada", tag: "Street Food", weight: "400g" },
        { id: 23, name: "Hara Bhara Kebab", category: "indian-ethnic", price: 219, image: "Hara-Bhara-Kebab.png", desc: "Spinach and potato kebabs", tag: "Green", weight: "350g" },
        
        // Baked Snacks
        { id: 24, name: "Margherita Pizza", category: "baked-snacks", price: 249, image: "Margherita Pizza.png", desc: "Classic margherita pizza pockets", tag: "Pizza", weight: "400g" },
        { id: 25, name: "Veg Paradise Pizza", category: "baked-snacks", price: 269, image: "Veg Paradise Pizza.png", desc: "Mixed vegetable pizza pockets", tag: "Pizza", weight: "400g" },
        { id: 26, name: "Tandoori Paneer Pizza", category: "baked-snacks", price: 299, image: "Tandoori Paneer Pizza.png", desc: "Tandoori spiced paneer pizza", tag: "Pizza", weight: "400g" },
        { id: 27, name: "Mexicano Puffets", category: "baked-snacks", price: 189, image: "Mexicano Puffets.png", desc: "Mexican style seasoned puffs", tag: "Mexican", weight: "350g" },
        { id: 28, name: "Italiano Puffets", category: "baked-snacks", price: 189, image: "Italiano Puffets.png", desc: "Italian herb and cheese puffs", tag: "Italian", weight: "350g" },
        { id: 29, name: "Schezwan Puffets", category: "baked-snacks", price: 199, image: "Schezwan Puffets.png", desc: "Spicy Schezwan sauce filled puffs", tag: "Spicy", weight: "350g" },
        { id: 30, name: "Apple Pie", category: "baked-snacks", price: 179, image: "Apple Pie.png", desc: "Sweet apple filled pastry", tag: "Dessert", weight: "300g" },
        { id: 31, name: "Mango Peach Pie", category: "baked-snacks", price: 189, image: "Mango – Peach Pie.png", desc: "Tropical mango and peach pie", tag: "Dessert", weight: "300g" }
    ];
    
    // Store products globally
    window.hyfunProducts = products;
    
    // Render products
    renderProducts(products);
}

// Render Products Grid
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const isLiked = likedProducts.includes(product.id);
        const isBestSeller = product.tag === "Best Seller";
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-id', product.id);
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="./assets/image/${product.image}" alt="${product.name}" class="product-img">
                <div class="product-badge">${product.tag}</div>
                <button class="product-like ${isLiked ? 'liked' : ''}" data-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
                ${isBestSeller ? '<div class="best-seller-label"><i class="fas fa-crown"></i> Best Seller</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-meta">
                    <div class="product-price">${product.price}</div>
                    <div class="product-tag">${product.weight}</div>
                </div>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <span class="quantity-value" id="qty-${product.id}">1</span>
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="btn-add-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(productCard);
    });
    
    // Add event listeners to new elements
    addProductEventListeners();
}

// Add Event Listeners to Product Elements
function addProductEventListeners() {
    // Like buttons
    document.querySelectorAll('.product-like').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            toggleLike(productId, this);
        });
    });
    
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const isMinus = this.classList.contains('minus');
            updateQuantity(productId, isMinus);
        });
    });
    
    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Product card click for modal
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.product-like') && 
                !e.target.closest('.quantity-btn') && 
                !e.target.closest('.btn-add-cart')) {
                const productId = parseInt(this.getAttribute('data-id'));
                showProductModal(productId);
            }
        });
    });
}

// Filter Products by Category
function filterProducts(category) {
    let filteredProducts = window.hyfunProducts;
    
    if (category !== 'all') {
        filteredProducts = window.hyfunProducts.filter(p => p.category === category);
    }
    
    renderProducts(filteredProducts);
}

// Filter Products by Type
function filterProductsByType(filter) {
    let filteredProducts = window.hyfunProducts;
    
    switch(filter) {
        case 'popular':
            filteredProducts = window.hyfunProducts.filter(p => 
                p.tag === "Best Seller" || p.name.includes("Fries") || p.name.includes("Wedges")
            );
            break;
        case 'veg':
            filteredProducts = window.hyfunProducts.filter(p => 
                p.category === 'veggie-specialties' || p.category === 'indian-ethnic'
            );
            break;
        case 'all':
        default:
            // Show all products
            break;
    }
    
    renderProducts(filteredProducts);
}

// Search Products
function searchProducts(query) {
    if (!query.trim()) {
        renderProducts(window.hyfunProducts);
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const filteredProducts = window.hyfunProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.desc.toLowerCase().includes(searchTerm) ||
        p.tag.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
}

// Toggle Like/Unlike
function toggleLike(productId, button) {
    const index = likedProducts.indexOf(productId);
    
    if (index === -1) {
        likedProducts.push(productId);
        button.classList.add('liked');
        showNotification('Added to favorites!', 'success');
    } else {
        likedProducts.splice(index, 1);
        button.classList.remove('liked');
        showNotification('Removed from favorites', 'info');
    }
    
    localStorage.setItem('hyfun_liked', JSON.stringify(likedProducts));
}

// Update Quantity
function updateQuantity(productId, isMinus) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyElement.textContent);
    
    if (isMinus && currentQty > 1) {
        currentQty--;
    } else if (!isMinus) {
        currentQty++;
    }
    
    qtyElement.textContent = currentQty;
}

// Add to Cart
function addToCart(productId) {
    const product = window.hyfunProducts.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`qty-${productId}`).textContent);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            weight: product.weight
        });
    }
    
    // Update cart in localStorage
    localStorage.setItem('hyfun_cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    renderCartItems();
    
    // Show notification
    showNotification(`${quantity}x ${product.name} added to cart!`, 'success');
    
    // Open cart sidebar
    toggleCart(true);
}

// Toggle Cart Sidebar
function toggleCart(forceOpen = false) {
    const cartSidebar = document.getElementById('cartSidebar');
    
    if (forceOpen) {
        cartSidebar.classList.add('active');
    } else {
        cartSidebar.classList.toggle('active');
    }
    
    // Update cart items when opened
    if (cartSidebar.classList.contains('active')) {
        renderCartItems();
    }
}

// Render Cart Items
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.innerHTML = '';
        checkoutBtn.disabled = true;
        return;
    }
    
    cartEmpty.style.display = 'none';
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="./assets/image/${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-cart-index="${index}">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn plus" data-cart-index="${index}">+</button>
                        </div>
                        <button class="cart-item-remove" data-cart-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    document.getElementById('cartTotal').textContent = `₹${total}`;
    checkoutBtn.disabled = false;
    
    // Add event listeners to cart controls
    document.querySelectorAll('.cart-item .quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-cart-index'));
            const isMinus = this.classList.contains('minus');
            updateCartQuantity(index, isMinus);
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-cart-index'));
            removeFromCart(index);
        });
    });
}

// Update Cart Quantity
function updateCartQuantity(index, isMinus) {
    if (isMinus && cart[index].quantity > 1) {
        cart[index].quantity--;
    } else if (!isMinus) {
        cart[index].quantity++;
    }
    
    localStorage.setItem('hyfun_cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Remove from Cart
function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    
    localStorage.setItem('hyfun_cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
    
    showNotification(`${itemName} removed from cart`, 'info');
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Show Product Modal
function showProductModal(productId) {
    const product = window.hyfunProducts.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const content = document.getElementById('modalProductContent');
    
    const isLiked = likedProducts.includes(productId);
    
    content.innerHTML = `
        <div class="product-modal-content">
            <div class="modal-product-image">
                <img src="./assets/image/${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <div class="modal-product-price">₹${product.price}</div>
                <p class="modal-product-desc">${product.desc}</p>
                
                <div class="modal-product-details">
                    <div class="detail-item">
                        <i class="fas fa-weight"></i>
                        <span>Weight: ${product.weight}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>Prep Time: 3-5 minutes</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-leaf"></i>
                        <span>100% Vegetarian</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-prescription-bottle"></i>
                        <span>No Preservatives</span>
                    </div>
                </div>
                
                <div class="modal-product-actions">
                    <div class="modal-quantity">
                        <button class="quantity-btn minus" data-modal-id="${productId}">-</button>
                        <span class="quantity-value" id="modal-qty-${productId}">1</span>
                        <button class="quantity-btn plus" data-modal-id="${productId}">+</button>
                    </div>
                    <button class="btn-modal-add" data-modal-id="${productId}">
                        <i class="fas fa-cart-plus"></i> Add to Cart - ₹${product.price}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Add modal event listeners
    document.querySelectorAll('.modal-quantity .quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-modal-id'));
            const isMinus = this.classList.contains('minus');
            updateModalQuantity(id, isMinus);
        });
    });
    
    document.querySelector('.btn-modal-add').addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-modal-id'));
        const quantity = parseInt(document.getElementById(`modal-qty-${id}`).textContent);
        addToCartWithQuantity(id, quantity);
    });
}

// Update Modal Quantity
function updateModalQuantity(productId, isMinus) {
    const qtyElement = document.getElementById(`modal-qty-${productId}`);
    let currentQty = parseInt(qtyElement.textContent);
    
    if (isMinus && currentQty > 1) {
        currentQty--;
    } else if (!isMinus) {
        currentQty++;
    }
    
    qtyElement.textContent = currentQty;
    
    // Update price in button
    const product = window.hyfunProducts.find(p => p.id === productId);
    const totalPrice = product.price * currentQty;
    document.querySelector('.btn-modal-add').innerHTML = `
        <i class="fas fa-cart-plus"></i> Add to Cart - ₹${totalPrice}
    `;
}

// Add to Cart with Specific Quantity
function addToCartWithQuantity(productId, quantity) {
    const product = window.hyfunProducts.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            weight: product.weight
        });
    }
    
    localStorage.setItem('hyfun_cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    
    showNotification(`${quantity}x ${product.name} added to cart!`, 'success');
    closeModal();
}

// Close Modal
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Validate Login
function validateLogin(email, password) {
    if (!email.trim()) {
        showNotification('Please enter email or phone number', 'error');
        return false;
    }
    
    if (!password.trim()) {
        showNotification('Please enter password', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return false;
    }
    
    return true;
}

// Validate Signup
function validateSignup(name, email, phone, password, confirmPassword) {
    if (!name.trim()) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    if (!email.trim()) {
        showNotification('Please enter email address', 'error');
        return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!phone.trim()) {
        showNotification('Please enter phone number', 'error');
        return false;
    }
    
    if (!/^\d{10}$/.test(phone)) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return false;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return false;
    }
    
    return true;
}

// Login User
function loginUser(email) {
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        currentUser = {
            name: email.split('@')[0],
            email: email,
            phone: '9876543210'
        };
        
        localStorage.setItem('hyfun_user', JSON.stringify(currentUser));
        updateUserInfo();
        
        hideLoading();
        showNotification('Login successful!', 'success');
        // Auto redirect to products is handled in event listener
    }, 1500);
}

// Register User
function registerUser(name, email, phone) {
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        currentUser = {
            name: name,
            email: email,
            phone: phone
        };
        
        localStorage.setItem('hyfun_user', JSON.stringify(currentUser));
        updateUserInfo();
        
        hideLoading();
        showNotification('Account created successfully!', 'success');
        // Auto redirect to products is handled in event listener
    }, 1500);
}

// Check Auth Status
function checkAuthStatus() {
    const savedUser = localStorage.getItem('hyfun_user');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInfo();
    }
}

// Update User Info Display
function updateUserInfo() {
    const userInfo = document.getElementById('userInfo');
    
    if (currentUser) {
        userInfo.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${currentUser.name}</span>
        `;
        
        // Pre-fill customer details if available
        if (document.getElementById('fullName')) {
            document.getElementById('fullName').value = currentUser.name;
            document.getElementById('email').value = currentUser.email;
            document.getElementById('phoneNumber').value = currentUser.phone;
        }
    }
}

// Load Section
function loadSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.order-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`section-${sectionName}`);
    targetSection.classList.add('active');
    currentSection = sectionName;
    
    // Update vertical progress indicator
    updateVerticalProgress(sectionName);
    
    // Smooth scroll to section
    setTimeout(() => {
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
    
    // Special handling for each section
    switch(sectionName) {
        case 'auth':
            // Auto-focus on first input
            setTimeout(() => {
                const firstInput = targetSection.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 500);
            break;
        case 'products':
            renderProducts(window.hyfunProducts);
            break;
        case 'payment':
            updatePaymentSummary();
            break;
        case 'tracking':
            showOrderSuccess();
            break;
    }
}

// Update Vertical Progress Indicator
function updateVerticalProgress(sectionName) {
    const steps = {
        'hero': 0,
        'auth': 1,
        'products': 2,
        'details': 3,
        'payment': 4,
        'tracking': 5,
        'review': 6
    };
    
    const currentStep = steps[sectionName] || 0;
    
    document.querySelectorAll('.vertical-progress-indicator .progress-step').forEach((step, index) => {
        if (index <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Validate Customer Details
function validateCustomerDetails() {
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'address', 'city', 'pincode'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showNotification(`Please fill in ${field.previousElementSibling.textContent}`, 'error');
            field.focus();
            return false;
        }
    }
    
    // Validate email
    const email = document.getElementById('email').value;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate phone
    const phone = document.getElementById('phoneNumber').value;
    if (!/^\d{10}$/.test(phone)) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return false;
    }
    
    return true;
}

// Update Payment Summary
function updatePaymentSummary() {
    const summaryContainer = document.getElementById('paymentSummary');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('taxAmount');
    const totalElement = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        summaryContainer.innerHTML = '<p class="text-center">Cart is empty</p>';
        subtotalElement.textContent = '₹0';
        taxElement.textContent = '₹0';
        totalElement.textContent = '₹0';
        return;
    }
    
    let summaryHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        summaryHTML += `
            <div class="summary-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <div class="item-meta">
                        <span>${item.weight}</span>
                        <span>× ${item.quantity}</span>
                    </div>
                </div>
                <div class="item-price">₹${itemTotal}</div>
            </div>
        `;
    });
    
    const deliveryFee = 40;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;
    
    summaryContainer.innerHTML = summaryHTML;
    subtotalElement.textContent = `₹${subtotal}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

// Process Payment
function processPayment() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    const selectedMethod = document.querySelector('.payment-option.active').getAttribute('data-method');
    
    // Validate payment method specific fields
    if (selectedMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            showNotification('Please fill all card details', 'error');
            return;
        }
        
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
            showNotification('Please enter a valid 16-digit card number', 'error');
            return;
        }
    } else if (selectedMethod === 'upi') {
        const upiId = document.getElementById('upiId').value;
        
        if (!upiId || !upiId.includes('@')) {
            showNotification('Please enter a valid UPI ID', 'error');
            return;
        }
    }
    
    showLoading();
    
    // Simulate payment processing
    setTimeout(() => {
        hideLoading();
        
        // Create order
        createOrder(selectedMethod);
        
        // Clear cart
        cart = [];
        localStorage.setItem('hyfun_cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show success
        loadSection('tracking'); // Auto redirect
    }, 2000);
}

// Create Order
function createOrder(paymentMethod) {
    const orderId = generateOrderId(); // Use unique ID generator
    const orderDate = new Date();
    
    currentOrder = {
        id: orderId,
        date: orderDate.toISOString(),
        items: [...cart],
        customer: {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phoneNumber').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            pincode: document.getElementById('pincode').value
        },
        payment: paymentMethod,
        status: 'confirmed'
    };
    
    localStorage.setItem('hyfun_current_order', JSON.stringify(currentOrder));
    document.getElementById('orderId').textContent = orderId;
}

// Show Order Success
function showOrderSuccess() {
    document.getElementById('orderSuccess').style.display = 'block';
    document.getElementById('trackingProgress').style.display = 'none';
}

// Start Order Tracking
function startOrderTracking() {
    const now = new Date();
    
    // Update times
    document.getElementById('timeConfirmed').textContent = 'Just now';
    document.getElementById('timePreparing').textContent = getFormattedTime(now, 5);
    document.getElementById('timeDelivery').textContent = getFormattedTime(now, 15);
    document.getElementById('timeDelivered').textContent = getFormattedTime(now, 30);
    
    // Start progress animation
    const routeProgress = document.getElementById('routeProgress');
    routeProgress.style.width = '0%';
    
    // Animate steps
    const steps = document.querySelectorAll('.tracking-step');
    steps.forEach((step, index) => {
        step.classList.remove('active');
        
        setTimeout(() => {
            step.classList.add('active');
            
            // Update route progress
            const progress = ((index + 1) / steps.length) * 100;
            routeProgress.style.width = `${progress}%`;
        }, index * 5000);
    });
    
    // Last step - delivered
    setTimeout(() => {
        document.getElementById('timeDelivered').textContent = 'Delivered!';
        showNotification('Your order has been delivered! Enjoy your meal.', 'success');
    }, 20000);
}

// Get Formatted Time
function getFormattedTime(startTime, minutesToAdd) {
    const time = new Date(startTime.getTime() + minutesToAdd * 60000);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Print Bill
function printBill() {
    const printWindow = window.open('', '_blank');
    
    const order = currentOrder || JSON.parse(localStorage.getItem('hyfun_current_order'));
    
    if (!order) {
        showNotification('No order found to print', 'error');
        return;
    }
    
    let itemsHTML = '';
    let subtotal = 0;
    
    order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${itemTotal}</td>
            </tr>
        `;
    });
    
    const deliveryFee = 40;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>HyFun Foods - Invoice ${order.id}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .invoice { max-width: 800px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #f5f5f5; }
                .total { text-align: right; font-weight: bold; }
                .thankyou { text-align: center; margin-top: 40px; color: #666; }
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="invoice">
                <div class="header">
                    <h1>HyFun Foods</h1>
                    <h2>INVOICE</h2>
                    <p>Order ID: ${order.id}</p>
                    <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                </div>
                
                <div class="info">
                    <div>
                        <h3>Billed To:</h3>
                        <p>${order.customer.name}</p>
                        <p>${order.customer.address}</p>
                        <p>${order.customer.city} - ${order.customer.pincode}</p>
                        <p>Phone: ${order.customer.phone}</p>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
                
                <div class="total">
                    <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
                    <p>Delivery Fee: ₹${deliveryFee}</p>
                    <p>Tax (5%): ₹${tax.toFixed(2)}</p>
                    <h3>Total: ₹${total.toFixed(2)}</h3>
                    <p>Payment Method: ${order.payment.toUpperCase()}</p>
                </div>
                
                <div class="thankyou">
                    <p>Thank you for ordering from HyFun Foods!</p>
                    <p>Visit us again at hyfunfoods.com</p>
                </div>
                
                <button class="no-print" onclick="window.print()" style="padding: 10px 20px; margin-top: 20px;">
                    Print Bill
                </button>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Share Bill
function shareBill() {
    if (navigator.share) {
        const order = currentOrder || JSON.parse(localStorage.getItem('hyfun_current_order'));
        
        navigator.share({
            title: `HyFun Foods Order - ${order.id}`,
            text: `Check out my HyFun Foods order! Order ID: ${order.id}\nTotal: ₹${calculateOrderTotal(order)}`,
            url: window.location.href
        })
        .then(() => showNotification('Bill shared successfully!', 'success'))
        .catch(err => console.log('Error sharing:', err));
    } else {
        showNotification('Web Share API not supported in your browser', 'info');
    }
}

// Calculate Order Total
function calculateOrderTotal(order) {
    let subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const tax = subtotal * 0.05;
    return (subtotal + deliveryFee + tax).toFixed(2);
}

// Update Rating Stars
function updateRatingStars(rating, save = true) {
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingValue = document.getElementById('ratingValue');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    ratingValue.textContent = rating;
    
    if (save) {
        userRating = rating;
    }
}

// Submit Review
function submitReview() {
    const title = document.getElementById('reviewTitle').value;
    const text = document.getElementById('reviewText').value;
    
    if (userRating === 0) {
        showNotification('Please select a rating', 'error');
        return;
    }
    
    if (!text.trim()) {
        showNotification('Please write a review', 'error');
        return;
    }
    
    // In a real app, you would send this to your server
    const review = {
        rating: userRating,
        title: title,
        text: text,
        date: new Date().toISOString(),
        orderId: currentOrder ? currentOrder.id : 'N/A'
    };
    
    // Save review locally
    const reviews = JSON.parse(localStorage.getItem('hyfun_reviews')) || [];
    reviews.push(review);
    localStorage.setItem('hyfun_reviews', JSON.stringify(reviews));
    
    // Show success
    document.getElementById('reviewForm').style.display = 'none';
    document.getElementById('reviewSuccess').style.display = 'block';
    
    showNotification('Thank you for your review!', 'success');
}

// Show Loading Overlay
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

// Hide Loading Overlay
function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 9999;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 3s forwards;
        }
        
        .notification-info { background: var(--primary); }
        .notification-success { background: var(--success); }
        .notification-warning { background: var(--warning); }
        .notification-error { background: var(--danger); }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
        style.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
            style.remove();
        }
    }, 3000);
}

// Initialize Floating Action Button for mobile
function initMobileFab() {
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    fab.addEventListener('click', toggleCart);
    document.body.appendChild(fab);
    
    // Update cart count on fab
    const updateFab = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            fab.setAttribute('data-count', totalItems);
        } else {
            fab.removeAttribute('data-count');
        }
    };
    
    // Update fab when cart changes
    const originalUpdateCartCount = updateCartCount;
    updateCartCount = function() {
        originalUpdateCartCount();
        updateFab();
    };
    
    updateFab();
}

// Initialize mobile fab on load
if (window.innerWidth <= 768) {
    initMobileFab();
}

// Add CSS for fab data-count
const fabStyle = document.createElement('style');
fabStyle.textContent = `
    .fab[data-count]::after {
        content: attr(data-count);
        position: absolute;
        top: -5px;
        right: -5px;
        background: var(--accent);
        color: white;
        font-size: 12px;
        font-weight: bold;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(fabStyle);

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768 && !document.querySelector('.fab')) {
        initMobileFab();
    } else if (window.innerWidth > 768 && document.querySelector('.fab')) {
        document.querySelector('.fab')?.remove();
    }
});