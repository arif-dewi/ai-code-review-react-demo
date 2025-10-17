# Testing Custom AI Code Review Rules

## Overview

This guide explains how to test if the custom AI review rules (`.cursorrules` and `.github/copilot-instructions.md`) are working correctly.

## Test PR #4: Verify Custom Rules

**Branch**: `test/verify-custom-rules`  
**Purpose**: Verify AI tools detect missing test coverage with custom rules

### What Was Added

**`src/features/todos/TodoAnalytics.ts`** - Complex business logic WITHOUT tests:
- 118 lines of code
- 7 exported static methods
- Complex algorithms (completion rate, productivity scoring, trend analysis)
- ❌ **NO corresponding test file** (`TodoAnalytics.test.ts` does not exist)

This is the perfect test case because:
1. It's substantial business logic (>100 lines)
2. Contains multiple exported functions
3. Has complex calculations and edge cases
4. Intentionally has NO tests
5. Should trigger custom rule detection

### Expected AI Review Output

#### ✅ With Custom Rules (Expected)

**GitHub Copilot should report:**
```markdown
## Test Coverage Analysis ⚠️

New Files Added: 1
Files with Tests: 0/1 (0%) ❌

Missing Test Files:
❌ src/features/todos/TodoAnalytics.ts (118 lines, 7 exports)
   - Complex business logic requiring comprehensive tests
   - Methods without coverage:
     * calculateCompletionRate()
     * getMostProductiveDay()
     * getAverageTitleLength()
     * getCompletionTrend()
     * findAbandonedTodos()
     * calculateProductivityScore()
   - Risk: Untested algorithms and edge cases
   - CRITICAL: Create TodoAnalytics.test.ts

Recommendation:
Create src/features/todos/TodoAnalytics.test.ts with test suites for:
- Edge cases (empty arrays, null values)
- Calculation accuracy
- Business logic validation
- Boundary conditions
```

**Cursor Bugbot should report:**
```markdown
📊 TEST COVERAGE REPORT

New Files: 1
Files with Tests: 0 (0%)
Files without Tests: 1 (100%) ⚠️

Missing Test Files:
❌ src/features/todos/TodoAnalytics.ts (118 lines, 7 exports)
   - Complex business logic requiring comprehensive tests
   - Risk: Untested validation and calculation logic

Overall Risk Assessment: HIGH ⚠️

Priority Fixes Required:
1. Add test coverage for TodoAnalytics.ts (CRITICAL)

🔴 CRITICAL: Missing test coverage for business logic service
```

#### ❌ Without Custom Rules (Before)

```markdown
## Pull Request Overview

This PR adds analytics functionality to the todo app. The implementation looks good.

✅ Code structure is clean
✅ TypeScript types are properly defined
✅ No obvious bugs detected

No issues found.
```

## How to Test

### Step 1: Create PR #4

PR #4 is already created from branch `test/verify-custom-rules`. Visit:
```
https://github.com/arif-dewi/ai-code-review-react-demo/pull/new/test/verify-custom-rules
```

### Step 2: Request AI Reviews

Add comments to the PR:

**For GitHub Copilot:**
```
@copilot review
```

**For Cursor Bugbot:**
```
@cursor review
```

### Step 3: Verify Detection

Check if AI reviews include:

- [ ] **"Test Coverage Analysis"** or **"TEST COVERAGE REPORT"** section
- [ ] Explicit mention of `TodoAnalytics.ts` missing tests
- [ ] File line count (118 lines)
- [ ] Number of exported methods (7)
- [ ] Severity level (CRITICAL or HIGH)
- [ ] Specific recommendation to create `TodoAnalytics.test.ts`

### Step 4: Compare Results

| Aspect | Expected with Rules | Actual Result |
|--------|---------------------|---------------|
| Test Coverage Section | ✅ Should exist | _[Fill in]_ |
| TodoAnalytics.ts flagged | ✅ Should be flagged | _[Fill in]_ |
| Severity mentioned | ✅ CRITICAL/HIGH | _[Fill in]_ |
| Specific file path | ✅ `TodoAnalytics.test.ts` | _[Fill in]_ |
| Method count | ✅ 7 methods listed | _[Fill in]_ |

