# Web Project - Autonomous Development System

## Project Overview
- **Framework**: React 18+ (TypeScript only)
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Linting**: ts-standard (NOT eslint)
- **Testing**: Vitest + React Testing Library
- **Architecture**: Component-based MVVM

## Critical Documents
**Read these BEFORE starting work:**
- `GUIDELINES.md` - Coding standards (TypeScript, React, Git, Security)
- `DESIGN.md` - Design system (colors, typography, components)
- `.env.example` - Required environment variables

## Jira Integration

### Configuration (from .env)
```bash
JIRA_HOST=https://yourcompany.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=your_api_token
JIRA_PROJECT_KEY=WEBPROJ
```

### Status Workflow
- `To Do` → `In Progress` → `In Review` → `Done` / back to `In Progress` (if rejected)

## Git Workflow

### Branch Strategy
```
main (production)
 └─ dev (integration)
     ├─ feat/PROJ-123-description
     ├─ bug/PROJ-124-description
     ├─ content/PROJ-125-description
     └─ translation/PROJ-126-locale
```

**Important:**
- ALL work branches from `dev`
- ALL PRs merge to `dev`
- ONLY PO merges `dev` → `main`

### Branch Naming Convention
```bash
feat/PROJ-123-short-desc    # Features
bug/PROJ-124-fix-issue      # Bug fixes
content/PROJ-125-page       # Content changes
translation/PROJ-126-fr     # Translations
refactor/PROJ-127-component # Refactoring
```

Rules:
- Lowercase only
- kebab-case for description
- Max 50 characters
- Always include ticket key

### Commit Message Format
```
{emoji} PROJ-123: {description}

Examples:
✨ PROJ-123: Add user profile component
🐛 PROJ-124: Fix login redirect
📝 PROJ-125: Update homepage copy
🌐 PROJ-126: Add French translations
♻️ PROJ-127: Refactor auth service
✅ PROJ-128: Add profile tests
🔒 PROJ-129: Fix API key exposure
```

## Agent Orchestration

### Agent Selection via Labels
Jira tickets must have labels to indicate required agents:

- `needs-code` → web-developer, web-tester
- `needs-translation` → translator
- `needs-content` → marketer
- `needs-all` → all doer agents

**Fallback:** No label = `needs-code`

### Agent Workflow
```
1. jira-reader  → Read the downloaded ticket, set "In Progress"
2. git-senior    → Create branch from dev
3. [Doer agents based on labels]
4. web-tester    → Validate everything
5. reviewer      → QA all work (including security)
6. [Loop if NEEDS_WORK]
7. pr-agent      → Commit, update Jira to "In Review"
```

## TypeScript Standards

**Strict mode ONLY:**
```typescript
// ✅ Always
interface User {
  id: string
  name: string
  email: string
}

const getUser = async (id: string): Promise<User> => {
  // implementation
}

// ❌ Never
const getUser = async (id: any): Promise<any> => {
  // DON'T USE 'any'
}
```

See `GUIDELINES.md` for complete TypeScript standards.

## Code Quality

### ts-standard (NOT eslint)
```bash
npx ts-standard --fix
```

**Zero warnings policy** before commit.

### File Structure
```
src/
├── components/
│   ├── ui/              # Reusable (Button, Input, Card)
│   ├── features/        # Feature-specific
│   └── layout/          # Layout components
├── pages/               # Route pages
├── hooks/               # Custom hooks
├── services/            # API services
├── types/               # TypeScript types
├── utils/               # Utilities
└── locales/             # Translations
    ├── en.json
    ├── nl.json
    └── fr.json
```

### Import Paths
```typescript
// Use @ alias for absolute imports
import { User } from '@/types/user'
import { Button } from '@/components/ui/Button'

// NOT relative imports
import { User } from '../../../types/user'
```

## Security Requirements

**Critical - Reviewer MUST check:**

### 1. Environment Variables
```typescript
// ✅ Correct
const API_URL = import.meta.env.VITE_API_URL

// ❌ Wrong - Hardcoded
const API_URL = 'https://api.example.com'
```

### 2. NO Secrets in Code
```typescript
// ❌ NEVER commit
const API_KEY = 'sk_live_abc123'
const JIRA_TOKEN = 'your_token'

// ✅ Always use .env
const API_KEY = import.meta.env.VITE_API_KEY
```

### 3. Input Validation
```typescript
// ✅ Always validate user input
const sanitize = (input: string) => {
  return input.trim().replace(/[<>]/g, '')
}
```

### 4. SQL Injection Prevention
```typescript
// ✅ Parameterized queries
db.query('SELECT * FROM users WHERE id = $1', [userId])

// ❌ String concatenation
db.query(`SELECT * FROM users WHERE id = '${userId}'`)
```

### 5. XSS Prevention
```typescript
// ✅ React auto-escapes
<div>{userInput}</div>

// ⚠️ Only when absolutely necessary
<div dangerouslySetInnerHTML={{ __html: sanitized }} />
```

See `GUIDELINES.md` for complete security checklist.

## Design System

All UI must follow `DESIGN.md`:

### Colors
```typescript
// Primary actions
bg-primary-600 hover:bg-primary-700

// Text
text-gray-900 (headings)
text-gray-600 (body)
text-gray-500 (captions)

// Semantic
text-error-600 (errors)
text-success-600 (success)
```

