/** RPN stack engine — sole owner of all mutable calculator state. */
export class RpnEngine {
  constructor() {
    this.stack = [];
    this.inputBuffer = '';
    this.isInputting = false;
    this.undoStack = [];
    this.sigDigits = 8;
    this.historyLog = [];
  }

  // ── Snapshot helpers ──────────────────────────────────────────────────────

  _saveSnapshot() {
    this.undoStack.push({
      stack: [...this.stack],
      inputBuffer: this.inputBuffer,
      isInputting: this.isInputting,
    });
    if (this.undoStack.length > 10000) this.undoStack.shift();
  }

  /** Push input buffer to stack without creating an undo snapshot (auto-lift). */
  _autoLift() {
    if (!this.isInputting) return;
    const value = parseFloat(this.inputBuffer);
    this.stack.push(isNaN(value) ? 0 : value);
    this.inputBuffer = '';
    this.isInputting = false;
  }

  _addHistory(expression, result) {
    this.historyLog.unshift({ expression, result, timestamp: Date.now() });
  }

  // ── Digit entry ───────────────────────────────────────────────────────────

  /** Append a digit (0–9) to the input buffer. */
  digit(d) {
    if (!this.isInputting) {
      this.inputBuffer = String(d);
      this.isInputting = true;
    } else {
      if (this.inputBuffer.length >= 20) return;
      this.inputBuffer += String(d);
    }
  }

  /** Append a decimal point (ignored if one already present). */
  decimal() {
    if (!this.isInputting) {
      this.inputBuffer = '.';
      this.isInputting = true;
    } else {
      if (this.inputBuffer.includes('.') || this.inputBuffer.length >= 20) return;
      this.inputBuffer += '.';
    }
  }

  // ── ENTER ─────────────────────────────────────────────────────────────────

  /** Push input buffer to stack, or duplicate X if not inputting. */
  enter() {
    if (this.isInputting) {
      this._saveSnapshot();
      const value = parseFloat(this.inputBuffer);
      this.stack.push(isNaN(value) ? 0 : value);
      this.inputBuffer = '';
      this.isInputting = false;
    } else if (this.stack.length > 0) {
      this._saveSnapshot();
      this.stack.push(this.stack[this.stack.length - 1]);
    }
    // empty stack + not inputting → no action
  }

  // ── Binary operators ──────────────────────────────────────────────────────

  /**
   * Apply a binary operator. op: '+' | '-' | '*' | '/'.
   * Returns null on success or { error: string } on failure.
   */
  operator(op) {
    this._autoLift();
    if (this.stack.length < 2) return { error: 'Error: Stack underflow' };

    this._saveSnapshot();
    const x = this.stack.pop();
    const y = this.stack.pop();
    let result;
    let exprOp;

    switch (op) {
    case '+': result = y + x; exprOp = '+'; break;
    case '-': result = y - x; exprOp = '\u2212'; break;
    case '*': result = y * x; exprOp = '\u00D7'; break;
    case '/':
      if (x === 0) {
        this.stack.push(y, x);
        this.undoStack.pop();
        return { error: 'Error: \u00F7 0' };
      }
      result = y / x;
      exprOp = '\u00F7';
      break;
    }

    if (result === Infinity || result === -Infinity) {
      this.stack.push(y, x);
      this.undoStack.pop();
      return { error: 'Error: Overflow' };
    }
    if (isNaN(result)) {
      this.stack.push(y, x);
      this.undoStack.pop();
      return { error: 'Error' };
    }

    this.stack.push(result);
    this._addHistory(`${y} ENTER ${x} ${exprOp}`, result);
    return null;
  }

  // ── Scientific functions ──────────────────────────────────────────────────

  /** Square root of X. Error if X < 0. */
  sqrt() {
    this._autoLift();
    if (this.stack.length < 1) return { error: 'Error: Stack underflow' };
    const x = this.stack[this.stack.length - 1];
    if (x < 0) return { error: 'Error: \u221A <0' };
    this._saveSnapshot();
    this.stack.pop();
    const result = Math.sqrt(x);
    this.stack.push(result);
    this._addHistory(`\u221A ${x}`, result);
    return null;
  }

