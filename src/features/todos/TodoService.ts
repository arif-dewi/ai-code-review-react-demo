import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types';

/**
 * TodoService - Business logic for todo operations
 * Handles validation, status transitions, and data transformations
 */
export class TodoService {
  /**
   * Validates a todo before creation
   */
  static validateTodo(todo: CreateTodoRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!todo.title || todo.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (todo.title && todo.title.length > 100) {
      errors.push('Title must be less than 100 characters');
    }

    if (todo.title && todo.title.length < 3) {
      errors.push('Title must be at least 3 characters');
    }

    if (typeof todo.completed !== 'boolean') {
      errors.push('Completed must be a boolean');
    }

    if (!todo.userId || todo.userId <= 0) {
      errors.push('Valid user ID is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Determines if a todo can be marked as completed
   */
  static canComplete(todo: Todo): boolean {
    // Business rule: todos with certain keywords cannot be completed
    const blockedKeywords = ['blocked', 'pending approval', 'waiting'];
    const titleLower = todo.title.toLowerCase();

    return !blockedKeywords.some((keyword) => titleLower.includes(keyword));
  }

  /**
   * Calculates priority score for a todo based on various factors
   */
  static calculatePriority(todo: Todo): number {
    let priority = 0;

    // Uncompleted todos have higher priority
    if (!todo.completed) {
      priority += 10;
    }

    // Length-based priority
    if (todo.title.length > 50) {
      priority += 5;
    }

    // Keyword-based priority
    const urgentKeywords = ['urgent', 'asap', 'critical', 'important'];
    const titleLower = todo.title.toLowerCase();

    urgentKeywords.forEach((keyword) => {
      if (titleLower.includes(keyword)) {
        priority += 20;
      }
    });

    return priority;
  }

  /**
   * Sorts todos by priority
   */
  static sortByPriority(todos: Todo[]): Todo[] {
    return [...todos].sort((a, b) => {
      const priorityA = this.calculatePriority(a);
      const priorityB = this.calculatePriority(b);
      return priorityB - priorityA;
    });
  }

  /**
   * Filters todos by completion status and applies business rules
   */
  static filterTodos(
    todos: Todo[],
    filter: 'all' | 'active' | 'completed',
    applyPriority = false
  ): Todo[] {
    let filtered = todos;

    if (filter === 'active') {
      filtered = todos.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      filtered = todos.filter((todo) => todo.completed);
    }

    if (applyPriority) {
      filtered = this.sortByPriority(filtered);
    }

    return filtered;
  }

  /**
   * Sanitizes todo title by removing unsafe characters
   */
  static sanitizeTitle(title: string): string {
    return title
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/\s+/g, ' '); // Normalize whitespace
  }

  /**
   * Transforms a todo for display with additional computed properties
   */
  static transformForDisplay(todo: Todo) {
    return {
      ...todo,
      priorityScore: this.calculatePriority(todo),
      canBeCompleted: this.canComplete(todo),
      sanitizedTitle: this.sanitizeTitle(todo.title),
    };
  }
}

export default TodoService;

