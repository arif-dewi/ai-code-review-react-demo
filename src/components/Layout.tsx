import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <div className="nav-brand">
            <Link to="/" className="nav-link">
              AI Code Review Demo
            </Link>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                aria-current={isActive('/about') ? 'page' : undefined}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="app-main" role="main">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 AI Code Review Demo. Built with React + TypeScript.</p>
      </footer>
    </div>
  );
};

export default Layout;
