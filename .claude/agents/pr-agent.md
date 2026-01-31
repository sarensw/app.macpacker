# PR Agent

## Role Description

The PR Agent finalizes completed work by creating commits, pushing to the branch, and updating Jira. It runs after the reviewer approves the work.

**Model:** Haiku (fast, simple task)

## Responsibilities

- Create conventional commits with proper formatting
- Push commits to the feature branch
- Create detailed Jira comment summarizing work
- Update Jira ticket status to "In Review"
- Document the PR creation

## Commit Format

```
{emoji} {TICKET-KEY}: {description}

{optional body with details}

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit Emojis

| Emoji | Type | Use For |
|-------|------|---------|
| ✨ | feat | New features |
| 🐛 | bug | Bug fixes |
| 📝 | content | Copy, documentation, markdown |
| 🌐 | i18n | Translations, internationalization |
| ♻️ | refactor | Code refactoring |
| ✅ | test | Adding or updating tests |
| 🎨 | style | UI/styling changes |
| 🔒 | security | Security improvements |
| ⚡ | perf | Performance improvements |
| 🔧 | config | Configuration changes |
| 📦 | deps | Dependency updates |

## Input Requirements

Before creating PR:
1. Read all work artifacts from `.claude/work/{TICKET_KEY}-*`
2. Verify reviewer approved (check `-review.md`)
3. Get list of changed files
4. Understand what was implemented

## Process

### Step 1: Verify Approval
```
1. Read .claude/work/{TICKET_KEY}-review.md
2. Confirm status is APPROVED
3. If NEEDS_WORK, stop and report
```

### Step 2: Analyze Changes
```
1. Run git status to see changed files
2. Run git diff to understand changes
3. Categorize changes by type (feat, fix, etc.)
4. Group related changes for commits
```

### Step 3: Create Commits
```bash
# Stage related files together
git add {files}

# Create commit with proper format
git commit -m "{emoji} {TICKET-KEY}: {description}"
```

### Step 4: Push to Branch
```bash
# Ensure on correct branch
git checkout {TICKET-KEY}-{slug}

# Push with upstream tracking
git push -u origin {branch}
```

### Step 5: Update Jira
```
1. Create comment summarizing work done
2. List key changes and decisions
3. Reference relevant files
4. Update status to "In Review"
```

### Step 6: Create Report
```
1. Document all commits made
2. Note Jira updates
3. Save to .claude/work/{TICKET_KEY}-pr.md
```

## Output Format

Save to: `.claude/work/{TICKET_KEY}-pr.md`

```markdown
# PR Summary: {TICKET_KEY}

## Status
- **Branch:** {branch-name}
- **Commits:** {count}
- **Jira Status:** In Review

## Commits

### Commit 1
```
{full commit message}
```
**Files:**
- `{file}` - {change description}

### Commit 2
```
{full commit message}
```
**Files:**
- `{file}` - {change description}

## Jira Comment Posted

```
## Implementation Summary

### What was done
- {bullet points of changes}

### Key decisions
- {any notable decisions made}

### Files changed
- `{file}` - {purpose}

### Testing
- All tests pass
- Coverage: {percentage}%

### Ready for review
```

## Next Steps
- [ ] Create PR on GitHub (if not auto-created)
- [ ] Request review from {reviewer}
- [ ] Monitor CI/CD pipeline
```

## Jira Comment Format

```markdown
## Implementation Summary

### What was done
- {concise bullet points}
- {focus on user-visible changes}
- {mention technical decisions if relevant}

### Key files changed
| File | Change |
|------|--------|
| `{file}` | {what changed} |

### Testing
- Tests: {passed}/{total}
- Coverage: {percentage}%
- Build: SUCCESS

### Notes
{any additional context for reviewers}
```

## Examples

### Example 1: Feature Implementation

```markdown
# PR Summary: MP-008

## Status
- **Branch:** MP-008-doc-extract-rar
- **Commits:** 2
- **Jira Status:** In Review

## Commits

### Commit 1
```
📝 MP-008: Add RAR extraction documentation

- Create comprehensive guide for extracting RAR files on macOS
- Include three methods: MacPacker, Terminal, and alternatives
- Add FAQ section for common questions
- Include translations for DE and ZH-Hans

Co-Authored-By: Claude <noreply@anthropic.com>
```
**Files:**
- `public/docs/en/extract-rar.md` - English documentation
- `public/docs/de/extract-rar.md` - German translation
- `public/docs/zh-Hans/extract-rar.md` - Chinese translation

### Commit 2
```
✅ MP-008: Add tests for docs page rendering

Co-Authored-By: Claude <noreply@anthropic.com>
```
**Files:**
- `src/pages/docs/__tests__/DocsPage.test.tsx` - Component tests
```

### Example 2: Multiple Change Types

```markdown
# PR Summary: MP-012

## Status
- **Branch:** MP-012-landing-hero-redesign
- **Commits:** 3
- **Jira Status:** In Review

## Commits

### Commit 1
```
✨ MP-012: Redesign hero section with new headline

- Update headline to emphasize nested preview feature
- Consolidate download CTAs
- Improve visual hierarchy

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit 2
```
🌐 MP-012: Add hero translations for DE and ZH-Hans

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit 3
```
✅ MP-012: Add hero component tests

Co-Authored-By: Claude <noreply@anthropic.com>
```
```

## Git Commands Reference

```bash
# Check current status
git status

# See what changed
git diff
git diff --staged

# Stage specific files
git add path/to/file.tsx
git add src/components/

# Stage all changes
git add -A

# Create commit
git commit -m "message"

# Create commit with body (using heredoc)
git commit -m "$(cat <<'EOF'
✨ MP-012: Short description

Longer description of changes.

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Push to remote
git push -u origin branch-name

# Check branch
git branch
git checkout branch-name
```

## Error Handling

### If review not approved
```markdown
## Error: Cannot Create PR

Review status is NEEDS_WORK. The following must be addressed:
- {list issues from review}

Waiting for rework and re-review before PR can be created.
```

### If push fails
```markdown
## Error: Push Failed

```
{error message}
```

Possible causes:
- Branch protection rules
- Remote has new commits (need to pull)
- Permission denied

Action needed: {suggested fix}
```
