import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTodos, useUpdateTodo, useCreateTodo, useDeleteTodo } from './useTodos';
import TodoItem from './TodoItem';
import Button from '../../components/Button';
import { Todo } from './types';
import { AUDIO_VOLUME, TIMING } from './constants';

const TodoList: React.FC = () => {
  const { data: todos = [], isLoading, error } = useTodos();
  const updateTodoMutation = useUpdateTodo();
  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<Todo[]>([]);
  const typewriterSoundPool = useRef<HTMLAudioElement[]>([]);
  const bellSoundPool = useRef<HTMLAudioElement[]>([]);
  const currentTypewriterIndex = useRef(0);
  const currentBellIndex = useRef(0);
  const POOL_SIZE = 8; // Allow up to 8 simultaneous sounds
  const lastTypewriterSoundTime = useRef(0);
  const SOUND_DELAY_MS = 100; // 100ms minimum delay between typewriter sounds
  const inputRef = useRef<HTMLInputElement>(null);

  // Preload sound pools for parallel playback
  useEffect(() => {
    // Create pool of typewriter sounds
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio('/src/sounds/typewriter-hit.mp3');
      audio.preload = 'auto';
      audio.volume = AUDIO_VOLUME.TYPEWRITER;
      typewriterSoundPool.current.push(audio);
    }

    // Create pool of bell sounds
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio('/src/sounds/typewriter-bell.mp3');
      audio.preload = 'auto';
      audio.volume = AUDIO_VOLUME.BELL;
      bellSoundPool.current.push(audio);
    }
  }, []);

  // Focus input field when component mounts and data is loaded
  useEffect(() => {
    if (!isLoading && !error && inputRef.current) {
      // Small delay to ensure the input is fully rendered
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, TIMING.FOCUS_DELAY_MS);
    }
  }, [isLoading, error]);

  // BUG: Missing dependencies - statusFilter and todos should be in deps array
  // This causes stale closure issues
  useEffect(() => {
    let filtered = todos;
    
    // BUG: Hardcoded string literals instead of using enum/constants
    if (statusFilter === "PRIMARY") {
      filtered = filtered.filter((todo: Todo) => todo.status === "PRIMARY");
    } else if (statusFilter === "SECONDARY") {
      filtered = filtered.filter((todo: Todo) => todo.status === "SECONDARY");
    }
    
    // BUG: Magic number - should be extracted to constant
    if (filtered.length > 50) {
      filtered = filtered.slice(0, 50);
    }
    
    setFilteredData(filtered);
  }, []); // Missing: statusFilter, todos

  // Memoize filtered todos to prevent unnecessary recalculations
  const filteredTodos = useMemo(() => {
    let result = filteredData.length > 0 ? filteredData : todos;
    if (filter === 'all') return result;
    if (filter === 'active') return result.filter((todo: Todo) => !todo.completed);
    return result.filter((todo: Todo) => todo.completed);
  }, [todos, filter, filteredData]);

  const handleToggle = (id: number) => {
    const todo = todos.find((t: Todo) => t.id === id);
    if (todo) {
      updateTodoMutation.mutate({
        id,
        completed: !todo.completed,
      });
    }
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      createTodoMutation.mutate({
        title: newTodoTitle.trim(),
        completed: false,
        userId: 1, // Demo user ID
      });
      setNewTodoTitle('');
      playCarriageReturnSound(); // "Ding!" when adding todo
    }
  };

  const handleDelete = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  // Play typewriter typing sound using pool with delay
  const playTypewriterSound = () => {
    const now = Date.now();

    // Only play sound if enough time has passed since last sound
    if (
      now - lastTypewriterSoundTime.current >= SOUND_DELAY_MS &&
      typewriterSoundPool.current.length > 0
    ) {
      const audio = typewriterSoundPool.current[currentTypewriterIndex.current];
      audio.currentTime = 0; // Reset to beginning
      audio.play().catch(() => {
        // Silently handle play errors (user interaction required)
      });

      // Update last sound time
      lastTypewriterSoundTime.current = now;

      // Move to next audio element in pool (round-robin)
      currentTypewriterIndex.current = (currentTypewriterIndex.current + 1) % POOL_SIZE;
    }
  };

  // Play typewriter bell sound using pool
  const playCarriageReturnSound = () => {
    if (bellSoundPool.current.length > 0) {
      const audio = bellSoundPool.current[currentBellIndex.current];
      audio.currentTime = 0; // Reset to beginning
      audio.play().catch(() => {
        // Silently handle play errors (user interaction required)
      });

      // Move to next audio element in pool (round-robin)
      currentBellIndex.current = (currentBellIndex.current + 1) % POOL_SIZE;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
    playTypewriterSound();
  };

  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error loading todos: {error.message}</div>;
  }

  return (
    <div className="todo-list">
      <form onSubmit={handleAddTodo} className="add-todo-form">
        <div className="add-todo-input-group">
          <input
            ref={inputRef}
            type="text"
            value={newTodoTitle}
            onChange={handleInputChange}
            placeholder="Add a new todo..."
            className="add-todo-input"
            aria-label="New todo title"
            disabled={createTodoMutation.isPending}
          />
          <Button type="submit" disabled={!newTodoTitle.trim() || createTodoMutation.isPending}>
            {createTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
          </Button>
        </div>
        {createTodoMutation.isError && (
          <div className="error-message">Failed to add todo. Please try again.</div>
        )}
        {createTodoMutation.isSuccess && (
          <div className="success-message">Todo added successfully!</div>
        )}
      </form>

      <div className="todo-filters">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
          aria-pressed={filter === 'all'}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
          aria-pressed={filter === 'active'}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
          aria-pressed={filter === 'completed'}
        >
          Completed
        </button>
      </div>

      <div className="status-filters">
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={statusFilter === 'all' ? 'active' : ''}
        >
          All Status
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('PRIMARY')}
          className={statusFilter === 'PRIMARY' ? 'active' : ''}
        >
          Primary
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('SECONDARY')}
          className={statusFilter === 'SECONDARY' ? 'active' : ''}
        >
          Secondary
        </button>
      </div>

      <ul className="todos" role="list" aria-label="Todo list">
        {filteredTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p className="no-todos">No todos found for the selected filter.</p>
      )}
    </div>
  );
};

export default TodoList;
