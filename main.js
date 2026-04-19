/* ============================================
   AADHAYA HARDWARE — MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- CUSTOM CURSOR ---- */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const animCursor = () => {
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animCursor);
    };
    animCursor();
    document.querySelectorAll('a, button, .prod-card, .catalog-item, .dealer-benefit, .finish-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
  }

  /* ---- NAV SCROLL ---- */
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---- MOBILE MENU ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* ---- DEALER FORM WHATSAPP SUBMIT ---- */
  const dealerForm = document.getElementById('dealerForm');
  if (dealerForm) {
    dealerForm.addEventListener('submit', e => {
      e.preventDefault();
      const name     = document.getElementById('f-name')?.value || '';
      const biz      = document.getElementById('f-biz')?.value || '';
      const city     = document.getElementById('f-city')?.value || '';
      const phone    = document.getElementById('f-phone')?.value || '';
      const req      = document.getElementById('f-req')?.value || '';
      const msg = `Hello Aadhaya Hardware! I am interested in Dealership/Distribution.%0A%0AName: ${name}%0ABusiness: ${biz}%0ACity: ${city}%0APhone: ${phone}%0ARequirement: ${req}`;
      window.open(`https://wa.me/919913235199?text=${msg}`, '_blank');
    });
  }

  /* ---- SMOOTH ANCHOR SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- MARQUEE DUPLICATE ---- */
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }

});
