import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <header className="page-header">
        <h1>About This Demo</h1>
        <p>
          This repository demonstrates how AI-powered code reviewers can identify real-world issues
          in React + TypeScript applications.
        </p>
      </header>

      <section className="demo-info">
        <h2>What This Demo Shows</h2>
        <ul>
          <li>
            <strong>ESLint Guards:</strong> Automated detection of common code issues like magic
            numbers, missing semicolons, and duplicate strings
          </li>
          <li>
            <strong>CI/CD Integration:</strong> GitHub Actions that enforce code quality and test
            coverage requirements
          </li>
          <li>
            <strong>AI Code Review:</strong> How AI reviewers catch complex issues that automated
            tools might miss
          </li>
          <li>
            <strong>Best Practices:</strong> Clean React patterns with proper TypeScript typing and
            accessibility
          </li>
        </ul>
      </section>

      <section className="demo-branches">
        <h2>Demo Branches</h2>
        <p>Check out these branches to see common issues that AI reviewers can identify:</p>
        <ul>
          <li>
            <code>demo/missing-deps</code> - useEffect dependency issues
          </li>
          <li>
            <code>demo/unstable-keys</code> - React key prop problems
          </li>
          <li>
            <code>demo/accessibility-issues</code> - A11y violations
          </li>
          <li>
            <code>demo/xss-vulnerability</code> - Security vulnerabilities
          </li>
          <li>
            <code>demo/hardcoded-strings</code> - String literal comparisons
          </li>
          <li>
            <code>demo/missing-tests</code> - Inadequate test coverage
          </li>
          <li>
            <code>demo/performance-issue</code> - Performance anti-patterns
          </li>
        </ul>
      </section>

      <section className="tech-stack">
        <h2>Tech Stack</h2>
        <ul>
          <li>React 18 + TypeScript</li>
          <li>Vite for build tooling</li>
          <li>React Router for navigation</li>
          <li>TanStack Query for data fetching</li>
          <li>Vitest for testing</li>
          <li>ESLint + Prettier for code quality</li>
          <li>GitHub Actions for CI/CD</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
