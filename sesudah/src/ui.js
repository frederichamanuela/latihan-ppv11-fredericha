// ui.js — satu-satunya tempat membangun HTML kartu dan mengisi halaman.
import { cari } from './state.js';

function kartu(c) {
  return (
    '<div class="kartu"><small>' + c.mk + '</small><h3>' + c.judul + '</h3>' +
    '<small>' + new Date(c.dibuat).toLocaleDateString('id-ID') + '</small>' +
    '<div class="aksi"><button data-aksi="semat" data-id="' + c.id + '">' + (c.disematkan ? 'Lepas' : 'Sematkan') + '</button>' +
    '<button data-aksi="hapus" data-id="' + c.id + '">Hapus</button></div></div>'
  );
}

export function render(kataCari) {
  const hasil = cari(kataCari);
  const sematan = document.getElementById('sematan');
  const semua = document.getElementById('semua');
  const info = document.getElementById('info');

  let htmlSemat = '';
  let htmlSemua = '';
  let jumlahSemat = 0;
  for (const c of hasil) {
    if (c.disematkan) {
      jumlahSemat++;
      htmlSemat += kartu(c);
    }
    htmlSemua += kartu(c);
  }
  if (jumlahSemat === 0) htmlSemat = '<p class="kosong">Belum ada catatan yang disematkan.</p>';
  if (hasil.length === 0) htmlSemua = '<p class="kosong">Tidak ada catatan.</p>';

  sematan.innerHTML = htmlSemat;
  semua.innerHTML = htmlSemua;
  info.textContent = hasil.length + ' catatan, ' + jumlahSemat + ' disematkan';
}
