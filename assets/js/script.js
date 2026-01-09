/* ============================================
   MAIN JAVASCRIPT FOR HYFUN FOODS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollEffects();
    initLogoScrolling();
    initHoverEffects();
    initSmoothScrolling();
    initParallaxEffect();
    initLogoData();
    
    console.log('HyFun Foods website loaded successfully!');
});

/* Initialize scroll effects on header */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            header.style.padding = '15px 0';
        }
    });
}

/* Initialize logo scrolling for client and partner sections */
function initLogoScrolling() {
    // Client logos track
    const clienteleTrack = document.getElementById('clienteleTrack');
    const partnersTrack = document.getElementById('partnersTrack');
    
    // Client logos data (from “Our Esteemed Clientele” section of HyFun Foods)
const clientLogos = [
    { name: 'Burger King', url: './assets/image/BK.jpg' },
    { name: 'KFC', url: './assets/images/kfc.png' },
    { name: 'Pizza Hut', url: './assets/images/pizza-hut.png' },
    { name: 'Taco Bell', url: './assets/images/ TACOBELL.png' },
    { name: 'Subway', url: './assets/images/subway.png' },
    { name: 'pvr', url: './assets/images/pvr.png' },
    { name: 'carls', url: './assets/images/CARLS.png' },
    { name: 'WHATABURGER', url: './assets/images/WHATABURGER.png' }
];

// Partner logos data (from “Our Retail Partners” section of HyFun Foods)
const partnerLogos = [
    { name: 'Walmart', url: './assets/images/walmart.png' },
    { name: 'Woolworths', url: './assets/images/woolworths.png' },
    { name: 'Reliance', url: './assets/images/reliance.png' },
    { name: 'D Mart', url: './assets/images/dmart.png' },
    { name: 'SPAR', url: './assets/images/spar.png' },
    { name: 'Spencers', url: './assets/images/spencers.png' },
    { name: 'BigBasket', url: './assets/images/bigbasket.png' },
    { name: 'Blinkit', url: './assets/images/blinkit.png' }
];

    
    // Create logo elements for clientele
    clientLogos.forEach(logo => {
        const logoItem = createLogoItem(logo);
        clienteleTrack.appendChild(logoItem.cloneNode(true));
        // Duplicate for seamless scrolling
        clienteleTrack.appendChild(logoItem.cloneNode(true));
    });
    
    // Create logo elements for partners
    partnerLogos.forEach(logo => {
        const logoItem = createLogoItem(logo);
        partnersTrack.appendChild(logoItem.cloneNode(true));
        // Duplicate for seamless scrolling
        partnersTrack.appendChild(logoItem.cloneNode(true));
    });
    
    // Initialize scroll controls
    setupScrollControls('clientele', clienteleTrack);
    setupScrollControls('partners', partnersTrack);
}

/* Create individual logo item */
function createLogoItem(logoData) {
    const logoItem = document.createElement('div');
    logoItem.className = 'logo-scroll-item';
    logoItem.innerHTML = `
        <img src="${logoData.url}" alt="${logoData.name}" class="client-logo">
    `;
    
    // Add hover effect
    logoItem.addEventListener('mouseenter', () => {
        logoItem.style.transform = 'translateY(-10px)';
    });
    
    logoItem.addEventListener('mouseleave', () => {
        logoItem.style.transform = 'translateY(0)';
    });
    
    return logoItem;
}

/* Setup scroll controls for logo sections */
function setupScrollControls(sectionId, track) {
    const prevBtn = document.getElementById(`${sectionId}Prev`);
    const nextBtn = document.getElementById(`${sectionId}Next`);
    
    if (!prevBtn || !nextBtn) return;
    
    const scrollAmount = 220; // Width of logo item + gap
    
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Add keyboard navigation
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            e.preventDefault();
        }
    });
}

/* Initialize hover effects on cards */
function initHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .potato-fact .fact-content, .logo-scroll-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('logo-scroll-item')) {
                card.style.transform = 'translateY(-10px)';
            } else if (card.parentElement.classList.contains('potato-fact')) {
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.transform = 'translateY(-15px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

/* Initialize smooth scrolling for anchor links */
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
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenuContent');
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });
}

/* Initialize parallax effect on background patterns */
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const patterns = document.querySelectorAll('.bg-pattern');
        
        patterns.forEach(pattern => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            pattern.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

/* Initialize logo data loading */
function initLogoData() {
    // You can add API calls here to load logo data dynamically
    console.log('Logo data initialized');
    
    // Example of loading additional data
    setTimeout(() => {
        console.log('All content loaded successfully');
        
        // Add loading animation removal if needed
        document.body.classList.add('loaded');
    }, 500);
}

/* Handle window resize */
window.addEventListener('resize', function() {
    // Adjust logo scrolling on resize
    adjustLogoScrolling();
});

function adjustLogoScrolling() {
    // You can add responsive adjustments here
    const tracks = document.querySelectorAll('.logos-track');
    
    tracks.forEach(track => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            track.style.animationDuration = '20s';
        } else {
            track.style.animationDuration = '30s';
        }
    });
}

/* Add loading state for images */
document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
        // All resources loaded
        document.body.classList.add('page-loaded');
    }
});

/* Add error handling for images */
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.display = 'none';
    }
}, true);