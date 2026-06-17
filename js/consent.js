/* ──────────────────────────────────────────────────────────────
   COOKIE CONSENT + GOOGLE ANALYTICS
   GA (gtag.js) loads only after the visitor accepts. The choice is
   remembered in localStorage so the banner isn't shown again.
   ────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var GA_ID = 'G-3Z5YMLKTQH';
  var STORAGE_KEY = 'eta-cookie-consent';

  var banner = document.getElementById('cookie-consent');
  if (!banner) return;

  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function hideBanner() {
    banner.classList.remove('is-visible');
    window.setTimeout(function () { banner.hidden = true; }, 400);
  }

  function remember(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  if (stored === 'accepted') {
    loadGA();
  } else if (stored !== 'declined') {
    banner.hidden = false;
    window.setTimeout(function () {
      banner.classList.add('is-visible');
    }, 10);
  }

  acceptBtn.addEventListener('click', function () {
    remember('accepted');
    loadGA();
    hideBanner();
  });

  declineBtn.addEventListener('click', function () {
    remember('declined');
    hideBanner();
  });
})();
