/* ==========================================================================
   Mind i — main.js
   Shared by every page in both languages. Nothing here is language-specific:
   the contact-form status messages are read from data-* attributes on the
   <form> element itself, so the English and Dari pages supply their own
   wording without needing a second copy of this file.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     Current year in the footer
  ------------------------------------------------------------------ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
     Reading-progress ribbon
     A thin bar fixed to the very top of the viewport that fills as the
     visitor reads down the page — a small nod to a bookmark ribbon
     running through an archive volume. Purely decorative, so it is
     built and inserted from script rather than living in every page.
  ------------------------------------------------------------------ */
  var progressRibbon = document.createElement('div');
  progressRibbon.className = 'progress-ribbon';
  progressRibbon.setAttribute('aria-hidden', 'true');
  document.body.prepend(progressRibbon);

  function onScrollProgress() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressRibbon.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
  }
  document.addEventListener('scroll', onScrollProgress, { passive: true });
  window.addEventListener('resize', onScrollProgress);
  onScrollProgress();

  /* ------------------------------------------------------------------
     Sticky header — gains a shadow and compacts slightly once the page
     has scrolled past the masthead strip.
  ------------------------------------------------------------------ */
  var siteHeader = document.getElementById('site-header');

  function onScrollHeader() {
    if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  document.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ------------------------------------------------------------------
     Scroll-reveal — elements marked .reveal fade and rise into place
     the first time they enter the viewport. Siblings that share a
     parent are staggered via a CSS custom property set here, rather
     than in markup, so the effect stays in sync with however many
     .reveal items a given page happens to place next to each other.
  ------------------------------------------------------------------ */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function showAllReveals() {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  if (revealEls.length && 'IntersectionObserver' in window) {
    try {
      var staggerGroups = new Map();
      revealEls.forEach(function (el) {
        var parent = el.parentElement;
        if (!staggerGroups.has(parent)) staggerGroups.set(parent, 0);
        var i = staggerGroups.get(parent);
        el.style.setProperty('--reveal-i', i);
        staggerGroups.set(parent, i + 1);
      });

      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.01, rootMargin: '0px' });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } catch (err) {
      // Something about this page's setup broke the observer — never let
      // that leave content permanently invisible.
      showAllReveals();
    }
  } else {
    // No IntersectionObserver support — show everything immediately
    // rather than leave content permanently hidden.
    showAllReveals();
  }

  /* ------------------------------------------------------------------
     Mobile menu
  ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    function setMenuIcon(isOpen) {
      var icon = menuToggle.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
    }

    function closeMenu(returnFocus) {
      mobileMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      setMenuIcon(false);
      if (returnFocus) menuToggle.focus();
    }

    function openMenu() {
      mobileMenu.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      setMenuIcon(true);
      var firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    menuToggle.addEventListener('click', function () {
      var willOpen = !mobileMenu.classList.contains('is-open');
      if (willOpen) { openMenu(); } else { closeMenu(false); }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { closeMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu(true);
      }
    });
  }

  /* ------------------------------------------------------------------
     Back-to-top button, appears after scrolling down
  ------------------------------------------------------------------ */
  var backToTop = document.getElementById('back-to-top');

  function onScroll() {
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     Contact form — submits to Web3Forms (https://web3forms.com)
     No backend of our own is needed: Web3Forms relays the submission
     to the inbox tied to the access key below and returns a JSON result.
  ------------------------------------------------------------------ */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    var formNote = document.getElementById('form-note');
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.innerHTML : '';

    var msgRequired = contactForm.dataset.msgRequired || 'Please fill in every field before sending.';
    var msgSending = contactForm.dataset.msgSending || 'Sending…';
    var msgSuccess = contactForm.dataset.msgSuccess || 'Thank you — your message has been sent.';
    var msgError = contactForm.dataset.msgError || 'Something went wrong. Please try again, or email us directly.';

    function setNote(text, isError) {
      if (!formNote) return;
      formNote.textContent = text;
      formNote.classList.toggle('is-error', !!isError);
    }

    function fieldOf(input) {
      return input.closest('.field');
    }

    function clearFieldError(input) {
      var wrap = fieldOf(input);
      if (wrap) wrap.classList.remove('has-error');
      input.removeAttribute('aria-invalid');
    }

    var requiredInputs = contactForm.querySelectorAll('[required]');
    requiredInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.value.trim()) clearFieldError(input);
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: a hidden field real visitors never fill in
      var honeypot = contactForm.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        return;
      }

      var firstInvalid = null;
      requiredInputs.forEach(function (field) {
        var wrap = fieldOf(field);
        if (!field.value.trim()) {
          if (wrap) wrap.classList.add('has-error');
          field.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) firstInvalid = field;
        } else {
          clearFieldError(field);
        }
      });

      if (firstInvalid) {
        setNote(msgRequired, true);
        firstInvalid.focus();
        return;
      }

      var formData = new FormData(contactForm);
      var payload = Object.fromEntries(formData);

      if (submitBtn) submitBtn.disabled = true;
      setNote(msgSending, false);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result.success) {
            setNote(msgSuccess, false);
            contactForm.reset();
          } else {
            setNote(msgError, true);
          }
        })
        .catch(function () {
          setNote(msgError, true);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitLabel;
          }
        });
    });
  }

  /* ------------------------------------------------------------------
     Photo carousels — any [data-carousel] block. Supports button clicks,
     arrow keys when focused, and touch swipe. Slide order in the DOM is
     always the logical/chronological order; direction of travel is
     flipped for RTL pages so "next" still reads correctly.
  ------------------------------------------------------------------ */
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var counter = carousel.querySelector('.carousel-current');
    var total = slides.length;
    if (!track || !total) return;

    var isRTL = document.documentElement.dir === 'rtl';
    var sign = isRTL ? 1 : -1;
    var index = 0;

    function render() {
      track.style.transform = 'translateX(' + (sign * index * 100) + '%)';
      if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    }

    function go(delta) {
      index = (index + delta + total) % total;
      render();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(isRTL ? 1 : -1);
      if (e.key === 'ArrowRight') go(isRTL ? -1 : 1);
    });

    var touchStartX = null;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
      touchStartX = null;
    });

    render();
  });

});
