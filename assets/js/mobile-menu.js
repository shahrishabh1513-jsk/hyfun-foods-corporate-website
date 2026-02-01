/* ============================================
   MOBILE MENU JAVASCRIPT FOR HYFUN FOODS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Get mobile menu elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuContent = document.getElementById('mobileMenuContent');
    
    // Open mobile menu function
    function openMobileMenu() {
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        if (mobileMenuContent) mobileMenuContent.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        if (mobileMenuContent) mobileMenuContent.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event Listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openMobileMenu();
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when Escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuContent && mobileMenuContent.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle mobile dropdown toggling
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.mobile-nav-link');
        
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all dropdowns first
                mobileDropdowns.forEach(d => d.classList.remove('active'));
                
                // Open clicked dropdown
                dropdown.classList.add('active');
            });
        }
    });
    
    // Close menu when clicking on overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuContent && !mobileMenuContent.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuContent && mobileMenuContent.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile menu functionality initialized');
});