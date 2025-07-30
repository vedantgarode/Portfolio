// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initTypingAnimation();
    initProjectInteractions();
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initActionButtons();
    addInteractiveElements();
    initResponsiveAdjustments();
    initAnimatedBackgrounds();
});

// Initialize animated backgrounds for each section
function initAnimatedBackgrounds() {
    initParticlesBackground();
    initMatrixBackground();
    initGridBackground();
    initCircuitBackground();
    initNetworkBackground();
}

// Geometric Particles Background for Hero Section
function initParticlesBackground() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let connections = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 15000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(50, 184, 205, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        ctx.fillStyle = 'rgba(50, 184, 205, 0.6)';
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Matrix Background for About Section
function initMatrixBackground() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let columns = [];
    let fontSize = 14;
    let drops = [];
    
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(50, 184, 205, 0.1)';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            ctx.fillText(text, i * fontSize, drops[i]);
            
            if (drops[i] > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += fontSize;
        }
    }
    
    function animate() {
        drawMatrix();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Grid Background for Experience Section
function initGridBackground() {
    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let dots = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        createDots();
    }
    
    function createDots() {
        dots = [];
        const spacing = 40;
        
        for (let x = 0; x < canvas.width; x += spacing) {
            for (let y = 0; y < canvas.height; y += spacing) {
                dots.push({
                    x: x,
                    y: y,
                    originalX: x,
                    originalY: y,
                    size: Math.random() * 2 + 1,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.pulse += 0.02;
            dot.size = 1 + Math.sin(dot.pulse) * 0.5;
        });
    }
    
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(50, 184, 205, 0.05)';
        ctx.lineWidth = 1;
        
        const spacing = 40;
        for (let x = 0; x < canvas.width; x += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += spacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Draw moving dots
        ctx.fillStyle = 'rgba(50, 184, 205, 0.3)';
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function animate() {
        updateDots();
        drawGrid();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Circuit Background for Projects Section
function initCircuitBackground() {
    const canvas = document.getElementById('circuit-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let circuits = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        createCircuits();
    }
    
    function createCircuits() {
        circuits = [];
        const circuitCount = 8;
        
        for (let i = 0; i < circuitCount; i++) {
            circuits.push({
                startX: Math.random() * canvas.width,
                startY: Math.random() * canvas.height,
                endX: Math.random() * canvas.width,
                endY: Math.random() * canvas.height,
                progress: 0,
                speed: Math.random() * 0.005 + 0.001,
                brightness: Math.random() * 0.3 + 0.1
            });
        }
    }
    
    function updateCircuits() {
        circuits.forEach(circuit => {
            circuit.progress += circuit.speed;
            if (circuit.progress > 1) {
                circuit.progress = 0;
                circuit.startX = Math.random() * canvas.width;
                circuit.startY = Math.random() * canvas.height;
                circuit.endX = Math.random() * canvas.width;
                circuit.endY = Math.random() * canvas.height;
            }
        });
    }
    
    function drawCircuits() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        circuits.forEach(circuit => {
            const currentX = circuit.startX + (circuit.endX - circuit.startX) * circuit.progress;
            const currentY = circuit.startY + (circuit.endY - circuit.startY) * circuit.progress;
            
            // Draw circuit path
            ctx.strokeStyle = `rgba(50, 184, 205, ${circuit.brightness * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(circuit.startX, circuit.startY);
            ctx.lineTo(circuit.endX, circuit.endY);
            ctx.stroke();
            
            // Draw moving light
            ctx.fillStyle = `rgba(50, 184, 205, ${circuit.brightness})`;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw glow
            ctx.shadowColor = 'rgba(50, 184, 205, 0.5)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }
    
    function animate() {
        updateCircuits();
        drawCircuits();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Network Background for Contact Section
function initNetworkBackground() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let nodes = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        createNodes();
    }
    
    function createNodes() {
        nodes = [];
        const nodeCount = Math.min(20, Math.floor(canvas.width * canvas.height / 25000));
        
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 3 + 2,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    function updateNodes() {
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            node.pulse += node.pulseSpeed;
            
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });
    }
    
    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(50, 184, 205, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (150 - distance) / 150 * 0.2;
                    ctx.strokeStyle = `rgba(50, 184, 205, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        nodes.forEach(node => {
            const pulseSize = node.size + Math.sin(node.pulse) * 1;
            const opacity = 0.4 + Math.sin(node.pulse) * 0.2;
            
            ctx.fillStyle = `rgba(50, 184, 205, ${opacity})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw glow
            ctx.shadowColor = 'rgba(50, 184, 205, 0.3)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseSize * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }
    
    function animate() {
        updateNodes();
        drawNetwork();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active navigation link based on scroll position
    function updateActiveLink() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveLink, 10);
    });
    
    updateActiveLink(); // Initial call
}

// Scroll-triggered animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.skill-item, .tech-tag, .cert-card, .project-card, .education-card, .summary-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animationDelay = `${index * 0.1}s`;
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.reveal-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Add CSS for animate-in class
    if (!document.querySelector('#animate-in-styles')) {
        const style = document.createElement('style');
        style.id = 'animate-in-styles';
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.6s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fixed typing animation for hero text
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text') || 'Vedant Garode';
    const speed = 150; // typing speed in milliseconds
    
    let index = 0;
    let isComplete = false;
    
    // Clear initial text and start with empty content
    typingElement.textContent = '';
    
    function typeWriter() {
        if (isComplete) return;
        
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Animation complete
            isComplete = true;
            // Keep the cursor blinking
            setTimeout(() => {
                // Add completed class to potentially modify cursor behavior
                typingElement.classList.add('typing-completed');
            }, 2000);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
}

// Enhanced project card interactions - FIXED
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click event for modal
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Show project details modal with delay
            setTimeout(() => {
                showProjectModal(this);
            }, 150);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(50, 184, 205, 0.4);
        transform: translate(-50%, -50%);
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
    
    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 20px;
                    height: 20px;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show project details modal - ENHANCED
function showProjectModal(projectCard) {
    const projectTitle = projectCard.querySelector('h3').textContent;
    const projectDescription = projectCard.querySelector('p:not(.project-duration)').textContent;
    const projectDuration = projectCard.querySelector('.project-duration')?.textContent || '';
    const techTags = Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${projectTitle}</h2>
                <button class="modal-close" aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-body">
                <p class="project-duration">${projectDuration}</p>
                <p>${projectDescription}</p>
                <div class="project-tech">
                    ${techTags.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles if not exists
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                animation: modalFadeIn 0.3s ease;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: var(--color-surface);
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                border: 1px solid var(--color-card-border);
                animation: modalSlideIn 0.3s ease;
                position: relative;
                z-index: 1;
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--color-card-border);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h2 {
                margin: 0;
                color: var(--color-text);
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--color-text-secondary);
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: var(--color-secondary);
                color: var(--color-text);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .modal-body .project-duration {
                color: var(--color-text-muted);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .modal-body p {
                color: var(--color-text-secondary);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .modal-body .project-tech {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes modalFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    margin: 1rem;
                    max-height: 90vh;
                }
                
                .modal-header,
                .modal-body {
                    padding: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'modalFadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
                document.body.style.overflow = ''; // Restore scrolling
            }
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Enhanced mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.pageYOffset;
    
    function handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Navbar background and visibility effects
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar on scroll down, show on scroll up (mobile optimization)
            if (window.innerWidth <= 768) {
                if (scrollY > lastScrollY && scrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
        }
        
        // Update scroll progress
        updateScrollProgress();
        
        // Update back to top button
        updateBackToTopButton();
        
        lastScrollY = scrollY;
    }
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${scrollPercent}%`;
    }
    
    function updateBackToTopButton() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Initial call
    handleScroll();
}

// Fixed action buttons to navigate to correct sections
function initActionButtons() {
    const viewProjectsBtn = document.querySelector('a[href="#projects"]');
    const getInTouchBtn = document.querySelector('a[href="#contact"]');
    
    // Ensure "View Projects" button goes to projects section
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = projectsSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Ensure "Get In Touch" button goes to contact section
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = contactSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Add interactive elements and enhancements
function addInteractiveElements() {
    // Create and add back to top button
    createBackToTopButton();
    
    // Add hover effects to skill items
    addSkillItemEffects();
    
    // Add button ripple effects
    addButtonEffects();
    
    // Add keyboard navigation support
    addKeyboardSupport();
    
    // Add profile picture interactions
    addProfilePictureEffects();
    
    // Fix social media links
    fixSocialMediaLinks();
}

// Fix social media links - NEW FUNCTION
function fixSocialMediaLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Ensure the links work properly
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('http')) {
                // Let the default behavior handle external links
                return true;
            }
        });
        
        // Add visual feedback
        link.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    });
}

function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Go to top');
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function addSkillItemEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create button ripple effect
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
                animation: buttonRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add button ripple animation CSS
    if (!document.querySelector('#button-styles')) {
        const style = document.createElement('style');
        style.id = 'button-styles';
        style.textContent = `
            @keyframes buttonRipple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addProfilePictureEffects() {
    const profilePicture = document.querySelector('.diamond');
    if (!profilePicture) return;
    
    // Add mouse tracking effect
    profilePicture.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 10;
        const rotateY = (x / rect.width) * -10;
        
        this.style.transform = `rotate(45deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    profilePicture.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(45deg) scale(1)';
    });
    
    // Add click effect
    profilePicture.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 3s ease-in-out infinite';
        }, 100);
    });
}

function addKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close mobile menu or modals
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            const modal = document.querySelector('.project-modal');
            
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (modal) {
                modal.style.animation = 'modalFadeOut 0.3s ease';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                        document.body.style.overflow = '';
                    }
                }, 300);
            }
        }
        
        // Press 'Home' to go to top
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Press 'End' to go to bottom
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

// Handle responsive adjustments
function initResponsiveAdjustments() {
    let resizeTimeout;
    
    function handleResize() {
        const navbar = document.querySelector('.navbar');
        
        // Reset navbar transform on desktop
        if (window.innerWidth > 768 && navbar) {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
}

// Enhanced loading animation
window.addEventListener('load', function() {
    // Add loading class to body for fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Stagger animation for main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const touchStyles = document.createElement('style');
    touchStyles.textContent = `
        .touch-device .btn:hover,
        .touch-device .social-link:hover,
        .touch-device .project-card:hover {
            transform: none;
        }
        
        .touch-device .btn:active {
            transform: scale(0.95);
        }
        
        .touch-device .project-card:active {
            transform: scale(0.98);
        }
        
        .touch-device .diamond:hover {
            transform: rotate(45deg) scale(1) !important;
        }
    `;
    document.head.appendChild(touchStyles);
}

// Performance optimization for animations
function optimizeAnimations() {
    let isVisible = true;
    
    document.addEventListener('visibilitychange', function() {
        isVisible = !document.hidden;
        
        // Pause animations when tab is not visible
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            if (!isVisible) {
                canvas.style.animationPlayState = 'paused';
            } else {
                canvas.style.animationPlayState = 'running';
            }
        });
    });
}

// Initialize performance optimizations
optimizeAnimations();

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}