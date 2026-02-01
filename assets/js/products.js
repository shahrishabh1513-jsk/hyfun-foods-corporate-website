/* ============================================
   PRODUCTS PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all products page functionality
    initProductFilter();
    initProductCards();
    initSmoothScrolling();
    initCatalogDownload();
    
    console.log('Products page loaded successfully!');
});

/* Initialize product filtering */
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category to filter
            const category = this.getAttribute('data-category');
            
            // Show/hide products based on category
            productCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                    card.classList.remove('filtered-out');
                } else if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.classList.remove('filtered-out');
                } else {
                    card.style.display = 'none';
                    card.classList.add('filtered-out');
                }
            });
            
            // Scroll to products section
            const productsSection = document.querySelector('.product-category');
            if (productsSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const sectionPosition = productsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: sectionPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Initialize product card interactions */
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add animation delay for staggered appearance
        const delay = Math.random() * 0.5;
        card.style.animationDelay = `${delay}s`;
        card.classList.add('fade-in-up');
        
        // Add hover effect for product image
        const productImage = card.querySelector('.product-img');
        if (productImage) {
            card.addEventListener('mouseenter', function() {
                const badge = this.querySelector('.product-badge');
                if (badge) {
                    badge.style.transform = 'scale(1.1)';
                    badge.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const badge = this.querySelector('.product-badge');
                if (badge) {
                    badge.style.transform = 'scale(1)';
                }
            });
        }
        
        // Add click effect to show product details
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            const productDesc = this.querySelector('.product-desc').textContent;
            const category = this.getAttribute('data-category');
            
            showProductDetail(productName, productDesc, category);
        });
    });
}

/* Show product detail overlay */
function showProductDetail(name, description, category) {
    // Create product detail modal
    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    
    // Get category icon
    const categoryIcons = {
        'french-fries': 'fas fa-french-fries',
        'potato-specialties': 'fas fa-potato',
        'veggie-specialties': 'fas fa-carrot',
        'indian-ethnic': 'fas fa-flag',
        'baked-snacks': 'fas fa-bread-slice'
    };
    
    const icon = categoryIcons[category] || 'fas fa-utensils';
    
    modal.innerHTML = `
        <div class="product-modal">
            <button class="close-modal-btn"><i class="fas fa-times"></i></button>
            <div class="modal-content">
                <div class="modal-image">
                    <i class="${icon}"></i>
                </div>
                <div class="modal-info">
                    <h3>${name}</h3>
                    <p class="modal-category">${category.replace('-', ' ').toUpperCase()}</p>
                    <p class="modal-description">${description}</p>
                    <div class="modal-features">
                        <div class="feature">
                            <i class="fas fa-clock"></i>
                            <span>Ready in 3-5 minutes</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-leaf"></i>
                            <span>100% Vegetarian</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-prescription-bottle"></i>
                            <span>No Preservatives</span>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-enquiry">Send Enquiry</button>
                        <button class="btn btn-outline close-modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .product-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }
        
        .product-modal {
            background: var(--bg-card);
            border-radius: var(--border-radius);
            max-width: 600px;
            width: 100%;
            position: relative;
            animation: slideUp 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .close-modal-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.5rem;
            cursor: pointer;
            transition: var(--transition);
            z-index: 1;
        }
        
        .close-modal-btn:hover {
            color: var(--green);
            transform: rotate(90deg);
        }
        
        .modal-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            padding: 40px;
        }
        
        .modal-image {
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--green), var(--blue));
            border-radius: var(--border-radius);
            padding: 40px;
        }
        
        .modal-image i {
            font-size: 5rem;
            color: white;
        }
        
        .modal-info h3 {
            font-size: 1.8rem;
            margin-bottom: 10px;
            color: var(--text-main);
        }
        
        .modal-category {
            color: var(--green);
            font-weight: 600;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .modal-description {
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .modal-features {
            margin-bottom: 25px;
        }
        
        .modal-features .feature {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            color: var(--text-main);
        }
        
        .modal-features .feature i {
            color: var(--green);
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
        }
        
        .btn-enquiry {
            background: linear-gradient(90deg, var(--green), var(--blue));
            color: white;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                grid-template-columns: 1fr;
            }
            
            .modal-image {
                padding: 30px;
            }
            
            .modal-image i {
                font-size: 3rem;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal-btn');
    const closeModalBtn = modal.querySelector('.close-modal');
    
    function closeModal() {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
            modalStyles.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Send enquiry button
    const enquiryBtn = modal.querySelector('.btn-enquiry');
    enquiryBtn.addEventListener('click', function() {
        alert(`Enquiry sent for ${name}! Our sales team will contact you shortly.`);
        closeModal();
    });
}

/* Initialize smooth scrolling */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Initialize catalog download */
function initCatalogDownload() {
    const catalogBtn = document.querySelector('.btn-catalog');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real scenario, this would download a PDF
            // For now, we'll show a confirmation message
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                this.style.background = 'var(--green)';
                this.style.color = 'white';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-download"></i> Download Catalog (PDF)';
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            }, 1500);
            
            // Simulate download
            console.log('Product catalog download initiated');
        });
    }
}

/* Add CSS for animations */
const productsStyles = document.createElement('style');
productsStyles.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease forwards;
    }
    
    .filtered-out {
        animation: fadeOut 0.3s ease;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(productsStyles);