import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Run from the repository root.
// Preview:
// node scripts/complete-lesson.mjs Q2W4 Monday --preview
//
// Record completion after manual checks and frontend commit:
// node scripts/complete-lesson.mjs Q2W4 Monday

const args = process.argv.slice(2);
const preview = args.includes('--preview');
const lesson = args.filter(arg => arg !== '--preview').join(' ').trim();

if (!/^Q[234]W\d+ (Monday|Tuesday|Wednesday)$/.test(lesson)) {
  console.error(
    'Usage: node scripts/complete-lesson.mjs Q2W4 Monday [--preview]'
  );
  process.exit(1);
}

const root = process.cwd();

const files = {
  readme: path.join(root, 'README.md'),
  board: path.join(root, 'docs', 'board.md'),
  log: path.join(root, 'docs', 'prompt-log.md'),
};

const original = {};

function curriculumRows(index) {
  return index
    .split(/\r?\n/)
    .filter(line => /^\| Q[234]W\d+ /.test(line))
    .map(line =>
      line
        .split('|')
        .slice(1, -1)
        .map(cell => cell.trim())
    )
    .filter(cells => cells.length === 3);
}

function findCurriculumLesson(index, identifier) {
  const rows = curriculumRows(index);
  const matches = rows.filter(cells => cells[0] === identifier);

  if (matches.length !== 1) {
    throw new Error(
      `Curriculum lesson ${identifier} was not found exactly once.`
    );
  }

  const [, title, target] = matches[0];

  if (!title || !target) {
    throw new Error('Curriculum title or acceptance target missing.');
  }

  return { title, target };
}

function ensureCurrentLesson(index, board, requested) {
  const sequence = curriculumRows(index).map(cells => cells[0]);

  const match = board.match(
    /^\*\*Current lesson:\*\*\s+(Q[234]W\d+ (?:Monday|Tuesday|Wednesday))\b/m
  );

  if (!match) {
    throw new Error(
      'Board current lesson is missing or has an unexpected format.'
    );
  }

  const current = match[1];

  if (!sequence.includes(current)) {
    throw new Error(
      `Board current lesson ${current} is not in the curriculum index.`
    );
  }

  if (current !== requested) {
    throw new Error(
      `Current board lesson is ${current}, not ${requested}. ` +
      'Complete the current lesson before advancing.'
    );
  }

  const position = sequence.indexOf(requested);

  if (position > 0) {
    const previous = sequence[position - 1];

    if (!board.includes(`### ${previous} — Completion Record`)) {
      throw new Error(
        `Previous curriculum lesson ${previous} has no ` +
        'completion record in the task board.'
      );
    }
  }
}

function replaceOnce(source, pattern, replacement, label) {
  if ([...source.matchAll(pattern)].length !== 1) {
    throw new Error(`Expected exactly one ${label}.`);
  }

  return source.replace(pattern, replacement);
}

function insertBefore(source, marker, text) {
  if (source.split(marker).length !== 2) {
    throw new Error(`Expected one ${marker}.`);
  }

  return source.replace(
    marker,
    `${text.trim()}\n\n${marker}`
  );
}

function localDate() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
}

