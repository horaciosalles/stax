import { RpnEngine } from './engine/rpn.js';
import { initKeypad } from './ui/keypad.js';
import { initDrawer } from './ui/drawer.js';
import { renderStack } from './ui/display.js';
import { loadState } from './persistence.js';

const engine = new RpnEngine();
loadState(engine);

// Sync slider UI to restored sigDigits
const sigSlider = document.getElementById('sig-slider');
const sigLabel  = document.getElementById('sig-value');
if (sigSlider) sigSlider.value = engine.sigDigits;
if (sigLabel)  sigLabel.textContent = engine.sigDigits;

initKeypad(engine);
initDrawer(engine);
renderStack(engine);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(err => {
    console.error('SW registration failed:', err);
  });
}
