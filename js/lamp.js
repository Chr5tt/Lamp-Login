/* Lampu: tarik tali untuk menyalakan/mematikan. Memancarkan event "lamp:change".
   Status lampu diingat selama tab terbuka, jadi pindah halaman tidak membuat ruangan gelap lagi. */
(function () {
  'use strict';

  var KEY = 'lamp-lit';
  var body = document.body;
  var lamp = document.getElementById('lamp');
  var cord = document.getElementById('lampCord');
  if (!lamp || !cord) return;

  var audioCtx = null;

  // Suara "klik" dibuat dengan Web Audio, tanpa file audio
  function playClick() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      var t = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch (err) {
      /* Audio diblokir browser: abaikan, lampu tetap bekerja */
    }
  }

  function remember(lit) {
    try { sessionStorage.setItem(KEY, lit ? '1' : '0'); } catch (err) { /* storage tidak tersedia */ }
  }

  function syncUi(lit) {
    cord.setAttribute('aria-pressed', String(lit));
    cord.setAttribute('aria-label', lit ? 'Matikan lampu' : 'Nyalakan lampu');
    document.dispatchEvent(new CustomEvent('lamp:change', { detail: { lit: lit } }));
  }

  function setLit(lit) {
    body.classList.toggle('light-on', lit);
    syncUi(lit);
    remember(lit);
  }

  function toggle() {
    playClick();

    cord.classList.add('is-pulling');
    window.setTimeout(function () { cord.classList.remove('is-pulling'); }, 180);

    // Ayunan lampu: restart animasi jika ditekan berulang
    lamp.classList.remove('is-swinging');
    void lamp.offsetWidth;
    lamp.classList.add('is-swinging');

    setLit(!body.classList.contains('light-on'));
  }

  lamp.addEventListener('animationend', function (e) {
    if (e.target === lamp) lamp.classList.remove('is-swinging');
  });

  cord.addEventListener('click', toggle);

  // Halaman dibuka dengan lampu sudah menyala (kelas dipasang skrip kecil di awal <body>)
  if (body.classList.contains('light-on')) syncUi(true);
})();
