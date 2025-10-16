import React from 'react';
import TodoList from '../features/todos/TodoList';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Welcome to AI Code Review Demo</h1>
        <p>
          This demo showcases how AI-powered code reviewers can identify real-world issues in a
          React + TypeScript codebase.
        </p>
      </header>

      <section className="demo-section">
        <h2>Todo List Feature</h2>
        <p>
          The todo list below demonstrates clean React patterns. Check out the demo branches to see
          common issues that AI reviewers can catch.
        </p>
        <TodoList />
      </section>
    </div>
  );
};

export default HomePage;
