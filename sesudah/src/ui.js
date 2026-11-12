// ui.js — mengisi halaman dengan komponen dari komponen.js; tidak menulis markup kartu sendiri.
import { cari } from './state.js';
import { KartuCatatan, PesanKosong } from './komponen.js';

export function render(kataCari) {
  const hasil = cari(kataCari);
  const sematan = document.getElementById('sematan');
  const semua = document.getElementById('semua');
  const info = document.getElementById('info');

  sematan.replaceChildren();
  semua.replaceChildren();
  let jumlahSemat = 0;
  for (const c of hasil) {
    if (c.disematkan) {
      jumlahSemat++;
      sematan.appendChild(KartuCatatan(c));
    }
    semua.appendChild(KartuCatatan(c));
  }
  if (jumlahSemat === 0) sematan.appendChild(PesanKosong('Belum ada catatan yang disematkan.'));
  if (hasil.length === 0) semua.appendChild(PesanKosong('Tidak ada catatan.'));

  info.textContent = hasil.length + ' catatan, ' + jumlahSemat + ' disematkan';
}
