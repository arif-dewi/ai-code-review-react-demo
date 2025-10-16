import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import TodoList from './TodoList';
import { apiClient } from '../../lib/api';

// Mock the API client
vi.mock('../../lib/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockApiClient = vi.mocked(apiClient);

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};

const TEST_TODO_1 = 'Test Todo 1';
const TEST_TODO_2 = 'Test Todo 2';
const ACTIVE_TODO = 'Active Todo';
const COMPLETED_TODO = 'Completed Todo';

describe('TodoList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockApiClient.get.mockImplementation(
      () => new Promise(() => {}), // Never resolves to keep loading state
    );

    renderWithQueryClient(<TodoList />);

    expect(screen.getByText('Loading todos...')).toBeInTheDocument();
  });

  it('renders todos when data is loaded', async () => {
    const mockTodos = [
      { id: 1, title: TEST_TODO_1, completed: false, userId: 1 },
      { id: 2, title: TEST_TODO_2, completed: true, userId: 1 },
    ];

    mockApiClient.get.mockResolvedValue({
      data: mockTodos,
      status: 200,
      statusText: 'OK',
    });

    renderWithQueryClient(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText(TEST_TODO_1)).toBeInTheDocument();
    });
    expect(screen.getByText(TEST_TODO_2)).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    const errorMessage = 'Failed to fetch todos';
    mockApiClient.get.mockRejectedValue(new Error(errorMessage));

    renderWithQueryClient(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText(`Error loading todos: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('filters todos correctly', async () => {
    const mockTodos = [
      { id: 1, title: ACTIVE_TODO, completed: false, userId: 1 },
      { id: 2, title: COMPLETED_TODO, completed: true, userId: 1 },
    ];

    mockApiClient.get.mockResolvedValue({
      data: mockTodos,
      status: 200,
      statusText: 'OK',
    });

    renderWithQueryClient(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText(ACTIVE_TODO)).toBeInTheDocument();
    });
    expect(screen.getByText(COMPLETED_TODO)).toBeInTheDocument();

    // Test active filter
    const activeButton = screen.getByRole('button', { name: 'Active' });
    activeButton.click();

    await waitFor(() => {
      expect(screen.getByText(ACTIVE_TODO)).toBeInTheDocument();
    });
    expect(screen.queryByText(COMPLETED_TODO)).not.toBeInTheDocument();
  });

  it('shows no todos message when filtered list is empty', async () => {
    const mockTodos = [{ id: 1, title: COMPLETED_TODO, completed: true, userId: 1 }];

    mockApiClient.get.mockResolvedValue({
      data: mockTodos,
      status: 200,
      statusText: 'OK',
    });

    renderWithQueryClient(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText(COMPLETED_TODO)).toBeInTheDocument();
    });

    // Filter to active todos (should be empty)
    const activeButton = screen.getByRole('button', { name: 'Active' });
    activeButton.click();

    await waitFor(() => {
      expect(screen.getByText('No todos found for the selected filter.')).toBeInTheDocument();
    });
  });
});
