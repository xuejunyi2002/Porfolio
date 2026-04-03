// Contact form feedback
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Swap this timeout with Formspree / EmailJS when ready
  setTimeout(() => {
    btn.textContent = 'Sent! I\'ll reply soon.';
    btn.style.background = '#16a34a';
    btn.style.borderColor = '#16a34a';
    form.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
    }, 4000);
  }, 1000);
});
