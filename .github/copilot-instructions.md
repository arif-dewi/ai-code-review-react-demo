# GitHub Copilot Code Review Instructions

## 🚨 START EVERY REVIEW WITH THIS:

```markdown
## Test Coverage Analysis

New files added: [list them]
Files with tests: X/Y
Files without tests: [list them with ❌]

[If any files lack tests, mark as CRITICAL and explain why tests are needed]
```

## ⚠️ MANDATORY: Test Coverage Check

**FIRST PRIORITY - Check BEFORE reviewing code quality:**

For EVERY PR, you MUST:
1. List all new `.ts`, `.tsx`, `.js`, `.jsx` files added in `src/`
2. Check if each file has a corresponding `.test.ts` or `.test.tsx` file
3. Report missing test files in a "Test Coverage Analysis" section at the TOP of your review
4. Mark missing tests as CRITICAL severity
5. Files >50 lines without tests = CRITICAL
6. Services, hooks, utilities without tests = HIGH severity

## Code Review Focus Areas

### 1. Test Coverage Analysis (CRITICAL)
**Always check for test coverage gaps:**

- [ ] **New files without tests**: Check if any new `.ts`, `.tsx`, `.js`, or `.jsx` files lack corresponding test files
  - Look for files in `src/` without `*.test.ts`, `*.test.tsx`, or `*.spec.ts` counterparts
  - Flag any business logic file (services, utils, hooks) with >50 lines and no tests
  - Example: `src/features/todos/TodoService.ts` needs `src/features/todos/TodoService.test.ts`

- [ ] **Complex logic without tests**: Flag functions with:
  - Multiple conditional branches (if/else, switch)
  - Loops with complex logic
  - Error handling (try/catch)
  - Business logic calculations
  - Data transformations

- [ ] **Test file indicators to verify**:
  - Check for `vitest`, `jest`, `@testing-library` imports in corresponding test files
  - Verify test files actually test the new code (not just exist)

### 2. React Patterns & Performance

- [ ] **Hooks dependencies**: Verify `useEffect`, `useCallback`, `useMemo` have correct dependency arrays
- [ ] **Memoization**: Check for inline objects/functions passed as props without `useMemo`/`useCallback`
- [ ] **Keys in lists**: Ensure `.map()` uses stable keys (IDs), not array indices
- [ ] **Expensive calculations**: Flag calculations in render body that should be memoized

### 3. Security Vulnerabilities

- [ ] **XSS risks**: 
  - `dangerouslySetInnerHTML` without sanitization (suggest DOMPurify)
  - User input rendered without escaping
  - Dynamic script/style injection

- [ ] **Data validation**:
  - API responses without validation
  - User input without sanitization
  - Missing input constraints

### 4. Accessibility (a11y)

- [ ] **Semantic HTML**: Flag `<div onClick>` that should be `<button>`
- [ ] **ARIA attributes**: Check for missing `aria-label`, `role` on interactive elements
- [ ] **Keyboard navigation**: Verify interactive elements support keyboard (Enter/Space)
- [ ] **Focus management**: Check modals, dialogs have proper focus trapping

### 5. Code Quality

- [ ] **Magic numbers**: Flag hardcoded numeric values without explanation
- [ ] **Hardcoded strings**: Suggest constants/enums for repeated string literals
- [ ] **Error handling**: Check for unhandled promises, missing try/catch
- [ ] **Type safety**: Flag `any` types, suggest proper TypeScript types

### 6. TypeScript Best Practices

- [ ] **Strict typing**: Avoid `any`, use proper types or `unknown`
- [ ] **Type exports**: Ensure types are exported from barrel files
- [ ] **Null safety**: Check for optional chaining where needed

## Review Template

When reviewing PRs, always include:

1. **Summary**: Brief overview of changes
2. **Test Coverage Status**: 
   - ✅ Adequate tests / ⚠️ Missing tests / ❌ No tests
   - List specific files needing tests
3. **Critical Issues**: Security, performance, accessibility bugs (High priority)
4. **Code Quality**: Style, maintainability suggestions (Medium priority)
5. **Suggestions**: Optional improvements (Low priority)

## Test Coverage Red Flags

**Always flag these scenarios:**

```typescript
// ❌ NEW SERVICE FILE WITHOUT TESTS
// File: src/services/UserService.ts (150 lines)
export class UserService {
  static validateUser() { /* complex logic */ }
  static calculatePermissions() { /* complex logic */ }
}
// Missing: src/services/UserService.test.ts

// ❌ NEW HOOK WITHOUT TESTS
// File: src/hooks/useAuth.ts
export function useAuth() {
  // Complex state management
  return { login, logout, user };
}
// Missing: src/hooks/useAuth.test.ts

// ❌ COMPLEX UTILITY WITHOUT TESTS
// File: src/utils/validation.ts
export function validateEmail(email: string) {
  // Regex logic, edge cases
}
// Missing: src/utils/validation.test.ts
```

## Example Review Comments

### Test Coverage Issue
```
⚠️ **Missing Test Coverage**

The new `TodoService.ts` file (138 lines) contains complex business logic without any test coverage:

- `validateTodo()` - validation with multiple rules
- `calculatePriority()` - priority scoring algorithm  
- `filterTodos()` - filtering with business rules
- `sortByPriority()` - sorting logic

**Recommendation:**
Create `src/features/todos/TodoService.test.ts` with test cases for:
- Valid/invalid todo validation
- Priority calculation edge cases
- Filter combinations
- Sort stability

**Example test structure:**
```typescript
import { describe, it, expect } from 'vitest';
import { TodoService } from './TodoService';

describe('TodoService', () => {
  describe('validateTodo', () => {
    it('should reject todos with empty titles', () => {
      const result = TodoService.validateTodo({ title: '', completed: false, userId: 1 });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });
  });
});
```
```

## Severity Levels

- 🔴 **Critical**: Security vulnerabilities, data loss risks, accessibility blockers
- 🟡 **High**: Missing tests for business logic, performance issues, broken functionality
- 🟢 **Medium**: Code quality, maintainability, minor bugs
- ⚪ **Low**: Style suggestions, optional refactoring

## Notes

- **Be thorough but constructive**: Explain why issues matter and provide solutions
- **Prioritize user impact**: Security and accessibility over style preferences
- **Check test files exist**: Don't just assume tests were written
- **Verify test quality**: Tests should actually test behavior, not just exist

