import { describe, it, expect, beforeEach } from 'vitest';
import { RpnEngine } from '../js/engine/rpn.js';

let e;
beforeEach(() => { e = new RpnEngine(); });

// ── Helpers ───────────────────────────────────────────────────────────────
function push(engine, ...values) {
  for (const v of values) {
    const s = String(v < 0 ? -v : v);
    const dotIdx = s.indexOf('.');
    if (dotIdx === -1) {
      s.split('').forEach(d => engine.digit(Number(d)));
    } else {
      s.slice(0, dotIdx).split('').forEach(d => engine.digit(Number(d)));
      engine.decimal();
      s.slice(dotIdx + 1).split('').forEach(d => engine.digit(Number(d)));
    }
    if (v < 0) engine.sign();
    engine.enter();
  }
}

// ── Initial state ─────────────────────────────────────────────────────────
describe('initial state', () => {
  it('has empty stack', () => { expect(e.stack).toEqual([]); });
  it('has empty input buffer', () => { expect(e.inputBuffer).toBe(''); });
  it('is not inputting', () => { expect(e.isInputting).toBe(false); });
  it('has sigDigits 8', () => { expect(e.sigDigits).toBe(8); });
  it('has empty history', () => { expect(e.historyLog).toEqual([]); });
});

// ── Digit entry ───────────────────────────────────────────────────────────
describe('digit()', () => {
  it('starts input buffer', () => {
    e.digit(5);
    expect(e.inputBuffer).toBe('5');
    expect(e.isInputting).toBe(true);
  });

  it('appends digits', () => {
    e.digit(1); e.digit(2); e.digit(3);
    expect(e.inputBuffer).toBe('123');
  });

  it('resets buffer after non-input state', () => {
    e.digit(3); e.enter();
    e.digit(7);
    expect(e.inputBuffer).toBe('7');
  });

  it('ignores digits beyond 20 characters', () => {
    for (let i = 0; i < 25; i++) e.digit(1);
    expect(e.inputBuffer.length).toBe(20);
  });
});

// ── Decimal entry ─────────────────────────────────────────────────────────
describe('decimal()', () => {
  it('starts buffer with dot', () => {
    e.decimal();
    expect(e.inputBuffer).toBe('.');
    expect(e.isInputting).toBe(true);
  });

  it('appends decimal to existing digits', () => {
    e.digit(3); e.decimal(); e.digit(1);
    expect(e.inputBuffer).toBe('3.1');
  });

  it('ignores second decimal', () => {
    e.digit(3); e.decimal(); e.decimal(); e.digit(1);
    expect(e.inputBuffer).toBe('3.1');
  });

  it('respects 20-char limit — decimal appended when at 19 chars', () => {
    for (let i = 0; i < 19; i++) e.digit(1);
    e.decimal();
    // 19 digits + 1 dot = 20 chars (allowed)
    expect(e.inputBuffer.length).toBe(20);
    expect(e.inputBuffer).toContain('.');
  });

  it('respects 20-char limit — decimal rejected when buffer is full', () => {
    for (let i = 0; i < 20; i++) e.digit(1);
    e.decimal();
    // buffer is already 20; decimal ignored
    expect(e.inputBuffer.length).toBe(20);
    expect(e.inputBuffer).not.toContain('.');
  });
});

// ── ENTER ─────────────────────────────────────────────────────────────────
describe('enter()', () => {
  it('pushes input buffer to stack', () => {
    e.digit(4); e.digit(2); e.enter();
    expect(e.stack).toEqual([42]);
    expect(e.isInputting).toBe(false);
    expect(e.inputBuffer).toBe('');
  });

  it('normalises dot-only buffer to 0', () => {
    e.decimal(); e.enter();
    expect(e.stack).toEqual([0]);
  });

  it('duplicates X when not inputting', () => {
    push(e, 7);
    e.enter();
    expect(e.stack).toEqual([7, 7]);
  });

  it('does nothing on empty stack when not inputting', () => {
    e.enter();
    expect(e.stack).toEqual([]);
  });

  it('consecutive ENTERs duplicate', () => {
    push(e, 5);
    e.enter(); e.enter();
    expect(e.stack).toEqual([5, 5, 5]);
  });
});

