// Modern Portfolio JavaScript with 3D Effects and Interactions

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initPreloader();
        this.initCursor();
        this.initHeader();
        this.initTypewriter();
        this.initScrollEffects();
        this.initThemeToggle();
        this.initMobileMenu();
        this.initProjectFilter();
        this.initContactForm();
        this.initAnimations();
        this.initParallax();
        this.initFloatingShapes();
        this.initThreeJS();
        this.setCurrentYear();
    }

    setupEventListeners() {
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    // ===== PRELOADER =====
    initPreloader() {
        const preloader = document.getElementById('preloader');
        
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // ===== CUSTOM CURSOR =====
    initCursor() {
        const cursor = document.getElementById('cursor');
        
        if (!cursor) return;

        const links = document.querySelectorAll('a, button, .cursor-pointer');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.backgroundColor = 'var(--secondary)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'var(--primary)';
            });
        });
    }

    handleMouseMove(e) {
        const cursor = document.getElementById('cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    }

    // ===== HEADER EFFECTS =====
    initHeader() {
        const header = document.getElementById('header');
        this.lastScrollTop = 0;
    }

    handleScroll() {
        const header = document.getElementById('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Parallax effects
        this.handleParallax(scrollTop);
        
        this.lastScrollTop = scrollTop;
    }

    // ===== TYPEWRITER EFFECT =====
    initTypewriter() {
        const typewriter = document.getElementById('typewriter');
        if (!typewriter) return;

        const phrases = [
            'x86 Assembly Developer',
            'C/C++ Systems Programmer', 
            'AI/ML Engineer',
            'Python Developer',
            'Low-Level Optimization Specialist'
        ];

        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;

        const type = () => {
            const fullPhrase = phrases[currentPhrase];
            
            if (isDeleting) {
                typewriter.textContent = fullPhrase.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typewriter.textContent = fullPhrase.substring(0, currentChar + 1);
                currentChar++;
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === fullPhrase.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                speed = 500;
            }

            setTimeout(type, speed);
        };

        setTimeout(type, 1000);
    }

    // ===== SCROLL EFFECTS =====
    initScrollEffects() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Skill progress animation
        this.initSkillProgress();
        
        // Counter animation
        this.initCounters();
    }

    initSkillProgress() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const percentage = progressBar.getAttribute('data-skill');
                    progressBar.style.width = percentage + '%';
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-card').forEach(card => {
            skillObserver.observe(card);
        });
    }

    initCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 100;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ===== THEME TOGGLE =====
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        
        if (!themeToggle || !themeIcon) return;

        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeIcon = document.getElementById('themeIcon');
        if (theme === 'light') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // ===== MOBILE MENU =====
    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (!mobileMenuBtn || !navLinks) return;

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== PROJECT FILTER =====
    initProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== CONTACT FORM =====
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Create Gmail compose URL
            const gmailSubject = `Portfolio Contact: ${subject}`;
            const gmailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const recipient = 'iamraholchaturvedi@gmail.com';
            
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;
            
            // Open Gmail in new tab
            window.open(gmailUrl, '_blank');
            
            // Show success message
            this.showNotification('Message composed in Gmail! Please send it from there.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? 'var(--success)' : 'var(--primary)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ===== ANIMATIONS =====
    initAnimations() {
        // AOS (Animate On Scroll) initialization
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Hover effects for cards
        this.initCardHoverEffects();
    }

    initCardHoverEffects() {
        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', x + 'px');
                card.style.setProperty('--mouse-y', y + 'px');
            });
        });
    }

    // ===== PARALLAX EFFECTS =====
    initParallax() {
        this.parallaxElements = document.querySelectorAll('.parallax-element');
    }

    handleParallax(scrollTop) {
        this.parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Hero parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroOffset = scrollTop * 0.5;
            hero.style.transform = `translateY(${heroOffset}px)`;
        }
    }

    // ===== FLOATING SHAPES =====
    initFloatingShapes() {
        const shapesContainer = document.getElementById('floatingShapes');
        if (!shapesContainer) return;

        const shapeCount = 20;
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            // Random properties
            const size = Math.random() * 20 + 10;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            Object.assign(shape.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + '%',
                top: y + '%',
                animationDuration: duration + 's',
                animationDelay: delay + 's'
            });
            
            shapesContainer.appendChild(shape);
        }
    }

    // ===== THREE.JS BACKGROUND =====
    initThreeJS() {
        const canvas = document.getElementById('threejs-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Particles
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 1000;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00d4ff,
            size: 2,
            transparent: true,
            opacity: 0.3
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        camera.position.z = 100;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particleSystem.rotation.x += 0.001;
            particleSystem.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        };
        
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ===== UTILITY FUNCTIONS =====
    handlePageLoad() {
        // Trigger initial animations
        document.body.classList.add('loaded');
    }

    handleResize() {
        // Handle responsive adjustments
        this.debounce(() => {
            // Resize logic here
        }, 250)();
    }

    debounce(func, wait) {
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

    setCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);