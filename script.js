// ZAIN STORE - Complete E-commerce Solution
class ZAINStore {
    constructor() {
        this.currentLanguage = 'ar';
        this.currentTheme = 'dark';
        this.cart = [];
        this.favorites = [];
        this.products = this.initializeProducts();
        this.user = this.loadUser();
        
        this.init();
    }

    initializeProducts() {
        return [
            {
                id: 1,
                name: 'ardon classic',
                category: 'clothing',
                price: 250,
                description: 'Premium quality blazer with modern fit',
                emoji: '👔',
                rating: 4.5
            },
            {
                id: 2,
                name: 'luxury watch',
                category: 'watches',
                price: 850,
                description: 'Swiss movement luxury timepiece',
                emoji: '⌚',
                rating: 4.8
            },
            {
                id: 3,
                name: 'designer bag',
                category: 'accessories',
                price: 450,
                description: 'Italian leather backpack',
                emoji: '🎒',
                rating: 4.3
            },
            {
                id: 4,
                name: 'casual shirt',
                category: 'clothing',
                price: 120,
                description: 'Comfortable cotton shirt',
                emoji: '👕',
                rating: 4.2
            },
            {
                id: 5,
                name: 'sport watch',
                category: 'watches',
                price: 350,
                description: 'Water resistant sports watch',
                emoji: '⌚',
                rating: 4.0
            },
            {
                id: 6,
                name: 'leather belt',
                category: 'accessories',
                price: 80,
                description: 'Genuine leather belt',
                emoji: '👖',
                rating: 4.1
            }
        ];
    }

    loadUser() {
        const saved = localStorage.getItem('zain_user');
        return saved ? JSON.parse(saved) : null;
    }

    saveUser() {
        if (this.user) {
            localStorage.setItem('zain_user', JSON.stringify(this.user));
        }
    }

    init() {
        this.setupTheme();
        this.setupLanguage();
        this.setupEventListeners();
        this.renderHome();
        this.setupThreeJS();
        this.setupGSAP();
        this.hideLoadingScreen();
    }

    setupTheme() {
        const saved = localStorage.getItem('zain_theme') || 'dark';
        this.currentTheme = saved;
        document.documentElement.setAttribute('data-theme', saved);
    }

    setupLanguage() {
        const saved = localStorage.getItem('zain_language') || 'ar';
        this.currentLanguage = saved;
        document.documentElement.setAttribute('lang', saved);
        document.documentElement.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr');
    }

