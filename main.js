/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

if (window.matchMedia('(pointer: fine)').matches && cursor && follower) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });
  (function tick() {
    followerX += (mouseX - followerX - 17) * 0.11;
    followerY += (mouseY - followerY - 17) * 0.11;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { follower.style.opacity = '0.15'; follower.style.borderColor = 'var(--coral)'; });
    el.addEventListener('mouseleave', () => { follower.style.opacity = '0.5';  follower.style.borderColor = ''; });
  });
}

/* ============================================================
   HEADER — compact on scroll
   ============================================================ */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('compact', window.scrollY > 60);
  }, { passive: true });
}

/* ============================================================
   HAMBURGER — mobile menu
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
  document.addEventListener('click', e => {
    if (header && !header.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   PARALLAX DOODLES (hero only)
   ============================================================ */
const parallaxEls = document.querySelectorAll('.parallax');
if (parallaxEls.length) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.05;
      el.style.transform = `translateY(${sy * speed}px)`;
    });
  }, { passive: true });
}

/* ============================================================
   CURSOR-FOLLOWING DOODLES (hero)
   ============================================================ */
if (window.matchMedia('(pointer: fine)').matches) {
  const hero = document.querySelector('.hero');
  const floatingDoodles = document.querySelectorAll('.hero .doodle');
  if (hero && floatingDoodles.length) {
    document.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.height / 2) / (r.height / 2);
      floatingDoodles.forEach((d, i) => {
        const f = (i % 2 === 0 ? 1 : -1) * 6;
        d.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
      });
    });
  }
}

/* ============================================================
   TAB COMPONENT (home page PM traits)
   ============================================================ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const target = document.getElementById(btn.dataset.tab);
    if (target) {
      target.classList.add('active');
      // Trigger reveal for newly shown items
      target.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 50);
      });
    }
  });
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn     = form.querySelector('.form-submit');
    const btnText = btn.querySelector('span');
    const orig    = btnText.textContent;
    btnText.textContent = 'Sending…';
    btn.disabled = true;
    // Replace with Formspree / EmailJS
    setTimeout(() => {
      btnText.textContent = 'Sent! Talk soon.';
      form.reset();
      setTimeout(() => { btnText.textContent = orig; btn.disabled = false; }, 3500);
    }, 1000);
  });
}
