# CHANGELOG — Catatan Kuliah

Format mengikuti [Keep a Changelog](https://keepachangelog.com/); versi mengikuti [SemVer](https://semver.org/).

## [1.2.0] - 2026-11-12
### Added
- Komponen reusable `KartuCatatan(catatan)` dan `PesanKosong(teks)` di `src/komponen.js`; markup kartu cukup ditulis sekali dan dipakai di daftar Disematkan serta Semua catatan. Teks pengguna selalu lewat `textContent`, jadi `<b>tebal</b>` tampil sebagai teks.
### Changed
- `src/storage.js` tahan banting: `KUNCI` berversi `catatan-kuliah:v1`, `muat()` tidak pernah melempar galat dan menyaring data rusak (JSON rusak, bukan array, item kosong/angka/judul bukan teks), `simpan()` dibungkus try/catch, ada cadangan data di memori dan pesan yang jelas bila localStorage penuh atau diblokir.
### Fixed
- Aplikasi tidak lagi mati (layar kosong) saat isi penyimpanan dirusak.

## [1.1.0] - 2026-11-06
### Changed
- Monolit dibedah jadi modul ES (`storage.js`, `state.js`, `ui.js`, `main.js`), dimuat lewat `<script type="module">`; tanpa variabel global aplikasi dan tanpa atribut `onclick`.

## [1.0.0] - 2026-11-05
### Added
- Versi monolit pertama (satu `app.js`): tambah catatan, cari, sematkan, hapus, penyimpanan localStorage.
