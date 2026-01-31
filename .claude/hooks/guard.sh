#!/bin/bash
# .claude/hooks/guard.sh
#
# PreToolUse hook — enforces project boundary and sensitive-file rules.
# Claude Code passes the tool invocation as JSON on stdin:
#   { "tool": "Read|Edit|Bash|...", "input": { ... } }
# Exit 0  → allow the tool call.
# Exit 1  → block it; stdout is shown to Claude as the reason.

set -euo pipefail

# ---------------------------------------------------------------------------
# 1. Read hook payload
# ---------------------------------------------------------------------------
PAYLOAD=$(cat)
TOOL=$(echo "$PAYLOAD" | jq -r '.tool // empty')
INPUT=$(echo "$PAYLOAD" | jq -r '.input // {}')

# ---------------------------------------------------------------------------
# 2. Resolve project root (where good-morning-project.sh lives)
# ---------------------------------------------------------------------------
PROJECT_ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
PROJECT_ROOT="$(cd "$PROJECT_ROOT" && pwd)"   # canonical absolute path

# ---------------------------------------------------------------------------
# 3. Helper – resolve any path to canonical absolute
# ---------------------------------------------------------------------------
resolve() {
    local p="$1"
    # If relative, anchor to PROJECT_ROOT
    if [[ "$p" != /* ]]; then
        p="$PROJECT_ROOT/$p"
    fi
    # Canonicalize without requiring the path to exist
    cd "$(dirname "$p")" 2>/dev/null && echo "$(pwd)/$(basename "$p")" || echo "$p"
}

# ---------------------------------------------------------------------------
# 4. Helper – check whether a canonical path is inside PROJECT_ROOT
# ---------------------------------------------------------------------------
inside_project() {
    local canonical="$1"
    [[ "$canonical" == "$PROJECT_ROOT"* ]]
}

# ---------------------------------------------------------------------------
# 5. Blocked path patterns (applied after canonicalisation)
# ---------------------------------------------------------------------------
BLOCKED_PATTERNS=(
    "/.git/"          # git internals
    "/.git"           # .git itself (exact)
    "/.env"           # .env (exact at any depth)
    "/node_modules/"  # dependencies – read-only via npm, not editable by agents
)

path_is_blocked() {
    local canonical="$1"
    for pat in "${BLOCKED_PATTERNS[@]}"; do
        # Check suffix or contains
        if [[ "$canonical" == *"$pat"* ]] || [[ "$canonical" == *"$pat" ]]; then
            return 0   # blocked
        fi
    done
    return 1           # allowed
}

# ---------------------------------------------------------------------------
# 6. Validate file-based tools (Read, Edit, MultiEdit, Write, Glob, Grep, LS)
# ---------------------------------------------------------------------------
validate_path() {
    local raw_path="$1"
    local canonical
    canonical="$(resolve "$raw_path")"

    # Must be inside project
    if ! inside_project "$canonical"; then
        echo "BLOCKED: path '$raw_path' resolves to '$canonical' which is outside the project root ($PROJECT_ROOT)."
        return 1
    fi

    # Must not match a blocked pattern
    if path_is_blocked "$canonical"; then
        echo "BLOCKED: path '$raw_path' matches a protected pattern (git internals, .env, node_modules)."
        return 1
    fi

    return 0
}

# ---------------------------------------------------------------------------
# 7. Validate Bash commands
# ---------------------------------------------------------------------------
DENIED_COMMANDS=(
    "^rm "
    "^rm$"
    "^rmdir "
    "^sudo "
    "^su "
    "^curl "
    "^wget "
    "^ssh "
    "^scp "
    "^rsync "
    "^docker "
    "^kill "
    "^pkill "
    "^systemctl "
    "^chown "
)

validate_bash() {
    local cmd="$1"
    # Trim leading whitespace
    cmd="${cmd#"${cmd%%[![:space:]]*}"}"

    for pattern in "${DENIED_COMMANDS[@]}"; do
        if [[ "$cmd" =~ $pattern ]]; then
            echo "BLOCKED: command '$cmd' matches denied pattern '$pattern'."
            return 1
        fi
    done

    # If the command contains a path (heuristic: anything with / not inside quotes)
    # check the first path-like token that isn't a flag
    # This is best-effort; the allow-list in settings.json is the primary gate for commands.
    return 0
}

# ---------------------------------------------------------------------------
# 8. Dispatch on tool type
# ---------------------------------------------------------------------------
case "$TOOL" in
    Read|Edit|MultiEdit|Write)
        FILE=$(echo "$INPUT" | jq -r '.file // .path // empty')
        if [[ -n "$FILE" ]]; then
            if ! validate_path "$FILE"; then
                exit 1
            fi
        fi
        ;;

    Glob|Grep|LS)
        # Glob: pattern; Grep: path or directory; LS: path
        PATH_VAL=$(echo "$INPUT" | jq -r '.pattern // .path // .directory // empty')
        if [[ -n "$PATH_VAL" ]]; then
            if ! validate_path "$PATH_VAL"; then
                exit 1
            fi
        fi
        ;;

    Bash)
        CMD=$(echo "$INPUT" | jq -r '.command // empty')
        if [[ -n "$CMD" ]]; then
            if ! validate_bash "$CMD"; then
                exit 1
            fi
        fi
        ;;
esac

# ---------------------------------------------------------------------------
# 9. All checks passed
# ---------------------------------------------------------------------------
exit 0