// main.js — titik masuk: pasang semua event lalu gambar halaman pertama kali.
import { render } from './ui.js';
import { tambah, alihSemat, hapus } from './state.js';

let kataCari = '';
const $ = (id) => document.getElementById(id);

$('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const judul = $('judul').value.trim();
  if (judul === '') return;
  tambah(judul, $('mk').value);
  $('judul').value = '';
  render(kataCari);
});

$('cari').addEventListener('input', (e) => {
  kataCari = e.target.value;
  render(kataCari);
});

// Delegasi klik: satu listener untuk semua tombol di dalam kartu.
document.addEventListener('click', function (e) {
  const tombol = e.target.closest('button[data-aksi]');
  if (!tombol) return;
  const id = Number(tombol.dataset.id);
  if (tombol.dataset.aksi === 'semat') {
    alihSemat(id);
    render(kataCari);
  } else if (tombol.dataset.aksi === 'hapus') {
    if (!confirm('Hapus catatan ini?')) return;
    hapus(id);
    render(kataCari);
  }
});

render(kataCari);
