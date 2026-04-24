import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IndexView from './IndexView';

describe('IndexView', () => {
  it('renders the primary navigation links', () => {
    render(<IndexView onNavigate={() => {}} setCursor={() => {}} />);
    expect(screen.getByText('WHAT IF')).toBeInTheDocument();
    expect(screen.getByText('MAKING')).toBeInTheDocument();
    expect(screen.getByText('IS A KIND OF')).toBeInTheDocument();
    expect(screen.getByText('THINKING')).toBeInTheDocument();
  });
});
