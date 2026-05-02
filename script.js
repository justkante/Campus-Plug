/* ========================================
   CAMPUS PLUG — CLEAN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Preloader
    const preloader = document.getElementById('preloader');
    const hidePreloader = () => preloader.classList.add('hidden');
    window.addEventListener('load', () => setTimeout(hidePreloader, 1400));
    setTimeout(hidePreloader, 2500);

    // Mobile Menu
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');

    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .btn').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // How It Works Toggle
    const buyerToggle = document.getElementById('buyerToggle');
    const sellerToggle = document.getElementById('sellerToggle');
    const buyerSteps = document.getElementById('buyerSteps');
    const sellerSteps = document.getElementById('sellerSteps');
    const toggleSlider = document.querySelector('.toggle-slider');

    buyerToggle.addEventListener('click', () => {
        buyerToggle.classList.add('active');
        sellerToggle.classList.remove('active');
        buyerSteps.classList.add('active');
        sellerSteps.classList.remove('active');
        toggleSlider.style.transform = 'translateX(0)';
    });

    sellerToggle.addEventListener('click', () => {
        sellerToggle.classList.add('active');
        buyerToggle.classList.remove('active');
        sellerSteps.classList.add('active');
        buyerSteps.classList.remove('active');
        toggleSlider.style.transform = 'translateX(100%)';
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-answer').style.maxHeight = '0';
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Waitlist Form
    const waitlistForm = document.getElementById('waitlistForm');
    const waitlistSuccess = document.getElementById('waitlistSuccess');

    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const university = document.getElementById('universitySelect').value;
        if (!name || !email || !university) return;

        waitlistForm.style.opacity = '0';
        waitlistForm.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            waitlistForm.style.display = 'none';
            waitlistSuccess.style.display = 'block';
            waitlistSuccess.style.opacity = '0';
            waitlistSuccess.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
                waitlistSuccess.style.transition = 'all 0.4s ease';
                waitlistSuccess.style.opacity = '1';
                waitlistSuccess.style.transform = 'translateY(0)';
            });
        }, 300);
    });

    waitlistForm.style.transition = 'all 0.3s ease';

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 64,
                    behavior: 'smooth'
                });
            }
        });
    });

    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Simple fade up for all major elements
    const fadeUpElements = [
        '.hero-badge', '.hero-title', '.hero-subtitle', '.hero-cta', '.hero-stats',
        '.hero-visual'
    ];

    fadeUpElements.forEach((sel, i) => {
        gsap.fromTo(sel,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out' }
        );
    });

    // Scroll-triggered sections
    gsap.utils.toArray('.section-header').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 25 }, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    gsap.utils.toArray('.feature-card, .category-card, .testimonial-card, .step-card, .faq-item').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.4, delay: (i % 6) * 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // Count-up for stats
    function animateCountUp(el, target) {
        const duration = 1500;
        const start = performance.now();
        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(target * eased);
            el.textContent = target >= 1000 ? val.toLocaleString() : val;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    document.querySelectorAll('.stat-number, .big-stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        ScrollTrigger.create({
            trigger: el, start: 'top 90%', once: true,
            onEnter: () => animateCountUp(el, target)
        });
    });
});
