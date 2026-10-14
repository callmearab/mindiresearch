/* Mind i — main.js
   The only behaviour on the site is the contact form. Everything else is
   plain HTML and CSS. Status messages come from data-* attributes on the
   form, so the English and Dari pages share this one file. */

(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var note = document.getElementById('form-note');
  var button = form.querySelector('button[type="submit"]');
  var buttonLabel = button ? button.innerHTML : '';
  var messages = {
    required: form.dataset.msgRequired,
    sending: form.dataset.msgSending,
    success: form.dataset.msgSuccess,
    error: form.dataset.msgError
  };
  var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));

  function setNote(text, isError) {
    note.textContent = text;
    note.classList.toggle('is-error', !!isError);
  }

  function setInvalid(field, invalid) {
    var wrap = field.closest('.field');
    if (wrap) wrap.classList.toggle('has-error', invalid);
    if (invalid) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  }

  required.forEach(function (field) {
    field.addEventListener('input', function () {
      if (field.value.trim()) setInvalid(field, false);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Honeypot: a hidden checkbox that real visitors never tick
    var trap = form.querySelector('input[name="botcheck"]');
    if (trap && trap.checked) return;

    var firstInvalid = null;
    required.forEach(function (field) {
      var invalid = !field.value.trim();
      setInvalid(field, invalid);
      if (invalid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      setNote(messages.required, true);
      firstInvalid.focus();
      return;
    }

    button.disabled = true;
    setNote(messages.sending, false);

    var payload = Object.fromEntries(new FormData(form));

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (result.success) {
          setNote(messages.success, false);
          form.reset();
        } else {
          setNote(messages.error, true);
        }
      })
      .catch(function () {
        setNote(messages.error, true);
      })
      .finally(function () {
        button.disabled = false;
        button.innerHTML = buttonLabel;
      });
  });
})();
