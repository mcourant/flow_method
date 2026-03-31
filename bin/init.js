#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const targetDir = process.cwd();
const packageDir = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const command = args[0];

// Files/dirs to copy into the target project
const entries = ['_flow', '.claude', '_flow_output'];

function copyRecursive(src, dest, { forceUpdate = false } = {}) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child), { forceUpdate });
    }
  } else {
    const rel = path.relative(targetDir, dest);

    if (fs.existsSync(dest)) {
      if (forceUpdate) {
        // In update mode: overwrite workflows and commands, skip config/learnings/user data
        const skipPatterns = ['config.xml', 'learnings.xml', 'sprint-status.yaml', '.gitkeep'];
        if (skipPatterns.some(p => dest.endsWith(p))) {
          console.log(`  SKIP (user data): ${rel}`);
          return;
        }

        // Skip _flow_output files (user's work)
        if (dest.includes('_flow_output') && !dest.endsWith('.gitkeep')) {
          console.log(`  SKIP (user data): ${rel}`);
          return;
        }

        // Check if file actually changed
        const srcContent = fs.readFileSync(src);
        const destContent = fs.readFileSync(dest);
        if (srcContent.equals(destContent)) {
          return; // Silent skip — no change
        }

        fs.copyFileSync(src, dest);
        console.log(`  UPDATE: ${rel}`);
      } else {
        console.log(`  SKIP (exists): ${rel}`);
      }
      return;
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`  ${forceUpdate ? 'ADD' : 'COPY'}: ${rel}`);
  }
}

// ─── UPDATE MODE ───
if (command === 'update') {
  console.log('\n  FLOW Method — Update\n');
  console.log('  Updating workflows, commands, and templates...');
  console.log('  (Your config.xml, learnings.xml, and output files are preserved)\n');

  for (const entry of entries) {
    const src = path.join(packageDir, entry);
    const dest = path.join(targetDir, entry);
    if (fs.existsSync(src)) {
      copyRecursive(src, dest, { forceUpdate: true });
    }
  }

  console.log('\n  Update complete! Your config and data are untouched.\n');
  process.exit(0);
}

// ─── INIT MODE (default) ───
console.log('\n  FLOW Method — Init\n');

// Check if _flow already exists
if (fs.existsSync(path.join(targetDir, '_flow', 'config.xml'))) {
  console.log('  _flow/config.xml already exists — running in update mode (skip existing files)\n');
}

for (const entry of entries) {
  const src = path.join(packageDir, entry);
  const dest = path.join(targetDir, entry);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
  }
}

// Interactive config setup
const configPath = path.join(targetDir, '_flow', 'config.xml');
const configContent = fs.readFileSync(configPath, 'utf8');

if (configContent.includes('{{PROJECT_NAME}}')) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const ask = (q) => new Promise((r) => rl.question(q, r));

  (async () => {
    const projectName = await ask('\n  Project name: ');
    const userName = await ask('  Your name: ');
    const commLang = await ask('  Communication language (default: English): ') || 'English';
    const docLang = await ask('  Document language (default: English): ') || 'English';

    let config = configContent
      .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
      .replace(/\{\{USER_NAME\}\}/g, userName)
      .replace(/\{\{COMM_LANG\}\}/g, commLang)
      .replace(/\{\{DOC_LANG\}\}/g, docLang);

    fs.writeFileSync(configPath, config);
    console.log(`\n  Config written to _flow/config.xml`);

    // Update learnings.xml placeholder
    const learningsPath = path.join(targetDir, '_flow', 'learnings.xml');
    if (fs.existsSync(learningsPath)) {
      const today = new Date().toISOString().split('T')[0];
      let learnings = fs.readFileSync(learningsPath, 'utf8');
      learnings = learnings.replace('{{DATE}}', today);
      fs.writeFileSync(learningsPath, learnings);
    }

    console.log('\n  Done! Available commands:');
    console.log('    /pm          — Dashboard & next action');
    console.log('    /story       — Create next story');
    console.log('    /dev         — Implement a story');
    console.log('    /design      — UX/UI design');
    console.log('    /review      — Adversarial code review');
    console.log('    /retro       — Epic retrospective');
    console.log('    /brainstorm  — Brainstorming session');
    console.log('    /research    — Web research\n');

    rl.close();
  })();
} else {
  console.log('\n  Update complete! Existing config preserved.\n');
}
