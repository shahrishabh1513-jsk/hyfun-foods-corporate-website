/* ============================================
   UPDATED ABOUT PAGE JAVASCRIPT
   With new features for screenshot design
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all about page functionality
    initHeroBadges();
    initTimelineDots();
    initHighlightItems();
    initMissionCards();
    initJourneyTimeline();
    initGreenPractices();
    initActiveNavigation();
    initStatsCounter();
    initSmoothScrolling();
    initScrollAnimations();
    
    console.log('About page loaded successfully!');
});

/* Initialize hero badges animation */
function initHeroBadges() {
    const heroBadges = document.querySelectorAll('.hero-badge');
    
    heroBadges.forEach((badge, index) => {
        // Add animation delay for staggered appearance
        badge.style.animationDelay = `${index * 0.2}s`;
        badge.classList.add('fade-in-up');
        
        // Add hover effect
        badge.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.badge-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        badge.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.badge-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/* Initialize timeline dot interactions */
function initTimelineDots() {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const timelineYears = {
        '1962': 'First generation begins trading of Potatoes and Onions under M/s. Asandas & Sons',
        '1990': 'Second generation expands business operations and market reach',
        '2015': 'Third generation, Mr. Haresh Karamchandani establishes HyFun Foods',
        '2020': 'Becomes leading B2B player catering to global QSR brands across 45+ countries',
        'Present': 'Expanding presence on B2C platforms with focus on Indian market'
    };
    
    timelineDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            timelineDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Get the year from data attribute
            const year = this.getAttribute('data-year');
            const content = timelineYears[year];
            
            // Show year info (you can enhance this with a modal or tooltip)
            if (content) {
                console.log(`${year}: ${content}`);
                
                // Optional: Show a notification or update a display element
                const yearDisplay = document.getElementById('year-display');
                if (yearDisplay) {
                    yearDisplay.textContent = `${year}: ${content}`;
                    yearDisplay.style.display = 'block';
                    setTimeout(() => {
                        yearDisplay.style.display = 'none';
                    }, 3000);
                }
            }
            
            // Add animation effect
            this.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            const year = this.getAttribute('data-year');
            const content = timelineYears[year];
            
            // Optional: Show tooltip
            if (content) {
                this.setAttribute('title', content);
            }
        });
        
        dot.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Set first dot as active by default
    if (timelineDots.length > 0) {
        timelineDots[0].classList.add('active');
    }
}

/* Initialize highlight items animation */
function initHighlightItems() {
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    highlightItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in-up');
        
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.highlight-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.highlight-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/* Initialize mission cards interaction */
function initMissionCards() {
    const cards = document.querySelectorAll('.mission-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.mission-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.mission-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/* Initialize journey timeline interaction */
function initJourneyTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-in-up');
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            const year = item.querySelector('.timeline-year');
            if (year) {
                year.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            const year = item.querySelector('.timeline-year');
            if (year) {
                year.style.transform = '';
            }
        });
    });
}

/* Initialize green practices section */
function initGreenPractices() {
    const greenCards = document.querySelectorAll('.green-card');
    
    greenCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
        
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.green-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.green-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Social icons interaction
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click handler for social links
        icon.addEventListener('click', (e) => {
            const href = icon.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                alert('Social links would be configured with actual URLs in production.');
            }
        });
    });
}

/* Set active navigation for about page */
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'about.html' || currentPage === '') {
        const aboutLinks = document.querySelectorAll('a[href*="about"]');
        aboutLinks.forEach(link => {
            if (link.getAttribute('href').includes('about')) {
                const parent = link.parentElement;
                if (parent) {
                    parent.classList.add('active');
                }
                
                // Highlight parent dropdown
                const dropdown = link.closest('.dropdown, .mobile-dropdown');
                if (dropdown) {
                    dropdown.classList.add('active');
                }
            }
        });
    }
}

/* Initialize statistics counter animation */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const isNumber = /\d+/.test(originalText);
        
        if (isNumber) {
            const target = parseInt(originalText);
            let current = 0;
            const increment = target / 50; // 50 steps over 1 second
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                    stat.textContent = Math.floor(current) + (originalText.includes('+') ? '+' : '');
                } else {
                    stat.textContent = Math.floor(current) + (originalText.includes('+') ? '+' : '');
                }
            }, 20);
        }
    });
}

/* Handle smooth scrolling for about page sections */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenuContent');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });
}

/* Add scroll animation for elements */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.hero-badge, .highlight-item, .mission-card, .timeline-item, .green-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/* Handle window resize */
window.addEventListener('resize', function() {
    adjustAboutLayout();
});

function adjustAboutLayout() {
    const aboutHeroContent = document.querySelector('.about-hero-content');
    const legacyContent = document.querySelector('.legacy-content');
    
    if (aboutHeroContent && window.innerWidth < 992) {
        aboutHeroContent.style.gridTemplateColumns = '1fr';
    }
    
    if (legacyContent && window.innerWidth < 992) {
        legacyContent.style.gridTemplateColumns = '1fr';
    }
}

/* Add intersection observer for hero stats */
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(initStatsCounter, 300);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutHero = document.querySelector('.about-hero');
if (aboutHero) {
    heroObserver.observe(aboutHero);
}

/* Helper function to close mobile menu */
function closeMobileMenu() {
    const mobileMenuContent = document.getElementById('mobileMenuContent');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuContent && mobileMenuOverlay) {
        mobileMenuContent.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* Add CSS for animations */
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Add smooth transition for all interactive elements */
    .hero-badge,
    .timeline-dot,
    .highlight-item,
    .mission-card,
    .timeline-item,
    .green-card {
        transition: all 0.3s ease;
    }
    
    /* Year display notification */
    .year-display {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(90deg, var(--green), var(--blue));
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 1000;
        display: none;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(aboutStyles);

/* Add year display element */
const yearDisplay = document.createElement('div');
yearDisplay.id = 'year-display';
yearDisplay.className = 'year-display';
document.body.appendChild(yearDisplay);

/* Initialize on load */
window.addEventListener('load', function() {
    // Add loaded class for transition effects
    document.body.classList.add('loaded');
    
    // Adjust layout initially
    adjustAboutLayout();
});