/* ============================================
   MOBILE MENU JAVASCRIPT FOR HYFUN FOODS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Get mobile menu elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuContent = document.getElementById('mobileMenuContent');
    
    // Get all mobile dropdown elements
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    // Open mobile menu function
    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuContent.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        document.documentElement.style.overflow = 'hidden'; // For iOS
        
        // Add event listener to close menu on overlay click
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuContent.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Remove event listener
        mobileMenuOverlay.removeEventListener('click', closeMobileMenu);
        
        // Close all dropdowns
        closeAllMobileDropdowns();
    }
    
    // Close all mobile dropdowns
    function closeAllMobileDropdowns() {
        mobileDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Toggle mobile dropdown
    function toggleMobileDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // Close all dropdowns first
        closeAllMobileDropdowns();
        
        // If the clicked dropdown wasn't active, open it
        if (!isActive) {
            dropdown.classList.add('active');
        }
    }
    
    // Event Listeners
    
    // Open mobile menu when button is clicked
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openMobileMenu();
    });
    
    // Close mobile menu when close button is clicked
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when Escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuContent.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle mobile dropdown toggling
    mobileDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.mobile-nav-link');
        
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileDropdown(dropdown);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuContent.contains(e.target)) {
            closeAllMobileDropdowns();
        }
    });
    
    // Prevent closing when clicking inside dropdown content
    mobileMenuContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuContent.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Add swipe to close functionality for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    mobileMenuContent.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mobileMenuContent.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // If swiping right (closing menu)
        if (swipeDistance > swipeThreshold) {
            closeMobileMenu();
        }
    }
    
    // Add animation classes for menu items
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('fade-in');
    });
    
    console.log('Mobile menu functionality initialized');
});

/* Add CSS for fade-in animation */
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        animation: fadeInUp 0.3s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);