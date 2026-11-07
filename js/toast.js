/* Notifikasi kecil yang dipakai bersama oleh semua halaman. Pakai: LampToast.show('pesan', 'error'). */
(function () {
  'use strict';

  var toast = document.getElementById('toast');
  var msg = document.getElementById('toastMsg');
  var icon = document.getElementById('toastIcon');
  var timer = null;

  window.LampToast = {
    show: function (message, type) {
      if (!toast) return;
      type = type || 'success';
      msg.textContent = message;
      toast.setAttribute('data-type', type);
      icon.setAttribute('href', type === 'error' ? '#i-alert' : '#i-check');
      toast.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
    }
  };
})();
