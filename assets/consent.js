/* Reisenberger Performance — Cookie-Consent für Google Maps */
(function () {
  var CONSENT_KEY = 'rp_consent_maps';

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      /* localStorage nicht verfügbar – Banner erscheint dann bei jedem Besuch erneut */
    }
  }

  function loadMap(placeholder) {
    var src = placeholder.getAttribute('data-map-src');
    if (!src) return;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = 'Standort Reisenberger Performance';
    placeholder.replaceWith(iframe);
  }

  function loadAllMaps() {
    document.querySelectorAll('[data-map-src]').forEach(loadMap);
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.hidden = false;
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.hidden = true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = getConsent();

    if (consent === 'granted') {
      loadAllMaps();
    } else if (consent !== 'denied') {
      showBanner();
    }
    /* bei "denied" bleiben die Platzhalter mit "Karte laden"-Button stehen */

    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setConsent('granted');
        hideBanner();
        loadAllMaps();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        setConsent('denied');
        hideBanner();
      });
    }

    document.querySelectorAll('[data-load-map]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var placeholder = btn.closest('[data-map-src]');
        if (placeholder) {
          setConsent('granted');
          loadMap(placeholder);
        }
      });
    });

    document.querySelectorAll('[data-cookie-settings]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        showBanner();
      });
    });
  });
})();
