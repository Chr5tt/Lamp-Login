/* Indikator kekuatan kata sandi, dipakai bersama oleh halaman daftar dan reset.
   Pakai: LampPassword.bindStrength(inputEl, strengthBoxEl, strengthTextEl) */
(function () {
  'use strict';

  var LABELS = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat'];

  function score(pw) {
    if (!pw) return 0;
    if (pw.length < 6) return 1;

    var s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;

    if (s <= 1) return 1;
    if (s === 2) return 2;
    if (s === 3) return 3;
    return 4;
  }

  function bindStrength(input, box, text) {
    function update() {
      var pw = input.value;
      var level = score(pw);
      box.classList.toggle('is-visible', pw.length > 0);
      box.setAttribute('data-level', String(level));
      text.textContent = pw && pw.length < 6 ? 'Terlalu pendek' : LABELS[level];
    }
    input.addEventListener('input', update);
    update();
    return update;
  }

  window.LampPassword = { score: score, bindStrength: bindStrength };
})();
