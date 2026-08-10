import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { AuthContext } from '../context/AuthContext';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('Header', () => {
  it('hides the header on login route', () => {
    renderWithRouter(<Header />, { route: '/login' });
    expect(screen.queryByText(/ASCENT/i)).toBeNull();
  });

  it('shows the access button when unauthenticated', () => {
    renderWithRouter(<Header />);
    const buttons = screen.getAllByRole('button', { name: /Acessar/i });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('opens and closes the mobile menu', () => {
    renderWithRouter(<Header />);
    const toggle = screen.getByRole('button', { name: /Abrir menu/i });
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: /Fechar menu/i }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('shows authenticated navigation items when logged in', () => {
    const authValue = { token: 'token', user: { username: 'carlos' }, logout: () => {} };
    renderWithRouter(
      <AuthContext.Provider value={authValue}>
        <Header />
      </AuthContext.Provider>
    );

    const usernameElements = screen.getAllByText(/carlos/i);
    expect(usernameElements.length).toBeGreaterThanOrEqual(1);
    const logoutButtons = screen.getAllByRole('button', { name: /Sair/i });
    expect(logoutButtons.length).toBeGreaterThanOrEqual(1);
  });
});
