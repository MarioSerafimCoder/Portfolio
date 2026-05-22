<<<<<<< HEAD
// ─────────────────────────────────────
// LOADER
// ─────────────────────────────────────

window.addEventListener('load', () => {

  const loader =
    document.getElementById('loader');

  const progress =
    loader?.querySelector('.loader-progress');

  document.body.classList.add('loading');

  let finished = false;

  const finishLoader = () => {

    if(finished) return;
    finished = true;

    loader?.classList.add('hide');

    document.body.classList.remove('loading');

    startAnimations();

  };

  if(progress){

    progress.addEventListener(
      'animationend',
      finishLoader,
      { once:true }
    );

    setTimeout(finishLoader, 3200);

  }else{

    setTimeout(finishLoader, 500);

  }

});

// ─────────────────────────────────────
// START ANIMATIONS
// ─────────────────────────────────────

function startAnimations(){

  if(!('IntersectionObserver' in window)){

    revealElements.forEach((el) => {
      el.classList.add('vis');
    });

    counters.forEach((counter) => {

      const original =
        counter.textContent.trim();

      const target =
        parseInt(
          original.replace(/\D/g, '')
        );

      let suffix = '';

      if(original.includes('+')) suffix = '+';
      if(original.includes('%')) suffix = '%';

      const index =
        Array.from(counters).indexOf(counter);

      setTimeout(() => {
        animateCounter(counter, target, suffix);
      }, index * 180);

    });

    return;

  }

  revealElements.forEach((el) => {
    el.classList.add('reveal-pending');
    revealObserver.observe(el);
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  setTimeout(() => {

    revealElements.forEach((el) => {
      el.classList.add('vis');
    });

  }, 1200);

}

// ─────────────────────────────────────
// CURSOR
// ─────────────────────────────────────

const cursor =
  document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {

  if (!cursor) return;

  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

});

document.querySelectorAll(`
  a,
  button
`).forEach((el) => {

  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('hover');
  });

  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('hover');
=======
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
>>>>>>> caa2dc46fa5d1cdfd8b808ac38a19963aa2ca1a0
  });

});

<<<<<<< HEAD
// ─────────────────────────────────────
// NAV SCROLL
// ─────────────────────────────────────

const nav =
  document.getElementById('nav');

// ─────────────────────────────────────
// REVEAL ELEMENTS
// ─────────────────────────────────────

const revealElements =
  document.querySelectorAll(`
    .hero-card,
    .hero-headline,
    .hero-cta-btn
`);

const revealObserver =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      const element =
        entry.target;

      const index =
        Array.from(revealElements)
        .indexOf(element);

      const delay =
        (index % 5) * 100;

      setTimeout(() => {

        element.classList.add('vis');

      }, delay);

      revealObserver.unobserve(element);

    });

  }, {
    threshold:0.12
  });

// ─────────────────────────────────────
// COUNTERS
// ─────────────────────────────────────

function animateCounter(
  el,
  target,
  suffix = ''
){

  let start = 0;

  const duration = 1800;

  const animate = (timestamp) => {

    if (!start) start = timestamp;

    const progress = Math.min(
      (timestamp - start) / duration,
      1
    );

    const eased =
      1 - Math.pow(1 - progress, 4);

    const value =
      Math.floor(eased * target);

    el.textContent =
      value + suffix;

    if(progress < 1){

      requestAnimationFrame(animate);

    }else{

      el.textContent =
        target + suffix;

    }

  };

  requestAnimationFrame(animate);

}

const counters =
  document.querySelectorAll('.stat-num');

const counterObserver =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      const el = entry.target;

      const index =
        Array.from(counters).indexOf(el);

      const delay =
        index * 180;

      const original =
        el.textContent.trim();

      const target =
        parseInt(
          original.replace(/\D/g, '')
        );

      let suffix = '';

      if(original.includes('+')){
        suffix = '+';
      }

      if(original.includes('%')){
        suffix = '%';
      }

      setTimeout(() => {

        el.textContent = '0';

        animateCounter(
          el,
          target,
          suffix
        );

      }, delay);

      counterObserver.unobserve(el);

    });

  }, {
    threshold:.6
  });

// ─────────────────────────────────────
// ACTIVE NAV
// ─────────────────────────────────────

const sections =
  document.querySelectorAll('section[id]');

const navLinks =
  document.querySelectorAll('.nav-links a');

const numbersSection =
  document.getElementById('numbers');

const signaturePaths =
  Array.from(
    document.querySelectorAll('.signature-path')
  );

const watermark =
  document.querySelector('.hero-watermark');

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)');

let scrollTicking = false;

function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}

function setupSignaturePaths(){

  signaturePaths.forEach((path) => {

    const length =
      path.getTotalLength();

    path.dataset.pathLength =
      length;

    path.style.strokeDasharray =
      length;

    path.style.strokeDashoffset =
      length;

  });

}

function setSignatureProgress(progress){

  if(!signaturePaths.length) return;

  const lengths =
    signaturePaths.map((path) => (
      Number(path.dataset.pathLength) || 0
    ));

  const totalLength =
    lengths.reduce((total, length) => (
      total + length
    ), 0);

  let coveredLength =
    0;

  signaturePaths.forEach((path, index) => {

    const length =
      lengths[index];

    const start =
      totalLength
      ? coveredLength / totalLength
      : 0;

    const end =
      totalLength
      ? (coveredLength + length) / totalLength
      : 1;

    const pathProgress =
      clamp(
        (progress - start) / (end - start || 1),
        0,
        1
      );

    path.style.strokeDashoffset =
      length * (1 - pathProgress);

    coveredLength += length;

  });

}

function updateOnScroll(){

  const scrollY =
    window.scrollY;

  nav?.classList.toggle(
    'scrolled',
    scrollY > 30
  );

  let current = '';

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 140;

    const sectionHeight =
      section.offsetHeight;

    if(
      scrollY >= sectionTop &&
      scrollY <
      sectionTop + sectionHeight
    ){

      current =
        section.getAttribute('id');

    }

  });

  navLinks.forEach((link) => {

    link.classList.remove('active');

    if(
      link.getAttribute('href') ===
      `#${current}`
    ){

      link.classList.add('active');

    }

  });

  if(numbersSection){

    const numbersRect =
      numbersSection.getBoundingClientRect();

    const signatureStart =
      window.innerHeight * 0.78;

    const signatureEnd =
      window.innerHeight * 0.2;

    const signatureProgress =
      prefersReducedMotion.matches
      ? 1
      : clamp(
        (signatureStart - numbersRect.top) /
        (signatureStart - signatureEnd),
        0,
        1
      );

    setSignatureProgress(signatureProgress);

    const numbersActive =
      numbersRect.top < window.innerHeight * 0.58 &&
      numbersRect.bottom > window.innerHeight * 0.34;

    numbersSection.classList.toggle(
      'is-contrast',
      numbersActive
    );

  }

  if(watermark && !prefersReducedMotion.matches){

    watermark.style.transform =
      `translateX(-50%) translateY(${scrollY * 0.1}px)`;

  }

}

window.addEventListener('scroll', () => {

  if(scrollTicking) return;

  scrollTicking = true;

  requestAnimationFrame(() => {

    updateOnScroll();
    scrollTicking = false;

  });

});

setupSignaturePaths();
updateOnScroll();

// CSS owns hover states.
=======
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
>>>>>>> caa2dc46fa5d1cdfd8b808ac38a19963aa2ca1a0
