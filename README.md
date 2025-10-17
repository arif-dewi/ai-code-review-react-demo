# 🚀 AI Code Review React Demo

A modern React application demonstrating best practices for AI-assisted code review, featuring a fully functional todo list with typewriter sound effects, comprehensive testing, and production-ready code quality.

## ✨ Features

- **📝 Interactive Todo Management**: Create, update, delete, and filter todos
- **🎵 Immersive Sound Effects**: Typewriter sounds for typing and bell sounds for actions
- **🌐 Internationalization**: Multi-language support with i18next
- **⚡ Modern React Patterns**: Hooks, React Query, and TypeScript
- **🧪 Comprehensive Testing**: Unit tests with Vitest and React Testing Library
- **🔍 Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **📱 Responsive Design**: Mobile-first approach with modern CSS

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript with strict configuration
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Powerful data fetching and caching

### Development Tools
- **ESLint** - Code linting with multiple plugins
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing framework
- **Husky** - Git hooks for code quality
- **Lint-staged** - Run linters on staged files

### Code Quality Plugins
- `@typescript-eslint` - TypeScript-specific linting rules
- `eslint-plugin-react-hooks` - React hooks linting
- `eslint-plugin-sonarjs` - Code quality and bug detection
- `eslint-plugin-unicorn` - Additional best practices
- `eslint-plugin-i18next` - Internationalization linting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-code-review-react-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run prepare` | Setup Husky git hooks |

## 🏗️ Project Structure

```
src/
├── app/                    # App-level components and routing
├── components/             # Reusable UI components
│   ├── Button.tsx         # Custom button component
│   └── Layout.tsx         # Main layout wrapper
├── features/              # Feature-based modules
│   └── todos/             # Todo feature module
│       ├── components/    # Feature-specific components
│       ├── hooks/         # Custom hooks (useTodos)
│       ├── types.ts       # TypeScript type definitions
│       └── constants.ts   # Feature constants
├── lib/                   # Utility libraries
│   ├── api.ts            # API client configuration
│   ├── constants.ts      # Global constants
│   ├── i18n.ts           # Internationalization setup
│   └── locales/          # Translation files
├── pages/                 # Page components
│   ├── HomePage.tsx      # Home page
│   └── AboutPage.tsx     # About page
└── sounds/               # Audio assets
    ├── typewriter-hit.mp3
    └── typewriter-bell.mp3
```

## 🎯 Key Features Explained

### Typewriter Sound Effects
The app includes immersive typewriter sound effects that play when:
- Typing in the todo input field
- Adding a new todo (bell sound)

The sound system uses a pool of audio elements to allow multiple simultaneous sounds without conflicts.

### Code Quality Practices
This project demonstrates several code quality practices:

1. **No Magic Numbers**: All hardcoded values are extracted to named constants
2. **TypeScript Strict Mode**: Full type safety with strict configuration
3. **Comprehensive ESLint Rules**: Multiple plugins for code quality
4. **Pre-commit Hooks**: Automatic linting and formatting on commit
5. **Test Coverage**: Unit tests for components and utilities

### Example: Constants Management
```typescript
// Instead of magic numbers
audio.volume = 0.3;
setTimeout(resolve, 500);

// Use named constants
audio.volume = AUDIO_VOLUME.TYPEWRITER;
setTimeout(resolve, TIMING.API_DELAY_MS);
```

## 🧪 Testing

The project uses Vitest for fast unit testing:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage
```

Tests cover:
- Component rendering and behavior
- Custom hooks functionality
- User interactions
- Error handling

## 🔧 Configuration

### ESLint Configuration
The project uses a comprehensive ESLint setup with:
- TypeScript-specific rules
- React hooks rules
- Code quality plugins (SonarJS, Unicorn)
- Internationalization rules
- Prettier integration

### TypeScript Configuration
- Strict mode enabled
- Path mapping for clean imports
- Separate configs for app and build tools

