/* ──────────────────────────────────────────────────────────────
   EVANS TAX AND ACCOUNTS LIMITED
   Main Script
   ────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Hamburger menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    mobileNav.querySelector('a').focus();
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  /* Close when a nav link is tapped */
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* Close on outside tap */
  document.addEventListener('click', function (e) {
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* Close if viewport grows past breakpoint */
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 1100) closeMenu();
    }, 100);
  });

  /* ── Contact form — staticforms.dev ── */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const submitBtn    = contactForm.querySelector('.form-submit');
    const labelEl      = contactForm.querySelector('.form-submit-label');
    const sendingEl    = contactForm.querySelector('.form-submit-sending');
    const feedbackEl   = contactForm.querySelector('.form-success');

    function setSubmitting(on) {
      submitBtn.disabled = on;
      labelEl.style.display   = on ? 'none' : '';
      sendingEl.style.display  = on ? 'inline' : 'none';
    }

    function showFeedback(msg, isError) {
      feedbackEl.textContent = msg;
      feedbackEl.className   = 'form-success ' + (isError ? 'is-error' : 'is-success');
    }

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      /* Basic client-side validation */
      const name    = contactForm.name.value.trim();
      const email   = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill in all fields before sending.', true);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email address.', true);
        return;
      }

      setSubmitting(true);
      feedbackEl.className = 'form-success';
      feedbackEl.textContent = '';

      try {
        const res  = await fetch('https://api.staticforms.dev/submit', {
          method:  'POST',
          body:    new FormData(contactForm)
        });
        const data = await res.json();

        if (res.ok && data.success) {
          showFeedback('Thank you, your message has been sent. We\'ll be in touch shortly.', false);
          contactForm.reset();
          setTimeout(function () {
            feedbackEl.className = 'form-success';
            feedbackEl.textContent = '';
          }, 8000);
        } else {
          showFeedback('Something went wrong. Please try emailing us directly at info@evansaccounts.co.uk.', true);
        }
      } catch (_err) {
        showFeedback('Could not send your message. Please check your connection or email us directly at info@evansaccounts.co.uk.', true);
      } finally {
        setSubmitting(false);
      }
    });
  }

  /* ── Scroll-triggered animations ── */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  /* Observe section headings and cards */
  document.querySelectorAll('.section-heading, .service-card, .qual-badge, .ethos-body p, .about-body p:not(.section-label), .about-stat').forEach(function (el) {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  /* ── Active nav highlighting ── */
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.remove('active'); });
      document.querySelectorAll(`.nav-links a[href="#${entry.target.id}"], .mobile-nav a[href="#${entry.target.id}"]`).forEach(function (a) {
        a.classList.add('active');
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  ['services', 'ethos', 'about', 'contact'].forEach(function (id) {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
})();
