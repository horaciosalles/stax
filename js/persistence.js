const STORAGE_KEY = 'stax_v1';

export function saveState(engine) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      stack:       engine.stack,
      historyLog:  engine.historyLog,
      sigDigits:   engine.sigDigits,
      inputBuffer: engine.inputBuffer,
      isInputting: engine.isInputting,
    }));
  } catch { /* quota exceeded — ignore */ }
}

export function loadState(engine) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (Array.isArray(s.stack))           engine.stack       = s.stack;
    if (Array.isArray(s.historyLog))      engine.historyLog  = s.historyLog;
    if (typeof s.sigDigits   === 'number') engine.sigDigits   = s.sigDigits;
    if (typeof s.inputBuffer === 'string') engine.inputBuffer = s.inputBuffer;
    if (typeof s.isInputting === 'boolean') engine.isInputting = s.isInputting;
  } catch { /* corrupted data — start fresh */ }
}
