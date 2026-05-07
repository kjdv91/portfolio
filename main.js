/* ===================================================
   MAIN.JS — Kevin Jaramillo Portfolio
   Interactions: Navbar, Scroll Reveal, Mobile Menu,
   Form, Smooth UX
   =================================================== */

/* ---- NAVBAR SCROLL EFFECT ---- */
const navbar = document.getElementById('navbar');
const scrollThreshold = 60;

function handleNavbarScroll() {
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* ---- MOBILE MENU TOGGLE ---- */
const navToggle  = document.getElementById('nav-toggle');
const navLinks   = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ---- SCROLL REVEAL (Intersection Observer) ---- */
const revealElements = document.querySelectorAll(
  '.spec-card, .project-card, .about-grid, .stack-group, .contact-card, .trusted-logo-item, .stat-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay based on position
      const delay = entry.target.dataset.index
        ? parseInt(entry.target.dataset.index) * 100
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ---- ACTIVE NAV LINK HIGHLIGHTING ---- */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link:not(.nav-cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksAll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--c-accent-light)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* ---- CONTACT FORM ---- */
function handleFormSubmit(e) {
  e.preventDefault();

  const btn     = document.getElementById('form-submit');
  const success = document.getElementById('form-success-msg');
  const form    = document.getElementById('contact-form');

  // Loading state
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // Simulate async send (replace with real API call / EmailJS / Formspree)
  setTimeout(() => {
    btn.textContent  = '¡Enviado!';
    btn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
    success.classList.add('visible');
    form.reset();

    setTimeout(() => {
      btn.textContent = 'Enviar Mensaje';
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.background = '';
      success.classList.remove('visible');
    }, 4000);
  }, 1200);
}

/* ---- SMOOTH CURSOR TRAIL (Optional enhancement) ---- */
// Lightweight: highlights mouse position with a subtle radial glow on the hero
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--mouse-x', `${x}%`);
    hero.style.setProperty('--mouse-y', `${y}%`);
  });
}

/* ---- STACK PILL HOVER RIPPLE ---- */
document.querySelectorAll('.stack-pill-lg, .stack-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.style.transform = 'scale(0.95)';
    setTimeout(() => { pill.style.transform = ''; }, 150);
  });
});

/* ---- PARALLAX / TILT EFFECT FOR PROJECT CARDS ---- */
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 35; // Subtler tilt
    const rotateY = (centerX - x) / 35;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- INIT ---- */
handleNavbarScroll();
console.log(
  '%c Kevin Jaramillo %c Senior Engineer & Founder %c Blockchain & AI ',
  'background:#3b9eff;color:#fff;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px;',
  'background:#0a1120;color:#f59e0b;font-weight:bold;padding:4px 8px;border-radius:0;border-top:1px solid #f59e0b;border-bottom:1px solid #f59e0b;',
  'background:#a78bfa;color:#fff;font-weight:bold;padding:4px 8px;border-radius:0 4px 4px 0;'
);
