/* ============================================
   ENHANCED CULTURE PAGE JS WITH 3D ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhanced culture page functionality
    initParticlesJS();
    init3DAnimations();
    initLetterAnimation();
    initCounterAnimation();
    init3DCards();
    initTimelineAnimation();
    initGallery3D();
    initCareersForm3D();
    initScrollEffects();
    initActiveNavigation();
    
    console.log('Enhanced Culture page loaded successfully!');
});

/* Initialize Particles.js Background */
function initParticlesJS() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ['#78B04B', '#6EC1E4', '#FFFFFF'] },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#78B04B',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

/* Initialize 3D Animations with GSAP */
function init3DAnimations() {
    // Animate floating potatoes
    gsap.to('.potato', {
        duration: 20,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
    
    // Animate floating shapes
    gsap.to('.floating-shape', {
        duration: 10,
        y: '+=30',
        rotation: '+=10',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 2
    });
    
    // Animate hero stats on hover
    document.querySelectorAll('.stat-3d').forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            gsap.to(stat, {
                duration: 0.3,
                scale: 1.05,
                rotationX: 10,
                ease: 'power2.out'
            });
        });
        
        stat.addEventListener('mouseleave', () => {
            gsap.to(stat, {
                duration: 0.3,
                scale: 1,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
    });
}

/* Initialize Letter Animation */
function initLetterAnimation() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.setProperty('--index', index);
        letter.style.animationDelay = `${index * 0.1}s`;
    });
}

/* Initialize Counter Animation */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

/* Initialize 3D Cards Interaction */
function init3DCards() {
    const cards = document.querySelectorAll('.philosophy-card-3d');
    
    cards.forEach(card => {
        // Card flip on click for mobile
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                this.classList.toggle('flipped');
            }
        });
        
        // 3D tilt effect on desktop
        if (window.innerWidth > 768) {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                gsap.to(this, {
                    duration: 0.3,
                    rotationY: rotateY,
                    rotationX: rotateX,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'power2.out'
                });
            });
        }
    });
}

/* Initialize Timeline Animation */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item-3d');
    
    // Create ScrollTrigger for timeline items
    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.timeline-content-3d'), {
                duration: 0.3,
                y: -10,
                rotationX: 5,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.timeline-content-3d'), {
                duration: 0.3,
                y: 0,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
    });
}

/* Initialize 3D Gallery */
function initGallery3D() {
    const galleryItems = document.querySelectorAll('.gallery-3d-item');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // Show gallery item
    function showGalleryItem(index) {
        // Hide all items
        galleryItems.forEach(item => item.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Show selected item
        galleryItems[index].classList.add('active');
        thumbnails[index].classList.add('active');
        currentIndex = index;
        
        // Animate image zoom
        const image = galleryItems[index].querySelector('.gallery-3d-image');
        gsap.fromTo(image,
            { scale: 1.1 },
            { scale: 1, duration: 8, ease: 'none' }
        );
    }
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showGalleryItem(currentIndex);
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showGalleryItem(currentIndex);
    });
    
    // Thumbnail click
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => showGalleryItem(index));
    });
    
    // Auto rotate gallery
    setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showGalleryItem(currentIndex);
    }, 8000);
    
    // 3D tilt effect for thumbnails
    thumbnails.forEach(thumb => {
        thumb.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            gsap.to(this, {
                duration: 0.3,
                rotationY: rotateY,
                rotationX: rotateX,
                ease: 'power2.out'
            });
        });
        
        thumb.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                rotationY: 0,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
    });
}

