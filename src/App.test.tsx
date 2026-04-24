import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Routing', () => {
  it('renders IndexView on the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('WHAT IF')).toBeInTheDocument();
  });

  it('renders StatementView on the /statement path', () => {
    render(
      <MemoryRouter initialEntries={['/statement']}>
        <App />
      </MemoryRouter>
    );
    // StatementView has a header with SECTION_01
    expect(screen.getByText(/SECTION_01/)).toBeInTheDocument();
  });

  it('renders ArchiveView on the /archive path', () => {
    render(
      <MemoryRouter initialEntries={['/archive']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/PROCESS_ARCHIVE_LOGS/)).toBeInTheDocument();
  });
});
