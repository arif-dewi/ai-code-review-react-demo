# Enable Custom Instructions for Copilot Code Review

## ⚠️ IMPORTANT: Custom Instructions Are Not Enabled by Default

According to [GitHub's official documentation](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), custom instructions for Copilot code review must be **manually enabled** in repository settings.

## Why PR #4 Failed

The custom rules in `.github/copilot-instructions.md` were **not applied** to PR #4 because:
- ❌ Custom instructions are **disabled by default** for code review
- ❌ We never enabled them in repository settings
- ✅ The file exists and is correct
- ✅ The syntax is valid

**Result**: Copilot reviewed PR #4 without reading the custom instructions!

## How to Enable Custom Instructions

### Step 1: Navigate to Repository Settings

1. Go to: https://github.com/arif-dewi/ai-code-review-react-demo/settings
2. Or: Repository → **Settings** tab

### Step 2: Enable Copilot Code Review Instructions

1. In the left sidebar, under **"Code & automation"**, click:
   - **Copilot** → **Code review**

2. Find the setting:
   - **"Use custom instructions when reviewing pull requests"**

3. **Toggle it ON** ✅

### Step 3: Verify It's Enabled

The toggle should show as enabled/green. This applies to **all future code reviews** in this repository.

## What This Enables

Once enabled, Copilot will:
- ✅ Read `.github/copilot-instructions.md` before every code review
- ✅ Follow the custom rules we defined
- ✅ Include "Test Coverage Analysis" section
- ✅ Flag missing test files as CRITICAL
- ✅ Apply all custom priorities and patterns

## Testing After Enabling

### Option 1: Re-request Review on PR #4

Add a comment to PR #4:
```
@copilot review
```

Copilot should now include a "Test Coverage Analysis" section that flags the missing `TodoAnalytics.test.ts` file.

### Option 2: Create PR #5

Create a new PR with missing tests to verify the feature is working.

## Expected Output (After Enabling)

With custom instructions enabled, Copilot's review should start with:

```markdown
## Test Coverage Analysis

New files added: 1
- src/features/todos/TodoAnalytics.ts

Files with tests: 0/1 (0%) ❌
Files without tests: 1

❌ src/features/todos/TodoAnalytics.ts (118 lines, 7 exports)
   - Complex business logic requiring comprehensive tests
   - Methods without coverage:
     * calculateCompletionRate()
     * getMostProductiveDay()
     * getAverageTitleLength()
     * getCompletionTrend()
     * findAbandonedTodos()
     * calculateProductivityScore()
   - CRITICAL: Create TodoAnalytics.test.ts

## Code Quality Issues
[... rest of review ...]
```

## For Other Users

If you're using custom instructions in your own repository:

1. **Create** `.github/copilot-instructions.md` in your repo
2. **Enable** custom instructions in repository settings (Settings → Copilot → Code review)
3. **Toggle ON** "Use custom instructions when reviewing pull requests"
4. **Test** by requesting a Copilot review on a PR

## Troubleshooting

### Custom instructions still not working?

1. **Check the file exists**:
   ```bash
   ls -la .github/copilot-instructions.md
   ```

2. **Verify it's enabled** in repository settings:
   - Settings → Copilot → Code review
   - Toggle should be **ON**

3. **Check file format**:
   - Must be named exactly: `copilot-instructions.md`
   - Must be in: `.github/` directory
   - Must be valid Markdown

4. **Try re-requesting review**:
   ```
   @copilot review
   ```

5. **Check for syntax errors** in the instructions file

### Still not working?

- GitHub may need a few minutes to apply the setting
- Try creating a new PR instead of re-reviewing existing one
- Check if you have Copilot code review enabled for the repo

## References

- [GitHub Docs: Add repository instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [GitHub Docs: Configure custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions)

## Next Steps

1. ✅ Enable custom instructions in repository settings
2. ✅ Request new review on PR #4: `@copilot review`
3. ✅ Verify "Test Coverage Analysis" section appears
4. ✅ Document results in `AI_CODE_REVIEW_COMPARISON.md`
5. ✅ Update comparison with accurate "with custom rules" data

---

**Action Required**: Go to [Repository Settings → Copilot → Code review](https://github.com/arif-dewi/ai-code-review-react-demo/settings/copilot) and enable custom instructions!

