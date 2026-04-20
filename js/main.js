import { RpnEngine } from './engine/rpn.js';
import { initKeypad } from './ui/keypad.js';
import { initDrawer } from './ui/drawer.js';
import { renderStack } from './ui/display.js';

const engine = new RpnEngine();

initKeypad(engine);
initDrawer(engine);
renderStack(engine);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(err => {
    console.error('SW registration failed:', err);
  });
}
