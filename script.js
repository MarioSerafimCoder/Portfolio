// ─────────────────────────────────────
// LOADER
// ─────────────────────────────────────

const initializePage = () => {

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
    loader?.setAttribute('aria-hidden', 'true');

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

};

if (document.readyState === 'complete') {
  initializePage();
} else {
  window.addEventListener('load', initializePage, { once: true });
}

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
    revealObserver?.observe(el);
  });

  counters.forEach((counter) => {
    counterObserver?.observe(counter);
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

const year =
  document.getElementById('year');

if(year){
  const currentYear =
    String(new Date().getFullYear());

  year.textContent =
    currentYear;

  year.dateTime =
    currentYear;
}

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
  });

});

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
  'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {

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
  })
  : null;

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
  'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {

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
  })
  : null;

// ─────────────────────────────────────
// ACTIVE NAV
// ─────────────────────────────────────

const sections =
  document.querySelectorAll('section[id]');

const navLinks =
  document.querySelectorAll('.nav-links a');

const numbersSection =
  document.getElementById('numbers');

const numbersStickyFrame =
  document.querySelector('.numbers-sticky-frame');

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

    path.setAttribute(
      'pathLength',
      '1'
    );

    path.setAttribute(
      'stroke-dasharray',
      '1 1'
    );

    path.setAttribute(
      'stroke-dashoffset',
      '1'
    );

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

    path.setAttribute(
      'stroke-dashoffset',
      String(1 - pathProgress)
    );

    path.style.opacity =
      pathProgress > 0.001
      ? '1'
      : '0';

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

    const navHeight =
      nav?.offsetHeight || 0;

    const stickyHeight =
      numbersStickyFrame?.offsetHeight ||
      Math.max(
        window.innerHeight - navHeight,
        1
      );

    const scrollDistance =
      Math.max(
        numbersSection.offsetHeight - stickyHeight,
        1
      );

    const stickyEnabled =
      numbersStickyFrame &&
      window.getComputedStyle(
        numbersStickyFrame
      ).position === 'sticky';

    const sectionProgress =
      stickyEnabled
      ? clamp(
        (navHeight - numbersRect.top) /
        scrollDistance,
        0,
        1
      )
      : clamp(
        (
          window.innerHeight * 0.88 -
          numbersRect.top
        ) /
        Math.max(
          numbersRect.height * 0.72,
          1
        ),
        0,
        1
      );

    const drawEnd =
      0.88;

    const signatureProgress =
      prefersReducedMotion.matches
      ? 1
      : clamp(
        sectionProgress / drawEnd,
        0,
        1
      );

    setSignatureProgress(signatureProgress);

    const numbersActive =
      numbersRect.top < window.innerHeight * 0.92 &&
      numbersRect.bottom > navHeight;

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

try {
  setupSignaturePaths();
} catch (error) {
  signaturePaths.forEach((path) => {
    path.removeAttribute('stroke-dasharray');
    path.removeAttribute('stroke-dashoffset');
  });
}

updateOnScroll();

// CSS owns hover states.
