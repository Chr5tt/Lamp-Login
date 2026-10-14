<div align="center">

<img src="assets/favicon.svg" width="72" alt="Ikon lampu">

# Lamp Login

**Tarik tali lampunya. Ruangan menyala. Form login muncul.**

Halaman login interaktif dengan lampu gantung, sinar, dan kunang-kunang.
HTML, CSS, dan JavaScript murni tanpa library, dan nyaman dipakai di HP.

[![Live Demo](https://img.shields.io/badge/Live_Demo-chr5tt.github.io-f2a93b?style=for-the-badge)](https://chr5tt.github.io/Lamp-Login/)

![HTML5](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?logo=javascript&logoColor=black)
![Tanpa dependensi](https://img.shields.io/badge/dependencies-0-success)
![Responsif](https://img.shields.io/badge/mobile-friendly-8a5cf6)

<br>

<img width="1366" height="768" alt="desktop" src="https://github.com/user-attachments/assets/e35522aa-713b-433f-8512-bf0435c3d6b6" />

</div>

---

## Tampilan

<div align="center">

| Lampu mati (HP) | Lampu menyala (HP) |
|:---:|:---:|
| <img width="390" height="844" alt="mobile-off" src="https://github.com/user-attachments/assets/30f8c8a7-b215-4d89-ad0c-425b7a40003b" /> | <img width="390" height="844" alt="mobile-on" src="https://github.com/user-attachments/assets/bf250535-5b5e-44a0-be46-d743095ae373" /> |

</div>

## Fitur

- **Lampu interaktif.** Tarik tali emas, lampu berayun, sinar jatuh ke bawah, dan form muncul.
- **Responsif.** Lampu di tengah atas pada HP, dua kolom pada layar lebar dan HP landscape.
- **Kunang-kunang di canvas.** Redup saat gelap dan terang saat lampu menyala. Ringan, tajam di layar retina, dan berhenti saat tab tidak aktif.
- **Form yang rapi.** Validasi per kolom, tombol lihat kata sandi, status loading, dan notifikasi.
- **Suara klik** dibuat dengan Web Audio API, jadi tidak perlu file audio.
- **Ramah akses.** Tali bisa dipakai lewat keyboard dan pembaca layar, fokus terlihat jelas, dan mengikuti pengaturan *kurangi gerakan* di perangkat.
- **Tanpa dependensi.** Tidak ada Tailwind, FontAwesome, atau framework. Ikon inline dan font punya fallback, jadi jalan offline.

## Coba sekarang

**Online:** buka **[chr5tt.github.io/Lamp-Login](https://chr5tt.github.io/Lamp-Login/)**

**Lokal:**

```bash
git clone https://github.com/chr5tt/Lamp-Login.git
cd Lamp-Login
# buka index.html di browser, atau jalankan server lokal:
npx serve .
```

## Struktur proyek

```
Lamp-Login/
├── index.html            Struktur halaman
├── css/
│   └── style.css         Semua gaya (token warna di :root)
├── js/
│   ├── lamp.js           Lampu, tali, suara klik
│   ├── fireflies.js      Animasi kunang-kunang
│   └── form.js           Validasi form dan notifikasi
└── assets/
    ├── favicon.svg
    ├── social-preview.png
    └── screenshots/
```

## Kustomisasi

Ubah warna lewat variabel di bagian `:root` pada `css/style.css`:

| Variabel | Fungsi | Bawaan |
|---|---|---|
| `--amber` | Warna aksen (tombol, fokus, tali) | `#f2a93b` |
| `--bulb` | Warna cahaya bohlam | `#ffd98a` |
| `--ink` | Warna latar ruangan gelap | `#08090c` |
| `--danger` | Warna pesan error | `#ff8f7e` |

Mau tali atau sinar lebih panjang, atau kunang-kunang lebih banyak? Lihat `--wire` di CSS dan angka `count` di `js/fireflies.js`.

## Sambungkan ke server

Form saat ini hanya simulasi. Ganti blok `setTimeout` di `js/form.js` dengan request sungguhan:

```js
const res = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identity: identity.value, password: password.value })
});
if (!res.ok) { showToast('Email atau kata sandi salah.', 'error'); return; }
showToast('Berhasil masuk.');
```

> Jangan simpan atau cek kata sandi di sisi browser. Validasi sebenarnya harus selalu dilakukan di server.

## Deploy ke GitHub Pages

1. Pastikan `index.html` ada di **root** repo (bukan di dalam subfolder).
2. Buka **Settings → Pages**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
3. Situs tersedia di `https://<username>.github.io/<nama-repo>/`.

## Rencana pengembangan

- [ ] Tombol mode terang/gelap
- [ ] Tombol bisu untuk suara klik
- [ ] Halaman daftar dengan gaya yang sama
- [ ] Pilihan warna cahaya lampu (hangat, putih, biru)

## Dukungan browser

Chrome, Edge, Firefox, dan Safari versi terbaru (desktop dan mobile).

---

<div align="center">

Dibuat oleh [@chr5tt](https://github.com/chr5tt). Kalau suka, kasih bintang di repo ini.

</div>
