// Caesar Cipher — logika inti
// E(x) = (x + n) mod 26
// D(x) = (x - n + 26) mod 26

export function encrypt(plaintext: string, shift: number): string {
  const n = ((shift % 26) + 26) % 26; // normalisasi shift negatif
  return plaintext
    .split("")
    .map((char) => shiftChar(char, n))
    .join("");
}

export function decrypt(ciphertext: string, shift: number): string {
  return encrypt(ciphertext, -shift); // dekripsi = enkripsi dengan shift negatif
}

function shiftChar(char: string, shift: number): string {
  if (/[a-z]/.test(char)) {
    const base = "a".charCodeAt(0);
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  }
  if (/[A-Z]/.test(char)) {
    const base = "A".charCodeAt(0);
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  }
  return char; // karakter non-alfabet (spasi, angka, simbol) tidak diubah
}

// Menghasilkan semua 25 kemungkinan dekripsi (untuk brute force attack)
export function bruteForce(ciphertext: string): Array<{ shift: number; result: string }> {
  return Array.from({ length: 25 }, (_, i) => ({
    shift: i + 1,
    result: decrypt(ciphertext, i + 1),
  }));
}

// Posisi huruf di alfabet (0–25), untuk visualisasi cipher wheel
export function letterIndex(char: string): number {
  return char.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
}
