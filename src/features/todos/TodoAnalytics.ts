import { Todo } from './types';

/**
 * TodoAnalytics - Business logic for analyzing todo patterns
 * This file intentionally has NO tests to verify custom AI rules work
 */

// Analytics thresholds and weights
const COMPLETION_RATE_MULTIPLIER = 100;
const LONG_TITLE_THRESHOLD = 100;
const HIGH_COMPLETION_THRESHOLD = 0.7;
const LOW_COMPLETION_THRESHOLD = 0.3;
const COMPLETION_WEIGHT = 0.5;
const AVG_LENGTH_WEIGHT = 0.2;
const AVG_LENGTH_DIVISOR = 10;
const AVG_LENGTH_MAX_SCORE = 10;
const ABANDONED_TODO_PENALTY = 2;
const MAX_SCORE = 100;

export const TodoAnalytics = {
  /**
   * Calculate completion rate for a list of todos
   */
  calculateCompletionRate(todos: Todo[]): number {
    if (todos.length === 0) return 0;
    const completed = todos.filter((todo) => todo.completed).length;
    return (completed / todos.length) * COMPLETION_RATE_MULTIPLIER;
  },

  /**
   * Find most productive day based on completion patterns
   */
  getMostProductiveDay(todos: Todo[]): string {
    const dayMap = new Map<string, number>();

    for (const todo of todos) {
      if (todo.completed) {
        // Simplified: assume todos have a completedDate
        const day = new Date().toLocaleDateString();
        dayMap.set(day, (dayMap.get(day) || 0) + 1);
      }
    }

    let maxDay = '';
    let maxCount = 0;
    for (const [day, count] of dayMap.entries()) {
      if (count > maxCount) {
        maxCount = count;
        maxDay = day;
      }
    }

    return maxDay || 'No data';
  },

  /**
   * Calculate average title length
   */
  getAverageTitleLength(todos: Todo[]): number {
    if (todos.length === 0) return 0;
    const totalLength = todos.reduce((sum, todo) => sum + todo.title.length, 0);
    return totalLength / todos.length;
  },

  /**
   * Get completion trend (improving, declining, stable)
   */
  getCompletionTrend(todos: Todo[]): 'improving' | 'declining' | 'stable' {
    const completed = todos.filter((t) => t.completed);
    const incomplete = todos.filter((t) => !t.completed);

    if (completed.length === 0) return 'declining';
    if (incomplete.length === 0) return 'improving';

    const ratio = completed.length / todos.length;
    if (ratio > HIGH_COMPLETION_THRESHOLD) return 'improving';
    if (ratio < LOW_COMPLETION_THRESHOLD) return 'declining';
    return 'stable';
  },

  /**
   * Identify todos that are likely abandoned (complex heuristic)
   */
  findAbandonedTodos(todos: Todo[]): Todo[] {
    return todos.filter((todo) => {
      // Complex business logic here
      if (todo.completed) return false;

      const hasLongTitle = todo.title.length > LONG_TITLE_THRESHOLD;
      const hasDescription = todo.description && todo.description.length > 0;
      const isPrimary = todo.status === 'PRIMARY';

      // Heuristic: long incomplete todos with descriptions are likely abandoned
      return hasLongTitle && hasDescription && !isPrimary;
    });
  },

  /**
   * Calculate productivity score based on multiple factors
   */
  calculateProductivityScore(todos: Todo[]): number {
    if (todos.length === 0) return 0;

    let score = 0;
    const completionRate = this.calculateCompletionRate(todos);
    const avgLength = this.getAverageTitleLength(todos);
    const abandoned = this.findAbandonedTodos(todos);

    // Weight different factors
    score += completionRate * COMPLETION_WEIGHT;
    score += Math.min(avgLength / AVG_LENGTH_DIVISOR, AVG_LENGTH_MAX_SCORE) * AVG_LENGTH_WEIGHT;
    score -= abandoned.length * ABANDONED_TODO_PENALTY;

    return Math.max(0, Math.min(MAX_SCORE, score));
  },
};

export default TodoAnalytics;
