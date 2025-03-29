// Background parallax effect
const parallaxBackground = document.querySelector('.parallax-background');
const gradientOrbs = document.querySelectorAll('.gradient-orb');
let isParallaxSupported = window.innerWidth > 768;

// Disable parallax on mobile devices for performance
function checkParallaxSupport() {
    isParallaxSupported = window.innerWidth > 768 && 
                         !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

// Run check on load and resize
window.addEventListener('load', checkParallaxSupport);
window.addEventListener('resize', checkParallaxSupport);

// Optimized parallax effect with debounce and requestAnimationFrame
let ticking = false;
document.addEventListener('mousemove', (e) => {
    if (!isParallaxSupported || !parallaxBackground) return;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            // Subtle movement for the background
            parallaxBackground.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            
            // Different movement amounts for each orb to create depth
            if (gradientOrbs.length > 0) {
                gradientOrbs[0].style.transform = `translate(${x * -30}px, ${y * -30}px)`;
                if (gradientOrbs[1]) gradientOrbs[1].style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                if (gradientOrbs[2]) gradientOrbs[2].style.transform = `translate(${x * -10}px, ${y * -10}px)`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Cursor follower with device detection
const cursor = document.querySelector('.cursor-follower');
let isMobile = false;

// Detect mobile devices
function detectMobile() {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Hide cursor follower on mobile
    if (isMobile && cursor) {
        cursor.style.display = 'none';
    } else if (cursor) {
        cursor.style.display = 'block';
    }
}

// Run detection on load and resize
window.addEventListener('load', detectMobile);
window.addEventListener('resize', detectMobile);

// Set dark theme as default
document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.setAttribute('data-theme', 'dark');
});

// Only track mouse on desktop
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        if (!isMobile) {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        }
    });
}

// Touch events for mobile navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    
    link.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    });
});

// Project data
const projects = [
    {
        title: 'Project 1',
        description: 'A creative web application',
        image: 'path/to/image1.jpg',
        tags: ['HTML', 'CSS', 'JavaScript']
    },
    {
        title: 'Project 2',
        description: 'Interactive experience',
        image: 'path/to/image2.jpg',
        tags: ['React', 'Three.js']
    },
    {
        title: 'Project 3',
        description: 'Mobile application',
        image: 'path/to/image3.jpg',
        tags: ['React Native', 'Node.js']
    }
];

