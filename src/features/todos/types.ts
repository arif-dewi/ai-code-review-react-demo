export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  description?: string; // Rich text description
}

export interface CreateTodoRequest {
  title: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoRequest {
  id: number;
  title?: string;
  completed?: boolean;
}
