#!/usr/bin/env node
/**
 * Generates PWA icon PNGs using only built-in Node.js modules.
 * Produces a dark-navy background with a simple orange "S" mark.
 * Run: node scripts/gen-icons.js
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

// ── CRC32 ─────────────────────────────────────────────────────────────────
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
function crc32(buf, start, end) {
  let c = 0xFFFFFFFF;
  for (let i = start; i < end; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const out = Buffer.alloc(4 + 4 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out, 4, 8 + data.length), 8 + data.length);
  return out;
}

// ── Draw pixel grid ───────────────────────────────────────────────────────
function makePNG(size) {
  // Pixel grid: [r, g, b] per pixel, row-major
  const pixels = new Uint8Array(size * size * 3);

  const BG  = [0x0B, 0x0B, 0x18]; // #0B0B18 dark navy
  const ACC = [0xFF, 0x95, 0x00]; // #FF9500 orange
  const FG  = [0xFF, 0xFF, 0xFF]; // white

  // Fill background
  for (let i = 0; i < size * size; i++) {
    pixels[i * 3]     = BG[0];
    pixels[i * 3 + 1] = BG[1];
    pixels[i * 3 + 2] = BG[2];
  }

  function setPixel(x, y, color) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    pixels[(y * size + x) * 3]     = color[0];
    pixels[(y * size + x) * 3 + 1] = color[1];
    pixels[(y * size + x) * 3 + 2] = color[2];
  }

  function fillRect(x, y, w, h, color) {
    for (let dy = 0; dy < h; dy++)
      for (let dx = 0; dx < w; dx++)
        setPixel(x + dx, y + dy, color);
  }

  function fillCircle(cx, cy, r, color) {
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++)
        if (dx * dx + dy * dy <= r * r)
          setPixel(cx + dx, cy + dy, color);
  }

  // Draw a rounded-square background plate in surface color
  const pad  = Math.round(size * 0.08);
  const inner = size - pad * 2;
  const rad  = Math.round(size * 0.22);
  // Rounded rect via circles at corners + rects
  fillRect(pad + rad, pad,       inner - rad * 2, inner, [0x1C, 0x1C, 0x2E]);
  fillRect(pad,       pad + rad, inner,           inner - rad * 2, [0x1C, 0x1C, 0x2E]);
  fillCircle(pad + rad,         pad + rad,         rad, [0x1C, 0x1C, 0x2E]);
  fillCircle(pad + inner - rad, pad + rad,         rad, [0x1C, 0x1C, 0x2E]);
  fillCircle(pad + rad,         pad + inner - rad, rad, [0x1C, 0x1C, 0x2E]);
  fillCircle(pad + inner - rad, pad + inner - rad, rad, [0x1C, 0x1C, 0x2E]);

  // Draw a bold orange horizontal bar near top (represents stack register)
  const barH = Math.round(size * 0.07);
  const barY = Math.round(size * 0.30);
  const barX = Math.round(size * 0.20);
  const barW = Math.round(size * 0.60);
  fillRect(barX, barY, barW, barH, ACC);

  // Two thinner white bars below (Y, Z registers)
  const barH2 = Math.round(size * 0.04);
  fillRect(barX, barY + barH + Math.round(size * 0.06), barW, barH2, FG);
  fillRect(barX, barY + barH + Math.round(size * 0.06) * 2 + barH2, barW, barH2, [0xFF, 0xFF, 0xFF, 0x80]);

  // ── Build PNG ────────────────────────────────────────────────────────────
  // Raw image data: filter byte (0) + RGB per scanline
  const raw = Buffer.alloc((1 + size * 3) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 3)] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 3;
      const dst = y * (1 + size * 3) + 1 + x * 3;
      raw[dst]     = pixels[src];
      raw[dst + 1] = pixels[src + 1];
      raw[dst + 2] = pixels[src + 2];
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB truecolor

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('assets/icons', { recursive: true });
writeFileSync('assets/icons/icon-192.png',          makePNG(192));
writeFileSync('assets/icons/icon-512.png',          makePNG(512));
writeFileSync('assets/icons/icon-maskable-512.png', makePNG(512));
console.log('Icons written to assets/icons/');
