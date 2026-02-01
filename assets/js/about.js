/* ============================================
   ENHANCED ABOUT PAGE JAVASCRIPT
   With circular timeline animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all about page functionality
    initAboutHero();
    initCircularTimeline();
    initPrincipleCards();
    initGreenPractices();
    initConnectOptions();
    initSmoothScrolling();
    
    console.log('About page loaded successfully!');
});

/* Initialize about hero section */
function initAboutHero() {
    const heroStats = document.querySelectorAll('.hero-stat');
    
    heroStats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
        stat.classList.add('fade-in-up');
    });
    
    const timelinePoints = document.querySelectorAll('.timeline-point');
    timelinePoints.forEach((point, index) => {
        point.style.animationDelay = `${index * 0.3}s`;
        point.classList.add('fade-in-up');
    });
}

/* Initialize circular timeline animation */
function initCircularTimeline() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    timelineCards.forEach((card, index) => {
        // Add animation delay for staggered appearance
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
        
        // Add interactive hover effects
        card.addEventListener('mouseenter', function() {
            const yearBadge = this.querySelector('.year-badge');
            if (yearBadge) {
                yearBadge.style.transform = 'scale(1.1) rotate(5deg)';
                yearBadge.style.transition = 'transform 0.3s ease';
            }
            
            // Highlight connector line
            const connector = this.querySelector('.timeline-connector');
            if (connector) {
                connector.style.width = '60px';
                connector.style.background = 'linear-gradient(90deg, var(--green), var(--blue))';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const yearBadge = this.querySelector('.year-badge');
            if (yearBadge) {
                yearBadge.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset connector line
            const connector = this.querySelector('.timeline-connector');
            if (connector) {
                connector.style.width = '40px';
                connector.style.background = 'linear-gradient(90deg, var(--green), var(--blue))';
            }
        });
        
        // Add click effect to show year details
        card.addEventListener('click', function() {
            const year = this.querySelector('.year-badge').textContent;
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            showTimelineDetail(year, title, description);
        });
    });
    
    // Center story animation
    const centerStory = document.querySelector('.center-story');
    if (centerStory) {
        centerStory.classList.add('fade-in-up');
        centerStory.style.animationDelay = '0.5s';
        
        centerStory.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.story-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        centerStory.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.story-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    }
}

/* Show timeline detail overlay */
function showTimelineDetail(year, title, description) {
    // Create or update detail overlay
    let detailOverlay = document.getElementById('timeline-detail-overlay');
    
    if (!detailOverlay) {
        detailOverlay = document.createElement('div');
        detailOverlay.id = 'timeline-detail-overlay';
        detailOverlay.className = 'timeline-detail-overlay';
        document.body.appendChild(detailOverlay);
        
        // Add CSS for overlay
        const style = document.createElement('style');
        style.textContent = `
            .timeline-detail-overlay {
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
                opacity: 0;
                animation: fadeIn 0.3s forwards;
            }
            
            .timeline-detail-content {
                background: white;
                padding: 40px;
                border-radius: var(--border-radius);
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
                transform: translateY(20px);
                animation: slideUp 0.3s forwards 0.1s;
            }
            
            .timeline-detail-year {
                background: linear-gradient(135deg, var(--green), var(--blue));
                color: white;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 1.5rem;
                font-weight: bold;
            }
            
            .timeline-detail-title {
                font-size: 1.8rem;
                margin-bottom: 15px;
                color: var(--text-main);
            }
            
            .timeline-detail-description {
                color: var(--text-muted);
                line-height: 1.6;
                margin-bottom: 25px;
            }
            
            .close-timeline-detail {
                background: var(--green);
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: var(--transition);
            }
            
            .close-timeline-detail:hover {
                background: var(--blue);
                transform: translateY(-2px);
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                to { transform: translateY(0); }
            }
            
            @keyframes fadeOut {
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Update content
    detailOverlay.innerHTML = `
        <div class="timeline-detail-content">
            <div class="timeline-detail-year">${year}</div>
            <h3 class="timeline-detail-title">${title}</h3>
            <p class="timeline-detail-description">${description}</p>
            <button class="close-timeline-detail">Close</button>
        </div>
    `;
    
    // Show overlay
    detailOverlay.style.display = 'flex';
    
    // Close button functionality
    const closeBtn = detailOverlay.querySelector('.close-timeline-detail');
    closeBtn.addEventListener('click', function() {
        detailOverlay.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            detailOverlay.style.display = 'none';
        }, 300);
    });
    
    // Close on overlay click
    detailOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            detailOverlay.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                detailOverlay.style.display = 'none';
            }, 300);
        }
    });
}

/* Initialize principle cards interaction */
function initPrincipleCards() {
    const principleCards = document.querySelectorAll('.principle-card');
    
    principleCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/* Initialize green practices interaction */
function initGreenPractices() {
    const greenCards = document.querySelectorAll('.green-practice-card');
    
    greenCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.green-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.green-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/* Initialize connect options interaction */
function initConnectOptions() {
    const connectOptions = document.querySelectorAll('.connect-option');
    
    connectOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
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
                const mobileMenu = document.querySelector('.mobile-menu-content');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const overlay = document.querySelector('.mobile-menu-overlay');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
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
`;
document.head.appendChild(aboutStyles);

/* Initialize on load */
window.addEventListener('load', function() {
    // Add loaded class for transition effects
    document.body.classList.add('loaded');
});