### Vite Configuration
- React plugin
- TypeScript support
- Development server configuration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run test && npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 Code Review Guidelines

This project serves as a demonstration of AI-assisted code review practices:

1. **Automated Quality Checks**: ESLint, Prettier, and TypeScript catch issues early
2. **Meaningful Constants**: No magic numbers, all values are named and documented
3. **Comprehensive Testing**: Unit tests ensure functionality works as expected
4. **Clean Architecture**: Feature-based organization with clear separation of concerns
5. **Type Safety**: Full TypeScript coverage with strict configuration

### 🤖 AI Code Review Configuration

This repository includes custom instructions to enhance AI code review tools' effectiveness:

#### GitHub Copilot Configuration
- **Location**: `.github/copilot-instructions.md`
- **Purpose**: Instructs Copilot to check for test coverage gaps, security issues, and React patterns
- **Key Focus Areas**:
  - ⚠️ **Test Coverage Analysis** (Critical blind spot)
  - 🔒 Security vulnerabilities (XSS, injection)
  - ⚡ Performance issues (memoization, hooks dependencies)
  - ♿ Accessibility violations
  - 📋 Code quality (magic numbers, hardcoded strings)

#### Cursor Bugbot Configuration
- **Location**: `.cursorrules`
- **Purpose**: Defines review priorities and detection patterns for Cursor's AI reviewer
- **Key Focus Areas**:
  - 📊 **Missing test files** (Top priority)
  - 🔴 Critical security issues
  - 🎯 React-specific anti-patterns
  - ♿ Accessibility blockers
  - 📈 Performance optimizations

#### Why These Rules Matter

**Test Coverage Blind Spot**: During initial testing, both AI tools achieved high detection rates (44-100%) but **missed 130+ lines of untested business logic**. The custom rules now explicitly instruct AI reviewers to:

1. Check if new files have corresponding test files
2. Flag business logic without test coverage
3. Verify test file existence and quality
4. Report test coverage status in every review

**Example Improvements**:
```typescript
// ❌ Before custom rules: AI missed this
// src/services/TodoService.ts (138 lines, no tests)

// ✅ After custom rules: AI flags immediately
// 🔴 CRITICAL: Missing test coverage for TodoService.ts
//    - 7 exported methods without tests
//    - Complex business logic requires comprehensive testing
//    - Create TodoService.test.ts with unit tests
```

#### Using AI Review with Custom Rules

1. **For GitHub Copilot**:
   - Custom instructions are automatically loaded from `.github/copilot-instructions.md`
   - Request a review with `@copilot review` in PR comments
   - Copilot will now check for test coverage and flag missing tests

2. **For Cursor Bugbot**:
   - Rules are loaded from `.cursorrules` in the repository root
   - Request a review with `@cursor review` in PR comments
   - Bugbot will prioritize test coverage analysis first

3. **Verify AI Reviews**:
   - Check that reviews include "Test Coverage Analysis" section
   - Look for explicit mention of test file presence/absence
   - Verify security, performance, and accessibility checks

#### Example AI Review Output (With Custom Rules)

```markdown
## Test Coverage Analysis ⚠️

New Files: 1
Files with Tests: 0/1 (0%) ❌

Missing Tests:
- src/features/todos/TodoService.ts (138 lines)
  * 7 exported methods without coverage
  * CRITICAL: Business logic requires testing

Recommendation: Create TodoService.test.ts

## Security Analysis ✅
No critical issues found

## Performance Analysis ⚠️  
2 issues found (inline objects, missing memoization)
```

See [AI_CODE_REVIEW_COMPARISON.md](./docs/AI_CODE_REVIEW_COMPARISON.md) for detailed analysis of AI review effectiveness with and without custom rules.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- TanStack for the excellent React Query library
- All the ESLint plugin maintainers for code quality tools

---

**Happy Coding! 🎉**