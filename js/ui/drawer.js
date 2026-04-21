import { formatNumber } from '../engine/formatter.js';
import { STRINGS } from '../strings.js';

let _engine = null;
let _isOpen = false;
let _dragStartX = 0;
let _dragCurrentX = 0;
let _isDragging = false;

const DRAG_THRESHOLD = 80;

function getEl(id) {
  return document.getElementById(id);
}

function openDrawer() {
  _isOpen = true;
  const drawer = getEl('drawer');
  const body   = getEl('drawer-body');
  const overlay = getEl('drawer-overlay');
  const handle = getEl('drawer-handle');
  drawer.classList.add('drawer--open');
  if (body) body.removeAttribute('inert');
  overlay.classList.add('overlay--visible');
  if (handle) handle.setAttribute('aria-expanded', 'true');
  renderHistory(_engine);
}

function closeDrawer() {
  _isOpen = false;
  const drawer = getEl('drawer');
  const body   = getEl('drawer-body');
  const overlay = getEl('drawer-overlay');
  const handle = getEl('drawer-handle');
  drawer.classList.remove('drawer--open');
  if (body) body.setAttribute('inert', '');
  drawer.style.transform = '';
  overlay.classList.remove('overlay--visible');
  if (handle) handle.setAttribute('aria-expanded', 'false');
}

/** Re-render the history list from engine state. */
export function renderHistory(engine) {
  const list = getEl('drawer-list');
  if (!list) return;
  list.textContent = '';

  if (!engine || engine.historyLog.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'drawer-empty';
    empty.textContent = STRINGS['display.empty_history'];
    list.appendChild(empty);
    return;
  }

  for (const entry of engine.historyLog) {
    const item = document.createElement('div');
    item.className = 'drawer-entry';
    item.setAttribute('role', 'listitem');

    const expr = document.createElement('div');
    expr.className = 'drawer-entry__expr';
    const exprText = entry.expression.length > 40
      ? entry.expression.slice(0, 40) + '\u2026'
      : entry.expression;
    expr.textContent = exprText;

    const result = document.createElement('div');
    result.className = 'drawer-entry__result';
    result.textContent = '= ' + formatNumber(entry.result, engine.sigDigits);

    item.appendChild(expr);
    item.appendChild(result);
    list.appendChild(item);

    const sep = document.createElement('hr');
    sep.className = 'drawer-sep';
    list.appendChild(sep);
  }
}

/** Initialise history drawer — binds handle tap and drag gesture. */
export function initDrawer(engine) {
  _engine = engine;
  const handle = getEl('drawer-handle');
  const overlay = getEl('drawer-overlay');
  if (!handle || !overlay) return;

  handle.addEventListener('click', () => {
    if (_isOpen) closeDrawer();
    else openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  // Touch drag to open
  handle.addEventListener('touchstart', e => {
    _isDragging = true;
    _dragStartX = e.touches[0].clientX;
    _dragCurrentX = _dragStartX;
  }, { passive: true });

  handle.addEventListener('touchmove', e => {
    if (!_isDragging) return;
    _dragCurrentX = e.touches[0].clientX;
    const delta = _dragCurrentX - _dragStartX;
    const drawer = getEl('drawer');
    if (!_isOpen && delta > 0) {
      const drawerW = drawer.offsetWidth;
      const base = -(drawerW - 32);
      const clamped = Math.min(0, base + delta);
      drawer.style.transform = `translateX(${clamped}px)`;
    }
  }, { passive: true });

  handle.addEventListener('touchend', () => {
    if (!_isDragging) return;
    _isDragging = false;
    const delta = _dragCurrentX - _dragStartX;
    const drawer = getEl('drawer');
    drawer.style.transform = '';
    if (!_isOpen && delta > DRAG_THRESHOLD) openDrawer();
  });
}
