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
     Mobile menu
  ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        var icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars text-xl';
      });
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

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: a hidden field real visitors never fill in
      var honeypot = contactForm.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        return;
      }

      var requiredFields = contactForm.querySelectorAll('[required]');
      var allFilled = true;
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) allFilled = false;
      });

      if (!allFilled) {
        setNote(msgRequired, true);
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

});
