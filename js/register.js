/* Form daftar: validasi, indikator kekuatan kata sandi, notifikasi. */
(function () {
  'use strict';

  var form = document.getElementById('registerForm');
  var fullname = document.getElementById('fullname');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var confirmPw = document.getElementById('confirm');
  var terms = document.getElementById('terms');
  var submitBtn = document.getElementById('submitBtn');
  var btnLabel = submitBtn.querySelector('.btn-label');

  var toggleBtn = document.getElementById('togglePassword');
  var toggleIcon = document.getElementById('toggleIcon');

  var strength = document.getElementById('strength');
  var strengthText = document.getElementById('strength-text');

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------- Error per kolom ---------- */
  function setError(input, message) {
    var box = input.closest('.field') || input.closest('.terms');
    var out = document.getElementById(input.id + '-error');
    box.classList.toggle('has-error', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    out.textContent = message || '';
  }

  /* ---------- Kekuatan kata sandi ---------- */
  LampPassword.bindStrength(password, strength, strengthText);

  /* ---------- Validasi ---------- */
  function validate() {
    var ok = true;

    if (fullname.value.trim().length < 2) {
      setError(fullname, 'Isi nama lengkap kamu.');
      ok = false;
    } else setError(fullname, '');

    if (!email.value.trim()) {
      setError(email, 'Isi alamat email kamu.');
      ok = false;
    } else if (!EMAIL_RE.test(email.value.trim())) {
      setError(email, 'Format email belum benar, contoh: nama@email.com');
      ok = false;
    } else setError(email, '');

    if (password.value.length < 6) {
      setError(password, 'Kata sandi minimal 6 karakter.');
      ok = false;
    } else setError(password, '');

    if (!confirmPw.value) {
      setError(confirmPw, 'Ketik ulang kata sandi kamu.');
      ok = false;
    } else if (confirmPw.value !== password.value) {
      setError(confirmPw, 'Kata sandi tidak sama.');
      ok = false;
    } else setError(confirmPw, '');

    if (!terms.checked) {
      setError(terms, 'Centang dulu untuk melanjutkan.');
      ok = false;
    } else setError(terms, '');

    if (!ok) {
      var firstBad = form.querySelector('.has-error input');
      if (firstBad) firstBad.focus();
    }
    return ok;
  }

  [fullname, email, confirmPw].forEach(function (el) {
    el.addEventListener('input', function () { setError(el, ''); });
  });
  password.addEventListener('input', function () {
    setError(password, '');
    if (confirmPw.value) setError(confirmPw, '');
  });
  terms.addEventListener('change', function () { setError(terms, ''); });

  /* ---------- Tampil/sembunyi kata sandi (kedua kolom sekaligus) ---------- */
  toggleBtn.addEventListener('click', function () {
    var show = password.type === 'password';
    password.type = confirmPw.type = show ? 'text' : 'password';
    toggleIcon.setAttribute('href', show ? '#i-eye-off' : '#i-eye');
    toggleBtn.setAttribute('aria-pressed', String(show));
    toggleBtn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
  });

  /* ---------- Kirim form (simulasi) ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var firstName = fullname.value.trim().split(/\s+/)[0];

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    btnLabel.textContent = 'Membuat akun...';

    // Ganti bagian ini dengan request ke server kamu (fetch/axios)
    setTimeout(function () {
      btnLabel.textContent = 'Berhasil';
      submitBtn.removeAttribute('aria-busy');
      LampToast.show('Akun dibuat. Selamat datang, ' + firstName + '!');

      // Lanjut ke halaman masuk
      setTimeout(function () { window.location.href = 'index.html?daftar=berhasil'; }, 1600);
    }, 1300);
  });
})();
