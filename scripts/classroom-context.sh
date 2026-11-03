#!/usr/bin/env bash
set -euo pipefail

# Find the repository root.
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# Create a temporary folder inside the repository.
mkdir -p "$REPO_ROOT/tmp"

# Set the output file location.
OUTPUT_FILE="$REPO_ROOT/tmp/class-scheduler-context.txt"

# Collect the current source snapshot.
{
  printf '%s %s current source\n' "${1:-Current}" "${2:-lesson}"

  git status --short
  git log -1 --oneline
  git ls-files

  git ls-files --cached --others --exclude-standard -- \
    README.md 'docs/*.md' 'frontend/*.json' \
    'frontend/*.html' 'frontend/*.js' 'frontend/src/*' \
    'backend/*.py' 'backend/*.txt' 'backend/alembic.ini' \
    compose.yaml Dockerfile .dockerignore .gitignore \
    'deploy/*.yaml' deploy/Caddyfile '.github/workflows/*' \
    | sort -u | while IFS= read -r course_file; do
      printf '\nFILE %s\n' "$course_file"
      cat "$course_file"
      printf '\n'
    done

} > "$OUTPUT_FILE"

printf 'Created %s\n' "$OUTPUT_FILE"