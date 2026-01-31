# Coding Guidelines

**Version:** 1.0.0  
**Last Updated:** 2026-01-31

These guidelines ensure consistency, quality, and maintainability across the codebase. All team members (human and AI) must follow these standards.

## Table of Contents
- [General Principles](#general-principles)
- [TypeScript Standards](#typescript-standards)
- [React/Component Standards](#react-component-standards)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Security](#security)
- [Performance](#performance)
- [Accessibility](#accessibility)

---

## General Principles

### DRY (Don't Repeat Yourself)
- Extract repeated logic into functions/components
- Use custom hooks for shared React logic
- Create utility functions for common operations

### SOLID Principles
- **Single Responsibility**: Each function/component does one thing
- **Open/Closed**: Extend behavior without modifying existing code
- **Liskov Substitution**: Subtypes must be substitutable for base types
- **Interface Segregation**: Keep interfaces small and focused
- **Dependency Inversion**: Depend on abstractions, not concretions

### KISS (Keep It Simple, Stupid)
- Prefer simple solutions over clever ones
- Write code that's easy to understand and maintain
- Avoid premature optimization

---

## TypeScript Standards

### Strict Mode
```typescript
// tsconfig.json must have:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Type Definitions
```typescript
// ✅ Good - Explicit types
interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

const getUser = async (id: string): Promise<User> => {
  // implementation
}

// ❌ Bad - Using 'any'
const getUser = async (id: any): Promise<any> => {
  // implementation
}
```

### Type vs Interface
```typescript
// ✅ Use 'interface' for object shapes
interface UserProps {
  user: User
  onSave: (user: User) => void
}

// ✅ Use 'type' for unions, intersections, primitives
type Status = 'active' | 'inactive' | 'pending'
type ID = string | number
```

### Enums
```typescript
// ✅ Use const enums for better tree-shaking
const enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// ❌ Avoid regular enums (unless you need runtime enumeration)
enum UserRole {
  Admin,
  User,
  Guest,
}
```

### Null Safety
```typescript
// ✅ Good - Proper null checking
const userName = user?.name ?? 'Unknown'

// ❌ Bad - Force unwrapping
const userName = user!.name
```

---

## React/Component Standards

### Functional Components Only
```typescript
// ✅ Good - Functional component
export const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return <div>{user.name}</div>
}

// ❌ Bad - Class component (legacy)
class UserProfile extends React.Component {
  // Don't use
}
```

### Component File Structure
```typescript
// 1. Imports
import { FC, useState, useEffect } from 'react'
import { User } from '@/types/user'

// 2. Types/Interfaces
interface UserProfileProps {
  user: User
  onSave: (user: User) => void
}

// 3. Component
export const UserProfile: FC<UserProfileProps> = ({ user, onSave }) => {
  // 3a. Hooks
  const [editing, setEditing] = useState(false)
  
  // 3b. Event handlers
  const handleSave = () => {
    // implementation
  }
  
  // 3c. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 4. Sub-components (if small and local)
const UserName: FC<{ name: string }> = ({ name }) => {
  return <span>{name}</span>
}
```

### Component Size
- **Maximum:** 200 lines per component
- **Ideal:** 50-100 lines
- **If larger:** Extract sub-components or hooks

### Props Naming
```typescript
// ✅ Good - Clear, consistent naming
interface ButtonProps {
  onClick: () => void
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

// ❌ Bad - Unclear naming
interface ButtonProps {
  click: () => void
  loading?: boolean
  type?: string
  content: any
}
```

### State Management
```typescript
// ✅ Good - useState for local state
const [user, setUser] = useState<User | null>(null)

// ✅ Good - useReducer for complex state
const [state, dispatch] = useReducer(userReducer, initialState)

// ✅ Good - Context for global state
const { user, setUser } = useUserContext()
```

### Custom Hooks
```typescript
// ✅ Good - Reusable logic
export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // fetch logic
  }, [userId])

  return { user, loading, error }
}

// Usage
const { user, loading, error } = useUser(userId)
```

---

## Code Quality

### ts-standard
All code must pass `ts-standard` linting:
```bash
npx ts-standard --fix
```

**Zero warnings policy** - All warnings must be addressed before commit.

### File Naming
```
PascalCase for components:
- UserProfile.tsx
- Button.tsx
- ProfilePage.tsx

camelCase for utilities/hooks:
- userService.ts
- useAuth.ts
- formatDate.ts

kebab-case for styles (if needed):
- user-profile.css
```

### Import Organization
```typescript
// 1. React imports
import { FC, useState, useEffect } from 'react'

// 2. Third-party imports
import { useNavigate } from 'react-router-dom'

// 3. Internal imports - absolute paths with @
import { User } from '@/types/user'
import { userService } from '@/services/userService'
import { Button } from '@/components/ui/Button'

// 4. Relative imports (if any)
import { UserForm } from './UserForm'

// 5. Styles
import './UserProfile.css'
```

### Path Aliases
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// Usage
import { User } from '@/types/user'
// NOT: import { User } from '../../../types/user'
```

### Comments
```typescript
// ✅ Good - Explain WHY, not WHAT
// Using debounce to avoid excessive API calls during typing
const debouncedSearch = debounce(handleSearch, 300)

// ❌ Bad - Stating the obvious
// Set loading to true
setLoading(true)

// ✅ Good - Complex logic explanation
/**
 * Calculates user score based on activity and engagement.
 * Formula: (posts * 2) + (comments * 1) + (likes * 0.5)
 * Capped at 1000 to prevent gaming the system.
 */
const calculateUserScore = (activity: UserActivity): number => {
  // implementation
}
```

---

## Testing

### Test Coverage Requirements
- **Minimum:** 70% overall
- **Critical paths:** 90%+
- **Utilities:** 100%

### Test File Location
```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── services/
│   ├── userService.ts
│   └── __tests__/
│       └── userService.test.ts
```

### Test Naming
```typescript
describe('UserService', () => {
  describe('getUser', () => {
    it('should fetch user successfully', async () => {
      // test
    })
    
    it('should throw error when user not found', async () => {
      // test
    })
    
    it('should handle network errors gracefully', async () => {
      // test
    })
  })
})
```

### AAA Pattern (Arrange-Act-Assert)
```typescript
it('should update user name', async () => {
  // Arrange
  const user = { id: '1', name: 'John' }
  const updatedName = 'Jane'
  
  // Act
  const result = await userService.updateUser(user.id, { name: updatedName })
  
  // Assert
  expect(result.name).toBe(updatedName)
})
```

---

## Git Workflow

### Branch Strategy
```
main (production-ready code)
 └─ dev (integration branch)
     ├─ feat/PROJ-123-user-profile
     ├─ bug/PROJ-124-login-fix
     ├─ content/PROJ-125-homepage-copy
     └─ translation/PROJ-126-french
```

### Branch Naming
```bash
# Feature
feat/PROJ-123-short-description

# Bug fix
bug/PROJ-124-issue-description

# Content changes
content/PROJ-125-page-name

# Translation
i18n/PROJ-126-locale-name

# Refactoring
refactor/PROJ-127-component-name

# Documentation
docs/PROJ-128-update-guidelines

# Styling/Design
style/PROJ-129-dark-mode

# Performance
perf/PROJ-130-optimize-bundle

# Tests
test/PROJ-131-add-coverage
```

**Naming Convention:**
- **Type prefixes (short forms):**
  - `feat/` - New features
  - `bug/` - Bug fixes
  - `content/` - Content/copy changes
  - `i18n/` - Translations
  - `refactor/` - Code refactoring
  - `docs/` - Documentation updates
  - `style/` - Styling/design changes
  - `perf/` - Performance improvements
  - `test/` - Test additions

**Rules:**
- Always include ticket key
- Keep description short (3-5 words max)
- Use kebab-case
- Lowercase only
- Format: `{type}/{TICKET-KEY}-{description}`

### Commit Messages
```bash
# Format
{emoji} PROJ-123: {concise description}

# Examples
✨ PROJ-123: Add user profile component
🐛 PROJ-124: Fix navigation crash on logout
📝 PROJ-125: Update homepage hero copy
🌐 PROJ-126: Add French translations
♻️ PROJ-127: Refactor auth service
✅ PROJ-128: Add profile component tests
🎨 PROJ-129: Update button styles
```

**Emoji Legend:**
- ✨ New feature
- 🐛 Bug fix
- 📝 Content/documentation
- 🌐 Translation/i18n
- ♻️ Refactoring
- ✅ Tests
- 🎨 UI/styling
- 🔒 Security fix
- ⚡ Performance improvement
- 🚀 Deployment

### Merge Strategy
```bash
# Always merge dev → main (PO decision)
# Never merge feat → main directly

# Merge feat/bug branches → dev
git checkout dev
git merge --no-ff feat/PROJ-123-user-profile
git push origin dev
```

---

## Security

### Environment Variables
```typescript
// ✅ Good - Use env vars for secrets
const API_URL = import.meta.env.VITE_API_URL

// ❌ Bad - Hardcoded secrets
const API_URL = 'https://api.example.com'
const API_KEY = 'sk_live_123abc' // NEVER DO THIS
```

### API Keys
```typescript
// ✅ Good - Server-side only
// API keys should NEVER be in frontend code
// Use backend proxy for authenticated requests

// ❌ Bad - Exposed API key
const fetchData = () => {
  fetch('https://api.service.com', {
    headers: { 'API-Key': 'secret_key' } // EXPOSED!
  })
}
```

### Input Validation
```typescript
// ✅ Good - Validate all user input
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

// ✅ Good - Type validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

### XSS Prevention
```typescript
// ✅ Good - React auto-escapes
<div>{userInput}</div>

// ⚠️ Dangerous - Only use when absolutely necessary
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

// ❌ Never - Direct HTML injection
element.innerHTML = userInput
```

### SQL Injection (Backend)
```typescript
// ✅ Good - Parameterized queries
const user = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
)

// ❌ Bad - String concatenation
const user = await db.query(
  `SELECT * FROM users WHERE id = '${userId}'`
)
```

### Dependency Security
```bash
# Regular security audits
npm audit
npm audit fix

# Update dependencies regularly
npm update
```

### Code Review Checklist
- [ ] No API keys or secrets in code
- [ ] Environment variables used correctly
- [ ] User input validated and sanitized
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Dependencies up to date
- [ ] Authentication/authorization checks
- [ ] HTTPS only for production

---

## Performance

### Code Splitting
```typescript
// ✅ Good - Lazy load routes
import { lazy, Suspense } from 'react'

const ProfilePage = lazy(() => import('@/pages/ProfilePage'))

// Usage
<Suspense fallback={<Loading />}>
  <ProfilePage />
</Suspense>
```

### Memoization
```typescript
// ✅ Good - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

// ✅ Good - Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

### Image Optimization
```typescript
// ✅ Good - Optimized images
<img 
  src="/images/hero.webp" 
  srcSet="/images/hero@2x.webp 2x"
  alt="Hero image"
  loading="lazy"
  width={800}
  height={600}
/>

// ❌ Bad - Large, unoptimized images
<img src="/images/hero.png" />
```

### Bundle Size
```bash
# Analyze bundle
npm run build
npm run analyze

# Keep main bundle < 200KB gzipped
```

---

## Accessibility

### Semantic HTML
```typescript
// ✅ Good - Semantic elements
<button onClick={handleClick}>Submit</button>
<nav>...</nav>
<main>...</main>
<footer>...</footer>

// ❌ Bad - Div soup
<div onClick={handleClick}>Submit</div>
```

### ARIA Labels
```typescript
// ✅ Good - Descriptive labels
<button aria-label="Close dialog" onClick={onClose}>
  <CloseIcon />
</button>

<input 
  type="text" 
  aria-label="Search users"
  aria-describedby="search-help"
/>
```

### Keyboard Navigation
```typescript
// ✅ Good - Keyboard accessible
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

### Color Contrast
- Minimum ratio: 4.5:1 for normal text
- Minimum ratio: 3:1 for large text
- Test with tools: axe DevTools, Lighthouse

---

## Evolution of Guidelines

### Updating These Guidelines

**When to update:**
- New patterns emerge
- Better practices discovered
- Team consensus on changes
- Technology updates

**How to update:**
1. Discuss proposed change with team
2. Update GUIDELINES.md
3. Increment version number
4. Document in CHANGELOG.md
5. Notify all agents via CLAUDE.md update

### Version History
- **1.0.0** (2026-01-31) - Initial version

---

---

## Documentation Maintenance

### Living Documentation Principle
All `.md` files in the project root are **living documents** that evolve with the codebase.

### When to Update Documentation

**GUIDELINES.md** - Update when:
- New coding patterns emerge
- Technology stack changes
- Security requirements change
- Team adopts new standards
- Git workflow changes

**DESIGN.md** - Update when:
- New colors added (e.g., dark mode palette)
- Typography changes
- New components created
- Brand guidelines evolve
- Spacing/layout patterns change
- Accessibility requirements added

**CLAUDE.md** - Update when:
- Project structure changes
- New agents added
- Workflow changes
- Tool integrations change
- Environment variables added

### Update Process

#### During Ticket Work
If a ticket introduces changes that affect documentation:

```markdown
## Example: Dark Mode Implementation

Ticket: PROJ-150 - Add dark mode support

Files to update:
1. Implement dark mode (code)
2. Update DESIGN.md with:
   - Dark mode color palette
   - Dark mode component styles
   - Usage guidelines
   - Toggle component specs
```

#### Agent Responsibility
**Which agent updates docs:**

- **web-developer**: Updates GUIDELINES.md if new patterns introduced
- **marketer**: Updates DESIGN.md for content guidelines
- **translator**: Updates DESIGN.md for localization notes
- **reviewer**: Ensures documentation updates are included
- **pr-agent**: Includes documentation changes in commit

#### Documentation Update Checklist

When implementing a feature, check if these need updates:

**DESIGN.md updates needed if:**
- [ ] New colors introduced
- [ ] New typography styles
- [ ] New components created
- [ ] Design patterns changed
- [ ] Brand guidelines evolved
- [ ] Dark mode / theming added
- [ ] New icons or imagery standards

**GUIDELINES.md updates needed if:**
- [ ] New file structure patterns
- [ ] New coding conventions
- [ ] Security rules changed
- [ ] Testing requirements changed
- [ ] Git workflow updated
- [ ] New tools adopted
- [ ] Performance standards changed

**CLAUDE.md updates needed if:**
- [ ] New environment variables
- [ ] New agent types
- [ ] Workflow changes
- [ ] Integration changes
- [ ] Project structure changes

### Documentation Update Format

#### Adding to DESIGN.md

```markdown
## Example: Adding Dark Mode

1. Add new color section:

### Dark Mode Palette
\`\`\`css
/* Dark mode colors */
--color-dark-bg-primary: #0f172a;
--color-dark-bg-secondary: #1e293b;
--color-dark-text-primary: #f1f5f9;
--color-dark-text-secondary: #cbd5e1;
\`\`\`

2. Update component styles:

#### Button (Dark Mode)
\`\`\`typescript
<button className="
  dark:bg-primary-500 dark:hover:bg-primary-600
  dark:text-white
">
  Primary Action
</button>
\`\`\`

3. Add usage guidelines:

### Dark Mode Implementation
- Use `dark:` prefix for dark mode styles
- Ensure 4.5:1 contrast ratio in dark mode
- Test all components in both modes
```

#### Adding to GUIDELINES.md

```markdown
## Example: New Pattern Adopted

Add to relevant section:

### Dark Mode State Management
\`\`\`typescript
// ✅ Use theme context
const { theme, setTheme } = useTheme()

// ✅ Persist user preference
localStorage.setItem('theme', theme)

// ✅ Respect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
\`\`\`
```

### Version Control for Documentation

**Increment version when:**
- Major sections added/removed
- Significant standards change
- Breaking changes to patterns

**Format:**
```markdown
**Version:** 1.1.0  
**Last Updated:** 2026-02-15
**Changes:** Added dark mode design system
```

### Reviewer Verification

The **reviewer agent** must verify:
- [ ] Documentation updates included in PR
- [ ] Updates are accurate and complete
- [ ] Examples are clear
- [ ] Version incremented if needed
- [ ] No outdated information left behind

### When Documentation Conflicts

If ticket work contradicts existing documentation:

1. **First, verify if documentation is outdated**
   - If yes: Update documentation
   - If no: Follow existing documentation

2. **If new pattern is better:**
   - Discuss with team (add comment in ticket)
   - Update documentation
   - Document reason for change
   - Refactor existing code if needed

3. **Document both approaches temporarily:**
   ```markdown
   ### Authentication Pattern
   
   **Current (deprecated):**
   Using local storage for tokens
   
   **New (preferred):**
   Using httpOnly cookies
   
   **Migration:** All new code uses new pattern. 
   Existing code will be migrated in PROJ-XXX.
   ```

---

## Enforcement

### Automated Checks
- `ts-standard` (linting)
- `tsc --noEmit` (type checking)
- `npm test` (test coverage)
- Pre-commit hooks (Husky)

### Code Review
All code must be reviewed for:
- Adherence to guidelines
- Security vulnerabilities
- Performance implications
- Accessibility compliance

### Agent Compliance
All AI agents must:
- Read GUIDELINES.md before coding
- Follow all standards
- Explain deviations in comments
- Update guidelines when finding improvements

---

**Remember:** These guidelines exist to help us write better code. If a rule doesn't make sense in a specific context, document why and discuss with the team.
