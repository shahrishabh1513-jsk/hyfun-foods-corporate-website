/* Our Culture Page - Interactive Elements */

document.addEventListener('DOMContentLoaded', function() {
    initValueOrbs();
    initValueCards();
    initPillarInteractions();
    initEnvironmentFeatures();
    initCommunityVisual();
    initInnovationVisual();
    initCultureBenefits();
    initScrollAnimations();
    
    console.log('Our Culture page initialized!');
});

/* Initialize value orbs interaction */
function initValueOrbs() {
    const valueOrbs = document.querySelectorAll('.value-orb');
    
    valueOrbs.forEach(orb => {
        orb.addEventListener('mouseenter', function() {
            const value = this.getAttribute('data-value');
            highlightValue(value);
        });
        
        orb.addEventListener('mouseleave', function() {
            resetValueHighlights();
        });
        
        orb.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            showValueDetails(value);
        });
    });
}

function highlightValue(value) {
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        if (card.getAttribute('data-value') === value) {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 25px 50px rgba(120, 176, 75, 0.15)';
        }
    });
}

function resetValueHighlights() {
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
}

function showValueDetails(value) {
    const details = {
        'integrity': "Integrity First: We believe in doing the right thing, even when no one is watching. Our ethical standards guide every business decision.",
        'innovation': "Continuous Innovation: We foster a culture of curiosity and creativity, encouraging our team to explore new ideas and solutions.",
        'excellence': "Excellence in Execution: We're committed to delivering the highest quality in everything we do, from product development to customer service.",
        'teamwork': "Collaborative Spirit: We work together across departments and functions, believing that our collective strength drives our success."
    };
    
    alert(details[value] || "Learn more about our values on our website.");
}

/* Initialize value cards interaction */
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon-wrapper i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon-wrapper i');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            const description = this.querySelector('.card-description').textContent;
            showCardModal(title, description);
        });
    });
}

function showCardModal(title, description) {
    // In a real implementation, you would show a modal
    // For now, we'll use an alert
    alert(`${title}\n\n${description}\n\nClick "Learn More" on our website for detailed information.`);
}

/* Initialize pillar interactions */
function initPillarInteractions() {
    const pillarCards = document.querySelectorAll('.pillar-card');
    
    pillarCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const visual = this.querySelector('.pillar-visual');
            if (visual) {
                visual.style.transform = 'scale(1.05)';
                visual.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const visual = this.querySelector('.pillar-visual');
            if (visual) {
                visual.style.transform = '';
            }
        });
        
        // Add click to show pillar details
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showPillarDetails(title, index);
        });
    });
}

function showPillarDetails(title, index) {
    const pillars = [
        {
            title: "Growth & Development",
            details: "We provide comprehensive training programs, mentorship opportunities, and clear career paths to help our employees grow both personally and professionally.",
            initiatives: ["Leadership Development Program", "Technical Skills Training", "Cross-Functional Exposure", "Educational Assistance"]
        },
        {
            title: "Work-Life Harmony",
            details: "We understand that happy employees are productive employees. Our flexible policies and wellness programs support overall well-being.",
            initiatives: ["Flexible Working Hours", "Remote Work Options", "Health & Wellness Programs", "Family Support Services"]
        },
        {
            title: "Inclusion & Diversity",
            details: "We celebrate differences and create an environment where everyone feels valued, respected, and empowered to contribute their unique perspectives.",
            initiatives: ["Diversity Training", "Inclusive Hiring Practices", "Employee Resource Groups", "Cultural Awareness Events"]
        }
    ];
    
    if (pillars[index]) {
        const pillar = pillars[index];
        let message = `${pillar.title}\n\n${pillar.details}\n\nKey Initiatives:\n`;
        pillar.initiatives.forEach(initiative => {
            message += `• ${initiative}\n`;
        });
        alert(message);
    }
}

/* Initialize environment features */
function initEnvironmentFeatures() {
    const features = document.querySelectorAll('.feature-item');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        feature.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            showFeatureInfo(title, description);
        });
    });
}

function showFeatureInfo(title, description) {
    alert(`${title}\n\n${description}\n\nContact our HR department to learn more about our workplace initiatives.`);
}

