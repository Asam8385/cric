// JavaScript for Gishan Balasooriya Portfolio

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Navigation Functions
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleSmoothScrolling();
        this.handleActiveLinks();
    }
    
    handleScroll() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Change navbar appearance on scroll
            if (scrollTop > 100) {
                this.navbar.classList.add('bg-white/95', 'shadow-xl');
                this.navbar.classList.remove('bg-white/90');
            } else {
                this.navbar.classList.remove('bg-white/95', 'shadow-xl');
                this.navbar.classList.add('bg-white/90');
            }
            
            // Hide/show navbar on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 500) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    handleMobileMenu() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.mobileMenu.classList.toggle('hidden');
                
                const icon = this.mobileMenuBtn.querySelector('i');
                if (this.mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            });
            
            // Close mobile menu when clicking on links
            this.mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.mobileMenu.classList.add('hidden');
                    const icon = this.mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
    }
    
    handleSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    handleActiveLinks() {
        window.addEventListener('scroll', () => {
            let currentSection = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('text-blue-600', 'font-semibold');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('text-blue-600', 'font-semibold');
                }
            });
        });
    }
}

// Cricket Animation Effects
class CricketAnimations {
    constructor() {
        this.createFloatingElements();
        this.initCricketBallAnimation();
    }
    
    createFloatingElements() {
        // Create floating cricket balls every 5 seconds
        setInterval(() => {
            this.createFloatingBall();
        }, 5000);
    }
    
    createFloatingBall() {
        const ball = document.createElement('div');
        ball.innerHTML = '🏏';
        ball.style.cssText = `
            position: fixed;
            font-size: 2rem;
            z-index: 5;
            pointer-events: none;
            opacity: 0.7;
            right: -50px;
            top: ${Math.random() * (window.innerHeight - 100)}px;
            animation: floatAcross 12s linear;
        `;
        
        document.body.appendChild(ball);
        
        setTimeout(() => {
            if (ball.parentNode) {
                ball.remove();
            }
        }, 12000);
    }
    
