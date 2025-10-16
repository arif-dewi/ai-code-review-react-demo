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
        <label
          htmlFor={`todo-${todo.id}`}
          className={`todo-title ${todo.completed ? 'completed' : ''}`}
        >
          {todo.title}
        </label>
      </div>
      <Button
        onClick={handleDelete}
        variant="danger"
        size="small"
        aria-label={`Delete todo "${todo.title}"`}
      >
        Delete
      </Button>
    </li>
  );
};

export default TodoItem;
