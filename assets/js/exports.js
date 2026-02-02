/* EXPORTS PAGE JAVASCRIPT */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all exports page functionality
    initGlobePoints();
    initMapInteraction();
    initStandardsCards();
    initProcessSteps();
    initEnquiryForm();
    initSmoothScrolling();
    
    console.log('Exports page loaded successfully!');
});

/* Initialize globe point interactions */
function initGlobePoints() {
    const globePoints = document.querySelectorAll('.globe-point');
    
    globePoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'white';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.9)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        // Add animation delay for staggered animation
        const delay = Math.random() * 1;
        this.style.animationDelay = `${delay}s`;
    });
}

/* Initialize map point interactions */
function initMapInteraction() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            // Highlight all points
            mapPoints.forEach(p => {
                if (p !== this) {
                    p.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    p.style.opacity = '0.7';
                }
            });
            
            // Highlight this point
            this.style.transform = 'translate(-50%, -50%) scale(1.5)';
            this.style.boxShadow = '0 0 20px rgba(110, 193, 228, 0.8)';
        });
        
        point.addEventListener('mouseleave', function() {
            // Reset all points
            mapPoints.forEach(p => {
                p.style.transform = 'translate(-50%, -50%) scale(1)';
                p.style.opacity = '1';
                p.style.boxShadow = 'none';
            });
        });
    });
}

/* Initialize standards cards interaction */
function initStandardsCards() {
    const standardsCards = document.querySelectorAll('.standard-card');
    
    standardsCards.forEach((card, index) => {
        // Add animation delay for staggered appearance
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.standard-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.standard-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/* Initialize process steps interaction */
function initProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        // Add animation delay for staggered appearance
        step.style.animationDelay = `${index * 0.1}s`;
        step.classList.add('fade-in-up');
        
        step.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.step-icon');
            const number = this.querySelector('.step-number');
            
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
            
            if (number) {
                number.style.color = 'rgba(110, 193, 228, 0.5)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.step-icon');
            const number = this.querySelector('.step-number');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (number) {
                number.style.color = 'rgba(110, 193, 228, 0.2)';
            }
        });
    });
}

/* Initialize enquiry form */
function initEnquiryForm() {
    const enquiryForm = document.getElementById('exportEnquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateEnquiryForm(formObject)) {
                // Show loading state
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showFormSuccess(formObject);
                    
                    // Reset form
                    enquiryForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
        
        // Add real-time validation
        const formInputs = enquiryForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

/* Validate enquiry form */
function validateEnquiryForm(formData) {
    let isValid = true;
    
    // Required fields validation
    const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'country'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!formData[field] || formData[field].trim() === '') {
            showFieldError(input, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (formData.email && !isValidEmail(formData.email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (basic)
    const phoneInput = document.getElementById('phone');
    if (formData.phone && !isValidPhone(formData.phone)) {
        showFieldError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

/* Validate individual field */
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.id === 'phone' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

/* Show field error */
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff4757';
}

/* Clear field error */
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = 'rgba(110, 193, 228, 0.2)';
}

/* Email validation helper */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* Phone validation helper (basic) */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/* Show form success message */
function showFormSuccess(formData) {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'success-modal-overlay';
    
    successModal.innerHTML = `
        <div class="success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Enquiry Sent Successfully!</h3>
            <p>Thank you ${formData.contactPerson} from ${formData.companyName}. Our exports team will contact you within 24 hours.</p>
            <button class="btn btn-close-modal">Close</button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .success-modal-overlay {
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
            animation: fadeIn 0.3s ease;
        }
        
        .success-modal {
            background: white;
            padding: 40px;
            border-radius: var(--border-radius);
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: slideUp 0.3s ease;
        }
        
        .success-icon {
            font-size: 4rem;
            color: var(--green);
            margin-bottom: 20px;
        }
        
        .success-modal h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: var(--text-main);
        }
        
        .success-modal p {
            color: var(--text-muted);
            margin-bottom: 25px;
            line-height: 1.6;
        }
        
        .btn-close-modal {
            background: var(--green);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .btn-close-modal:hover {
            background: var(--blue);
            transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Close modal functionality
    const closeBtn = successModal.querySelector('.btn-close-modal');
    closeBtn.addEventListener('click', function() {
        successModal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            successModal.remove();
            modalStyles.remove();
        }, 300);
    });
    
    // Close on overlay click
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            successModal.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                successModal.remove();
                modalStyles.remove();
            }, 300);
        }
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

/* Add CSS for animations */
const exportsStyles = document.createElement('style');
exportsStyles.textContent = `
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
document.head.appendChild(exportsStyles);