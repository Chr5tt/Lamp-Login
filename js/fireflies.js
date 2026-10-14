/* Kunang-kunang: canvas ringan yang meredup saat lampu mati dan terang saat menyala. */
(function () {
  'use strict';

  var canvas = document.getElementById('fireflies');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var DIM = 0.18;          // tingkat terang saat lampu mati
  var level = DIM;         // tingkat terang saat ini (dihaluskan)
  var target = DIM;
  var w = 0, h = 0;
  var flies = [];
  var rafId = null;

  // Sprite glow digambar sekali, lalu dipakai ulang (jauh lebih ringan dari shadowBlur)
  var sprite = (function () {
    var s = document.createElement('canvas');
    s.width = s.height = 64;
    var c = s.getContext('2d');
    var g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255, 232, 160, 1)');
    g.addColorStop(0.25, 'rgba(255, 208, 100, 0.55)');
    g.addColorStop(1, 'rgba(255, 190, 60, 0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
    return s;
  })();

  function spawn() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 7 + 5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      a: Math.random(),
      da: (Math.random() * 0.012 + 0.004) * (Math.random() < 0.5 ? -1 : 1)
    };
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Jumlah partikel mengikuti luas layar: sedikit di HP, lebih banyak di desktop
    var count = Math.round(Math.min(48, Math.max(16, (w * h) / 26000)));
    while (flies.length < count) flies.push(spawn());
    flies.length = count;

    if (reduceMotion.matches) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < flies.length; i++) {
      var f = flies[i];
      ctx.globalAlpha = f.a * level;
      ctx.drawImage(sprite, f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
    }
    ctx.globalAlpha = 1;
  }

  function step() {
    for (var i = 0; i < flies.length; i++) {
      var f = flies[i];
      f.x += f.vx;
      f.y += f.vy;
      if (f.x < 0 || f.x > w) f.vx *= -1;
      if (f.y < 0 || f.y > h) f.vy *= -1;

      f.a += f.da;
      if (f.a >= 1) { f.a = 1; f.da *= -1; }
      else if (f.a <= 0.1) { f.a = 0.1; f.da *= -1; }
    }
    level += (target - level) * 0.06;
    draw();
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (rafId || reduceMotion.matches) return;
    rafId = requestAnimationFrame(step);
  }
  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  document.addEventListener('lamp:change', function (e) {
    target = e.detail.lit ? 1 : DIM;
    if (reduceMotion.matches) { level = target; draw(); }
  });

  // Hemat baterai: berhenti saat tab tidak terlihat
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  window.addEventListener('resize', resize);
  resize();
  start();
})();
