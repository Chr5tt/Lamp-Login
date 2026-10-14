/* Form login: validasi, tampil/sembunyi kata sandi, notifikasi. */
(function () {
  'use strict';

  var form = document.getElementById('loginForm');
  var identity = document.getElementById('identity');
  var password = document.getElementById('password');
  var submitBtn = document.getElementById('submitBtn');
  var btnLabel = submitBtn.querySelector('.btn-label');
  var toggleBtn = document.getElementById('togglePassword');
  var toggleIcon = document.getElementById('toggleIcon');

  var toast = document.getElementById('toast');
  var toastMsg = document.getElementById('toastMsg');
  var toastIcon = document.getElementById('toastIcon');
  var toastTimer = null;

  /* ---------- Toast ---------- */
  function showToast(message, type) {
    type = type || 'success';
    toastMsg.textContent = message;
    toast.setAttribute('data-type', type);
    toastIcon.setAttribute('href', type === 'error' ? '#i-alert' : '#i-check');
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  /* ---------- Validasi ---------- */
  function setError(input, message) {
    var field = input.closest('.field');
    var out = document.getElementById(input.id + '-error');
    field.classList.toggle('has-error', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    out.textContent = message || '';
  }

  function validate() {
    var ok = true;

    if (!identity.value.trim()) {
      setError(identity, 'Isi email atau username kamu.');
      ok = false;
    } else {
      setError(identity, '');
    }

    if (password.value.length < 6) {
      setError(password, 'Kata sandi minimal 6 karakter.');
      ok = false;
    } else {
      setError(password, '');
    }

    if (!ok) {
      var firstBad = form.querySelector('.has-error input');
      if (firstBad) firstBad.focus();
    }
    return ok;
  }

  identity.addEventListener('input', function () { setError(identity, ''); });
  password.addEventListener('input', function () { setError(password, ''); });

  /* ---------- Tampil/sembunyi kata sandi ---------- */
  toggleBtn.addEventListener('click', function () {
    var show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    toggleIcon.setAttribute('href', show ? '#i-eye-off' : '#i-eye');
    toggleBtn.setAttribute('aria-pressed', String(show));
    toggleBtn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
  });

  /* ---------- Kirim form (simulasi) ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var raw = identity.value.trim();
    var name = raw.split('@')[0];

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    btnLabel.textContent = 'Memproses...';

    // Ganti bagian ini dengan request ke server kamu (fetch/axios)
    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      btnLabel.textContent = 'Masuk';
      showToast('Berhasil masuk. Halo, ' + name + '!');
    }, 1200);
  });

  /* ---------- Tombol lain (demo) ---------- */
  document.querySelectorAll('.btn-social').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast('Masuk dengan ' + btn.getAttribute('data-provider') + ' belum disambungkan.');
    });
  });
  document.getElementById('forgotBtn').addEventListener('click', function () {
    showToast('Fitur lupa kata sandi belum disambungkan.');
  });
  document.getElementById('signupBtn').addEventListener('click', function () {
    showToast('Halaman pendaftaran belum disambungkan.');
  });
})();