function moveCurrentCardToDone(board, lesson, record) {
  const doingHeading = '## Doing';
  const reviewHeading = '## Review';
  const doneHeading = '## Done';
  const blockedHeading = '## Blocked';

  for (const heading of [
    doingHeading,
    reviewHeading,
    doneHeading,
    blockedHeading,
  ]) {
    if (board.split(heading).length !== 2) {
      throw new Error(`Expected exactly one ${heading} heading.`);
    }
  }

  const doingStart = board.indexOf(doingHeading);
  const reviewStart = board.indexOf(reviewHeading);
  const doneStart = board.indexOf(doneHeading);
  const blockedStart = board.indexOf(blockedHeading);

  if (
    doingStart >= reviewStart ||
    reviewStart >= doneStart ||
    doneStart >= blockedStart
  ) {
    throw new Error('Task board sections are in an unexpected order.');
  }

  const doing = board.slice(
    doingStart + doingHeading.length,
    reviewStart
  );

  const cardHeading = `### ${lesson} —`;

  if (!doing.includes(cardHeading)) {
    throw new Error(
      `Could not find the ${lesson} task card under Doing.`
    );
  }

  if ((doing.match(/^### /gm) || []).length !== 1) {
    throw new Error(
      'Expected exactly one task card under Doing.'
    );
  }

  let completedCard = doing.trim();

  completedCard = replaceOnce(
    completedCard,
    /^- \*\*Evidence:\*\*.*$/gm,
    '- **Evidence:** Manual checks teacher-attested; ' +
      'production build passed. See completion record below.',
    'Doing card evidence'
  );

  completedCard = replaceOnce(
    completedCard,
    /^- \*\*Status:\*\*.*$/gm,
    '- **Status:** Completion recorded; teacher-attested.',
    'Doing card status'
  );

  const updatedDoing =
    `${doingHeading}\n\n` +
    'No implementation task is currently in progress.\n\n';

  let updatedBoard =
    board.slice(0, doingStart) +
    updatedDoing +
    board.slice(reviewStart);

  updatedBoard = insertBefore(
    updatedBoard,
    blockedHeading,
    `${completedCard}\n\n${record}`
  );

  return updatedBoard;
}

try {
  for (const [name, filename] of Object.entries(files)) {
    original[name] = fs.readFileSync(filename, 'utf8');
  }

  if (!fs.existsSync(path.join(root, 'frontend', 'package.json'))) {
    throw new Error(
      'Run from the repository root containing frontend/package.json.'
    );
  }

  const curriculum = fs.readFileSync(
    path.join(root, 'docs', 'curriculum-index.md'),
    'utf8'
  );

  const assigned = findCurriculumLesson(curriculum, lesson);

  ensureCurrentLesson(curriculum, original.board, lesson);

  const marker = `### ${lesson} — Completion Record`;

  if (Object.values(original).some(source => source.includes(marker))) {
    throw new Error(
      `${lesson} already recorded; no duplicate created.`
    );
  }

  const boardLesson = /^(\*\*Current lesson:\*\*).*$/gm;
  const boardBuild = /^(\*\*Build status:\*\*).*$/gm;

  const readmeStatus =
    /^(## Current Project Status[^\n]*\r?\n)(?:\r?\n)*\*\*[^\n]*\*\*/gm;

  for (const [source, pattern, label] of [
    [original.board, boardLesson, 'board lesson'],
    [original.board, boardBuild, 'board build status'],
    [original.readme, readmeStatus, 'README status'],
  ]) {
    if ([...source.matchAll(pattern)].length !== 1) {
      throw new Error(`Expected exactly one ${label}.`);
    }
  }

  if (original.readme.split('## Next Lesson').length !== 2) {
    throw new Error('Expected one README Next Lesson heading.');
  }

  // A clean frontend worktree does not prove a remote push occurred.
  const changes = execFileSync(
    'git',
    ['status', '--porcelain', '--', 'frontend'],
    {
      cwd: root,
      encoding: 'utf8',
    }
  ).trim();

  if (changes) {
    throw new Error(
      'Frontend changes remain uncommitted. ' +
      'Review and commit in VS Code first.'
    );
  }

  console.log('Running npm run build in frontend...');

  execFileSync('npm', ['run', 'build'], {
    cwd: path.join(root, 'frontend'),
    stdio: 'inherit',
  });

  const record = [
    marker,
    '',
    `**Curriculum task:** ${assigned.title}`,
    `**Curriculum acceptance target:** ${assigned.target}`,
    `**Recorded on:** ${localDate()}`,
    '**Manual checks:** Teacher-attested by running this command; ' +
      'browser behavior not observed by the script.',
    '**Production build:** Passed automatically (`npm run build`).',
    '**Application Git status:** No uncommitted frontend changes detected.',
    '**Git push:** Not verified by this script.',
    '**Scope:** Daily lesson record only. ' +
      'Future feature cards remain in Backlog.',
    '',
  ].join('\n');

  const updated = { ...original };

  updated.board = moveCurrentCardToDone(
    updated.board,
    lesson,
    record
  );

  updated.board = replaceOnce(
    updated.board,
    boardLesson,
    `$1 ${lesson} — ${assigned.title} (completion recorded)`,
    'board lesson'
  );

  updated.board = replaceOnce(
    updated.board,
    boardBuild,
    `$1 ${lesson}: production build passed; ` +
      'manual checks teacher-attested.',
    'board build'
  );

  updated.readme = replaceOnce(
    updated.readme,
    readmeStatus,
    (_, heading) =>
      `${heading}\n**${lesson} — ${assigned.title}. ` +
      'Production build passed; ' +
      'curriculum manual checks teacher-attested.**',
    'README status'
  );

  updated.readme = insertBefore(
    updated.readme,
    '## Next Lesson',
    record
  );

  updated.log =
    updated.log.trimEnd() + '\n\n' + record + '\n';

  console.log(`\nLesson: ${lesson}`);
  console.log(`Curriculum task: ${assigned.title}`);
  console.log(`Curriculum target: ${assigned.target}`);
  console.log(
    'Affected: README.md, docs/board.md, docs/prompt-log.md'
  );

  if (preview) {
    console.log('PREVIEW ONLY: documentation unchanged.');
  } else {
    const backup = path.join(
      root,
      'tmp',
      `lesson-backup-${Date.now()}`
    );

    fs.mkdirSync(backup, { recursive: true });

    for (const [name, filename] of Object.entries(files)) {
      fs.copyFileSync(
        filename,
        path.join(backup, `${name}.md`)
      );
    }

    try {
      for (const [name, filename] of Object.entries(files)) {
        fs.writeFileSync(filename, updated[name]);
      }
    } catch (error) {
      for (const [name, filename] of Object.entries(files)) {
        fs.copyFileSync(
          path.join(backup, `${name}.md`),
          filename
        );
      }

      throw error;
    }

    console.log(
      'Documentation updated. Review the changes in VS Code.'
    );

    console.log(
      `Backup: ${path.relative(root, backup)}`
    );
  }
} catch (error) {
  console.error(`Completion stopped: ${error.message}`);
  process.exitCode = 1;
}