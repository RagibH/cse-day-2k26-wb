// --- UNIFIED MAGICAL LOGIC (v2: Supreme Flight Engine) ---
// Handles Mobile Menu, Dynamic Broom Flight, Sparkles, Countdown, and Stars.

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU LOGIC (Bulletproof Sidebar)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const closeMenu = document.getElementById('closeMenu');

    function closeNav() {
        if (!navMenu || !navOverlay) return;
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openNav() {
        if (!navMenu || !navOverlay) return;
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        if (hamburger) hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function toggleMenu() {
        if (!navMenu || !navOverlay) return;
        if (navMenu.classList.contains('active')) closeNav();
        else openNav();
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeNav);
    if (closeMenu) closeMenu.addEventListener('click', closeNav);

    // Auto-close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) closeNav();
        });
    });

    // Register button special actions (external forms)
    document.querySelectorAll('.register-btn[data-href]').forEach(button => {
        button.addEventListener('click', (e) => {
            const url = button.getAttribute('data-href');
            if (!url) return;
            window.open(url, '_blank', 'noopener');
        });
    });

    // 2. SUPREME FLIGHT ENGINE (JS-Driven Broom Movement)
    const broom = document.getElementById('magicBroom');
    if (broom) {
        let posX = -200;
        let posY = 15;
        let angle = 0;
        let time = 0;

        function animateBroom() {
            time += 0.012;
            posX += 2.2; // Horizontal Speed
            
            // Magical Sine-Wave Movement (Multi-Axis)
            posY = 20 + Math.sin(time * 0.8) * 15 + Math.cos(time * 0.4) * 5;
            
            // Dynamic Tiling (Rotate based on Y-speed)
            const rotateAngle = Math.sin(time * 0.8) * 12 + 5;
            
            if (posX > window.innerWidth + 300) {
                posX = -300; // Reset to start
                posY = Math.random() * 40 + 10; // Random new height
            }

            broom.style.left = posX + 'px';
            broom.style.top = posY + '%';
            broom.style.transform = `rotate(${rotateAngle}deg) scale(0.9)`;
            
            // Sparkle Trail Generation
            if (Math.random() > 0.6) {
                createSparkle(posX + 40, (window.innerHeight * (posY / 100)) + 20);
            }

            requestAnimationFrame(animateBroom);
        }
        
        // Start the engine
        animateBroom();
    }

    // 3. MAGICAL BROOM SPARKLE TRAIL
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'star';
        const size = Math.random() * 3 + 1;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.boxShadow = '0 0 10px #ff1a4f';
        sparkle.style.background = '#ffffff';
        sparkle.style.opacity = '1';
        sparkle.style.zIndex = '4';
        sparkle.style.pointerEvents = 'none';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'translateY(15px) scale(0.5)';
            setTimeout(() => sparkle.remove(), 1000);
        }, 150);
    }

    // 4. COUNTDOWN TIMER
    function updateCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('minutes');
        const secsEl = document.getElementById('seconds');
        
        if (!daysEl) return;

        const target = new Date(2026, 3, 7, 9, 0, 0);
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            daysEl.innerText = '00'; hoursEl.innerText = '00';
            minsEl.innerText = '00'; secsEl.innerText = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);

        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minsEl.innerText = mins < 10 ? '0' + mins : mins;
        secsEl.innerText = secs < 10 ? '0' + secs : secs;
    }
    
    if (document.getElementById('days')) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // 5. STARS GENERATION (Subtle Background)
    function createStars() {
        const starsDiv = document.getElementById('starsContainer');
        if (!starsDiv) return;
        starsDiv.innerHTML = '';
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2.5;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 5 + 's';
            starsDiv.appendChild(star);
        }
    }
    createStars();

    // 6. SCROLL REVEAL (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // 7. SMOOTH INTERNAL SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});