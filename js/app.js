/* ──────────────────────────────────────────────────────────────
   EVANS TAX AND ACCOUNTS LIMITED
   Main Script
   ────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Company name Ltd/Limited swap ── */
  const nameElements = document.querySelectorAll('.co-name');

  function updateCompanyName() {
    const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
    nameElements.forEach((el) => {
      el.textContent = isSmallScreen
        ? 'Evans Tax and Accounts Ltd'
        : 'Evans Tax and Accounts Limited';
    });
  }

  updateCompanyName();
  window.addEventListener('resize', updateCompanyName);

  /* ── Hamburger menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeMenu();
  });
})();
