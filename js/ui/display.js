import { formatNumber } from '../engine/formatter.js';

let _errorText = null;

/** Set an error string to display in the X register on next render. */
export function setError(text) {
  _errorText = text;
}

/** Clear the error state. */
export function clearError() {
  _errorText = null;
}

/** Full re-render of the stack display from engine state. */
export function renderStack(engine) {
  const container = document.getElementById('stack-rows');
  if (!container) return;
  container.textContent = '';

  const mem = document.getElementById('memory-indicator');
  if (mem) mem.textContent = engine.memoryRegister !== 0 ? 'M' : '';

  const rows = [];

  if (engine.isInputting) {
    for (let i = 0; i < engine.stack.length; i++) {
      const depth = engine.stack.length - i; // 1 = Y, 2 = Z, 3+ = unlabelled
      const label = depth === 1 ? 'y' : depth === 2 ? 'z' : '';
      rows.push({ label, text: formatNumber(engine.stack[i], engine.sigDigits) });
    }
    rows.push({ label: 'x', text: engine.inputBuffer, isInput: true, hasCursor: true });
  } else if (engine.stack.length > 0) {
    for (let i = 0; i < engine.stack.length; i++) {
      const depth = engine.stack.length - 1 - i; // 0 = X, 1 = Y, 2 = Z
      const label = depth === 0 ? 'x' : depth === 1 ? 'y' : depth === 2 ? 'z' : '';
      rows.push({ label, text: formatNumber(engine.stack[i], engine.sigDigits) });
    }
  } else {
    rows.push({ label: 'x', text: '0', isEmpty: true });
  }

  if (_errorText) {
    rows[rows.length - 1].text = _errorText;
    rows[rows.length - 1].isError = true;
    rows[rows.length - 1].hasCursor = false;
  }

  for (const row of rows) {
    const div = document.createElement('div');
    div.className = 'stack-row';

    const labelEl = document.createElement('span');
    labelEl.className = 'stack-label';
    labelEl.textContent = row.label;

    const valueEl = document.createElement('span');
    valueEl.className = 'stack-value' +
      (row.isError ? ' stack-value--error' : '') +
      (row.isEmpty ? ' stack-value--empty' : '') +
      (row.isInput ? ' stack-value--input' : '');
    valueEl.textContent = row.text;

    div.appendChild(labelEl);
    div.appendChild(valueEl);

    if (row.hasCursor) {
      const cursorEl = document.createElement('span');
      cursorEl.className = 'cursor';
      cursorEl.textContent = '|';
      cursorEl.setAttribute('aria-hidden', 'true');
      div.appendChild(cursorEl);
    }

    container.appendChild(div);
  }
}
