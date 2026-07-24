// ===== PARTICLE BACKGROUND =====
(function createParticles() {
    const container = document.getElementById('particles');
    const count = 60;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const colors = ['#00f5ff', '#ff00e4', '#b400ff', '#00ff88', '#4d00ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `
            position:absolute;
            width:${size}px; height:${size}px;
            background:${color};
            border-radius:50%;
            top:${Math.random() * 100}%;
            left:${Math.random() * 100}%;
            box-shadow: 0 0 ${size * 4}px ${color};
            opacity:${Math.random() * 0.5 + 0.2};
            animation: floatParticle ${Math.random() * 20 + 15}s linear infinite;
            animation-delay: -${Math.random() * 20}s;
        `;
        container.appendChild(p);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            10% { opacity: 0.6; }
            50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200 + 50}px, -${Math.random() * 400 + 200}px) scale(${Math.random() + 0.5}); opacity: 0.3; }
            90% { opacity: 0.5; }
            100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 300}px, -${Math.random() * 600 + 300}px) scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
})();

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
    '.about-card, .service-card, .portfolio-item, .stat-item, .contact-info, .contact-form'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsCounted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            statNumbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        num.textContent = target;
                        clearInterval(counter);
                    } else {
                        num.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.about-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== NEON CURSOR GLOW =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== FORM SUBMIT (sends message to WhatsApp) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input, textarea');
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const subject = inputs[2].value.trim();
        const message = inputs[3].value.trim();

        const text =
            `Hi Amit, I found you via Vilen Studio website.%0A%0A` +
            `*Name:* ${name}%0A` +
            `*Email:* ${email}%0A` +
            `*Subject:* ${subject || 'Freelance Project'}%0A` +
            `*Message:* ${message}`;

        window.open(`https://wa.me/919024504713?text=${text}`, '_blank');

        const btn = this.querySelector('.btn-neon');
        const originalText = btn.textContent;
        btn.textContent = 'Opening WhatsApp...';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00f5ff)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            this.reset();
        }, 2500);
    });
}

// ===== TYPING EFFECT ON HERO SUBTITLE =====
(function typeEffect() {
    const el = document.querySelector('.hero-subtitle');
    if (!el) return;
    const text = el.textContent;
    el.textContent = '';
    el.style.visibility = 'visible';
    let i = 0;
    const timer = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(timer);
    }, 80);
})();

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
