import React from 'react';
import { Todo } from './types';
import Button from '../../components/Button';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`Mark todo "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="todo-text">
          <label
            htmlFor={`todo-${todo.id}`}
            className={`todo-title ${todo.completed ? 'completed' : ''}`}
          >
            {todo.title}
          </label>
          {/* BUG: XSS vulnerability - using dangerouslySetInnerHTML without sanitization */}
          {todo.description && (
            <div
              className="todo-description"
              dangerouslySetInnerHTML={{ __html: todo.description }}
            />
          )}
        </div>
      </div>
      {/* BUG: Accessibility issue - using div instead of button */}
      {/* Missing keyboard navigation, ARIA roles, and focus management */}
      <div
        onClick={handleDelete}
        className="delete-action"
        style={{ cursor: 'pointer', color: 'red', padding: '4px 8px' }}
      >
        Delete
      </div>
    </li>
  );
};

export default TodoItem;
