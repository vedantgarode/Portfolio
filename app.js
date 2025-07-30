// Portfolio JavaScript - Vedant Garode

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Animation Elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const skillCategories = document.querySelectorAll('.skill-category');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const educationItems = document.querySelectorAll('.education-item');
    const certificationCards = document.querySelectorAll('.certification-card');

    // Typewriter Effect
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typewriter effect for hero title
    function initTypewriter() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            // Clear existing content
            heroTitle.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">|</span>';

            const typewriterText = document.querySelector('.typewriter-text');
            const cursor = document.querySelector('.typewriter-cursor');

            // Start typewriter effect after a short delay
            setTimeout(() => {
                typeWriter(typewriterText, 'VEDANT GARODE', 120);

                // Hide cursor after typing is complete
                setTimeout(() => {
                    if (cursor) cursor.style.display = 'none';
                }, 'VEDANT GARODE'.length * 120 + 1000);
            }, 500);
        }
    }

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && !nav.contains(e.target)) {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Scroll Effects for Navigation
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class for navigation styling
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show navigation based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            nav.style.transform = 'translateY(-70px)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const navHeight = nav ? nav.offsetHeight : 70;
                    const offsetTop = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation delay for grouped elements
                if (entry.target.classList.contains('skill-category')) {
                    const index = Array.from(skillCategories).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }

                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(timelineItems).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }

                if (entry.target.classList.contains('project-card')) {
                    const index = Array.from(projectCards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                }

                if (entry.target.classList.contains('education-item')) {
                    const index = Array.from(educationItems).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }

                if (entry.target.classList.contains('certification-card')) {
                    const index = Array.from(certificationCards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.05}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animation elements
    fadeElements.forEach(element => observer.observe(element));
    skillCategories.forEach(element => observer.observe(element));
    timelineItems.forEach(element => observer.observe(element));
    projectCards.forEach(element => observer.observe(element));
    educationItems.forEach(element => observer.observe(element));
    certificationCards.forEach(element => observer.observe(element));

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100; // Offset for fixed nav

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Skill Tags Hover Effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => {
                if (ripple && ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Tech Tags Hover Effect
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Floating Shapes Animation Enhancement
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const randomRotation = Math.random() * 360;
            shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        }, 3000 + index * 1000);
    });

    // Timeline Items Stagger Animation
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineContent = entry.target.querySelector('.timeline-content');
                if (timelineContent) {
                    timelineContent.style.animation = 'slideInFromRight 0.8s ease forwards';
                }
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Project Cards 3D Tilt Effect
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Social Links Pulse Animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out infinite';
        });

        link.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }

        // Arrow keys for navigation (optional enhancement)
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const nextSection = getNextSection(currentSection);
            if (nextSection) {
                scrollToSection(nextSection);
            }
        }

        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const prevSection = getPrevSection(currentSection);
            if (prevSection) {
                scrollToSection(prevSection);
            }
        }
    });

    function getCurrentSection() {
        const scrollPos = window.scrollY + 100;
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section;
            }
        });

        return currentSection;
    }

    function getNextSection(currentSection) {
        if (!currentSection) return null;
        const sectionsArray = Array.from(sections);
        const currentIndex = sectionsArray.indexOf(currentSection);
        return sectionsArray[currentIndex + 1] || null;
    }

    function getPrevSection(currentSection) {
        if (!currentSection) return null;
        const sectionsArray = Array.from(sections);
        const currentIndex = sectionsArray.indexOf(currentSection);
        return sectionsArray[currentIndex - 1] || null;
    }

    function scrollToSection(section) {
        const navHeight = nav ? nav.offsetHeight : 70;
        const offsetTop = section.offsetTop - navHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Performance optimization - Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Initialize typewriter effect
        initTypewriter();

        // Trigger other hero animations
        const heroElements = document.querySelectorAll('.reveal-text');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 200 + 2000); // Delay to start after typewriter
        });
    });

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        .typewriter-cursor {
            animation: blink 1s infinite;
            font-weight: 100;
            color: var(--color-primary);
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin-top: -10px;
            margin-left: -10px;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .nav-link.active::after {
            width: 100%;
        }

        .loaded .reveal-text.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Export functions for potential future use
window.portfolioUtils = {
    scrollToSection: function(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const nav = document.querySelector('.nav');
            const navHeight = nav ? nav.offsetHeight : 70;
            const offsetTop = section.offsetTop - navHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
};