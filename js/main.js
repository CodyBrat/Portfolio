// Cursor follower
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
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
`;
document.head.appendChild(style);

// Add pixel animation effect
function createPixel() {
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

setInterval(createPixel, 2000);

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