/* Initialize Enhanced Careers Form */
function initCareersForm3D() {
    const form = document.getElementById('careersForm3d');
    const fileUpload = document.getElementById('fileUpload3d');
    const cvInput = document.getElementById('cvUpload3d');
    const filePreview = document.getElementById('filePreview');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    if (!form) return;
    
    // File upload interaction
    fileUpload.addEventListener('click', () => cvInput.click());
    
    cvInput.addEventListener('change', handleFileSelect);
    
    function handleFileSelect() {
        if (cvInput.files.length > 0) {
            const file = cvInput.files[0];
            const fileName = file.name;
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);
            
            // Validate file
            if (file.size > 5 * 1024 * 1024) {
                showFileError('File size exceeds 5MB limit');
                return;
            }
            
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                showFileError('Only PDF, DOC, and DOCX files are allowed');
                return;
            }
            
            // Show preview
            filePreview.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file-alt"></i>
                    <div class="file-details">
                        <strong>${fileName}</strong>
                        <span>${fileSize} MB</span>
                    </div>
                    <button type="button" class="remove-file">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            filePreview.classList.add('active');
            
            // Add remove file functionality
            const removeBtn = filePreview.querySelector('.remove-file');
            removeBtn.addEventListener('click', () => {
                cvInput.value = '';
                filePreview.classList.remove('active');
                filePreview.innerHTML = '';
            });
            
            // Animate file upload
            gsap.from(filePreview, {
                duration: 0.5,
                y: -20,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        }
    }
    
    function showFileError(message) {
        filePreview.innerHTML = `<div class="file-error"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
        filePreview.classList.add('active');
        cvInput.value = '';
        
        setTimeout(() => {
            gsap.to(filePreview, {
                duration: 0.5,
                opacity: 0,
                y: -10,
                onComplete: () => {
                    filePreview.classList.remove('active');
                    filePreview.innerHTML = '';
                }
            });
        }, 3000);
    }
    
    // Form validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const container = input.closest('.input-container');
            if (container) {
                gsap.to(container.querySelector('.input-border'), {
                    duration: 0.3,
                    borderColor: 'var(--green)',
                    boxShadow: '0 0 0 3px rgba(120, 176, 75, 0.1)',
                    ease: 'power2.out'
                });
            }
        });
        
        input.addEventListener('blur', () => {
            const container = input.closest('.input-container');
            if (container) {
                gsap.to(container.querySelector('.input-border'), {
                    duration: 0.3,
                    borderColor: 'rgba(110, 193, 228, 0.2)',
                    boxShadow: 'none',
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const fullName = document.getElementById('fullName3d').value.trim();
        const email = document.getElementById('email3d').value.trim();
        const department = document.getElementById('department3d').value;
        const cvFile = cvInput.files[0];
        
        if (!fullName || !email || !department || !cvFile) {
            showFormError('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Show loading animation
        const submitBtn = this.querySelector('.btn-3d');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call with 3D animation
        gsap.to(submitBtn, {
            duration: 0.5,
            scale: 0.95,
            repeat: 3,
            yoyo: true,
            ease: 'power2.inOut',
            onComplete: () => {
                // Reset button
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                
                // Show success modal
                showSuccessModal();
                
                // Reset form
                form.reset();
                filePreview.classList.remove('active');
                filePreview.innerHTML = '';
            }
        });
    });
    
    function showFormError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-3d';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(255, 71, 87, 0.3);
            transform: translateX(100%);
        `;
        
        document.body.appendChild(errorDiv);
        
        // Animate in
        gsap.to(errorDiv, {
            duration: 0.5,
            x: 0,
            ease: 'back.out(1.7)'
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            gsap.to(errorDiv, {
                duration: 0.5,
                x: 100,
                opacity: 0,
                onComplete: () => errorDiv.remove()
            });
        }, 3000);
    }
    
    function showSuccessModal() {
        successModal.classList.add('active');
        
        // Animate modal content
        gsap.from('.modal-content-3d', {
            duration: 0.8,
            scale: 0,
            rotation: 360,
            ease: 'back.out(1.7)'
        });
    }
    
    // Close modal
    modalCloseBtn.addEventListener('click', () => {
        gsap.to('.modal-content-3d', {
            duration: 0.3,
            scale: 0,
            rotation: -360,
            ease: 'back.in(1.7)',
            onComplete: () => {
                successModal.classList.remove('active');
            }
        });
    });
    
    // Close modal on outside click
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}

/* Initialize Scroll Effects */
function initScrollEffects() {
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.culture-hero-3d');
        
        if (hero) {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            gsap.to(hero, {
                duration: 0.5,
                backgroundPosition: `50% ${yPos}px`,
                ease: 'none'
            });
        }
    });
    
    // Scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: targetPosition, offsetY: headerHeight },
                    ease: 'power3.inOut'
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

/* Set Active Navigation */
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'culture.html') {
        document.querySelectorAll('a[href*="culture"]').forEach(link => {
            const parent = link.parentElement;
            if (parent) {
                parent.classList.add('active');
            }
            
            const dropdown = link.closest('.dropdown, .mobile-dropdown');
            if (dropdown) {
                dropdown.classList.add('active');
            }
        });
    }
}

/* Helper Functions */
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
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .file-info {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        animation: slideIn 0.3s ease;
    }
    
    .file-info i {
        font-size: 2rem;
        color: var(--blue);
    }
    
    .file-details {
        flex: 1;
    }
    
    .file-details strong {
        display: block;
        color: var(--text-main);
        margin-bottom: 5px;
    }
    
    .file-details span {
        color: var(--text-muted);
        font-size: 0.9rem;
    }
    
    .remove-file {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 5px;
        transition: color 0.3s ease;
    }
    
    .remove-file:hover {
        color: #ff4757;
    }
    
    .file-error {
        color: #ff4757;
        padding: 10px;
        text-align: center;
    }
    
    .form-error-3d {
        animation: slideInRight 0.5s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    /* 3D card flipped state for mobile */
    @media (max-width: 768px) {
        .philosophy-card-3d.flipped {
            transform: rotateY(180deg);
        }
    }
`;
document.head.appendChild(enhancedStyles);

/* Initialize on window load */
window.addEventListener('load', function() {
    // Add loaded class
    document.body.classList.add('loaded');
    
    // Initialize GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});