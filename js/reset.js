/* Reset kata sandi: validasi sandi baru dan kembali ke halaman masuk. */
(function () {
  'use strict';

  var form = document.getElementById('resetForm');
  var password = document.getElementById('password');
  var confirmPw = document.getElementById('confirm');
  var submitBtn = document.getElementById('submitBtn');
  var btnLabel = submitBtn.querySelector('.btn-label');

  var toggleBtn = document.getElementById('togglePassword');
  var toggleIcon = document.getElementById('toggleIcon');

  // Token dari tautan email, mis. reset.html?token=abc123.
  // Di versi nyata, kirim token ini ke server dan biarkan SERVER yang memeriksa validitas dan masa berlakunya.
  var token = new URLSearchParams(location.search).get('token');

  LampPassword.bindStrength(password, document.getElementById('strength'), document.getElementById('strength-text'));

  function setError(input, message) {
    var field = input.closest('.field');
    var out = document.getElementById(input.id + '-error');
    field.classList.toggle('has-error', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    out.textContent = message || '';
  }

  function validate() {
    var ok = true;

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

    if (!ok) {
      var firstBad = form.querySelector('.has-error input');
      if (firstBad) firstBad.focus();
    }
    return ok;
  }

  password.addEventListener('input', function () {
    setError(password, '');
    if (confirmPw.value) setError(confirmPw, '');
  });
  confirmPw.addEventListener('input', function () { setError(confirmPw, ''); });

  toggleBtn.addEventListener('click', function () {
    var show = password.type === 'password';
    password.type = confirmPw.type = show ? 'text' : 'password';
    toggleIcon.setAttribute('href', show ? '#i-eye-off' : '#i-eye');
    toggleBtn.setAttribute('aria-pressed', String(show));
    toggleBtn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    btnLabel.textContent = 'Menyimpan...';

    // Ganti bagian ini dengan request ke server, mis.:
    // fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ token: token, password: password.value }) })
    setTimeout(function () {
      btnLabel.textContent = 'Tersimpan';
      submitBtn.removeAttribute('aria-busy');
      LampToast.show('Kata sandi berhasil diperbarui.');
      setTimeout(function () { window.location.href = 'index.html?reset=berhasil'; }, 1600);
    }, 1300);
  });
})();
