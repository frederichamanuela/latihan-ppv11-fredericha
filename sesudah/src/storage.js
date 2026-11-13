// storage.js — satu-satunya pemilik penyimpanan localStorage; tidak pernah melempar galat walau data rusak, penuh, atau diblokir.
export const KUNCI = 'catatan-kuliah:v1';
const KUNCI_LAMA = 'catatan-kuliah'; // versi monolit (P11 lama), untuk migrasi sekali jalan

// cadangan di memori: kalau localStorage diblokir/rusak, aplikasi masih punya data terakhir yang sah
let cadanganMemori = [];

// pesan terakhir untuk pengguna; ui.js yang menampilkannya (storage tetap bebas DOM)
let pesanTerakhir = '';

function pesan(teks) {
  pesanTerakhir = teks;
  console.warn('[storage] ' + teks);
}

export function ambilPeringatan() {
  const t = pesanTerakhir;
  pesanTerakhir = '';
  return t;
}

export function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (mentah === null) {
      // Level 2: pindahkan data versi monolit (kunci lama) ke KUNCI baru, lalu hapus kunci lama
      const lama = localStorage.getItem(KUNCI_LAMA);
      if (lama !== null) {
        const sah = saring(lama);
        simpan(sah);
        localStorage.removeItem(KUNCI_LAMA);
        pesan('Data versi lama dimigrasikan ke ' + KUNCI + '.');
        return sah;
      }
      return [];
    }
    const sah = saring(mentah);
    cadanganMemori = sah;
    return sah;
  } catch (err) {
    pesan('Penyimpanan tidak tersedia, memakai data cadangan sesi ini.');
    return cadanganMemori;
  }
}

// JSON rusak / bukan array / berisi item rusak → hanya catatan sah yang lolos
function saring(mentah) {
  let data;
  try {
    data = JSON.parse(mentah);
  } catch {
    pesan('Data tersimpan rusak dan diabaikan; aplikasi mulai dengan daftar kosong.');
    return [];
  }
  if (!Array.isArray(data)) {
    pesan('Data tersimpan bukan daftar catatan; aplikasi mulai dengan daftar kosong.');
    return [];
  }
  const sah = data.filter((c) => c && typeof c === 'object' && typeof c.judul === 'string');
  if (sah.length < data.length) pesan('Sebagian data tidak sah diabaikan (' + (data.length - sah.length) + ' item).');
  return sah;
}

export function simpan(daftar) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(daftar));
    cadanganMemori = [...daftar];
  } catch (err) {
    pesan('Data tidak tersimpan permanen: penyimpanan penuh atau diblokir.');
  }
}