// Populate projects grid
const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) {
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-card');
        projectElement.innerHTML = `
            <div class="project-image" style="background-color: var(--primary-color); height: 200px;"></div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(projectElement);
    });
}

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.pixel-nav');
    
    if (!nav) return;
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('mobile-menu-toggle');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Add to navigation
        nav.appendChild(menuToggle);
        
        // Add event listener
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-menu-open');
            
            // Change icon based on state
            if (nav.classList.contains('mobile-menu-open')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('mobile-menu-open');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
};

// Initialize mobile menu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling with touch support
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Add active class to form elements on focus
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Focus events
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('input-focused');
            }
        });
        
        // For touch devices
        input.addEventListener('touchstart', () => {
            input.parentElement.classList.add('touch-active');
        });
        
        input.addEventListener('touchend', () => {
            input.parentElement.classList.remove('touch-active');
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Message sent successfully!');
        contactForm.reset();
        
        // Reset active states
        formInputs.forEach(input => {
            input.parentElement.classList.remove('input-focused');
        });
    });
}

// Lazy loading for images
const lazyLoadImages = () => {
    // Get all lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    // For project images, load them immediately
    const projectImages = document.querySelectorAll('.project-img[data-src]');
    projectImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
    });
    
    // For other images, use Intersection Observer if available
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imgObserver.unobserve(img);
                }
            });
        });
        
        // Observe all non-project images with data-src attribute
        document.querySelectorAll('img[data-src]:not(.project-img)').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
};

// Run lazy loading on page load
window.addEventListener('load', lazyLoadImages);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Touch active states */
    .touch-active {
        opacity: 0.7;
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .pixel-nav {
            padding: 0.5rem;
        }
        
        .pixel-nav .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: rgba(30, 30, 40, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-radius: 0 0 20px 20px;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: -1;
        }
        
        .pixel-nav.mobile-menu-open .nav-links {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: transparent;
            border: none;
            color: var(--text-color);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Add pixel animation effect based on device capability
function createPixel() {
    // Skip on mobile to improve performance
    if (isMobile) return;
    
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.left = Math.random() * window.innerWidth + 'px';
    pixel.style.top = -20 + 'px';
    pixel.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(pixel);

    pixel.addEventListener('animationend', () => {
        pixel.remove();
    });
}

// Reduce frequency on mobile
const pixelInterval = isMobile ? 5000 : 2000;
setInterval(createPixel, pixelInterval);

// Optimize animations for battery and performance
function optimizeForPerformance() {
    if (isMobile) {
        // Reduce animations on mobile
        document.body.classList.add('reduced-motion');
        
        // Add CSS for reduced motion
        const performanceStyles = document.createElement('style');
        performanceStyles.textContent = `
            .reduced-motion * {
                transition-duration: 0.3s !important;
                animation-duration: 0.3s !important;
            }
            
            .reduced-motion .floating-element,
            .reduced-motion .section-shape,
            .reduced-motion .tech-circle {
                animation: none !important;
            }
        `;
        document.head.appendChild(performanceStyles);
    }
}

// Run optimization on page load
window.addEventListener('load', optimizeForPerformance);

// Game Variables
let score = 0;
let level = 1;
let isGameStarted = false;
let character = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 100,
    speed: 5,
    jumpForce: 15,
    isJumping: false
};

// Game Elements
const gameCharacter = document.querySelector('.game-character');
const characterSprite = document.querySelector('.character-sprite');
const coins = document.querySelectorAll('.collectible');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');

// Game Controls
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isGameStarted) {
        startGame();
    }
    if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        keys[e.code] = true;
        if (e.code !== 'Space') {
            characterSprite.classList.add('running');
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        keys[e.code] = false;
        if (e.code !== 'Space') {
            characterSprite.classList.remove('running');
        }
    }
});

function startGame() {
    isGameStarted = true;
    document.querySelector('.pixel-text').style.display = 'none';
    gameLoop();
}

function gameLoop() {
    if (!isGameStarted) return;

    // Character Movement
    if (keys.ArrowLeft && character.x > 0) {
        character.x -= character.speed;
        gameCharacter.style.transform = 'translateX(-50%) scaleX(-1)';
    }
    if (keys.ArrowRight && character.x < window.innerWidth) {
        character.x += character.speed;
        gameCharacter.style.transform = 'translateX(-50%) scaleX(1)';
    }
    if (keys.Space && !character.isJumping) {
        jump();
    }

    // Update character position
    gameCharacter.style.left = `${character.x}px`;
    gameCharacter.style.bottom = `${character.y}px`;

    // Collect coins
    coins.forEach(coin => {
        if (!coin.classList.contains('collected')) {
            const coinRect = coin.getBoundingClientRect();
            const characterRect = gameCharacter.getBoundingClientRect();

            if (isColliding(coinRect, characterRect)) {
                collectCoin(coin);
            }
        }
    });

    requestAnimationFrame(gameLoop);
}

function jump() {
    if (character.isJumping) return;
    
    character.isJumping = true;
    characterSprite.classList.add('jumping');
    
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight < 100) {
            character.y += character.jumpForce;
            jumpHeight += character.jumpForce;
        } else {
            clearInterval(jumpInterval);
            fall();
        }
    }, 20);
}

function fall() {
    const fallInterval = setInterval(() => {
        if (character.y > window.innerHeight - 100) {
            character.y = window.innerHeight - 100;
            character.isJumping = false;
            characterSprite.classList.remove('jumping');
            clearInterval(fallInterval);
        } else {
            character.y -= character.jumpForce;
        }
    }, 20);
}

function collectCoin(coin) {
    coin.classList.add('collected');
    score += 10;
    scoreElement.textContent = score;
    
    if (score % 30 === 0) {
        levelUp();
    }

    // Particle effect
    createParticles(coin.getBoundingClientRect());
}

function levelUp() {
    level++;
    levelElement.textContent = level;
    character.speed += 1;
    
    // Visual feedback
    const levelUpText = document.createElement('div');
    levelUpText.className = 'level-up-text';
    levelUpText.textContent = 'LEVEL UP!';
    document.body.appendChild(levelUpText);
    
    setTimeout(() => {
        levelUpText.remove();
    }, 2000);
}

function createParticles(position) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${position.left + position.width / 2}px`;
        particle.style.top = `${position.top + position.height / 2}px`;
        particle.style.setProperty('--angle', `${i * 72}deg`);
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Add particle styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--secondary-color);
        animation: particleAnim 1s ease-out forwards;
    }

    @keyframes particleAnim {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(cos(var(--angle)) * 50px), calc(sin(var(--angle)) * 50px));
            opacity: 0;
        }
    }

    .level-up-text {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--secondary-color);
        font-size: 2rem;
        animation: levelUpAnim 2s ease-out forwards;
        z-index: 1000;
    }

    @keyframes levelUpAnim {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Animate stats counter when in view
function animateCounters() {
    const statsSection = document.querySelector('.skills-stats');
    if (!statsSection) return;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                
                statNumbers.forEach(counter => {
                    counter.classList.add('count-animation');
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    
                    // Start from 0 or a percentage of the target for larger numbers
                    let start = target > 100 ? Math.floor(target * 0.7) : 0;
                    const increment = (target - start) / (duration / 16); // 60fps
                    
                    const updateCounter = () => {
                        const current = parseFloat(counter.innerText);
                        const nextValue = Math.ceil(current + increment);
                        
                        if (nextValue <= target) {
                            counter.innerText = nextValue + (counter.innerText.includes('+') ? '+' : '');
                            setTimeout(updateCounter, 16);
                        } else {
                            counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
                        }
                    };
                    
                    counter.innerText = start + (counter.innerText.includes('+') ? '+' : '');
                    setTimeout(updateCounter, 16);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

// Animate skills level bars
function animateSkillBars() {
    const skillsSection = document.querySelector('.skills-cards');
    if (!skillsSection) return;
    
    const levelFills = document.querySelectorAll('.level-fill');
    let animated = false;
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                
                levelFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 200);
                });
                
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillsObserver.observe(skillsSection);
}

// Initialize animations when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    animateSkillBars();
});

