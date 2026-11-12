// storage.js — satu-satunya pemilik penyimpanan localStorage; tidak pernah melempar galat walau data rusak, penuh, atau diblokir.
export const KUNCI = 'catatan-kuliah:v1';
const KUNCI_LAMA = 'catatan-kuliah'; // versi monolit (P11 lama), untuk migrasi sekali jalan

// cadangan di memori: kalau localStorage diblokir/rusak, aplikasi masih punya data terakhir yang sah
let cadanganMemori = [];

// pesan yang jelas ke pengguna bila penyimpanan bermasalah
function pesan(teks) {
  console.warn('[storage] ' + teks);
  const info = document.getElementById('info');
  if (info) info.textContent = teks;
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
    return [];
  }
  if (!Array.isArray(data)) return [];
  return data.filter((c) => c && typeof c === 'object' && typeof c.judul === 'string');
}

export function simpan(daftar) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(daftar));
    cadanganMemori = [...daftar];
  } catch (err) {
    pesan('Data tidak tersimpan permanen: penyimpanan penuh atau diblokir.');
  }
}