/* Initialize community visual animation */
function initCommunityVisual() {
    const communityVisual = document.querySelector('.visual-community');
    if (communityVisual) {
        const people = communityVisual.querySelectorAll('.person');
        people.forEach((person, i) => {
            person.style.setProperty('--i', i);
        });
        
        communityVisual.addEventListener('click', function() {
            alert("Community Engagement: Our employees actively participate in various community service initiatives, making a positive impact in the regions where we operate.");
        });
    }
}

/* Initialize innovation visual animation */
function initInnovationVisual() {
    const innovationVisual = document.querySelector('.visual-innovation');
    if (innovationVisual) {
        innovationVisual.addEventListener('mouseenter', function() {
            const gears = this.querySelectorAll('.innovation-gear');
            gears.forEach(gear => {
                gear.style.animationPlayState = 'paused';
            });
            
            const spark = this.querySelector('.innovation-spark');
            if (spark) {
                spark.style.animation = 'sparkPulse 0.5s ease-in-out infinite';
            }
        });
        
        innovationVisual.addEventListener('mouseleave', function() {
            const gears = this.querySelectorAll('.innovation-gear');
            gears.forEach(gear => {
                gear.style.animationPlayState = 'running';
            });
            
            const spark = this.querySelector('.innovation-spark');
            if (spark) {
                spark.style.animation = 'sparkPulse 1.5s ease-in-out infinite';
            }
        });
        
        innovationVisual.addEventListener('click', function() {
            alert("Innovation Labs: Our dedicated innovation spaces allow employees to experiment with new ideas, collaborate across teams, and develop breakthrough solutions.");
        });
    }
}

/* Initialize culture benefits interaction */
function initCultureBenefits() {
    const benefits = document.querySelectorAll('.benefit');
    
    benefits.forEach(benefit => {
        benefit.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateY(-5px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        benefit.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        benefit.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            showBenefitDetails(text);
        });
    });
}

function showBenefitDetails(benefit) {
    const details = {
        'Learning Culture': "We invest in continuous learning with access to online courses, workshops, conferences, and mentorship programs.",
        'Wellness Focus': "Comprehensive health insurance, fitness programs, mental health support, and wellness challenges keep our team healthy.",
        'Strong Ethics': "Clear ethical guidelines, regular compliance training, and transparent communication build trust within our organization.",
        'Growth Opportunities': "Internal promotions, skill development programs, and leadership opportunities help our employees advance their careers."
    };
    
    alert(`${benefit}\n\n${details[benefit] || 'Contact HR for more information about our employee benefits.'}`);
}

/* Initialize scroll animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.value-card, .pillar-card, .feature-item, .showcase-item, .benefit').forEach(el => {
        observer.observe(el);
    });
}

/* Initialize on window load */
window.addEventListener('load', function() {
    // Add loaded class for transitions
    document.body.classList.add('culture-loaded');
    
    // Animate hero title
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, index * 300);
    });
    
    // Animate value orbs
    const valueOrbs = document.querySelectorAll('.value-orb');
    valueOrbs.forEach((orb, index) => {
        setTimeout(() => {
            orb.style.opacity = '1';
            orb.style.transform = 'scale(1)';
        }, 500 + (index * 200));
    });
});

/* Handle responsive adjustments */
window.addEventListener('resize', function() {
    adjustCultureElements();
});

function adjustCultureElements() {
    const isMobile = window.innerWidth < 768;
    
    // Adjust visual elements for mobile
    const visuals = document.querySelectorAll('.pillar-visual, .showcase-visual');
    visuals.forEach(visual => {
        if (isMobile) {
            visual.style.transform = 'scale(0.9)';
        } else {
            visual.style.transform = '';
        }
    });
}

/* Add some CSS for scroll animations */
const style = document.createElement('style');
style.textContent = `
    .value-card,
    .pillar-card,
    .feature-item,
    .showcase-item,
    .benefit {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .value-card.animate-in,
    .pillar-card.animate-in,
    .feature-item.animate-in,
    .showcase-item.animate-in,
    .benefit.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .title-word {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .value-orb {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .culture-loaded .title-word {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);