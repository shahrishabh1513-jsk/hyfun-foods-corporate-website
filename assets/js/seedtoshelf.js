/* ============================================
   SEED TO SHELF - INTERACTIVE ELEMENTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initSeedAnimations();
    initFlowPoints();
    initMicroscopeInteractions();
    initTemperatureSlider();
    initCertificates();
    initWaterCycle();
    initNetworkNodes();
    initProcessFlow();
    initCTAHover();
    
    console.log('Seed to Shelf - Unique layout initialized!');
});

/* Initialize floating seeds animation */
function initSeedAnimations() {
    const seeds = document.querySelectorAll('.seed');
    seeds.forEach(seed => {
        seed.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(2)';
        });
        
        seed.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
}

/* Initialize flow points interaction */
function initFlowPoints() {
    const flowPoints = document.querySelectorAll('.flow-point');
    let currentStep = 0;
    
    // Auto cycle through steps
    function cycleSteps() {
        flowPoints.forEach(point => point.classList.remove('active'));
        flowPoints[currentStep].classList.add('active');
        currentStep = (currentStep + 1) % flowPoints.length;
    }
    
    // Start automatic cycling
    if (flowPoints.length > 0) {
        setInterval(cycleSteps, 2000);
        
        // Also allow manual hover
        flowPoints.forEach(point => {
            point.addEventListener('mouseenter', function() {
                flowPoints.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

/* Initialize microscope interactions */
function initMicroscopeInteractions() {
    const microscope = document.querySelector('.visual-microscope');
    const cells = document.querySelectorAll('.slide-cell');
    
    if (microscope) {
        microscope.addEventListener('mouseenter', function() {
            cells.forEach((cell, i) => {
                cell.style.setProperty('--i', i);
                cell.style.animation = 'cellPulse 0.5s ease-in-out infinite';
            });
        });
        
        microscope.addEventListener('mouseleave', function() {
            cells.forEach(cell => {
                cell.style.animation = 'cellPulse 2s ease-in-out infinite';
            });
        });
    }
}

/* Initialize temperature slider animation */
function initTemperatureSlider() {
    const sliderThumb = document.querySelector('.slider-thumb');
    if (sliderThumb) {
        // Add click interaction
        sliderThumb.addEventListener('click', function() {
            this.style.animationPlayState = 'paused';
            setTimeout(() => {
                this.style.animationPlayState = 'running';
            }, 1000);
        });
    }
}

/* Initialize certificates interaction */
function initCertificates() {
    const certificates = document.querySelectorAll('.certificate');
    certificates.forEach(cert => {
        cert.addEventListener('click', function() {
            const certName = this.querySelector('span').textContent;
            showCertificationInfo(certName);
        });
    });
}

function showCertificationInfo(certName) {
    const info = {
        'ISO 9001': 'Quality Management System Certification',
        'HACCP': 'Hazard Analysis Critical Control Point',
        'GMP': 'Good Manufacturing Practices'
    };
    
    alert(`${certName}: ${info[certName] || 'International Quality Standard'}`);
}

/* Initialize water cycle animation */
function initWaterCycle() {
    const waterCycle = document.querySelector('.water-cycle');
    if (waterCycle) {
        // Add click to show water conservation info
        waterCycle.addEventListener('click', function() {
            const rate = this.querySelector('.rate-value').textContent;
            alert(`We recycle ${rate} of water used in our processes through advanced water management systems.`);
        });
    }
}

/* Initialize network nodes interaction */
function initNetworkNodes() {
    const nodes = document.querySelectorAll('.network-node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.5)';
            this.style.backgroundColor = 'var(--green)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'var(--blue)';
        });
    });
}

/* Initialize process flow interactions */
function initProcessFlow() {
    const flowSteps = document.querySelectorAll('.flow-step');
    flowSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            // Add visual feedback
            const circle = this.querySelector('.circle-inner');
            if (circle) {
                circle.style.transform = 'scale(1.1)';
                circle.style.transition = 'transform 0.3s ease';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const circle = this.querySelector('.circle-inner');
            if (circle) {
                circle.style.transform = '';
            }
        });
        
        // Add click to show more info
        step.addEventListener('click', function() {
            const stepTitle = this.querySelector('h3').textContent;
            showStepDetails(stepTitle, index + 1);
        });
    });
}

function showStepDetails(title, stepNumber) {
    const details = [
        "Genetic Research: Our R&D team works with agricultural experts to develop potato varieties that offer optimal yield, taste, and nutritional value while being resistant to common diseases.",
        "Sustainable Farming: Partnering with local farmers who employ eco-friendly practices, water conservation techniques, and soil health management to ensure sustainable crop production.",
        "Advanced Processing: Utilizing state-of-the-art processing facilities with automated quality control systems to preserve nutrients and ensure consistent product quality.",
        "Smart Logistics: Temperature-controlled supply chain with real-time tracking ensures products maintain optimal freshness from our facilities to your location.",
        "Your Satisfaction: Our journey ends when you enjoy delicious, healthy meals with your family, knowing they come from a trusted source committed to quality and sustainability."
    ];
    
    alert(`Step ${stepNumber}: ${title}\n\n${details[stepNumber - 1]}`);
}

/* Initialize CTA button hover effects */
function initCTAHover() {
    const orbs = document.querySelectorAll('.feature-orb');
    orbs.forEach(orb => {
        orb.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.orb-icon i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        orb.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.orb-icon i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

/* Initialize scroll animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all steps and visual elements
    document.querySelectorAll('.step-container, .flow-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        stepObserver.observe(el);
    });
}

/* Initialize on window load */
window.addEventListener('load', function() {
    // Add loaded class for transitions
    document.body.classList.add('page-loaded');
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add floating potatoes click effect
    const potatoes = document.querySelectorAll('.potato');
    potatoes.forEach(potato => {
        potato.addEventListener('click', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'rotate(45deg) scale(1.5)';
            setTimeout(() => {
                this.style.animationPlayState = 'running';
                this.style.transform = 'rotate(45deg) scale(1)';
            }, 500);
        });
    });
});

/* Handle responsive adjustments */
window.addEventListener('resize', function() {
    adjustVisualElements();
});

function adjustVisualElements() {
    const isMobile = window.innerWidth < 768;
    
    // Adjust visual elements for mobile
    const microscopes = document.querySelectorAll('.visual-microscope');
    microscopes.forEach(microscope => {
        if (isMobile) {
            microscope.style.transform = 'scale(0.8)';
        } else {
            microscope.style.transform = '';
        }
    });
}