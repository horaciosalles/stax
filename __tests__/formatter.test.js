import { describe, it, expect } from 'vitest';
import { formatNumber } from '../js/engine/formatter.js';

describe('formatNumber()', () => {
  // ── Special values ──────────────────────────────────────────────────────
  it('formats -0 as "0"', () => {
    expect(formatNumber(-0, 8)).toBe('0');
  });

  it('formats Infinity as ∞', () => {
    expect(formatNumber(Infinity, 8)).toBe('\u221E');
  });

  it('formats -Infinity as −∞', () => {
    expect(formatNumber(-Infinity, 8)).toBe('\u2212\u221E');
  });

  it('formats NaN as "Error"', () => {
    expect(formatNumber(NaN, 8)).toBe('Error');
  });

  // ── Basic numbers ───────────────────────────────────────────────────────
  it('formats integer without decimal', () => {
    expect(formatNumber(42, 8)).toBe('42');
  });

  it('formats simple decimal', () => {
    expect(formatNumber(3.14, 4)).toBe('3.14');
  });

  it('trims trailing zeros', () => {
    expect(formatNumber(1.5, 8)).toBe('1.5');
  });

  it('formats zero', () => {
    expect(formatNumber(0, 8)).toBe('0');
  });

  it('formats negative number', () => {
    expect(formatNumber(-42, 8)).toBe('-42');
  });

  it('formats negative decimal', () => {
    expect(formatNumber(-3.14, 4)).toBe('-3.14');
  });

  // ── Significant digits ──────────────────────────────────────────────────
  it('respects sigDigits=2', () => {
    const result = formatNumber(3.14159, 2);
    expect(result).toBe('3.1');
  });

  it('respects sigDigits=4', () => {
    const result = formatNumber(3.14159, 4);
    expect(result).toBe('3.142');
  });

  it('respects sigDigits=12', () => {
    const result = formatNumber(1 / 3, 12);
    expect(result).toBe('0.333333333333');
  });

  it('clamps sigDigits below 2 to 2', () => {
    const a = formatNumber(3.14159, 2);
    const b = formatNumber(3.14159, 1);
    expect(a).toBe(b);
  });

  it('clamps sigDigits above 12 to 12', () => {
    const a = formatNumber(1 / 3, 12);
    const b = formatNumber(1 / 3, 15);
    expect(a).toBe(b);
  });

  // ── Scientific notation ─────────────────────────────────────────────────
  it('uses × 10 notation for large numbers', () => {
    const result = formatNumber(1.23e10, 3);
    expect(result).toContain('\u00D7 10');
    expect(result).toContain('\u00B9'); // superscript 1 (for 10^10... actually 10)
  });

  it('formats 1e6 with positive exponent', () => {
    const result = formatNumber(1e6, 2);
    expect(result).toBe('1 \u00D7 10\u2076');
  });

  it('formats small numbers with negative superscript exponent', () => {
    // ECMAScript only uses exponential notation when exponent < -6, so use 1e-7
    const result = formatNumber(1e-7, 2);
    expect(result).toContain('\u207B'); // superscript minus
    expect(result).toContain('\u00D7 10');
  });

  it('formats 1.23e20 correctly', () => {
    const result = formatNumber(1.23e20, 3);
    expect(result).toContain('\u00D7 10');
    expect(result).toContain('\u00B2'); // ²
    expect(result).toContain('\u2070'); // ⁰
  });

  // ── Floating-point precision ─────────────────────────────────────────────
  it('cleans up 0.1+0.2 floating point noise at sigDigits=8', () => {
    const result = formatNumber(0.1 + 0.2, 8);
    expect(result).toBe('0.3');
  });

  it('formats pi at 6 digits', () => {
    expect(formatNumber(Math.PI, 6)).toBe('3.14159');
  });
});
