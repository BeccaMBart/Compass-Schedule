
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Run from the repository root after completing the curriculum's manual checks
// and committing application changes in VS Code.
// Preview: node scripts/complete-lesson.mjs Q2W4 Tuesday --preview
// Record:  node scripts/complete-lesson.mjs Q2W4 Tuesday
// Running without --preview is the teacher's attestation of manual checks.

const args = process.argv.slice(2);
const preview = args.includes('--preview');
const lesson = args.filter(arg => arg !== '--preview').join(' ').trim();

if (!/^Q[234]W\d+ (Monday|Tuesday|Wednesday)$/.test(lesson)) {
  console.error('Usage: node scripts/complete-lesson.mjs Q2W4 Tuesday [--preview]');
  process.exit(1);
}

const root = process.cwd();
const paths = {
  readme: path.join(root, 'README.md'),
  board: path.join(root, 'docs', 'board.md'),
  log: path.join(root, 'docs', 'prompt-log.md'),
};

function requireFile(filename) {
  if (!fs.existsSync(filename)) {
    throw new Error(`Required file is missing: ${path.relative(root, filename)}`);
  }
  return fs.readFileSync(filename, 'utf8').replace(/\r\n/g, '\n');
}

function curriculumRows(index) {
  const rows = index.split('\n')
    .filter(line => /^\|\s*Q[234]W\d+ (?:Monday|Tuesday|Wednesday)\s*\|/.test(line))
    .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));
  if (!rows.length || rows.some(cells => cells.length !== 3 || cells.some(cell => !cell))) {
    throw new Error('Curriculum index has missing or malformed lesson rows.');
  }
  const ids = rows.map(cells => cells[0]);
  if (new Set(ids).size !== ids.length) {
    throw new Error('Curriculum index contains duplicate lesson identifiers.');
  }
  return rows;
}