    setupEventListeners() {
        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            localStorage.setItem('zain_theme', this.currentTheme);
            this.updateThemeIcon();
        });

        // Language Toggle
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });
        document.getElementById('footerLangToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Search
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.openCommandPalette();
        });
        document.getElementById('commandPalette').addEventListener('click', (e) => {
            if (e.target.id === 'commandPalette') {
                this.closeCommandPalette();
            }
        });

        // Cart
        document.getElementById('cartBtn').addEventListener('click', () => {
            this.openCart();
        });
        document.getElementById('closeCart').addEventListener('click', () => {
            this.closeCart();
        });

        // User Auth
        document.getElementById('userBtn').addEventListener('click', () => {
            this.openAuthModal();
        });
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeAuthModal();
        });

        // Auth Tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchAuthTab(e.target.dataset.tab);
            });
        });

        // Forms
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Back to Top
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Mobile Menu
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Filters
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.filterProducts();
        });
        document.getElementById('priceRange').addEventListener('input', (e) => {
            document.getElementById('priceValue').textContent = `حتى ${e.target.value} XL`;
            this.filterProducts();
        });
        document.getElementById('sortBy').addEventListener('change', () => {
            this.sortProducts();
        });

        // Coupon
        document.getElementById('applyCoupon').addEventListener('click', () => {
            this.applyCoupon();
        });

        // Scroll Events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Hash Routing
        window.addEventListener('hashchange', () => {
            this.handleRouting();
        });

        // Initialize routing
        this.handleRouting();
    }

    updateThemeIcon() {
        document.getElementById('themeToggle').textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        document.documentElement.setAttribute('lang', this.currentLanguage);
        document.documentElement.setAttribute('dir', this.currentLanguage === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('zain_language', this.currentLanguage);
        this.updateLanguage();
    }

    updateLanguage() {
        // Update all text content based on language
        const elements = document.querySelectorAll('[data-ar][data-en]');
        elements.forEach(el => {
            const text = this.currentLanguage === 'ar' ? el.dataset.ar : el.dataset.en;
            if (text) el.textContent = text;
        });
        
        // Re-render dynamic content
        this.renderHome();
        this.renderProducts();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
        }, 2000);
    }

    setupThreeJS() {
        if (typeof THREE === 'undefined') return;
        
        const canvas = document.getElementById('heroCanvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Create floating geometric shapes
        const shapes = [];
        for (let i = 0; i < 15; i++) {
            let geometry;
            if (Math.random() > 0.5) {
                geometry = new THREE.BoxGeometry(1, 1, 1);
            } else {
                geometry = new THREE.SphereGeometry(0.8, 16, 16);
            }
            
            const material = new THREE.MeshBasicMaterial({ 
                color: Math.random() > 0.5 ? 0xd4af37 : 0xc0c0c0,
                transparent: true,
                opacity: 0.3
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            scene.add(mesh);
            shapes.push(mesh);
        }

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            
            shapes.forEach((shape, i) => {
                shape.rotation.x += 0.01;
                shape.rotation.y += 0.01;
                shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
            });
            
            renderer.render(scene, camera);
        };
        
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    setupGSAP() {
        if (typeof gsap === 'undefined') return;
        
        // Animate stats on scroll
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from('.stat-number', {
            scrollTrigger: {
                trigger: '.stats-grid',
                start: 'top 80%'
            },
            duration: 2,
            text: {
                value: '5000',
                delim: '',
                separators: ['.'],
                auto: true
            },
            ease: 'power2.out'
        });
    }

    handleRouting() {
        const hash = window.location.hash || '#/home';
        const page = hash.split('/')[1];
        
        // Update active page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById(page);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute(`href`) === `#/${page}`) {
                link.classList.add('active');
            }
        });

        // Render page content
        if (page === 'home') this.renderHome();
        else if (page === 'products') this.renderProducts();
        else if (page === 'product-detail') this.renderProductDetail();
        else if (page === 'deals') this.renderDeals();
    }

    renderHome() {
        // Render featured products
        const container = document.getElementById('featuredProducts');
        container.innerHTML = this.products.slice(0, 3).map(product => `
            <div class="product-card glass-card tilt-effect" data-id="${product.id}">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price} XL</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.addToCart(id);
            });
        });

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-to-cart')) {
                    const id = parseInt(card.dataset.id);
                    this.goToProduct(id);
                }
            });
        });
    }

    renderProducts() {
        const container = document.getElementById('allProducts');
        container.innerHTML = this.products.map(product => `
            <div class="product-card glass-card tilt-effect" data-id="${product.id}">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price} XL</div>
                    <div class="rating">⭐${product.rating}/5</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                    <button class="btn btn-secondary add-to-favorite" data-id="${product.id}">❤️</button>
                </div>
            </div>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.addToCart(id);
            });
        });

        document.querySelectorAll('.add-to-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.toggleFavorite(id);
            });
        });

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn')) {
                    const id = parseInt(card.dataset.id);
                    this.goToProduct(id);
                }
            });
        });
    }

    renderDeals() {
        const container = document.getElementById('dealsProducts');
        const dealProducts = this.products.map(p => ({
            ...p,
            originalPrice: p.price,
            price: Math.floor(p.price * 0.7) // 30% discount
        }));
        
        container.innerHTML = dealProducts.map(product => `
            <div class="product-card glass-card tilt-effect" data-id="${product.id}">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span style="text-decoration: line-through; color: #888;">${product.originalPrice} XL</span>
                        <span style="color: var(--primary); margin-left: 1rem;">${product.price} XL</span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.addToCart(id);
            });
        });
    }

    renderProductDetail() {
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const productId = parseInt(urlParams.get('id')) || 1;
        const product = this.products.find(p => p.id === productId) || this.products[0];
        
        document.getElementById('pdName').textContent = product.name;
        document.getElementById('pdPrice').textContent = product.price;
        document.getElementById('pdDescription').textContent = product.description;
        
        // Add to cart button
        document.querySelector('.add-to-cart').addEventListener('click', () => {
            this.addToCart(productId);
        });
        
        // Add to favorite button
        document.querySelector('.add-to-favorite').addEventListener('click', () => {
            this.toggleFavorite(productId);
        });
        
        // Buy now button
        document.querySelector('.buy-now').addEventListener('click', () => {
            this.addToCart(productId);
            this.openCart();
        });
    }

    goToProduct(id) {
        window.location.hash = `#/product-detail?id=${id}`;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCart();
        this.showNotification('تم إضافة product إلى السلة', 'success');
    }

    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showNotification('تم حذف product من المفضلة', 'info');
        } else {
            this.favorites.push(productId);
            this.showNotification('تم إضافة product إلى المفضلة', 'success');
        }
        this.updateFavorites();
    }

    updateCart() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.getElementById('cartTotal');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">سلة فارغة</p>';
            cartTotal.textContent = '0 XL';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--card-border);">
                    <span style="font-size: 2rem;">${item.emoji}</span>
                    <div style="flex: 1;">
                        <h4>${item.name}</h4>
                        <p>${item.price} XL × ${item.quantity}</p>
                    </div>
                    <button onclick="store.removeItem(${item.id})" style="background: none; border: none; color: #ff4444;">✕</button>
                </div>
            `).join('');
            
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `${total} XL`;
        }
    }

    updateFavorites() {
        // Update favorite buttons state
        document.querySelectorAll('.add-to-favorite').forEach(btn => {
            const id = parseInt(btn.dataset.id);
            if (this.favorites.includes(id)) {
                btn.textContent = '❤️';
                btn.style.color = '#ff4444';
            } else {
                btn.textContent = '❤️';
                btn.style.color = 'inherit';
            }
        });
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
        this.showNotification('تم حذف product من السلة', 'info');
    }

    openCart() {
        document.getElementById('cartSidebar').classList.add('active');
    }

    closeCart() {
        document.getElementById('cartSidebar').classList.remove('active');
    }

    openAuthModal() {
        document.getElementById('authModal').classList.add('active');
    }

    closeAuthModal() {
        document.getElementById('authModal').classList.remove('active');
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tab}Form`).classList.add('active');
    }

    handleLogin() {
        const form = document.getElementById('loginForm');
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        
        if (email && password) {
            this.user = { email, name: 'Guest User' };
            this.saveUser();
            this.closeAuthModal();
            this.showNotification('تم تسجيل الدخول بنجاح', 'success');
        }
    }

    handleRegister() {
        const form = document.getElementById('registerForm');
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]:nth-of-type(1)').value;
        const confirmPassword = form.querySelector('input[type="password"]:nth-of-type(2)').value;
        
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                this.user = { email, name };
                this.saveUser();
                this.closeAuthModal();
                this.showNotification('تم إنشاء الحساب بنجاح', 'success');
            } else {
                this.showNotification('كلمات المرور غير متطابقة', 'error');
            }
        }
    }

    applyCoupon() {
        const couponInput = document.getElementById('couponInput');
        const couponMessage = document.getElementById('couponMessage');
        const coupon = couponInput.value.trim().toUpperCase();
        
        const validCoupons = ['SAVE10', 'SAVE20', 'ZAIN50', 'WELCOME'];
        
        if (validCoupons.includes(coupon)) {
            couponMessage.textContent = 'تم تطبيق الكوبون بنجاح!';
            couponMessage.style.color = '#4CAF50';
            // Apply discount logic here
        } else {
            couponMessage.textContent = 'كوبون غير صحيح';
            couponMessage.style.color = '#f44336';
        }
    }

    filterProducts() {
        const category = document.getElementById('categoryFilter').value;
        const maxPrice = parseInt(document.getElementById('priceRange').value);
        
        let filtered = this.products.filter(product => {
            const categoryMatch = category === 'all' || product.category === category;
            const priceMatch = product.price <= maxPrice;
            return categoryMatch && priceMatch;
        });
        
        this.displayProducts(filtered);
    }

    sortProducts() {
        const sortBy = document.getElementById('sortBy').value;
        let sorted = [...this.products];
        
        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        this.displayProducts(sorted);
    }

    displayProducts(products) {
        const container = document.getElementById('allProducts');
        container.innerHTML = products.map(product => `
            <div class="product-card glass-card tilt-effect" data-id="${product.id}">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price} XL</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.addToCart(id);
            });
        });

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn')) {
                    const id = parseInt(card.dataset.id);
                    this.goToProduct(id);
                }
            });
        });
    }

    openCommandPalette() {
        document.getElementById('commandPalette').classList.add('active');
        document.getElementById('commandInput').focus();
    }

    closeCommandPalette() {
        document.getElementById('commandPalette').classList.remove('active');
    }

    showNotification(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3'
        };
        
        toast.style.borderLeft = `4px solid ${colors[type]}`;
        toast.style.background = `rgba(33, 33, 33, 0.9)`;
        
        document.getElementById('toastContainer').appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    handleScroll() {
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }

    toggleMobileMenu() {
        // Mobile menu implementation
        const menu = document.querySelector('.nav-menu');
        if (menu.style.display === 'flex') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'flex';
            menu.style.position = 'absolute';
            menu.style.top = '80px';
            menu.style.left = '0';
            menu.style.width = '100%';
            menu.style.background = 'var(--bg-dark)';
            menu.style.flexDirection = 'column';
            menu.style.padding = '1rem';
            menu.style.borderBottom = '1px solid var(--card-border)';
        }
    }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new ZAINStore();
});

// Handle page transitions
window.addEventListener('beforeunload', () => {
    document.getElementById('loadingScreen').classList.remove('hidden');
});