    initCricketBallAnimation() {
        // Add CSS animation for floating across screen
        if (!document.getElementById('cricket-animations')) {
            const style = document.createElement('style');
            style.id = 'cricket-animations';
            style.textContent = `
                @keyframes floatAcross {
                    from {
                        transform: translateX(0) rotate(0deg);
                        right: -50px;
                    }
                    to {
                        transform: translateX(-${window.innerWidth + 100}px) rotate(720deg);
                        right: -50px;
                    }
                }
                
                @keyframes explode {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.initHoverEffects();
        this.initClickEffects();
        this.initFormValidation();
        this.initParallaxEffect();
    }
    
    initHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.cricket-card, .achievement-card, .experience-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
        
        // Image hover effects
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transition = 'all 0.3s ease';
                img.style.transform = 'scale(1.05)';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = '';
            });
        });
    }
    
    initClickEffects() {
        // Add ripple effect to buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
        
        // Add ripple animation CSS
        if (!document.getElementById('ripple-animations')) {
            const style = document.createElement('style');
            style.id = 'ripple-animations';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    initFormValidation() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const nameInput = form.querySelector('input[type="text"]');
                const emailInput = form.querySelector('input[type="email"]');
                const messageInput = form.querySelector('textarea');
                
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const message = messageInput.value.trim();
                
                // Clear previous error states
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.style.borderColor = '';
                });
                
                let hasError = false;
                
                if (!name) {
                    nameInput.style.borderColor = '#ef4444';
                    hasError = true;
                }
                
                if (!email) {
                    emailInput.style.borderColor = '#ef4444';
                    hasError = true;
                } else if (!this.isValidEmail(email)) {
                    emailInput.style.borderColor = '#ef4444';
                    this.showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                if (!message) {
                    messageInput.style.borderColor = '#ef4444';
                    hasError = true;
                }
                
                if (hasError) {
                    this.showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    this.showNotification('Message sent successfully! Thank you for reaching out to Gishan.', 'success');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }
    
    initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-6 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }
}

// Sri Lankan Cultural Elements
class SriLankanElements {
    constructor() {
        this.addCulturalDecorations();
        this.initSeasonalAnimations();
    }
    
    addCulturalDecorations() {
        // Add lotus flower decoration
        const lotus = document.createElement('div');
        lotus.innerHTML = '🪷';
        lotus.className = 'lotus-animation';
        lotus.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            font-size: 2rem;
            z-index: 10;
            animation: lotus-bloom 4s ease-in-out infinite;
            cursor: pointer;
        `;
        
        lotus.addEventListener('click', () => {
            this.showCulturalMessage();
        });
        
        document.body.appendChild(lotus);
        
        // Add lotus animation
        if (!document.getElementById('lotus-animation')) {
            const style = document.createElement('style');
            style.id = 'lotus-animation';
            style.textContent = `
                @keyframes lotus-bloom {
                    0%, 100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 0.7;
                    }
                    50% {
                        transform: scale(1.2) rotate(180deg);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    showCulturalMessage() {
        const messages = [
            "🇱🇰 Proud to represent Sri Lanka in cricket!",
            "🏏 Cricket is not just a game, it's a passion in Sri Lanka",
            "🌺 From the Pearl of the Indian Ocean",
            "🦅 Soaring high like the Sri Lankan eagle"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const messageElement = document.createElement('div');
        messageElement.innerHTML = randomMessage;
        messageElement.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg shadow-2xl text-xl font-bold z-50 animate-pulse';
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
    
    initSeasonalAnimations() {
        // Add monsoon effect during certain months
        const now = new Date();
        const month = now.getMonth();
        
        // Monsoon season (May to September)
        if (month >= 4 && month <= 8) {
            this.addMonsoonEffect();
        }
        
        // New Year season (April)
        if (month === 3) {
            this.addNewYearDecorations();
        }
    }
    
    addMonsoonEffect() {
        // Subtle rain animation
        setInterval(() => {
            const rainDrop = document.createElement('div');
            rainDrop.innerHTML = '💧';
            rainDrop.style.cssText = `
                position: fixed;
                font-size: 1rem;
                z-index: 1;
                pointer-events: none;
                opacity: 0.3;
                left: ${Math.random() * window.innerWidth}px;
                top: -20px;
                animation: rainFall 3s linear;
            `;
            
            document.body.appendChild(rainDrop);
            
            setTimeout(() => {
                if (rainDrop.parentNode) {
                    rainDrop.remove();
                }
            }, 3000);
        }, 2000);
        
        // Add rain animation
        if (!document.getElementById('rain-animation')) {
            const style = document.createElement('style');
            style.id = 'rain-animation';
            style.textContent = `
                @keyframes rainFall {
                    to {
                        transform: translateY(${window.innerHeight + 50}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    addNewYearDecorations() {
        // Add Avurudu decorations
        const decorations = ['🎉', '🪔', '🌸', '🥥', '🍃'];
        
        decorations.forEach((decoration, index) => {
            setTimeout(() => {
                const element = document.createElement('div');
                element.innerHTML = decoration;
                element.style.cssText = `
                    position: fixed;
                    font-size: 1.5rem;
                    z-index: 5;
                    pointer-events: none;
                    opacity: 0.8;
                    right: ${20 + (index * 50)}px;
                    top: 100px;
                    animation: bounce 2s ease-in-out infinite;
                    animation-delay: ${index * 0.2}s;
                `;
                
                document.body.appendChild(element);
            }, index * 500);
        });
    }
}

// Performance and Optimization
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initImageOptimization();
        this.initScrollThrottling();
    }
    
    initLazyLoading() {
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        }
    }
    
    initImageOptimization() {
        document.querySelectorAll('img').forEach(img => {
            img.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
            
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.filter = 'blur(0)';
            });
            
            img.addEventListener('error', () => {
                img.style.opacity = '1';
                img.style.filter = 'blur(0)';
                img.alt = 'Image not available';
                // Use a placeholder if image fails to load
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdpc2hhbiBCYWxhc29vcml5YTwvdGV4dD48L3N2Zz4=';
            });
        });
    }
    
    initScrollThrottling() {
        let scrollTimer = null;
        
        const throttledScroll = () => {
            if (scrollTimer !== null) {
                clearTimeout(scrollTimer);
            }
            
            scrollTimer = setTimeout(() => {
                // Dispatch custom scroll event for heavy operations
                window.dispatchEvent(new CustomEvent('throttledScroll'));
            }, 16); // ~60fps
        };
        
        window.addEventListener('scroll', throttledScroll);
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new Navigation();
    new CricketAnimations();
    new InteractiveElements();
    new SriLankanElements();
    new PerformanceOptimizer();
    
    // Add loading completion effect
    document.body.classList.add('loaded');
    
    // Show welcome message
    setTimeout(() => {
        console.log('🏏 Welcome to Gishan Balasooriya\'s Portfolio! 🇱🇰');
        console.log('Cricket Captain | Future Business Leader | Sri Lankan Pride');
    }, 1000);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '🏏 Come back to see Gishan\'s journey!';
    } else {
        document.title = 'Gishan Balasooriya - Passionate Cricketer & Future Business Leader';
    }
});

// Add smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // Gracefully handle errors without breaking the user experience
});

// Responsive font sizing
function adjustFontSize() {
    const width = window.innerWidth;
    const root = document.documentElement;
    
    if (width < 640) {
        root.style.fontSize = '14px';
    } else if (width < 768) {
        root.style.fontSize = '15px';
    } else {
        root.style.fontSize = '16px';
    }
}

window.addEventListener('resize', adjustFontSize);
adjustFontSize(); // Initial call