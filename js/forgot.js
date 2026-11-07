/* Lupa kata sandi: kirim tautan reset, tampilan "terkirim", dan jeda kirim ulang. */
(function () {
  'use strict';

  var COOLDOWN = 30; // detik sebelum tautan boleh dikirim ulang
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var stepForm = document.getElementById('stepForm');
  var stepSent = document.getElementById('stepSent');
  var form = document.getElementById('forgotForm');
  var email = document.getElementById('email');
  var emailField = email.closest('.field');
  var emailError = document.getElementById('email-error');
  var submitBtn = document.getElementById('submitBtn');
  var btnLabel = submitBtn.querySelector('.btn-label');

  var sentEmail = document.getElementById('sentEmail');
  var sentTitle = document.getElementById('sentTitle');
  var resendBtn = document.getElementById('resendBtn');
  var changeBtn = document.getElementById('changeBtn');

  var timer = null;

  /* ---------- Validasi ---------- */
  function setError(message) {
    emailField.classList.toggle('has-error', !!message);
    email.setAttribute('aria-invalid', message ? 'true' : 'false');
    emailError.textContent = message || '';
  }
  email.addEventListener('input', function () { setError(''); });

  function validate() {
    var v = email.value.trim();
    if (!v) { setError('Isi alamat email kamu.'); email.focus(); return false; }
    if (!EMAIL_RE.test(v)) { setError('Format email belum benar, contoh: nama@email.com'); email.focus(); return false; }
    setError('');
    return true;
  }

  /* ---------- Jeda kirim ulang ---------- */
  function startCooldown() {
    var left = COOLDOWN;
    resendBtn.disabled = true;
    resendBtn.textContent = 'Kirim ulang dalam ' + left + ' detik';
    clearInterval(timer);
    timer = setInterval(function () {
      left--;
      if (left <= 0) {
        clearInterval(timer);
        resendBtn.disabled = false;
        resendBtn.textContent = 'Kirim ulang tautan';
      } else {
        resendBtn.textContent = 'Kirim ulang dalam ' + left + ' detik';
      }
    }, 1000);
  }

  /* ---------- Pindah tampilan ---------- */
  function showSent(address) {
    sentEmail.textContent = address; // textContent: aman dari injeksi HTML
    stepForm.hidden = true;
    stepSent.hidden = false;
    startCooldown();
    sentTitle.focus(); // pembaca layar langsung membaca konfirmasi
  }

  function showForm() {
    clearInterval(timer);
    stepSent.hidden = true;
    stepForm.hidden = false;
    email.focus();
  }

  /* ---------- Kirim (simulasi) ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    btnLabel.textContent = 'Mengirim...';

    // Ganti bagian ini dengan request ke server kamu, misalnya fetch('/api/forgot-password', ...).
    // Server sebaiknya selalu membalas sukses, ada atau tidaknya akun, agar email tidak bisa ditebak.
    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      btnLabel.textContent = 'Kirim tautan reset';
      showSent(email.value.trim());
    }, 1200);
  });

  resendBtn.addEventListener('click', function () {
    if (resendBtn.disabled) return;
    // Ganti dengan request kirim ulang ke server
    LampToast.show('Tautan dikirim ulang ke ' + email.value.trim());
    startCooldown();
  });

  changeBtn.addEventListener('click', showForm);
})();
