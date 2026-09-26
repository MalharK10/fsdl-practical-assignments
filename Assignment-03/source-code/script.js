// Product Data
const products = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "men",
        price: 29.99,
        image: "https://cdn-images.farfetch-contents.com/23/25/42/08/23254208_53414280_1000.jpg"
    },
    {
        id: 2,
        name: "Denim Jacket",
        category: "men",
        price: 89.99,
        image: "https://m.media-amazon.com/images/I/61pnXjtipaL._AC_UY1100_.jpg"
    },
    {
        id: 3,
        name: "Loose Fit Pant",
        category: "women",
        price: 59.99,
        image: "https://static.ftshp.digital/img/p/1/6/1/2/0/5/1/1612051-full_product.jpg"
    },
    {
        id: 4,
        name: "Casual Sneakers",
        category: "accessories",
        price: 79.99,
        image: "https://static.ftshp.digital/img/p/1/1/3/0/6/3/8/1130638-full_product.jpg"
    },
    {
        id: 5,
        name: "Handbag",
        category: "accessories",
        price: 149.99,
        image: "https://media-assets.grailed.com/prd/listing/temp/4a9b81762bd7423d8de643ce7bd7914f"
    },
    {
        id: 6,
        name: "Slim Fit Jeans",
        category: "men",
        price: 69.99,
        image: "https://knownsource.co.uk/cdn/shop/files/bape-shark-jeans-1.jpg?v=1754621858&width=1946"
    },
    {
        id: 7,
        name: "Hoodie",
        category: "women",
        price: 45.99,
        image: "https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/a/p/ap1i80114008blk-1.jpg"
    },
    {
        id: 8,
        name: "Designer Sunglasses",
        category: "accessories",
        price: 99.99,
        image: "https://lh6.googleusercontent.com/proxy/muw2tcxMfMKuoRM1fVOcP0F08gzjKNfhzbeE8izAr8amCo44evCOGwh64Pu69YnVTnxwNPG9w31TGvZBVN0l-_hitEZwMSti3Sd0qJWTeZlTrXOB6xGmPgPvOb50CdwbT428JJIP1Qyn0ZT8"
    },
    {
        id: 9,
        name: "Casual Hoodie",
        category: "men",
        price: 54.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyxH_lNyNDmiBQ8p0YABixR6KZk5rJ34wig&s"
    },
    {
        id: 10,
        name: "Knit Sweater",
        category: "women",
        price: 64.99,
        image: "https://cdn.shopify.com/s/files/1/0326/3660/0451/files/001KNH302502_WHT_A_480x480.jpg?v=1611800898"
    },
    {
        id: 11,
        name: "Backpack",
        category: "accessories",
        price: 49.99,
        image: "https://m.media-amazon.com/images/I/81+PrpYjLDL._AC_UY350_.jpg"
    },
    {
        id: 12,
        name: "Athletic Shorts",
        category: "men",
        price: 34.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRrqGeFXrH7JskJE4BkbrfmJRZom1SDUueQ&s"
    }
];

// Shopping Cart
let cart = [];
let quantities = {}; // Track quantities for each product

// Display Products
function displayProducts(productsToShow) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-4';
        const currentQty = quantities[product.id] || 0;
        productCard.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="decrementQuantity(${product.id})">−</button>
                        <input type="number" class="qty-input" id="qty-${product.id}" value="${currentQty}" min="0" readonly>
                        <button class="qty-btn" onclick="incrementQuantity(${product.id})">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${currentQty === 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Increment Quantity
function incrementQuantity(productId) {
    quantities[productId] = (quantities[productId] || 0) + 1;
    document.getElementById(`qty-${productId}`).value = quantities[productId];
    updateAddToCartButton(productId);
}

// Decrement Quantity
function decrementQuantity(productId) {
    if (quantities[productId] > 0) {
        quantities[productId]--;
    }
    document.getElementById(`qty-${productId}`).value = quantities[productId];
    updateAddToCartButton(productId);
}

// Update Add to Cart Button State
function updateAddToCartButton(productId) {
    const btn = document.querySelector(`.product-card:has(#qty-${productId}) .add-to-cart-btn`);
    if (btn) {
        if (quantities[productId] > 0) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    }
}

// Filter Products
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qty = quantities[productId] || 0;
    
    if (qty === 0) {
        showNotification('Please select a quantity first!');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            ...product,
            quantity: qty
        });
    }
    
    // Reset quantity after adding to cart
    quantities[productId] = 0;
    document.getElementById(`qty-${productId}`).value = 0;
    updateAddToCartButton(productId);
    
    updateCart();
    showNotification(`${qty} item(s) added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    displayCartItems();
}

// Update Cart Display
function updateCart() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);
}

// Display Cart Items in Modal
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="cart-qty-btn" onclick="decrementCartItem(${item.id})">−</button>
                <input type="number" class="cart-qty-input" value="${item.quantity}" min="1" readonly>
                <button class="cart-qty-btn" onclick="incrementCartItem(${item.id})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Increment Cart Item Quantity
function incrementCartItem(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
        displayCartItems();
    }
}

// Decrement Cart Item Quantity
function decrementCartItem(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeFromCart(productId);
            return;
        }
        updateCart();
        displayCartItems();
    }
}

// Show Notification
function showNotification(message) {
    // Simple alert for demonstration
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your purchase! Total: $' + document.getElementById('cartTotal').textContent);
    cart = [];
    updateCart();
    displayCartItems();
    
    // Close modal
    const modalElement = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Display all products initially
    displayProducts(products);
    
    // Filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter products
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Cart link click
    document.getElementById('cartLink').addEventListener('click', function(e) {
        e.preventDefault();
        displayCartItems();
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#cartModal') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Check if user is already logged in
    checkLoginStatus();
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Signup form submission
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignup();
    });
});

// User Management Functions
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Handle Login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simple validation - in real app, this would be server-side
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        if (rememberMe) {
            localStorage.setItem('rememberLogin', 'true');
        }
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        // Close modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        
        // Update UI
        checkLoginStatus();
        showNotification(`Welcome back, ${user.name}!`);
    } else {
        showNotification('Invalid email or password!', 'error');
    }
}

// Handle Signup
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill all fields!', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters!', 'error');
        return;
    }
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Reset form
    document.getElementById('signupForm').reset();
    
    // Close modals
    const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    signupModal.hide();
    
    // Update UI
    checkLoginStatus();
    showNotification(`Welcome, ${name}!`);
}

// Check Login Status
function checkLoginStatus() {
    const userMenuContainer = document.getElementById('userMenuContainer');
    const loginBtnContainer = document.getElementById('loginBtnContainer');
    
    if (currentUser) {
        userMenuContainer.style.display = 'block';
        loginBtnContainer.style.display = 'none';
        document.getElementById('userName').textContent = currentUser.name;
    } else {
        userMenuContainer.style.display = 'none';
        loginBtnContainer.style.display = 'block';
    }
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberLogin');
    checkLoginStatus();
    showNotification('Logged out successfully!');
}

// Toggle between login and signup
function toggleSignup() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.show();
}

function toggleLogin() {
    const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    signupModal.hide();
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

// Enhanced Show Notification with error type
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? '#dc3545' : '#28a745';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}