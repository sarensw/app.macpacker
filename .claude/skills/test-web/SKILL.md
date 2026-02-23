---
name: test-web
description: Run the test suite for this project.
context: fork
model: haiku
allowed-tools: Bash(npm run:*)
---

# Skill: test

Run the test suite for this project.

## Instructions

1. Run the tests using `npm run test` from the project root
2. If all tests pass, report a short summary of the results (number of tests passed, test files run)
3. If any tests fail, report:
   - Which test files and test cases failed
   - The relevant error messages and assertions
   - A brief suggestion for what might be wrong
4. If the user provides a specific test file or pattern, run only those tests using `npx vitest run <pattern>`

## Test Setup

- **Framework**: Vitest with jsdom environment
- **Test directory**: `__tests__/`
- **Config**: `vitest.config.ts`
- **Libraries**: `@testing-library/react`, `@testing-library/jest-dom`
