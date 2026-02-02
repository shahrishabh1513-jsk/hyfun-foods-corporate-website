/* Connect Page JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all connect page functionality
    initFormSteps();
    initMapInteractions();
    initOfficeLocations();
    initFormValidation();
    initNewsletterForm();
    initModal();
    
    console.log('Connect page loaded successfully!');
});

/* Initialize multi-step form */
function initFormSteps() {
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.querySelector('.progress-fill');
    const currentStepEl = document.getElementById('current-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    let currentStep = 1;
    
    // Update progress bar
    function updateProgress() {
        // Update step indicators
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update progress bar
        const progressPercentage = ((currentStep - 1) / 2) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Update step counter
        currentStepEl.textContent = currentStep;
    }
    
    // Show specific step
    function showStep(stepNumber) {
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        const stepToShow = document.getElementById(`step-${stepNumber}`);
        if (stepToShow) {
            stepToShow.classList.add('active');
        }
        
        currentStep = stepNumber;
        updateProgress();
    }
    
    // Next button click
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            
            // Validate current step before proceeding
            if (validateStep(currentStep)) {
                showStep(nextStep);
                
                // Scroll to top of form
                this.closest('.form-step').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Previous button click
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            showStep(prevStep);
            
            // Scroll to top of form
            this.closest('.form-step').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Initialize progress
    updateProgress();
}

/* Validate form step */
function validateStep(stepNumber) {
    let isValid = true;
    
    switch(stepNumber) {
        case 1:
            // Validate purpose selection
            const purposeSelected = document.querySelector('input[name="purpose"]:checked');
            if (!purposeSelected) {
                showToast('Please select a purpose for your inquiry', 'error');
                isValid = false;
            }
            break;
            
        case 2:
            // Validate subject and message
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!subject || subject.length < 5) {
                showFieldError('subject', 'Please enter a subject (min. 5 characters)');
                isValid = false;
            } else {
                clearFieldError('subject');
            }
            
            if (!message || message.length < 20) {
                showFieldError('message', 'Please provide more details (min. 20 characters)');
                isValid = false;
            } else {
                clearFieldError('message');
            }
            break;
    }
    
    return isValid;
}

/* Initialize map interactions */
function initMapInteractions() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            // Add hover effect
            this.style.transform = 'translate(-50%, -50%) scale(1.3)';
            
            // Show label
            const label = this.querySelector('.point-label');
            if (label) {
                label.style.opacity = '1';
                label.style.top = '-45px';
            }
        });
        
        point.addEventListener('mouseleave', function() {
            // Remove hover effect
            this.style.transform = 'translate(-50%, -50%) scale(1)';
            
            // Hide label
            const label = this.querySelector('.point-label');
            if (label) {
                label.style.opacity = '0';
                label.style.top = '-35px';
            }
        });
        
        // Click to show location details
        point.addEventListener('click', function() {
            const locationId = this.dataset.location;
            showLocationDetails(locationId);
            
            // Highlight this point
            mapPoints.forEach(p => {
                p.style.background = 'var(--green)';
                p.style.boxShadow = 'none';
            });
            
            this.style.background = 'var(--blue)';
            this.style.boxShadow = '0 0 20px rgba(110, 193, 228, 0.8)';
        });
    });
}

/* Show office location details */
function showLocationDetails(locationId) {
    const locationDetails = document.querySelectorAll('.location-detail');
    const locationToShow = document.getElementById(locationId);
    
    // Hide all details
    locationDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show selected location
    if (locationToShow) {
        locationToShow.classList.add('active');
    }
}

