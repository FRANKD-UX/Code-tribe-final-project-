// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    setActiveNavLink();
    
    // FAQ functionality
    initFAQ();
    
    // Event card hover effects
    initEventCards();
    
    // Signup button functionality
    initSignupButton();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Mobile menu handling
    initMobileMenu();
    
    // Add scroll animations
    initScrollAnimations();
});

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'Home.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Toggle active class on the answer
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
}

/**
 * Initialize event card hover effects
 */
function initEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const week = this.getAttribute('data-week');
            highlightWeek(week);
        });
        
        card.addEventListener('mouseleave', function() {
            resetWeekHighlights();
        });
    });
}

/**
 * Highlight a specific week
 * @param {string} week - The week number to highlight
 */
function highlightWeek(week) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        if (card.getAttribute('data-week') === week) {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            card.style.borderLeftWidth = '8px';
        } else {
            card.style.opacity = '0.7';
        }
    });
}

/**
 * Reset all week highlights
 */
function resetWeekHighlights() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.boxShadow = '';
        card.style.borderLeftWidth = '';
    });
}

/**
 * Initialize signup button functionality
 */
function initSignupButton() {
    const signupBtn = document.getElementById('signupButton');
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            // Show modal or form for signup
            showSignupModal();
        });
    }
}

/**
 * Show signup modal
 */
function showSignupModal() {
    // Check if modal already exists
    let modal = document.getElementById('signupModal');
    
    if (!modal) {
        // Create modal if it doesn't exist
        modal = document.createElement('div');
        modal.id = 'signupModal';
        modal.className = 'modal';
        
        const modalContent = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Join Our Community</h2>
                <form id="signupForm">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    <button type="submit" class="signup-btn">Subscribe Now</button>
                </form>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1001;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal.show {
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 1;
            }
            
            .modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                position: relative;
                width: 90%;
                max-width: 500px;
                transform: translateY(-50px);
                transition: transform 0.3s ease;
            }
            
            .modal.show .modal-content {
                transform: translateY(0);
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #777;
            }
            
            .close-modal:hover {
                color: #333;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }
            
            .form-group input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 16px;
            }
            
            .form-group input:focus {
                border-color: #0e8c88;
                outline: none;
                box-shadow: 0 0 0 2px rgba(14, 140, 136, 0.2);
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            closeModal();
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Form submission
        const form = modal.querySelector('#signupForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Process form (simulated)
            submitSignupForm(name, email);
            
            // Close modal
            closeModal();
            
            // Show thank you message
            showThankYouMessage(name);
        });
    }
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Close the signup modal
 */
function closeModal() {
    const modal = document.getElementById('signupModal');
    
    if (modal) {
        modal.classList.remove('show');
        
        // Remove modal after animation completes
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
    }
}

/**
 * Submit signup form data (simulated)
 * @param {string} name - User's name
 * @param {string} email - User's email
 */
function submitSignupForm(name, email) {
    console.log(`Signup submitted: ${name}, ${email}`);
    // In a real application, this would send data to a server
}

/**
 * Show thank you message after form submission
 * @param {string} name - User's name
 */
function showThankYouMessage(name) {
    const thankYou = document.createElement('div');
    thankYou.className = 'thank-you-message';
    thankYou.innerHTML = `
        <div class="thank-you-content">
            <h3>Thank You, ${name}!</h3>
            <p>Your subscription has been confirmed. Look out for our welcome email in your inbox.</p>
            <button class="close-thank-you">Close</button>
        </div>
    `;
    
    document.body.appendChild(thankYou);
    
    // Add styles for thank you message
    const style = document.createElement('style');
    style.textContent = `
        .thank-you-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1002;
            max-width: 300px;
            animation: slideIn 0.5s ease;
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
        
        .thank-you-content h3 {
            color: #0e8c88;
            margin-bottom: 10px;
        }
        
        .close-thank-you {
            display: block;
            margin-top: 15px;
            padding: 8px 15px;
            background-color: #0e8c88;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .close-thank-you:hover {
            background-color: #34c0ba;
        }
    `;
    document.head.appendChild(style);
    
    // Close button functionality
    const closeBtn = thankYou.querySelector('.close-thank-you');
    closeBtn.addEventListener('click', () => {
        if (thankYou.parentNode) {
            thankYou.parentNode.removeChild(thankYou);
        }
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (thankYou.parentNode) {
            thankYou.parentNode.removeChild(thankYou);
        }
    }, 5000);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                const sidebarActive = document.getElementById('sidebar-active');
                if (sidebarActive && sidebarActive.checked) {
                    sidebarActive.checked = false;
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('sidebar-active');
    const body = document.body;
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('change', function() {
            if (this.checked) {
                body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                body.style.overflow = ''; // Re-enable scrolling when menu is closed
            }
        });
        
        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.links-container a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.checked = false;
                body.style.overflow = '';
            });
        });
    }
}

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
    // Add animation classes to elements as they come into view
    const animateElements = document.querySelectorAll('.card, .resource-card, .testimonial, .faq-item');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.2 // Element must be 20% visible to trigger
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .card, .resource-card, .testimonial, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .card.animate, .resource-card.animate, .testimonial.animate, .faq-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Observe elements
    animateElements.forEach(element => {
        observer.observe(element);
    });
}