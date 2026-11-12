// komponen.js — kartu dan pesan ditulis sekali, dipakai di semua daftar.
// Kontrak: teks pengguna SELALU lewat textContent, jadi <b>tebal</b> tampil sebagai teks, bukan HTML.

export function KartuCatatan(catatan) {
  const el = document.createElement('div');
  el.className = 'kartu';

  const mk = document.createElement('small');
  mk.textContent = catatan.mk || '';
  const judul = document.createElement('h3');
  judul.textContent = catatan.judul; // aman: judul pengguna bukan HTML
  const tgl = document.createElement('small');
  tgl.textContent = catatan.dibuat
    ? new Date(catatan.dibuat).toLocaleDateString('id-ID')
    : new Date().toLocaleDateString('id-ID');

  const aksi = document.createElement('div');
  aksi.className = 'aksi';
  const btnSemat = document.createElement('button');
  btnSemat.dataset.aksi = 'semat';
  btnSemat.dataset.id = catatan.id;
  btnSemat.textContent = catatan.disematkan ? 'Lepas' : 'Sematkan';
  const btnHapus = document.createElement('button');
  btnHapus.dataset.aksi = 'hapus';
  btnHapus.dataset.id = catatan.id;
  btnHapus.textContent = 'Hapus';
  aksi.append(btnSemat, btnHapus);

  el.append(mk, judul, tgl, aksi);
  return el;
}

export function PesanKosong(teks) {
  const p = document.createElement('p');
  p.className = 'kosong';
  p.textContent = teks;
  return p;
}