/* Initialize office location functionality */
function initOfficeLocations() {
    // Auto-cycle through locations
    const locations = ['headquarters', 'uae', 'usa', 'europe'];
    let currentLocationIndex = 0;
    
    function cycleLocations() {
        const locationId = locations[currentLocationIndex];
        showLocationDetails(locationId);
        
        // Update map point
        const mapPoints = document.querySelectorAll('.map-point');
        mapPoints.forEach(point => {
            point.style.background = 'var(--green)';
            point.style.boxShadow = 'none';
            
            if (point.dataset.location === locationId) {
                point.style.background = 'var(--blue)';
                point.style.boxShadow = '0 0 20px rgba(110, 193, 228, 0.8)';
            }
        });
        
        // Move to next location
        currentLocationIndex = (currentLocationIndex + 1) % locations.length;
    }
    
    // Start cycling every 5 seconds
    setInterval(cycleLocations, 5000);
    
    // Initial call
    setTimeout(cycleLocations, 1000);
}

/* Initialize form validation */
function initFormValidation() {
    const connectForm = document.getElementById('connectForm');
    
    if (connectForm) {
        connectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all steps
            let isFormValid = true;
            
            // Step 1 validation
            if (!validateStep(1)) isFormValid = false;
            
            // Step 2 validation
            if (!validateStep(2)) {
                // Go back to step 2 to show errors
                showStep(2);
                isFormValid = false;
            }
            
            // Step 3 validation
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const country = document.getElementById('country').value;
            
            if (!fullName) {
                showFieldError('fullName', 'Please enter your full name');
                isFormValid = false;
            } else {
                clearFieldError('fullName');
            }
            
            if (!email || !isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                isFormValid = false;
            } else {
                clearFieldError('email');
            }
            
            if (!phone || !isValidPhone(phone)) {
                showFieldError('phone', 'Please enter a valid phone number');
                isFormValid = false;
            } else {
                clearFieldError('phone');
            }
            
            if (!country) {
                showFieldError('country', 'Please select your country');
                isFormValid = false;
            } else {
                clearFieldError('country');
            }
            
            if (isFormValid) {
                // Show loading state
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success modal
                    showSuccessModal();
                    
                    // Reset form
                    connectForm.reset();
                    
                    // Reset to step 1
                    showStep(1);
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                // Go to step 3 to show errors
                showStep(3);
                
                // Scroll to first error
                const firstError = this.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
        
        // Real-time validation for step 3 fields
        const step3Fields = ['fullName', 'email', 'phone', 'country'];
        step3Fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', function() {
                    validateField(this);
                });
                
                field.addEventListener('input', function() {
                    clearFieldError(this);
                });
            }
        });
    }
}

/* Show field error */
function showFieldError(fieldId, message) {
    if (typeof fieldId === 'string') {
        fieldId = document.getElementById(fieldId);
    }
    
    if (!fieldId) return;
    
    clearFieldError(fieldId);
    
    // Add error class to parent
    fieldId.closest('.form-group').classList.add('error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    
    fieldId.parentNode.appendChild(errorDiv);
    fieldId.style.borderColor = '#ff4757';
}

/* Clear field error */
function clearFieldError(field) {
    if (typeof field === 'string') {
        field = document.getElementById(field);
    }
    
    if (!field) return;
    
    // Remove error class from parent
    field.closest('.form-group').classList.remove('error');
    
    // Remove error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e0e0e0';
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

/* Email validation helper */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* Phone validation helper */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/* Initialize newsletter form */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email || !isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                emailInput.style.borderColor = '#ff4757';
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showToast('Successfully subscribed to newsletter!', 'success');
                newsletterForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

/* Initialize modal */
function initModal() {
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Close modal on button click
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
}

/* Show success modal */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
}

/* Show toast notification */
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => {
        toast.remove();
    });
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

/* Add CSS for animations */
const connectStyles = document.createElement('style');
connectStyles.textContent = `
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        70% {
            transform: scale(1.5);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        border-left: 4px solid var(--green);
    }
    
    .toast-success {
        border-left-color: var(--green);
    }
    
    .toast-error {
        border-left-color: #ff4757;
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .toast-content i {
        font-size: 1.2rem;
    }
    
    .toast-success .toast-content i {
        color: var(--green);
    }
    
    .toast-error .toast-content i {
        color: #ff4757;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .toast-close:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #ff4757 !important;
    }
`;
document.head.appendChild(connectStyles);