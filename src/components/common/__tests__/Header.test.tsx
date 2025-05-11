import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { NAVIGATION, ROUTES } from '../../../constants';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Header', () => {
  it('renders all navigation links', () => {
    render(<Header />, { wrapper });

    NAVIGATION.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('applies active styles to the current default route', () => {
    render(<Header />, { wrapper });

    const homeLink = screen.getByText('Cats');
    expect(homeLink).toHaveClass('bg-white text-action');
  });

  it('renders navigation links with correct hrefs', () => {
    render(<Header />, { wrapper });

    NAVIGATION.forEach(({ to, label }) => {
      const link = screen.getByText(label);
      expect(link).toHaveAttribute('href', to);
    });
  });

  it('applies active styles when breeds route is selected', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.BREEDS]}>
        <Header />
      </MemoryRouter>
    );

    const breedsLink = screen.getByText('Breeds');
    expect(breedsLink).toHaveClass('bg-white text-action');
  });
});
