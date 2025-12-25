/* ==========================================
   Portfolio JavaScript
   Inspired by adnan-td/portfolio
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initSmoothScroll();
    initSkillsFilter();
    initProjectsCarousel();
    initProjectCards();
    initScrollAnimations();
    initParallaxEffects();
});

/* ==========================================
   Project Cards Clickable
   ========================================== */
function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the link directly (to avoid double open)
            if (e.target.closest('.project-link')) return;

            const link = card.querySelector('.project-link');
            if (link) {
                const href = link.getAttribute('href');
                const target = link.getAttribute('target');

                if (target === '_blank') {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            }
        });
    });
}

/* ==========================================
   Navigation
   ========================================== */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.padding = '12px 0';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

/* ==========================================
   Smooth Scroll
   ========================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   Skills Filter
   ========================================== */
function initSkillsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillBadges = document.querySelectorAll('.skill-badge');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillBadges.forEach(badge => {
                const category = badge.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    badge.style.display = 'flex';
                    badge.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    badge.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================
   Projects Carousel
   ========================================== */
function initProjectsCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const track = document.querySelector('.projects-track');

    if (!carousel || !track) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

/* ==========================================
   Scroll Animations
   ========================================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(`
        .section-title,
        .about-text p,
        .about-image,
        .skill-badge,
        .achievement-card,
        .project-card,
        .contact-content
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });

    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================
   Parallax Effects
   ========================================== */
function initParallaxEffects() {
    const heroCircle = document.querySelector('.hero-circle');
    const heroGlow = document.querySelector('.hero-circle-inner');

    if (heroCircle && heroGlow) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            heroCircle.style.transform = `translateY(-50%) rotate(${x}deg)`;
            heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }

    // Ambient glow mouse follow removed for static effect
    const ambientGlow = document.querySelector('.ambient-glow');
    if (ambientGlow) {
        // Static background or subtle animation handled in CSS
    }
}

/* ==========================================
   Typing Effect (Optional Enhancement)
   ========================================== */
function initTypingEffect() {
    const text = "I build things for the web.";
    const element = document.querySelector('.hero-tagline');

    if (!element) return;

    element.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 80);
        }
    }

    // Start typing after hero animations
    setTimeout(type, 1000);
}

/* ==========================================
   Counter Animation
   ========================================== */
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}



/* ==========================================
   Console Easter Egg
   ========================================== */
console.log(`
%c Husain Raja's Portfolio
%c Built with ❤️ and lots of ☕

🚀 SIH 2024 Winner
💻 Backend Developer | Full Stack Engineer
🎓 COEP Technological University

GitHub: https://github.com/HusainRajaa
`,
    'color: #0066ff; font-size: 20px; font-weight: bold;',
    'color: #8e8e93; font-size: 12px;'
);
