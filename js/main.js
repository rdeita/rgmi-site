/* ═══════════════════════════════════════════════════════════
   MAIN — Interactividad general del sitio
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Year footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav scrolled state
  const nav = document.getElementById('nav');
  const setNavScroll = () => {
    if (!nav) return;
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  setNavScroll();
  window.addEventListener('scroll', setNavScroll, { passive: true });

  // Burger menu
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Smooth scroll with offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', targetId);
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.section-head, .pillar, .phase, .persp, .path-col, .article-card, .contact-form-wrap, .contact-channels, .hero-text, .hero-visual');
  revealEls.forEach(el => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // Contact form
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>…</span>';
      status.className = 'form-status';
      status.textContent = '';

      try {
        const formData = new FormData(form);
        const accessKey = formData.get('access_key');

        // Si no se ha configurado Web3Forms, mostramos mensaje informativo
        if (!accessKey || accessKey.includes('REEMPLAZAR')) {
          status.className = 'form-status error';
          status.textContent = window.I18N
            ? '⚠ Form aún no configurado. Configura tu Access Key de Web3Forms en index.html (ver INSTALACION.md).'
            : 'Form not configured.';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
          return;
        }

        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();

        if (data.success) {
          status.className = 'form-status success';
          status.textContent = window.I18N ? window.I18N.t('contact.form.success') : 'Mensaje enviado.';
          form.reset();
        } else {
          throw new Error(data.message || 'Error');
        }
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = window.I18N ? window.I18N.t('contact.form.error') : 'Error al enviar.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  }
})();