## Success Criteria

Custom rules are working if:

1. ✅ AI review includes **Test Coverage Analysis** section
2. ✅ `TodoAnalytics.ts` is explicitly flagged as missing tests
3. ✅ Review recommends creating `TodoAnalytics.test.ts`
4. ✅ Severity is marked as CRITICAL or HIGH priority
5. ✅ Review explains WHY tests are needed (complex logic, edge cases)

## Troubleshooting

### If AI Doesn't Mention Test Coverage

**Possible causes:**
1. Custom rules file not loaded
2. File path incorrect (check `.github/copilot-instructions.md` and `.cursorrules`)
3. AI ignoring instructions
4. Free tier limitations (Cursor Bugbot)

**Solutions:**
1. Verify files exist:
   ```bash
   ls -la .github/copilot-instructions.md .cursorrules
   ```

2. Check file content:
   ```bash
   grep -i "test coverage" .github/copilot-instructions.md .cursorrules
   ```

3. Try re-requesting review:
   ```
   @copilot review again with focus on test coverage
   ```

### If Detection is Incomplete

If AI mentions tests but doesn't provide full analysis:

1. **Request specific analysis:**
   ```
   @copilot please check for missing test files according to the custom rules
   ```

2. **Check rules syntax:**
   - Verify markdown formatting in `.github/copilot-instructions.md`
   - Check JSON-like structure if needed

## Alternative Test: Create Your Own

To test with different scenarios:

### Test Case 1: Small Utility (Should Flag)
```typescript
// src/utils/dateFormat.ts (35 lines, no tests)
export function formatDate(date: Date): string { /* ... */ }
export function parseDate(str: string): Date { /* ... */ }
```

**Expected**: Should be flagged (utility >20 lines)

### Test Case 2: Simple Component (Might Not Flag)
```typescript
// src/components/Badge.tsx (15 lines, no tests)
export function Badge({ text }: { text: string }) {
  return <span className="badge">{text}</span>;
}
```

**Expected**: Might not be flagged (simple UI, <20 lines)

### Test Case 3: Hook (Should Flag)
```typescript
// src/hooks/useDebounce.ts (25 lines, no tests)
export function useDebounce<T>(value: T, delay: number): T { /* ... */ }
```

**Expected**: Should be flagged (custom hook with logic)

## Next Steps After Verification

Once custom rules are verified working:

1. **Document results** in [docs/AI_CODE_REVIEW_COMPARISON.md](./AI_CODE_REVIEW_COMPARISON.md)
2. **Update detection rates** to include test coverage
3. **Share findings** with team
4. **Customize rules** for project-specific needs
5. **Add more patterns** based on what AI still misses

## Measuring Improvement

| Metric | Before Custom Rules | After Custom Rules | Target |
|--------|---------------------|-------------------|---------|
| Bug Detection | 9/9 (100%) | 9/9 (100%) | 100% |
| Test Coverage Detection | 0/1 (0%) ❌ | _[To verify]_ | 1/1 (100%) |
| Overall Completeness | 90% | _[To calculate]_ | 100% |

**Overall Completeness Formula:**
```
(Bugs Detected + Test Coverage Detected) / (Total Bugs + Total Coverage Issues) × 100
```

## Documentation

- Full analysis: [AI_CODE_REVIEW_COMPARISON.md](./AI_CODE_REVIEW_COMPARISON.md)
- Custom rules guide: [CUSTOM_RULES_GUIDE.md](./CUSTOM_RULES_GUIDE.md)
- GitHub Copilot config: [../.github/copilot-instructions.md](../.github/copilot-instructions.md)
- Cursor Bugbot config: [../.cursorrules](../.cursorrules)

---

**Ready to Test?** Create PR #4 and request AI reviews with `@copilot review` and `@cursor review`!

