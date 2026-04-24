import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WorkView from './WorkView';

describe('WorkView', () => {
  it('renders the initial core node', () => {
    render(<WorkView onBack={() => {}} />);
    expect(screen.getByText('[THESIS_CORE]')).toBeInTheDocument();
  });

  it('expands nodes on click', () => {
    render(<WorkView onBack={() => {}} />);
    const coreNode = screen.getByText('[THESIS_CORE]');
    fireEvent.click(coreNode);
    // Based on NODE_DATA_MAP, root expands to [MUSIC]
    expect(screen.getByText('[MUSIC]')).toBeInTheDocument();
  });

  it('calls onBack when exit is clicked', () => {
    const onBack = vi.fn();
    render(<WorkView onBack={onBack} />);
    const exitButton = screen.getByText('[ EXIT ]');
    fireEvent.click(exitButton);
    expect(onBack).toHaveBeenCalled();
  });
});
