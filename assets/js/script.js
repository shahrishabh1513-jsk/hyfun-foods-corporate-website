/* ============================================
   MAIN JAVASCRIPT FOR HYFUN FOODS HOME PAGE
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollEffects();
    initLogoScrolling();
    initHoverEffects();
    initSmoothScrolling();
    initParallaxEffect();
    
    console.log('HyFun Foods website loaded successfully!');
});

/* Initialize scroll effects on header */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.height = '70px';
            } else {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                header.style.height = '80px';
            }
        });
    }
}

/* Initialize logo scrolling for client and partner sections */
function initLogoScrolling() {
    const clienteleTrack = document.getElementById('clienteleTrack');
    const partnersTrack = document.getElementById('partnersTrack');
    
    // Duplicate logos for seamless scrolling
    function duplicateLogos(track) {
        if (track) {
            const logos = track.innerHTML;
            track.innerHTML += logos;
        }
    }
    
    if (clienteleTrack) duplicateLogos(clienteleTrack);
    if (partnersTrack) duplicateLogos(partnersTrack);
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
            card.style.transform = '';
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
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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

/* Handle window resize */
window.addEventListener('resize', function() {
    // Adjust logo scrolling on resize
    adjustLogoScrolling();
});

function adjustLogoScrolling() {
    const tracks = document.querySelectorAll('.logos-track');
    const isMobile = window.innerWidth < 768;
    
    tracks.forEach(track => {
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