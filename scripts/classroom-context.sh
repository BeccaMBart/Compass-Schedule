#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

LESSON_WEEK="${1:-}"
LESSON_DAY="${2:-}"
if [[ ! "$LESSON_WEEK" =~ ^Q[234]W[0-9]+$ ]] ||
   [[ ! "$LESSON_DAY" =~ ^(Monday|Tuesday|Wednesday)$ ]]; then
  printf '%s\n' 'Usage: bash scripts/classroom-context.sh Q2W4 Monday' >&2
  exit 1
fi

INDEX='docs/curriculum-index.md'
WEEK_FILE="docs/curriculum-weeks/${LESSON_WEEK}.md"
if [[ ! -f "$INDEX" || ! -f "$WEEK_FILE" ]]; then
  printf 'Missing curriculum index or weekly extract: %s\n' "$WEEK_FILE" >&2
  exit 1
fi

LESSON_ID="$LESSON_WEEK $LESSON_DAY"
LESSON_DETAILS="$(awk -F'|' -v id="$LESSON_ID" '
  /^\| Q[234]W[0-9]+ / {
    lesson=$2; title=$3; target=$4
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", lesson)
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", title)
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", target)
    if (lesson == id) { print title " — " target; count++ }
  }
  END { if (count != 1) exit 1 }
' "$INDEX")" || {
  printf 'Curriculum lesson %s is missing or duplicated.\n' "$LESSON_ID" >&2
  exit 1
}

mkdir -p "$REPO_ROOT/tmp"
OUTPUT_FILE="$REPO_ROOT/tmp/class-scheduler-context.txt"

{
  printf '%s current source\n' "$LESSON_ID"
  printf 'Curriculum assignment: %s\n' "$LESSON_DETAILS"
  printf 'Full weekly instructions: %s\n' "$WEEK_FILE"
  git status --short
  git log -1 --oneline
  git ls-files

  git ls-files --cached --others --exclude-standard -- \
    README.md 'docs/*.md' "$WEEK_FILE" \
    'frontend/*.json' 'frontend/*.html' 'frontend/*.js' \
    'frontend/src/*' 'scripts/*.sh' 'scripts/*.mjs' \
    'backend/*.py' 'backend/*.txt' 'backend/alembic.ini' \
    compose.yaml Dockerfile .dockerignore .gitignore \
    'deploy/*.yaml' deploy/Caddyfile '.github/workflows/*' \
    | sort -u | while IFS= read -r course_file; do
      case "$course_file" in
        docs/curriculum-weeks/*)
          [[ "$course_file" == "$WEEK_FILE" ]] || continue
          ;;
      esac
      printf '\nFILE %s\n' "$course_file"
      cat "$course_file"
      printf '\n'
    done
} > "$OUTPUT_FILE"

printf 'Created %s\n' "$OUTPUT_FILE"
