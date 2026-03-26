/* ============================================================
   Philemon et Baucis — main.js
   Interactions: Nav scroll, reveal animations, toggles
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Nav: add .scrolled class on scroll ---- */
  const nav = document.querySelector('.main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- Hero bg subtle parallax ---- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.classList.add('loaded'); // triggers the CSS scale transition
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
    }, { passive: true });
  }

  /* ---- Scroll reveal (Intersection Observer) ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Staggered delay based on data-delay attribute
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObs.observe(el));

  /* ---- Task accordion ---- */
  document.querySelectorAll('.task-block').forEach(block => {
    const header = block.querySelector('.task-header');
    header.addEventListener('click', () => {
      const isOpen = block.classList.contains('open');
      // Close all
      document.querySelectorAll('.task-block.open').forEach(b => b.classList.remove('open'));
      // Open clicked (unless it was already open)
      if (!isOpen) block.classList.add('open');
    });
    // Keyboard accessibility
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
    });
  });

  /* ---- Vocabulary sidebar toggle ---- */
  const vocabBtn  = document.querySelector('.vocab-toggle-btn');
  const vocabBody = document.querySelector('.vocab-body');
  const vocabChev = vocabBtn ? vocabBtn.querySelector('.v-chev') : null;
  if (vocabBtn && vocabBody) {
    vocabBtn.addEventListener('click', () => {
      const isOpen = vocabBody.classList.toggle('open');
      if (vocabChev) vocabChev.textContent = isOpen ? '▲' : '▼';
      vocabBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---- Translation toggle ---- */
  document.querySelectorAll('.transl-toggle-btn').forEach(btn => {
    const body = btn.nextElementSibling;
    const chev = btn.querySelector('.t-chev');
    if (!body) return;
    btn.addEventListener('click', () => {
      const isOpen = body.classList.toggle('open');
      if (chev) chev.textContent = isOpen ? '▲' : '▼';
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  /* ---- Original text tab switcher ---- */
  const textBtns  = document.querySelectorAll('.text-toggle-btn');
  const textViews = document.querySelectorAll('.text-view');
  textBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.view;
      textBtns.forEach(b => b.classList.remove('active'));
      textViews.forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      const view = document.getElementById('view-' + target);
      if (view) view.classList.add('active');
    });
  });

  /* ---- Smooth scroll for nav links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
