# AI Code Review Setup Guide

This guide shows how to set up GitHub Copilot and Cursor Bugbot for automated code reviews on your pull requests.

---

## 🤖 GitHub Copilot Code Review

### Prerequisites
- **GitHub Copilot Pro** plan or higher
- Repository access with admin permissions

### Step 1: Subscribe to Copilot Pro
Visit [GitHub Copilot Plans](https://github.com/features/copilot/plans) and subscribe to Pro or higher.

### Step 2: Enable Code Review Feature
1. Go to [Copilot Settings → Features](https://github.com/settings/copilot/features)
2. Toggle **"Copilot code review"** to **Enable**

### Step 3: Configure Repository Settings
1. Navigate to your repository → **Settings** → **Rules** → **Rulesets**
2. Create a new rule or edit existing
3. Enable **"Automatically request Copilot code review"** for pull requests

📚 **Full Documentation**: [Configure Automatic Review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-review)

### Step 4: Request Review on Pull Request
1. Open your PR
2. Click **"Reviewers"** dropdown
3. Select **"Copilot"**
4. Wait 2-5 minutes for the review to complete

✅ **Result**: Copilot will comment on your PR with code suggestions and bug detection.

---

## 🐛 Cursor Bugbot

### Prerequisites
- Cursor account
- GitHub repository connected to Cursor

### Step 1: Get Bugbot Access
1. Visit [Cursor Dashboard → Bugbot](https://cursor.com/dashboard?tab=bugbot)
2. Choose:
   - **Free Trial**: ~2 PR reviews per billing cycle
   - **Paid Plan**: Unlimited reviews

### Step 2: Configure Trigger Mode
In your Bugbot settings, choose:
- **"Only Run When Mentioned"** → Manual trigger with `@cursor review` or `bugbot run`
- **"Automatic"** → Runs on every PR (paid plans only)

### Step 3: Request Review on Pull Request
1. Open your PR
2. Add a comment: **`@cursor review`** or **`bugbot run`**
3. Wait 1-3 minutes for the review

✅ **Result**: Bugbot will add comments with severity levels (High, Medium, Low) for detected issues.

### ⚠️ Free Tier Limitations
- **~2 PR reviews per billing cycle**
- **Quota resets monthly**
- Error message when quota exceeded: *"You have run out of free Bugbot PR reviews for this billing cycle"*

💡 **Tip**: Save free reviews for critical PRs, or upgrade to paid plan for unlimited reviews.

---

## 🎯 Best Practices

### When to Use Each Tool

**GitHub Copilot** (Recommended for all PRs)
- ✅ Comprehensive bug detection (100% in our tests)
- ✅ Security vulnerabilities (XSS, injection)
- ✅ React patterns (hooks, keys, memoization)
- ✅ Performance issues
- ✅ Code quality (magic numbers, hardcoded strings)

**Cursor Bugbot** (Supplementary)
- ✅ Detailed severity levels
- ✅ Comprehensive explanations
- ⚠️ Limited by quota on free tier

### Recommended Workflow
1. **GitHub Copilot** → Primary reviewer (automatic)
2. **ESLint/TypeScript** → Linting and type checking
3. **Vitest/Jest** → Test coverage reports
4. **Human Review** → Architecture and business logic
5. **Cursor Bugbot** → Optional for critical PRs (if on paid plan)

---

## 🔧 Troubleshooting

### Copilot Not Reviewing
- ✅ Verify Copilot Pro subscription is active
- ✅ Check "Copilot code review" is enabled in settings
- ✅ Ensure repository ruleset includes automatic review
- ✅ Re-request review by removing and re-adding Copilot

### Bugbot Not Responding
- ✅ Verify comment syntax: `@cursor review` (not `@bugbot`)
- ✅ Check quota status in Cursor Dashboard
- ✅ Ensure GitHub integration is connected
- ✅ Try alternative trigger: `bugbot run`

### Reviews Taking Too Long
- **Copilot**: Usually 2-5 min (large PRs may take longer)
- **Bugbot**: Usually 1-3 min (free tier may be slower)
- **Timeout**: Wait 10 minutes, then re-trigger

---

## 📊 Comparison Summary

| Feature | GitHub Copilot | Cursor Bugbot |
|---------|----------------|---------------|
| **Detection Rate** | 90% (9/10) | 40% (4/10, quota-limited) |
| **Cost** | Included with Pro | Free trial or paid |
| **Quota** | Unlimited | ~2 PRs/month (free) |
| **Trigger** | Automatic or manual | Manual (free) / Auto (paid) |
| **Best For** | All PRs | Critical PRs (paid) |
| **Test Coverage** | ❌ Not detected | ❌ Not detected |

💡 **Key Insight**: Both tools miss test coverage detection. Use coverage tools (Codecov, SonarQube) alongside AI review.

---

## 📚 Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Cursor Bugbot Dashboard](https://cursor.com/dashboard?tab=bugbot)
- [Our Full Analysis](./AI_CODE_REVIEW_COMPARISON.md)
- [Custom Rules Guide](./CUSTOM_RULES_GUIDE.md)
- [Test PRs](https://github.com/arif-dewi/ai-code-review-react-demo/pulls)

---

*Last Updated: October 17, 2025*

