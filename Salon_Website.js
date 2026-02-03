// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================

// Navigation scroll effect
const nav = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Navigation links - smooth scroll
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            const mobileNav = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav')) {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// Animate service cards
const serviceCards = document.querySelectorAll('.service-card');

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.index) * 100;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            serviceObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    serviceObserver.observe(card);
});

// Animate gallery items
const galleryItems = document.querySelectorAll('.gallery-item');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.index) * 100;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            galleryObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

galleryItems.forEach(item => {
    galleryObserver.observe(item);
});

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Show success message
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Request Sent!';
    submitButton.style.background = 'var(--color-black)';
    submitButton.style.color = 'var(--color-white)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        submitButton.style.color = '';
    }, 3000);
});

// Floating label effect for form inputs
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    
    if (input) {
        // Handle placeholder for floating labels
        input.setAttribute('placeholder', ' ');
        
        // Handle select dropdown
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        }
    }
});

// ============================================
// CURSOR EFFECT (DESKTOP ONLY)
// ============================================

if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
        }
        
        .custom-cursor.active {
            opacity: 1;
        }
        
        .custom-cursor.hover {
            transform: scale(1.5);
            background: rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
    
    // Smooth cursor movement
    function animateCursor() {
        const speed = 0.2;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================

const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
    }
});

// ============================================
// VIDEO HANDLING
// ============================================

const video = document.querySelector('.video-background video');

// Ensure video plays on mobile devices
if (video) {
    video.play().catch(error => {
        console.log('Video autoplay prevented:', error);
    });
    
    // Pause video when not in viewport (performance optimization)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });
    
    videoObserver.observe(video);
}

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================

const statNumbers = document.querySelectorAll('.stat-number');

const countUp = (element, target) => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        const formatted = Math.floor(current).toString();
        element.textContent = formatted.includes('+') ? formatted : formatted + (target.toString().includes('+') ? '+' : '');
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.textContent.replace('+', '');
            const hasPlus = entry.target.textContent.includes('+');
            entry.target.textContent = '0';
            countUp(entry.target, parseInt(target));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-dependent animations here
    });
});

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroLines = document.querySelectorAll('.hero-title .line');
    heroLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ============================================
// CTA BUTTON INTERACTIONS
// ============================================

const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        const rippleStyle = document.createElement('style');
        rippleStyle.innerHTML = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('style[data-ripple]')) {
            rippleStyle.setAttribute('data-ripple', 'true');
            document.head.appendChild(rippleStyle);
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to content';
skipLink.className = 'skip-link';

const skipStyle = document.createElement('style');
skipStyle.innerHTML = `
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-white);
        color: var(--color-black);
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
    }
    
    .skip-link:focus {
        top: 0;
    }
`;
document.head.appendChild(skipStyle);
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

console.log('🎨 Atelier Noir - Website loaded successfully');
