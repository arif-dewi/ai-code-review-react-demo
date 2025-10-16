import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderApp = () => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe('App', () => {
  it('renders navigation', () => {
    renderApp();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('AI Code Review Demo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    renderApp();

    expect(screen.getByText('Welcome to AI Code Review Demo')).toBeInTheDocument();
    expect(screen.getByText('Todo List Feature')).toBeInTheDocument();
  });

  it('has accessible navigation', () => {
    renderApp();

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });
});
