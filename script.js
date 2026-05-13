const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add('visible');

      revealObserver.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});

reveals.forEach((el) => revealObserver.observe(el));

const counts = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (!entry.isIntersecting) return;

    const el = entry.target;

    const target = Number(el.dataset.count);

    const duration = 1400;

    const start = performance.now();

    const tick = (now) => {

      const progress = Math.min(
        (now - start) / duration,
        1
      );

      el.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }

    };

    requestAnimationFrame(tick);

    countObserver.unobserve(el);

  });

}, {
  threshold: 0.6
});

counts.forEach((el) => countObserver.observe(el));

const menuToggle = document.getElementById('menuToggle');

const mobileNav = document.getElementById('mobileNav');

menuToggle?.addEventListener('click', () => {

  mobileNav.classList.toggle('open');

});

const cursor = document.getElementById('cursor');

const hoverables = document.querySelectorAll(
  'a, button, .case-card, .service-item, .reel-card'
);

hoverables.forEach((el) => {

  el.addEventListener('mouseenter', () => {
    cursor.classList.add('is-hover');
  });

  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-hover');
  });

});

window.addEventListener('mousemove', (e) => {

  cursor.style.left = `${e.clientX}px`;

  cursor.style.top = `${e.clientY}px`;

});

const themeToggle = document.getElementById('themeToggle');

themeToggle?.addEventListener('click', () => {

  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');

  localStorage.setItem(
    'theme',
    isDark ? 'dark' : 'light'
  );

});

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}