import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types';
import { ID_GENERATION, TIMING, QUERY_LIMIT } from './constants';

const TODOS_QUERY_KEY = 'todos';

export const useTodos = () => {
  return useQuery({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: async () => {
      const response = await apiClient.get<Todo[]>(`/todos?_limit=${QUERY_LIMIT}`);
      return response.data;
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: CreateTodoRequest) => {
      // For demo purposes, create a mock todo with a random ID
      const mockTodo: Todo = {
        id: Math.floor(Math.random() * ID_GENERATION.MAX_RANDOM) + ID_GENERATION.MIN_ID, // Random ID > 200 to avoid conflicts
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, TIMING.API_DELAY_MS));

      return mockTodo;
    },
    onSuccess: (newTodo) => {
      // Optimistically update the cache
      queryClient.setQueryData([TODOS_QUERY_KEY], (oldTodos: Todo[] = []) => [
        ...oldTodos,
        newTodo,
      ]);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: UpdateTodoRequest) => {
      // For demo purposes, simulate API call
      await new Promise((resolve) => setTimeout(resolve, TIMING.MUTATION_DELAY_MS));

      // Get current todos and update the specific one
      const currentTodos = queryClient.getQueryData<Todo[]>([TODOS_QUERY_KEY]) || [];
      const updatedTodos = currentTodos.map((t) => (t.id === todo.id ? { ...t, ...todo } : t));

      // Update the cache
      queryClient.setQueryData([TODOS_QUERY_KEY], updatedTodos);

      return { ...currentTodos.find((t) => t.id === todo.id)!, ...todo };
    },
    onSuccess: () => {
      // Cache is already updated in mutationFn
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      // For demo purposes, simulate API call
      await new Promise((resolve) => setTimeout(resolve, TIMING.MUTATION_DELAY_MS));
      return id;
    },
    onSuccess: (deletedId) => {
      // Remove the todo from cache
      queryClient.setQueryData([TODOS_QUERY_KEY], (oldTodos: Todo[] = []) =>
        oldTodos.filter((todo) => todo.id !== deletedId),
      );
    },
  });
};
