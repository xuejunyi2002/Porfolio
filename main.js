/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.matchMedia('(pointer: fine)').matches && cursor && follower) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  (function animateFollower() {
    followerX += (mouseX - followerX - 17) * 0.11;
    followerY += (mouseY - followerY - 17) * 0.11;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
  })();

  // Scale up on interactive elements
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(2)';
      follower.style.opacity = '0.15';
      follower.style.borderColor = 'var(--coral)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.opacity = '0.5';
      follower.style.borderColor = '';
    });
  });
}

/* ============================================================
   HEADER — compact on scroll
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('compact', window.scrollY > 80);
}, { passive: true });

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

  // Close on outside tap
  document.addEventListener('click', e => {
    if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
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
   PARALLAX DOODLES
   ============================================================ */
const parallaxEls = document.querySelectorAll('.parallax');

function updateParallax() {
  const scrollY = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.05;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

if (parallaxEls.length) {
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}

/* ============================================================
   CURSOR-FOLLOWING DOODLES (hero only)
   ============================================================ */
if (window.matchMedia('(pointer: fine)').matches) {
  const floatingDoodles = document.querySelectorAll('.hero .doodle');
  let heroRect = null;

  const hero = document.getElementById('home');
  if (hero) {
    heroRect = hero.getBoundingClientRect();
    window.addEventListener('resize', () => { heroRect = hero.getBoundingClientRect(); });

    document.addEventListener('mousemove', e => {
      if (!heroRect) return;
      const cx = heroRect.width  / 2;
      const cy = heroRect.height / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      floatingDoodles.forEach((d, i) => {
        const factor = (i % 2 === 0 ? 1 : -1) * 6;
        d.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
    });
  }
}

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   CONTACT FORM
   ============================================================ */
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btnText = form.querySelector('.form-submit span');
    if (!btnText) return;
    const original = btnText.textContent;

    btnText.textContent = 'Sending…';
    form.querySelector('.form-submit').disabled = true;

    // Swap this with Formspree / EmailJS for real sending
    setTimeout(() => {
      btnText.textContent = 'Sent! Talk soon ✦';
      form.reset();
      setTimeout(() => {
        btnText.textContent = original;
        form.querySelector('.form-submit').disabled = false;
      }, 3500);
    }, 1000);
  });
}

/* ============================================================
   PROJECT CARD HOVER — image shift
   ============================================================ */
document.querySelectorAll('.project-card').forEach(card => {
  const img = card.querySelector('.project-img');
  if (!img) return;
  card.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.03)'; });
  card.addEventListener('mouseleave', () => { img.style.transform = ''; });
});
