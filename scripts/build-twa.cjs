'use strict';
// Automated bubblewrap build — no interactive prompts.
// Usage: node scripts/build-twa.js
// Reads keystore password from .keystore.secret or env vars.

const path = require('path');
const fs = require('fs');
const https = require('https');

const CLI = 'C:/Users/horac/AppData/Roaming/npm/node_modules/@bubblewrap/cli';
const CORE = `${CLI}/node_modules/@bubblewrap/core`;

const { ConsoleLog, fetchUtils } = require(`${CORE}/dist/index.js`);
const { loadOrCreateConfig } = require(`${CLI}/dist/lib/config.js`);
const { build } = require(`${CLI}/dist/lib/cmds/build.js`);

// Load keystore password from .keystore.secret if env vars not set
function loadPasswords() {
  if (process.env.BUBBLEWRAP_KEYSTORE_PASSWORD) return;
  const secretFile = path.join(__dirname, '../.keystore.secret');
  if (!fs.existsSync(secretFile)) return;
  const lines = fs.readFileSync(secretFile, 'utf8').split('\n');
  for (const line of lines) {
    const [key, val] = line.split('=');
    if (key === 'KEYSTORE_PASSWORD') process.env.BUBBLEWRAP_KEYSTORE_PASSWORD = val.trim();
    if (key === 'KEYSTORE_PASSWORD') process.env.BUBBLEWRAP_KEY_PASSWORD = val.trim();
  }
}

class AutoPrompt {
  async printMessage(msg) { console.log('[build]', msg); }

  async promptConfirm(msg, defaultValue) {
    console.log(`[auto ✓] ${msg}`);
    return true; // Accept: install SDK, agree to terms, update project
  }

  async promptInput(msg, defaultValue, validate) {
    const val = defaultValue || '';
    console.log(`[auto →] ${msg} = "${val}"`);
    if (validate) {
      const r = await validate(val);
      if (r.isOk()) return r.unwrap();
      throw new Error(r.unwrapError().message);
    }
    return val;
  }

  async promptChoice(msg, choices, defaultValue, validate) {
    const val = defaultValue || choices[0];
    console.log(`[auto →] ${msg} = "${val}"`);
    if (validate) {
      const r = await validate(val);
      if (r.isOk()) return r.unwrap();
      throw new Error(r.unwrapError().message);
    }
    return val;
  }

  async promptPassword(msg, validate) {
    const pass = process.env.BUBBLEWRAP_KEYSTORE_PASSWORD || '';
    console.log(`[auto 🔑] ${msg} = (from env)`);
    if (validate) {
      const r = await validate(pass);
      if (r.isOk()) return r.unwrap();
      throw new Error(r.unwrapError().message);
    }
    return pass;
  }

  async downloadFile(url, filename, totalSize) {
    process.stdout.write(`[download] ${path.basename(filename)} `);
    await fetchUtils.downloadFile(url, filename, (done, total) => {
      if (total > 0) process.stdout.write(`\r[download] ${Math.round(done / total * 100)}%   `);
    });
    console.log('\r[download] done        ');
  }
}

async function main() {
  loadPasswords();
  if (!process.env.BUBBLEWRAP_KEYSTORE_PASSWORD) {
    console.error('ERROR: No keystore password found. Set BUBBLEWRAP_KEYSTORE_PASSWORD or create .keystore.secret');
    process.exit(1);
  }

  const prompt = new AutoPrompt();
  const log = new ConsoleLog('build');

  console.log('=== Stax TWA Build ===');
  console.log('Loading bubblewrap config...');
  const config = await loadOrCreateConfig(log, prompt);
  console.log('Android SDK:', config.androidSdkPath);

  console.log('\nBuilding TWA...');
  const ok = await build(config, { skipPwaValidation: true }, log, prompt);

  if (ok) {
    console.log('\n=== Build complete ===');
    console.log('  AAB (upload to Play): app-release-bundle.aab');
    console.log('  APK (sideload test):  app-release-signed.apk');
  } else {
    console.error('\nBuild failed.');
    process.exit(1);
  }
}

main().catch(err => { console.error('Fatal:', err.message || err); process.exit(1); });