// ── Binary operators ──────────────────────────────────────────────────────
describe('operator()', () => {
  it('adds two numbers', () => {
    push(e, 3, 5); e.operator('+');
    expect(e.stack).toEqual([8]);
  });

  it('subtracts', () => {
    push(e, 10, 3); e.operator('-');
    expect(e.stack).toEqual([7]);
  });

  it('multiplies', () => {
    push(e, 4, 5); e.operator('*');
    expect(e.stack).toEqual([20]);
  });

  it('divides', () => {
    push(e, 10, 2); e.operator('/');
    expect(e.stack).toEqual([5]);
  });

  it('auto-lifts input buffer before operating', () => {
    push(e, 3);
    e.digit(5);
    e.operator('+');
    expect(e.stack).toEqual([8]);
  });

  it('returns stack underflow with one item', () => {
    push(e, 3);
    const r = e.operator('+');
    expect(r.error).toBe('Error: Stack underflow');
    expect(e.stack).toEqual([3]);
  });

  it('returns stack underflow with empty stack', () => {
    const r = e.operator('+');
    expect(r.error).toBe('Error: Stack underflow');
  });

  it('returns div-by-zero error and preserves stack', () => {
    push(e, 6, 0);
    const r = e.operator('/');
    expect(r.error).toBe('Error: \u00F7 0');
    expect(e.stack).toEqual([6, 0]);
  });

  it('returns overflow error for infinity result', () => {
    e.stack.push(Infinity, 1);
    const r = e.operator('*');
    expect(r.error).toBe('Error: Overflow');
  });

  it('records history entry on success', () => {
    push(e, 3, 5); e.operator('+');
    expect(e.historyLog.length).toBe(1);
    expect(e.historyLog[0].result).toBe(8);
  });

  it('does not record history on error', () => {
    push(e, 5); e.operator('+');
    expect(e.historyLog.length).toBe(0);
  });
});

// ── Scientific functions ──────────────────────────────────────────────────
describe('sqrt()', () => {
  it('computes square root', () => {
    push(e, 9); e.sqrt();
    expect(e.stack).toEqual([3]);
  });

  it('returns error for negative', () => {
    push(e, -4);
    const r = e.sqrt();
    expect(r.error).toBe('Error: \u221A <0');
    expect(e.stack).toEqual([-4]);
  });

  it('returns underflow on empty stack', () => {
    const r = e.sqrt();
    expect(r.error).toBe('Error: Stack underflow');
  });

  it('auto-lifts before computing', () => {
    e.digit(1); e.digit(6); e.sqrt();
    expect(e.stack).toEqual([4]);
  });
});

describe('pow()', () => {
  it('computes Y^X', () => {
    push(e, 2, 3); e.pow();
    expect(e.stack).toEqual([8]);
  });

  it('returns error and restores stack for NaN result', () => {
    // Math.pow(-2, 0.5) = NaN
    push(e, -2);
    e.digit(0); e.decimal(); e.digit(5); // 0.5
    const r = e.pow();
    expect(r.error).toBe('Error');
    // Stack restored to [-2, 0.5]
    expect(e.stack.length).toBe(2);
    expect(e.stack[0]).toBe(-2);
    expect(e.stack[1]).toBe(0.5);
  });

  it('returns underflow with < 2 items', () => {
    push(e, 2);
    const r = e.pow();
    expect(r.error).toBe('Error: Stack underflow');
  });
});

describe('percent()', () => {
  it('HP-style: Y preserved, X replaced with Y*X/100 (15% of 100 = 15)', () => {
    push(e, 100, 15); e.percent();
    expect(e.stack).toEqual([100, 15]);
  });

  it('computes 50 * 20% = 10', () => {
    push(e, 50, 20); e.percent();
    expect(e.stack).toEqual([50, 10]);
  });

  it('returns underflow with < 2 items', () => {
    push(e, 10);
    const r = e.percent();
    expect(r.error).toBe('Error: Stack underflow');
  });
});

describe('sign()', () => {
  it('negates input buffer mid-entry', () => {
    e.digit(5); e.sign();
    expect(e.inputBuffer).toBe('-5');
  });

  it('removes negative sign from buffer', () => {
    e.digit(5); e.sign(); e.sign();
    expect(e.inputBuffer).toBe('5');
  });

  it('negates top of stack when not inputting', () => {
    push(e, 4); e.sign();
    expect(e.stack).toEqual([-4]);
  });

  it('does nothing on empty stack when not inputting', () => {
    e.sign();
    expect(e.stack).toEqual([]);
  });
});

describe('reciprocal()', () => {
  it('computes 1/X', () => {
    push(e, 4); e.reciprocal();
    expect(e.stack).toEqual([0.25]);
  });

  it('returns error for 1/0', () => {
    push(e, 0);
    const r = e.reciprocal();
    expect(r.error).toBe('Error: \u00F7 0');
    expect(e.stack).toEqual([0]);
  });

  it('returns underflow on empty stack', () => {
    const r = e.reciprocal();
    expect(r.error).toBe('Error: Stack underflow');
  });
});

// ── Stack operations ──────────────────────────────────────────────────────
describe('swap()', () => {
  it('exchanges X and Y', () => {
    push(e, 1, 2); e.swap();
    expect(e.stack).toEqual([2, 1]);
  });

  it('returns underflow with < 2 items', () => {
    push(e, 1);
    const r = e.swap();
    expect(r.error).toBe('Error: Stack underflow');
    expect(e.stack).toEqual([1]);
  });

  it('returns underflow on empty stack', () => {
    expect(e.swap().error).toBe('Error: Stack underflow');
  });
});