  /** Y raised to the power X. */
  pow() {
    this._autoLift();
    if (this.stack.length < 2) return { error: 'Error: Stack underflow' };
    this._saveSnapshot();
    const x = this.stack.pop();
    const y = this.stack.pop();
    const result = Math.pow(y, x);
    if (isNaN(result)) {
      this.stack.push(y, x);
      this.undoStack.pop();
      return { error: 'Error' };
    }
    this.stack.push(result);
    this._addHistory(`${y} ENTER ${x} y\u02E3`, result);
    return null;
  }

  /**
   * HP-style percent: pops X, pushes Y*X/100. Y is preserved.
   * Requires Y on stack.
   */
  percent() {
    this._autoLift();
    if (this.stack.length < 2) return { error: 'Error: Stack underflow' };
    this._saveSnapshot();
    const x = this.stack.pop();
    const y = this.stack[this.stack.length - 1];
    const result = y * x / 100;
    this.stack.push(result);
    this._addHistory(`${y} ENTER ${x} %`, result);
    return null;
  }

  /** Negate X (or input buffer if mid-entry). */
  sign() {
    if (this.isInputting) {
      this.inputBuffer = this.inputBuffer.startsWith('-')
        ? this.inputBuffer.slice(1)
        : '-' + this.inputBuffer;
      return null;
    }
    if (this.stack.length === 0) return null;
    this._saveSnapshot();
    this.stack[this.stack.length - 1] = -this.stack[this.stack.length - 1];
    return null;
  }

  /** 1 divided by X. Error if X is 0. */
  reciprocal() {
    this._autoLift();
    if (this.stack.length < 1) return { error: 'Error: Stack underflow' };
    const x = this.stack[this.stack.length - 1];
    if (x === 0) return { error: 'Error: \u00F7 0' };
    this._saveSnapshot();
    this.stack.pop();
    const result = 1 / x;
    this.stack.push(result);
    this._addHistory(`1/${x}`, result);
    return null;
  }

  // ── Stack operations ──────────────────────────────────────────────────────

  /** Exchange X and Y. */
  swap() {
    this._autoLift();
    if (this.stack.length < 2) return { error: 'Error: Stack underflow' };
    this._saveSnapshot();
    const len = this.stack.length;
    [this.stack[len - 1], this.stack[len - 2]] = [this.stack[len - 2], this.stack[len - 1]];
    return null;
  }

  /** Roll: Z→X, X→Y, Y→Z. */
  rot() {
    this._autoLift();
    if (this.stack.length < 3) return { error: 'Error: Stack underflow' };
    this._saveSnapshot();
    const len = this.stack.length;
    const x = this.stack[len - 1];
    const y = this.stack[len - 2];
    const z = this.stack[len - 3];
    this.stack[len - 1] = z;
    this.stack[len - 2] = x;
    this.stack[len - 3] = y;
    return null;
  }

  /** Remove last digit from input buffer. No-op if not inputting. */
  backspace() {
    if (!this.isInputting) return;
    if (this.inputBuffer.length <= 1) {
      this.inputBuffer = '';
      this.isInputting = false;
    } else {
      this.inputBuffer = this.inputBuffer.slice(0, -1);
    }
  }

  /** Clear X register (clear input buffer if inputting, otherwise pop stack). */
  clx() {
    if (this.isInputting) {
      this.inputBuffer = '';
      this.isInputting = false;
      return null;
    }
    if (this.stack.length === 0) return null;
    this._saveSnapshot();
    this.stack.pop();
    return null;
  }

  /** Clear entire stack (caller must handle two-tap confirmation in UI). */
  clr() {
    this._saveSnapshot();
    this.stack = [];
    this.inputBuffer = '';
    this.isInputting = false;
  }

  // ── Undo ──────────────────────────────────────────────────────────────────

  /** Restore engine to the state before the last stack-modifying action. */
  undo() {
    if (this.undoStack.length === 0) return false;
    const snap = this.undoStack.pop();
    this.stack = snap.stack;
    this.inputBuffer = snap.inputBuffer;
    this.isInputting = snap.isInputting;
    return true;
  }
}
