// DOM Elements
const pageLoader = document.querySelector('.page-loader');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.querySelector('.theme-toggle');
const mouseBlob = document.querySelector('.mouse-blob');
const toastContainer = document.querySelector('.toast-container');

// Make sure the about content is visible when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Force the about content to be visible
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '1';
        aboutContent.style.transform = 'translateY(0)';
    }
    
    // Same for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Same for skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Same for contact container
    const contactContainer = document.querySelector('.contact-container');
    if (contactContainer) {
        contactContainer.style.opacity = '1';
        contactContainer.style.transform = 'translateY(0)';
    }
    
    // Rest of initialization
    addDoodles();
    
    // Initial check for active link
    highlightActiveLink();
    
    // Refresh doodles on window resize
    window.addEventListener('resize', addDoodles);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize floating elements animation
    document.querySelectorAll('.floating-element').forEach((element, i) => {
        // Random initial position for more natural movement
        element.style.transform = `translateY(${Math.random() * 10}px)`;
        
        // Set different animation delays for each element
        element.style.animationDelay = `${i * 0.2}s`;
    });
});

// Page Loader
window.addEventListener('load', () => {
    // Simulate loading progress
    const loaderProgress = document.querySelector('.loader-progress');
    if (!loaderProgress) return;
    
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 10;
        if (width > 100) {
            width = 100;
            clearInterval(interval);
            
            // After progress reaches 100%, hide the loader
            setTimeout(() => {
                pageLoader.classList.add('loaded');
                document.body.classList.add('loaded');
                
                // Initialize animations after loader is hidden
                initAnimations();
            }, 500);
        }
        loaderProgress.style.width = width + '%';
    }, 150);
});

// Theme Toggle
let darkMode = localStorage.getItem('darkMode') === 'true';
if (darkMode) {
    document.body.classList.add('dark-mode');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode);
        
        const icon = themeToggle.querySelector('i');
        if (darkMode) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Show toast notification
        showToast('Theme changed!', darkMode ? 'dark' : 'light');
    });
}

// Mouse blob effect
if (mouseBlob) {
    document.addEventListener('mousemove', (e) => {
        mouseBlob.style.left = e.clientX + 'px';
        mouseBlob.style.top = e.clientY + 'px';
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlight
    highlightActiveLink();
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Highlight active navigation link based on scroll position
function highlightActiveLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter button
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter the project cards with animation
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Show toast notification
        showToast(`Filtered by ${filterValue === 'all' ? 'all projects' : filterValue}`, 'info');
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show a success message and reset the form
        showToast('Your message has been sent successfully!', 'success');
        contactForm.reset();
    });
}

// Toast notification function
function showToast(message, type = 'info') {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    let icon;
    switch (type) {
        case 'success': icon = 'fa-check-circle'; break;
        case 'error': icon = 'fa-exclamation-circle'; break;
        case 'warning': icon = 'fa-exclamation-triangle'; break;
        case 'dark': icon = 'fa-moon'; break;
        case 'light': icon = 'fa-sun'; break;
        default: icon = 'fa-info-circle';
    }
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Setup close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Add doodles to background
function addDoodles() {
    const doodlesContainer = document.querySelector('.doodles');
    if (!doodlesContainer) return;
    
    const doodleCount = window.innerWidth < 768 ? 10 : 20;
    
    const doodleTypes = [
        'circle', 'square', 'triangle', 'zigzag', 'star', 
        'spiral', 'wave', 'heart', 'diamond', 'cloud'
    ];
    
    doodlesContainer.innerHTML = '';
    
    for (let i = 0; i < doodleCount; i++) {
        const doodle = document.createElement('div');
        doodle.className = 'doodle';
        
        // Random type
        const type = doodleTypes[Math.floor(Math.random() * doodleTypes.length)];
        doodle.classList.add(`doodle-${type}`);
        
        // Random position
        doodle.style.left = `${Math.random() * 100}%`;
        doodle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = 15 + Math.random() * 30;
        doodle.style.width = `${size}px`;
        doodle.style.height = `${size}px`;
        
        // Random rotation
        doodle.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random opacity
        doodle.style.opacity = 0.1 + Math.random() * 0.3;
        
        // Random animation delay
        doodle.style.animationDelay = `${Math.random() * 5}s`;
        
        doodlesContainer.appendChild(doodle);
    }
}

// Initialize GSAP animations
function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate skill cards
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                x: i % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
            
            // Animate skill bars when they come into view
            const skillBars = card.querySelectorAll('.skill-level');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        });
        
        // Animate tech icons
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach((icon, i) => {
            gsap.from(icon, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: '.tech-stack',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate contact items
        gsap.utils.toArray('.contact-item').forEach((item, i) => {
            gsap.from(item, {
                x: -50,
                opacity: 0,
                duration: 0.7,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate form elements
        gsap.utils.toArray('.form-group').forEach((group, i) => {
            gsap.from(group, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                delay: 0.2 + (i * 0.1),
                scrollTrigger: {
                    trigger: '.contact-form',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
} 