import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// From repository root: node scripts/complete-lesson.mjs Q2W3 Wednesday
// Add --preview to run checks without updating documentation.
const args = process.argv.slice(2);
const preview = args.includes('--preview');
const lesson = args.filter(arg => arg !== '--preview').join(' ').trim();
if (!/^Q[234]W\d+ (Monday|Tuesday|Wednesday|Thursday|Friday)$/.test(lesson)) {
  console.error('Usage: node scripts/complete-lesson.mjs Q2W3 Wednesday [--preview]');
  process.exit(1);
}

const root = process.cwd();
const files = {
  readme: path.join(root, 'README.md'),
  board: path.join(root, 'docs', 'board.md'),
  log: path.join(root, 'docs', 'prompt-log.md'),
};
const original = {};

function findCurriculumLesson(index, identifier) {
  const matches = index.split(/\r?\n/)
    .filter(line => line.startsWith('| Q'))
    .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()))
    .filter(cells => cells.length === 3 && cells[0] === identifier);
  if (matches.length !== 1) {
    throw new Error(`Curriculum lesson ${identifier} was not found exactly once. No completion recorded.`);
  }
  const [, title, target] = matches[0];
  if (!title || !target) throw new Error('Curriculum title or acceptance target missing.');
  return { title, target };
}

function ensureNextLesson(index, board, requested) {
  const sequence = index.split(/\r?\n/)
    .filter(line => line.startsWith('| Q'))
    .map(line => line.split('|')[1]?.trim())
    .filter(Boolean);
  const match = board.match(/^\*\*Current lesson:\*\* (Q[234]W\d+ (?:Monday|Tuesday|Wednesday))\b/m);
  if (!match) throw new Error('Board current lesson is missing or has an unexpected format.');
  const position = sequence.indexOf(match[1]);
  if (position < 0 || sequence[position + 1] !== requested) {
    throw new Error(`Next curriculum lesson after ${match[1]} is ${sequence[position + 1] ?? 'not available'}, not ${requested}.`);
  }
}

function replaceOnce(source, pattern, replacement, label) {
  if ([...source.matchAll(pattern)].length !== 1) throw new Error(`Expected exactly one ${label}.`);
  return source.replace(pattern, replacement);
}

function insertBefore(source, marker, text) {
  if (source.split(marker).length !== 2) throw new Error(`Expected one ${marker}.`);
  return source.replace(marker, `${text.trim()}\n\n${marker}`);
}

function localDate() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')].join('-');
}

try {
  for (const [name, filename] of Object.entries(files)) {
    original[name] = fs.readFileSync(filename, 'utf8');
  }
  if (!fs.existsSync(path.join(root, 'frontend', 'package.json'))) {
    throw new Error('Run from the repository root containing frontend/package.json.');
  }

  const curriculum = fs.readFileSync(path.join(root, 'docs', 'curriculum-index.md'), 'utf8');
  const assigned = findCurriculumLesson(curriculum, lesson);
  ensureNextLesson(curriculum, original.board, lesson);

  const marker = `### ${lesson} — Completion Record`;
  if (Object.values(original).some(source => source.includes(marker))) {
    throw new Error(`${lesson} already recorded; no duplicate created.`);
  }

  const boardLesson = /^(\*\*Current lesson:\*\*).*$/gm;
  const boardBuild = /^(\*\*Build status:\*\*).*$/gm;
  const readmeStatus = /(## Current Project Status\s*\n\s*)(\*\*[\s\S]*?\*\*)/g;
  for (const [source, pattern, label] of [
    [original.board, boardLesson, 'board lesson'],
    [original.board, boardBuild, 'board build status'],
    [original.readme, readmeStatus, 'README status'],
  ]) {
    if ([...source.matchAll(pattern)].length !== 1) throw new Error(`Expected one ${label}.`);
  }
  if (original.board.split('## Blocked').length !== 2 ||
      original.readme.split('## Next Lesson').length !== 2) {
    throw new Error('Expected unique Blocked and Next Lesson headings.');
  }

  // A clean frontend worktree does not prove a remote push occurred.
  const changes = execFileSync('git', ['status', '--porcelain', '--', 'frontend'],
    { cwd: root, encoding: 'utf8' }).trim();
  if (changes) throw new Error('Frontend changes remain uncommitted. Review and commit in VS Code first.');

  console.log('Running npm run build in frontend...');
  execFileSync('npm', ['run', 'build'], {
    cwd: path.join(root, 'frontend'), stdio: 'inherit',
  });

  const record = [
    marker,
    '',
    `**Curriculum task:** ${assigned.title}`,
    `**Curriculum acceptance target:** ${assigned.target}`,
    `**Recorded on:** ${localDate()}`,
    '**Manual checks:** Teacher-attested by running this command; browser behavior not observed by the script.',
    '**Production build:** Passed automatically (`npm run build`).',
    '**Application Git status:** No uncommitted frontend changes detected.',
    '**Git push:** Not verified by this script.',
    '**Scope:** Daily lesson record only. Weekly feature cards remain in Backlog until separately reviewed.',
    '',
  ].join('\n');

  const updated = { ...original };
  updated.board = replaceOnce(updated.board, boardLesson,
    `$1 ${lesson} — ${assigned.title} (completion recorded; teacher-attested)`, 'board lesson');
  updated.board = replaceOnce(updated.board, boardBuild,
    `$1 ${lesson}: production build passed; manual checks teacher-attested.`, 'board build');
  updated.board = insertBefore(updated.board, '## Blocked', record);
  updated.readme = replaceOnce(updated.readme, readmeStatus,
    (_, prefix) => `${prefix}**${lesson} — ${assigned.title}. Production build passed; curriculum manual checks teacher-attested.**`,
    'README status');
  updated.readme = insertBefore(updated.readme, '## Next Lesson', record);
  updated.log = updated.log.trimEnd() + '\n\n' + record;

  console.log(`\nLesson: ${lesson}`);
  console.log(`Curriculum task: ${assigned.title}`);
  console.log(`Curriculum target: ${assigned.target}`);
  console.log('Affected: README.md, docs/board.md, docs/prompt-log.md');
  if (preview) {
    console.log('PREVIEW ONLY: documentation unchanged.');
  } else {
    const backup = path.join(root, 'tmp', `lesson-backup-${Date.now()}`);
    fs.mkdirSync(backup, { recursive: true });
    for (const [name, filename] of Object.entries(files)) {
      fs.copyFileSync(filename, path.join(backup, `${name}.md`));
    }
    try {
      for (const [name, filename] of Object.entries(files)) {
        fs.writeFileSync(filename, updated[name]);
      }
    } catch (error) {
      for (const [name, filename] of Object.entries(files)) {
        fs.copyFileSync(path.join(backup, `${name}.md`), filename);
      }
      throw error;
    }
    console.log('Documentation updated. Review the changes in VS Code.');
    console.log(`Backup: ${path.relative(root, backup)}`);
  }
} catch (error) {
  console.error(`Completion stopped: ${error.message}`);
  process.exitCode = 1;
}
