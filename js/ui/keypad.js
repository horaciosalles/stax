import { vibrate } from './haptic.js';
import { setError, clearError, renderStack } from './display.js';
import { formatNumber } from '../engine/formatter.js';
import { STRINGS } from '../strings.js';

let _engine = null;
let _clrPending = false;
let _clrTimer = null;

function handleResult(result) {
  if (result && result.error) {
    setError(result.error);
    vibrate([10, 30, 10, 30, 10]);
    renderStack(_engine);
  } else {
    clearError();
    renderStack(_engine, { pushAnimation: true });
  }
}

function handleKey(key) {
  if (!_engine) return;

  // Digit keys clear error state before processing
  if (key.startsWith('digit-') || key === 'decimal') {
    clearError();
  }

  switch (key) {
  case 'digit-0': case 'digit-1': case 'digit-2': case 'digit-3': case 'digit-4':
  case 'digit-5': case 'digit-6': case 'digit-7': case 'digit-8': case 'digit-9':
    _engine.digit(parseInt(key.slice(6), 10));
    renderStack(_engine);
    vibrate(10);
    break;

  case 'decimal':
    _engine.decimal();
    renderStack(_engine);
    vibrate(10);
    break;

  case 'enter':
    _engine.enter();
    renderStack(_engine, { pushAnimation: true });
    vibrate(20);
    break;

  case 'plus':  handleResult(_engine.operator('+')); vibrate(10); break;
  case 'minus': handleResult(_engine.operator('-')); vibrate(10); break;
  case 'multiply': handleResult(_engine.operator('*')); vibrate(10); break;
  case 'divide':   handleResult(_engine.operator('/')); vibrate(10); break;

  case 'sqrt':      handleResult(_engine.sqrt());      vibrate(10); break;
  case 'pow':       handleResult(_engine.pow());       vibrate(10); break;
  case 'percent':   handleResult(_engine.percent());   vibrate(10); break;
  case 'sign':      handleResult(_engine.sign());      vibrate(10); break;
  case 'reciprocal': handleResult(_engine.reciprocal()); vibrate(10); break;

  case 'swap': handleResult(_engine.swap()); vibrate(10); break;
  case 'rot':  handleResult(_engine.rot());  vibrate(10); break;
  case 'clx':  handleResult(_engine.clx());  vibrate(10); break;

  case 'clr': {
    const btn = document.querySelector('[data-key="clr"]');
    if (_clrPending) {
      clearTimeout(_clrTimer);
      _clrPending = false;
      if (btn) { btn.textContent = STRINGS['key.clr']; btn.classList.remove('key--clr-pending'); }
      _engine.clr();
      clearError();
      renderStack(_engine);
      vibrate([10, 50, 10]);
    } else {
      _clrPending = true;
      if (btn) { btn.textContent = STRINGS['key.clr_confirm']; btn.classList.add('key--clr-pending'); }
      _clrTimer = setTimeout(() => {
        _clrPending = false;
        if (btn) { btn.textContent = STRINGS['key.clr']; btn.classList.remove('key--clr-pending'); }
      }, 2000);
      vibrate(10);
    }
    break;
  }

  case 'sto':  _engine.sto();   renderStack(_engine); vibrate(10); break;
  case 'rcl':  _engine.rcl();   renderStack(_engine); vibrate(10); break;
  case 'mplus':  _engine.mplus();  renderStack(_engine); vibrate(10); break;
  case 'mminus': _engine.mminus(); renderStack(_engine); vibrate(10); break;

  case 'undo': {
    const ok = _engine.undo();
    if (!ok) {
      // already dimmed; no-op
    } else {
      clearError();
      renderStack(_engine);
    }
    vibrate(10);
    _updateUndoState();
    break;
  }

  case 'copy': {
    const xVal = _engine.stack.length > 0
      ? _engine.stack[_engine.stack.length - 1]
      : 0;
    const text = formatNumber(xVal, _engine.sigDigits);
    const copyBtn = document.querySelector('[data-key="copy"]');
    navigator.clipboard.writeText(text).then(() => {
      if (copyBtn) {
        copyBtn.textContent = STRINGS['key.copy_success'];
        copyBtn.classList.add('key--copy-success');
        setTimeout(() => {
          if (copyBtn) {
            copyBtn.textContent = STRINGS['key.copy'];
            copyBtn.classList.remove('key--copy-success');
          }
        }, 1500);
      }
    }).catch(() => {
      if (copyBtn) copyBtn.textContent = STRINGS['key.copy_fail'];
      setTimeout(() => { if (copyBtn) copyBtn.textContent = STRINGS['key.copy']; }, 1500);
    });
    break;
  }
  }

  _updateUndoState();
}

function _updateUndoState() {
  const btn = document.querySelector('[data-key="undo"]');
  if (btn) btn.disabled = _engine.undoStack.length === 0;
}

function onKeydown(event) {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 'z' || event.key === 'Z') {
      event.preventDefault();
      handleKey('undo');
    }
    return;
  }
  if (event.key === 'Escape') { handleKey('clx'); return; }
  if (event.key === 'Enter') { handleKey('enter'); return; }
  if (event.key === '.') { handleKey('decimal'); return; }
  if (event.key === '+') { handleKey('plus'); return; }
  if (event.key === '-') { handleKey('minus'); return; }
  if (event.key === '*') { handleKey('multiply'); return; }
  if (event.key === '/') { event.preventDefault(); handleKey('divide'); return; }
  if (event.key >= '0' && event.key <= '9') {
    handleKey('digit-' + event.key);
  }
}

/** Initialise keypad event bindings. */
export function initKeypad(engine) {
  _engine = engine;

  document.addEventListener('keydown', onKeydown);

  document.querySelectorAll('[data-key]').forEach(btn => {
    btn.addEventListener('pointerdown', () => handleKey(btn.dataset.key));
  });

  // Sig-digits slider
  const slider = document.getElementById('sig-slider');
  const sigLabel = document.getElementById('sig-value');
  if (slider) {
    slider.addEventListener('input', () => {
      _engine.sigDigits = parseInt(slider.value, 10);
      if (sigLabel) sigLabel.textContent = slider.value;
      renderStack(_engine);
    });
  }

  _updateUndoState();
  renderStack(_engine);
}
