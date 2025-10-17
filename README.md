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

## 🎯 Demo Purpose

This project demonstrates the **value of AI-powered code review** by showcasing realistic PRs with intentional bugs that AI reviewers excel at catching. The main branch contains clean, production-ready code, while demo branches introduce common issues that developers might miss but AI can identify.

### 🔍 Demo Pull Requests

The repository includes several demo PRs, each containing 2-3 intentional bugs that highlight AI reviewer capabilities:

#### PR #1: Feature - Todo Filtering and Status Management
**Branch:** `feature/todo-filtering`

Adds filtering capabilities with status-based sorting. Contains:
- **Missing dependencies** in `useEffect` hooks (stale closure bugs)
- **Hardcoded string literals** for status comparisons (no enums/constants)
- **Magic numbers** for filter limits

**What AI Should Catch:**
- Exhaustive deps warnings with explanation of closure issues
- Suggestion to create `TodoStatus` enum or constants
- Extract magic numbers to named constants

#### PR #2: Feature - Enhanced Todo Display with Rich Content
**Branch:** `feature/rich-todo-display`

Adds rich text display for todos. Contains:
- **XSS vulnerability** using `dangerouslySetInnerHTML` without sanitization
- **Unstable array keys** using index instead of stable IDs
- **Accessibility violations** replacing semantic buttons with divs

**What AI Should Catch:**
- Security risk explanation and DOMPurify suggestion
- React reconciliation issues with index keys
- A11y violations with keyboard navigation concerns

#### PR #3: Feature - Todo Business Logic Service
**Branch:** `feature/todo-service`

Adds complex business logic service. Contains:
- **Missing test coverage** for new service file
- **Performance issues** with inline object/function props

**What AI Should Catch:**
- Lack of tests for new business logic
- Performance anti-patterns and `useMemo`/`useCallback` suggestions
- Coverage drop warnings

### 📋 How to Review Demo PRs

1. **Checkout a demo branch:**
   ```bash
   git checkout feature/todo-filtering
   ```

2. **Run the app locally:**
   ```bash
   npm install
   npm run dev
   ```

3. **Run quality checks:**
   ```bash
   npm run lint
   npm run typecheck
   npm run test:coverage
   ```

4. **Review the code changes:**
   - Compare against main branch
   - Look for the intentional bugs listed above
   - See what your AI reviewer catches

5. **Expected behavior:**
   - Some bugs will be caught by ESLint/TypeScript
   - Some bugs will pass linting but break functionality
   - AI reviewers should identify all issues with context

## 📝 Code Review Guidelines

This project serves as a demonstration of AI-assisted code review practices:

1. **Automated Quality Checks**: ESLint, Prettier, and TypeScript catch issues early
2. **Meaningful Constants**: No magic numbers, all values are named and documented
3. **Comprehensive Testing**: Unit tests ensure functionality works as expected
4. **Clean Architecture**: Feature-based organization with clear separation of concerns
5. **Type Safety**: Full TypeScript coverage with strict configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- TanStack for the excellent React Query library
- All the ESLint plugin maintainers for code quality tools

---

**Happy Coding! 🎉**