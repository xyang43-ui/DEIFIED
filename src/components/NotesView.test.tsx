import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotesView from './NotesView';

describe('NotesView', () => {
  it('renders initial terminal text', () => {
    render(<NotesView onBack={() => {}} />);
    expect(screen.getByText('Welcome to THESIS_NOTES v1.0')).toBeInTheDocument();
  });

  it('navigates to data items', async () => {
    render(<NotesView onBack={() => {}} />);
    const link01 = screen.getByText('[01]');
    fireEvent.click(link01);
    
    // It uses a typewriter effect, so we wait for the content to appear
    await waitFor(() => {
      expect(screen.getByText(/Books/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('calls onBack when exit is clicked', () => {
    const onBack = vi.fn();
    render(<NotesView onBack={onBack} />);
    const exitButton = screen.getByText('[ EXIT ]');
    fireEvent.click(exitButton);
    expect(onBack).toHaveBeenCalled();
  });
});