describe('rot()', () => {
  it('rolls: Z→X, X→Y, Y→Z', () => {
    // stack before: [1(bottom/Z), 2(Y), 3(top/X)]
    push(e, 1, 2, 3); e.rot();
    // Z(1)→X, X(3)→Y, Y(2)→Z → new stack: [2, 3, 1]
    expect(e.stack).toEqual([2, 3, 1]);
  });

  it('returns underflow with < 3 items', () => {
    push(e, 1, 2);
    const r = e.rot();
    expect(r.error).toBe('Error: Stack underflow');
  });
});

describe('backspace()', () => {
  it('removes last digit from input buffer', () => {
    e.digit(1); e.digit(2); e.digit(3);
    e.backspace();
    expect(e.inputBuffer).toBe('12');
    expect(e.isInputting).toBe(true);
  });

  it('clears buffer and exits input mode when only one char remains', () => {
    e.digit(7);
    e.backspace();
    expect(e.inputBuffer).toBe('');
    expect(e.isInputting).toBe(false);
  });

  it('does nothing when not inputting', () => {
    push(e, 5);
    e.backspace();
    expect(e.stack).toEqual([5]);
    expect(e.isInputting).toBe(false);
  });

  it('handles decimal point correctly', () => {
    e.digit(3); e.decimal(); e.digit(1); e.digit(4);
    e.backspace();
    expect(e.inputBuffer).toBe('3.1');
  });
});

describe('clx()', () => {
  it('clears input buffer when inputting', () => {
    e.digit(5); e.clx();
    expect(e.isInputting).toBe(false);
    expect(e.inputBuffer).toBe('');
  });

  it('pops top of stack when not inputting', () => {
    push(e, 1, 2); e.clx();
    expect(e.stack).toEqual([1]);
  });

  it('does nothing on empty stack', () => {
    e.clx();
    expect(e.stack).toEqual([]);
  });
});

describe('clr()', () => {
  it('clears entire stack', () => {
    push(e, 1, 2, 3); e.clr();
    expect(e.stack).toEqual([]);
  });

  it('clears input buffer', () => {
    e.digit(5); e.clr();
    expect(e.isInputting).toBe(false);
    expect(e.inputBuffer).toBe('');
  });

  it('can undo clear', () => {
    push(e, 1, 2, 3); e.clr(); e.undo();
    expect(e.stack).toEqual([1, 2, 3]);
  });
});

// ── Undo ──────────────────────────────────────────────────────────────────
describe('undo()', () => {
  it('returns false with no history', () => {
    expect(e.undo()).toBe(false);
  });

  it('reverts last operation', () => {
    push(e, 3, 5); e.operator('+');
    e.undo();
    expect(e.stack).toEqual([3, 5]);
  });

  it('steps back through multiple snapshots', () => {
    // Build state via direct digit/enter to avoid push() adding extra snapshots
    e.digit(3); e.enter(); // snap 1
    e.digit(5); e.enter(); // snap 2
    e.operator('+');       // snap 3 → stack=[8]
    e.digit(2); e.enter(); // snap 4
    e.operator('*');       // snap 5 → stack=[16]

    e.undo(); expect(e.stack).toEqual([8, 2]); // snap 5 removed
    e.undo(); expect(e.stack).toEqual([8]);     // snap 4 removed
    e.undo(); expect(e.stack).toEqual([3, 5]);  // snap 3 removed
  });

  it('caps at 10000 snapshots', () => {
    for (let i = 0; i < 10010; i++) {
      e.digit(1); e.enter();
    }
    expect(e.undoStack.length).toBeLessThanOrEqual(10000);
  });

  it('does not create a snapshot for digit presses', () => {
    e.digit(1); e.digit(2); e.digit(3);
    expect(e.undoStack.length).toBe(0);
  });

  it('reverts CLR', () => {
    push(e, 1, 2, 3); e.clr(); e.undo();
    expect(e.stack).toEqual([1, 2, 3]);
  });

  it('returns false after exhausting all snapshots', () => {
    e.digit(1); e.enter(); // 1 snapshot
    e.undo();              // use it
    expect(e.undo()).toBe(false);
  });
});

// ── Chained calculation ───────────────────────────────────────────────────
describe('chained calculations', () => {
  it('(3 + 5) * 2 = 16', () => {
    push(e, 3, 5); e.operator('+');
    push(e, 2); e.operator('*');
    expect(e.stack).toEqual([16]);
  });

  it('floating point: 0.1 + 0.2 stores ~0.3 internally', () => {
    push(e, 0.1, 0.2); e.operator('+');
    expect(e.stack[0]).toBeCloseTo(0.3);
  });
});

// ── History log ───────────────────────────────────────────────────────────
describe('historyLog', () => {
  it('newest entry is at index 0', () => {
    push(e, 2, 3); e.operator('+');
    push(e, 4, 5); e.operator('*');
    expect(e.historyLog[0].result).toBe(20);
    expect(e.historyLog[1].result).toBe(5);
  });

  it('entry has expression and timestamp', () => {
    push(e, 2, 3); e.operator('+');
    expect(e.historyLog[0].expression).toContain('+');
    expect(typeof e.historyLog[0].timestamp).toBe('number');
  });
});