### Typography
```typescript
// Headings
text-4xl font-bold  (H1)
text-2xl font-semibold (H2)

// Body
text-base leading-normal (body)
text-sm (UI elements)
```

### Spacing
```typescript
// Components
p-6 (cards)
px-4 py-2 (buttons)
gap-4 (stacks)
mb-12 (sections)
```

See `DESIGN.md` for complete design system.

## Testing Requirements

### Coverage
- Minimum: 70% overall
- Critical paths: 90%
- Utilities: 100%

### Test Location
```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
```

### Running Tests
```bash
npm test                # All tests
npm run test:coverage   # With coverage
npm run build           # Verify build
npx ts-standard         # Lint check
```

## Translation System

### File Structure
```json
// src/locales/en.json
{
  "common": {
    "buttons": {
      "save": "Save",
      "cancel": "Cancel"
    }
  },
  "profile": {
    "title": "User Profile",
    "fields": {
      "name": "Name",
      "email": "Email"
    }
  }
}
```

### Usage
```typescript
import { useTranslation } from 'react-i18n'

const { t } = useTranslation()
<button>{t('common.buttons.save')}</button>
```

## Acceptance Criteria Format

Every Jira ticket MUST include:

```markdown
## User Story
As a [user], I want to [action] so that [benefit]

## Acceptance Criteria
1. Given [context], when [action], then [result]
2. Given [context], when [action], then [result]

## Required Agents (Labels)
- needs-code
- needs-translation

## Technical Details
- Components: [list]
- API endpoints: [list]
- New dependencies: [list]

## Design
[Figma link or screenshots]

## Security Considerations
- [ ] No hardcoded secrets
- [ ] Input validation implemented
- [ ] No SQL injection risk
- [ ] No XSS vulnerabilities
```

## Reviewer Responsibilities

The reviewer agent MUST check:

### Code Quality
- [ ] Follows GUIDELINES.md
- [ ] TypeScript strict mode (no 'any')
- [ ] ts-standard passes
- [ ] Components < 200 lines
- [ ] DRY principles followed

### Security
- [ ] No API keys in code
- [ ] Environment variables used correctly
- [ ] User input validated
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Dependencies secure (no known CVEs)

### Design
- [ ] Follows DESIGN.md
- [ ] Colors from design system
- [ ] Typography standards met
- [ ] Spacing consistent
- [ ] Responsive design

### Testing
- [ ] Tests written and passing
- [ ] Coverage meets minimum
- [ ] Acceptance criteria verified

### Consistency
- [ ] Integrates with existing code
- [ ] No duplicated logic
- [ ] Reuses existing components
- [ ] Follows established patterns

### Documentation Maintenance
- [ ] **DESIGN.md updated** if colors/typography/components added
- [ ] **GUIDELINES.md updated** if new patterns introduced
- [ ] **CLAUDE.md updated** if env vars or workflow changed
- [ ] Documentation version incremented if major changes
- [ ] Examples in documentation are accurate
- [ ] No outdated information conflicts

**Critical:** If a ticket introduces new design patterns (e.g., dark mode, new component library), the implementing agent MUST update the relevant `.md` files as part of the same commit.

## State Management

### File Locations
```
.claude/
├── state/              # Runtime state (gitignored)
│   ├── current-ticket.json
│   └── daily-progress-YYYY-MM-DD.json
├── work/               # Work artifacts (gitignored)
│   ├── PROJ-123-spec.md
│   ├── PROJ-123-implementation.md
│   ├── PROJ-123-test-report.md
│   └── PROJ-123-review.md
└── agents/             # Agent definitions (committed)
    ├── jira-fetcher.md
    ├── git-senior.md
    ├── web-developer.md
    ├── translator.md
    ├── marketer.md
    ├── web-tester.md
    ├── reviewer.md
    └── pr-agent.md
```

## Environment Setup

### Required Files
```bash
.env                # Local config (gitignored)
.env.example        # Template (committed)
GUIDELINES.md       # Coding standards (committed)
DESIGN.md          # Design system (committed)
CLAUDE.md          # This file (committed)
```

### Installation
```bash
npm install
cp .env.example .env
# Edit .env with your credentials
```

## Common Issues & Solutions

### Issue: ts-standard fails
**Solution:** Run `npx ts-standard --fix`

### Issue: TypeScript errors
**Solution:** Run `tsc --noEmit` to see errors

### Issue: Tests failing
**Solution:** Check `.claude/work/*-test-report.md`

### Issue: Build fails
**Solution:** Verify all dependencies installed

### Issue: Git conflicts
**Solution:** 
```bash
git checkout dev
git pull origin dev --rebase
git checkout feat/PROJ-123-description
git rebase dev
```

## Agent Constraints

### MUST DO
- Read GUIDELINES.md before coding
- Read DESIGN.md before UI work
- Follow TypeScript strict mode
- Use ts-standard (not eslint)
- Validate security (reviewer)
- Check for secrets in code
- Branch from dev (not main)
- Use .env for configuration

### MUST NOT DO
- Use JavaScript (TypeScript only)
- Use 'any' type
- Hardcode secrets/API keys
- Skip tests
- Ignore ts-standard warnings
- Merge to main directly
- Commit .env file
- Create branches from main

## Evolution

This document evolves with the project.

**When updating:**
1. Update this file
2. Update version at top
3. Document in CHANGELOG.md
4. Notify all agents

**Current version:** 2.0.0
**Last updated:** 2026-01-31