function headingSection(source, title) {
  const headings = [...source.matchAll(/^## ([^\n]+)\s*$/gm)];
  const found = headings.filter(m => m[1].trim() === title);
  if (found.length !== 1) {
    throw new Error(`Expected exactly one "## ${title}" heading.`);
  }
  const at = headings.indexOf(found[0]);
  return {
    start: found[0].index + found[0][0].length,
    end: headings[at + 1]?.index ?? source.length,
    body: source.slice(found[0].index + found[0][0].length,
      headings[at + 1]?.index ?? source.length),
  };
}

function replaceSection(source, title, body) {
  const section = headingSection(source, title);
  return source.slice(0, section.start) + '\n\n' + body.trim() + '\n\n' +
    source.slice(section.end);
}

function replaceLabel(source, label, value) {
  const pattern = new RegExp(`^\\*\\*${label}:\\*\\*[^\\n]*$`, 'gm');
  const found = [...source.matchAll(pattern)];
  if (found.length !== 1) {
    throw new Error(`Expected exactly one board ${label} label.`);
  }
  return source.replace(pattern, `**${label}:** ${value}`);
}

function updateReadmeStatus(readme, status) {
  const body = headingSection(readme, 'Current Project Status').body;
  const paragraphs = body.trim().split(/\n\s*\n/);
  if (!paragraphs[0].startsWith('**')) {
    throw new Error('README current status does not begin with bold text.');
  }
  paragraphs[0] = `**${status}**`;
  return replaceSection(readme, 'Current Project Status', paragraphs.join('\n\n'));
}

function prependBeforeHeading(source, heading, text) {
  const matches = [...source.matchAll(/^## ([^\n]+)\s*$/gm)]
    .filter(m => m[1].trim() === heading);
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one "## ${heading}" heading.`);
  }
  const position = matches[0].index;
  return source.slice(0, position).trimEnd() + '\n\n' + text.trim() + '\n\n' +
    source.slice(position);
}

function removeExactBacklogTask(board, identifier) {
  const body = headingSection(board, 'Backlog').body;
  const removed = [];
  const kept = body.split('\n').filter(line => {
    if (!/^\s*\|/.test(line)) return true;
    const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
    if (cells.length >= 2 && cells[1] === identifier) {
      removed.push(cells[0]);
      return false;
    }
    return true;
  });
  if (removed.length > 1) {
    throw new Error(`Multiple Backlog cards match ${identifier}; review the board.`);
  }
  return { board: replaceSection(board, 'Backlog', kept.join('\n')), task: removed[0] };
}

function moveDailyCard(board, identifier) {
  const found = [];
  const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cardHeading = new RegExp(`^### ${escaped}(?: —|$)`, 'gm');
  for (const sectionName of ['Ready', 'Doing', 'Review']) {
    const body = headingSection(board, sectionName).body;
    const headings = [...body.matchAll(/^### [^\n]+/gm)];
    for (let i = 0; i < headings.length; i += 1) {
      const heading = headings[i];
      if (!cardHeading.test(heading[0])) {
        cardHeading.lastIndex = 0;
        continue;
      }
      cardHeading.lastIndex = 0;
      found.push({
        sectionName,
        body,
        start: heading.index,
        end: headings[i + 1]?.index ?? body.length,
      });
    }
  }
  if (found.length > 1) {
    throw new Error(`Multiple active cards match ${identifier}; review the board.`);
  }
  if (!found.length) return { board, card: null };

  const { sectionName, body, start, end } = found[0];
  let card = body.slice(start, end).trim();
  const status = '- **Status:** Completion recorded; teacher-attested.';
  const evidence = '- **Evidence:** Manual checks teacher-attested; frontend build passed.';
  card = /^- \*\*Status:\*\*.*$/m.test(card)
    ? card.replace(/^- \*\*Status:\*\*.*$/m, status)
    : card + '\n' + status;
  card = /^- \*\*Evidence:\*\*.*$/m.test(card)
    ? card.replace(/^- \*\*Evidence:\*\*.*$/m, evidence)
    : card + '\n' + evidence;

  let remaining = (body.slice(0, start) + body.slice(end)).trim();
  if (!remaining) {
    remaining = {
      Ready: 'No daily task is currently Ready.',
      Doing: 'No implementation task is currently in progress.',
      Review: 'No implementation task is awaiting review.',
    }[sectionName];
  }
  return {
    board: replaceSection(board, sectionName, remaining),
    card,
  };
}

function appendDone(board, text) {
  const body = headingSection(board, 'Done').body;
  return replaceSection(board, 'Done', body.trimEnd() + '\n\n' + text.trim());
}

function localDate() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')].join('-');
}

try {
  const frontend = path.join(root, 'frontend');
  if (!fs.existsSync(path.join(frontend, 'package.json'))) {
    throw new Error('Run from the repository root containing frontend/package.json.');
  }
  const gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
  if (path.resolve(gitRoot) !== path.resolve(root)) {
    throw new Error('Open the repository root in the terminal before running this script.');
  }

  const original = Object.fromEntries(
    Object.entries(paths).map(([key, filename]) => [key, requireFile(filename)])
  );
  const curriculum = curriculumRows(requireFile(path.join(root, 'docs', 'curriculum-index.md')));
  const sequence = curriculum.map(row => row[0]);
  const position = sequence.indexOf(lesson);
  if (position < 0) throw new Error(`${lesson} is not listed in the curriculum index.`);
  const [, title, target] = curriculum[position];
  const next = curriculum[position + 1];
  const previous = curriculum[position - 1]?.[0];

  const currentLine = original.board.match(
    /^\*\*Current lesson:\*\*\s*(Q[234]W\d+ (?:Monday|Tuesday|Wednesday))\b[^\n]*$/gm
  );
  if (!currentLine || currentLine.length !== 1) {
    throw new Error('Expected one board Current lesson label with a curriculum lesson ID.');
  }
  const current = currentLine[0].match(/Q[234]W\d+ (?:Monday|Tuesday|Wednesday)/)[0];
  const doneBody = headingSection(original.board, 'Done').body;
  const previousMarker = previous ? `### ${previous} — Completion Record` : null;
  const marker = `### ${lesson} — Completion Record`;
  if (Object.values(original).some(contents => contents.includes(marker))) {
    throw new Error(`${lesson} is already recorded; no duplicate was created.`);
  }
  if (new RegExp(`^### ${lesson} —`, 'm').test(doneBody)) {
    throw new Error(`${lesson} already has a Done card; review it before recording again.`);
  }
  if (previous && !doneBody.includes(previousMarker)) {
    throw new Error(`Previous curriculum lesson ${previous} has no completion record under Done.`);
  }
  if (current !== lesson && current !== previous) {
    throw new Error(
      `Board current lesson is ${current}. Expected ${previous ?? lesson} or ${lesson}; ` +
      'do not skip curriculum lessons.'
    );
  }

  // Validate document structure before starting a potentially expensive build.
  const boardOrder = ['Backlog', 'Ready', 'Doing', 'Review', 'Done', 'Blocked']
    .map(heading => headingSection(original.board, heading).start);
  if (boardOrder.some((position, i) => i > 0 && position <= boardOrder[i - 1])) {
    throw new Error('Board sections are not in their expected order.');
  }
  headingSection(original.readme, 'Current Project Status');
  headingSection(original.readme, 'Next Lesson');
  replaceLabel(original.board, 'Build status', 'Validation only');
  updateReadmeStatus(original.readme, 'Validation only');

  const frontendChanges = execFileSync('git',
    ['status', '--porcelain', '--', 'frontend'], {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  if (frontendChanges) {
    throw new Error('Uncommitted frontend changes found. Review and commit them in VS Code first.');
  }

  console.log('Running frontend production build...');
  execFileSync('npm', ['run', 'build'], { cwd: frontend, stdio: 'inherit' });

  let board = original.board;
  const backlog = removeExactBacklogTask(board, lesson);
  board = backlog.board;
  const moved = moveDailyCard(board, lesson);
  board = moved.board;

  const record = [
    marker,
    '',
    `**Curriculum task:** ${title}`,
    `**Curriculum acceptance target:** ${target}`,
    `**Recorded on:** ${localDate()}`,
    '**Manual checks:** Teacher-attested by invoking this command; ' +
      'browser behavior was not independently verified by the script.',
    '**Automated check:** Frontend `npm run build` passed during this invocation.',
    '**Frontend Git status:** No uncommitted frontend changes detected.',
    '**Git push:** Not verified by this script.',
    ...(backlog.task ? [`**Completed Backlog card:** ${backlog.task}`] : []),
    '**Scope:** Only this daily lesson is recorded. Other curriculum checks ' +
      'remain teacher-attested, and unrelated weekly cards are unchanged.',
  ].join('\n');

  board = appendDone(board, [moved.card, record].filter(Boolean).join('\n\n'));
  board = replaceLabel(board, 'Current lesson',
    `${lesson} — ${title} (completion recorded)`);
  board = replaceLabel(board, 'Build status',
    `${lesson}: frontend production build passed; manual checks teacher-attested.`);

  let readme = updateReadmeStatus(original.readme,
    `${lesson} — ${title}. Frontend production build passed; ` +
    'curriculum manual checks teacher-attested.');
  readme = prependBeforeHeading(readme, 'Next Lesson', record);
  readme = replaceSection(readme, 'Next Lesson', next
    ? `**Next curriculum lesson:** ${next[0]} — ${next[1]}\n\n` +
      `**Acceptance target:** ${next[2]}\n\n` +
      'Follow the official curriculum and current source snapshot. ' +
      'Do not implement future lessons early.'
    : 'The curriculum has no later Monday–Wednesday lesson. ' +
      'Confirm the final product and handoff against the original guide.');

  const updated = {
    readme,
    board,
    log: original.log.trimEnd() + '\n\n' + record + '\n',
  };
  console.log(`\nLesson: ${lesson} — ${title}`);
  console.log(`Next curriculum lesson: ${next ? `${next[0]} — ${next[1]}` : 'None'}`);
  console.log('Documentation: README.md, docs/board.md, docs/prompt-log.md');
  if (backlog.task) console.log(`Daily Backlog task moved to Done: ${backlog.task}`);

  if (preview) {
    console.log('PREVIEW ONLY: documentation unchanged.');
  } else {
    const backupRoot = path.join(root, 'tmp');
    fs.mkdirSync(backupRoot, { recursive: true });
    const backup = fs.mkdtempSync(path.join(backupRoot, 'lesson-backup-'));
    for (const [key, filename] of Object.entries(paths)) {
      fs.copyFileSync(filename, path.join(backup, `${key}.md`));
      fs.writeFileSync(path.join(backup, `updated-${key}.md`), updated[key]);
    }
    // Avoid overwriting edits made after our initial read.
    for (const [key, filename] of Object.entries(paths)) {
      if (requireFile(filename) !== original[key]) {
        throw new Error(`${path.relative(root, filename)} changed while checking; no files were updated.`);
      }
    }
    const replaced = [];
    try {
      for (const [key, filename] of Object.entries(paths)) {
        fs.renameSync(path.join(backup, `updated-${key}.md`), filename);
        replaced.push(key);
      }
    } catch (error) {
      for (const key of replaced) {
        fs.copyFileSync(path.join(backup, `${key}.md`), paths[key]);
      }
      throw new Error(`Writing failed; restored original files. ${error.message}`);
    }
    console.log('Documentation updated. Review the Git diff in VS Code.');
    console.log(`Safety backup: ${path.relative(root, backup)}`);
  }
} catch (error) {
  console.error(`Completion stopped: ${error.message}`);
  process.exitCode = 1;
}
