import React from 'react';
import TodoList from '../features/todos/TodoList';
import TodoService from '../features/todos/TodoService';

const HomePage: React.FC = () => {
  // BUG: Performance issue - inline object causes TodoList to re-render unnecessarily
  const config = {
    maxItems: 10,
    enablePriority: true,
    sortDirection: 'desc',
  };

  // BUG: Performance issue - inline arrow function creates new reference on every render
  const handleFilterChange = (filter: string) => {
    console.log('Filter changed to:', filter);
    // Business logic could go here
  };

  // BUG: Performance issue - calling service method on every render
  const priorityEnabled = TodoService.calculatePriority({ id: 1, title: 'test', completed: false, userId: 1 }) > 0;

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
        {/* BUG: Passing inline objects/functions causes unnecessary re-renders */}
        <TodoList />
        {priorityEnabled && (
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
            Priority sorting is enabled
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