// Project cards animations and interactions
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    if (!projectCards.length) return;
    
    // Optimize by checking device capabilities first
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    // Animate project stats with throttling
    const statValues = document.querySelectorAll('.stat-value');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats with reduced complexity on low-end devices
                statValues.forEach(statValue => {
                    const value = statValue.innerText;
                    const isPlus = value.includes('+');
                    const numValue = parseFloat(value.replace('+', ''));
                    
                    // Use fewer steps for animation on low-end devices
                    const steps = isLowEndDevice ? 10 : 40;
                    
                    // Start from 0 and count up
                    let currentValue = 0;
                    const increment = numValue / steps;
                    
                    const counter = setInterval(() => {
                        if (currentValue >= numValue) {
                            clearInterval(counter);
                            statValue.innerText = value; // Set back to original formatted value
                        } else {
                            currentValue += increment;
                            statValue.innerText = Math.floor(currentValue) + (isPlus ? '+' : '');
                        }
                    }, isLowEndDevice ? 50 : 30); // Slower interval for low-end devices
                });
                
                statObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    
    // Observe any stat item to trigger animation
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length) {
        statObserver.observe(statItems[0]);
    }
    
    // Skip complex animations entirely if preferred-reduced-motion is set
    if (isReducedMotion) {
        return;
    }
    
    // Performance optimization: use a debounce for mouse move
    let ticking = false;
    
    // Project cards hover effects - simplified for better performance
    projectCards.forEach(card => {
        // Cache DOM queries outside event handlers
        const highlight = card.querySelector('.project-highlight');
        const category = card.querySelector('.project-category');
        const title = card.querySelector('.project-title');
        const tags = card.querySelector('.project-tags');
        const buttons = card.querySelectorAll('.project-btn');
        
        // Add a simplified 3D tilt effect on mouse move
        card.addEventListener('mousemove', e => {
            if (isMobile || isLowEndDevice) return; // Skip on mobile or low-end devices
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Calculate rotation based on mouse position - reduced effect
                    const tiltX = (y / rect.height - 0.5) * 5; // 5 degrees max tilt (reduced from 10)
                    const tiltY = (0.5 - x / rect.width) * 5;
                    
                    // Apply the 3D tilt effect with simplified transform
                    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
                    
                    // Update highlight position
                    if (highlight) {
                        highlight.style.setProperty('--x', `${(x / rect.width) * 100}%`);
                        highlight.style.setProperty('--y', `${(y / rect.height) * 100}%`);
                        highlight.style.opacity = '1';
                    }
                    
                    // Only apply simple transforms to improve performance
                    if (category) category.style.transform = `translateZ(30px)`;
                    if (title) title.style.transform = `translateZ(20px)`;
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
        
        // Reset the card when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            
            // Reset highlight
            if (highlight) {
                highlight.style.opacity = '0';
            }
            
            // Reset all transformed elements
            if (category) category.style.transform = '';
            if (title) title.style.transform = '';
            if (tags) tags.style.transform = '';
            buttons.forEach(btn => btn.style.transform = '');
        });
    });
}

// Initialize project section enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Detect device capabilities
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    setupProjectCards();
    
    // Make sure lazy loading is initialized
    lazyLoadImages();
    
    // Target all project section animations to activate when scrolled into view
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        const projectCards = projectsSection.querySelectorAll('.project-card');
        
        const projectsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Add staggered animation classes to each card, but with fewer cards animated simultaneously
                const batchSize = isLowEndDevice ? 2 : 4;
                
                // Process cards in batches for smoother performance
                for (let i = 0; i < projectCards.length; i++) {
                    const batchIndex = Math.floor(i / batchSize);
                    setTimeout(() => {
                        projectCards[i].classList.add('card-appear');
                    }, 150 * batchIndex); // Longer delay between batches
                }
                
                projectsObserver.unobserve(projectsSection);
            }
        }, { threshold: 0.1 });
        
        projectsObserver.observe(projectsSection);
        
        // Simplified animation styles
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            .project-card {
                opacity: 0;
                transform: translateY(20px);
                will-change: transform, opacity;
            }
            
            .card-appear {
                animation: cardAppear 0.5s ease-out forwards;
            }
            
            @keyframes cardAppear {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(animationStyles);
    }
}); 