/** Number → display string formatter using significant digits. */

const SUPERSCRIPT_MAP = {
  '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074',
  '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079',
  '-': '\u207B',
};

function toSuperscript(str) {
  return str.split('').map(c => SUPERSCRIPT_MAP[c] ?? c).join('');
}

/**
 * Format a number for stack display using the given significant digits.
 * Uses Unicode superscripts for scientific notation (e.g. 1.23 × 10⁶).
 */
export function formatNumber(value, sigDigits) {
  if (Object.is(value, -0)) return '0';
  if (value === Infinity) return '\u221E';
  if (value === -Infinity) return '\u2212\u221E';
  if (isNaN(value)) return 'Error';

  const digits = Math.max(2, Math.min(12, sigDigits));
  const str = value.toPrecision(digits);

  if (str.includes('e')) {
    const eIdx = str.indexOf('e');
    const mantissa = parseFloat(str.slice(0, eIdx));
    const exp = parseInt(str.slice(eIdx + 1), 10);
    return `${mantissa} \u00D7 10${toSuperscript(String(exp))}`;
  }

  // Remove trailing zeros via parseFloat, then return as string
  return String(parseFloat(str));
}
