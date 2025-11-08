import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// explicit vitest imports make editor typecheck happy in some setups
import { describe, it, expect } from 'vitest';
// use a relative import to avoid editor/tsserver resolving issues with path alias
import WhyChooseCoreBits from '../src/components/WhyChooseCoreBits';

describe('WhyChooseCoreBits', () => {
  it('renders the section header and cards', () => {
    render(<WhyChooseCoreBits />);
    expect(screen.getByText(/Why Choose/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure Cloud Mining/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily Profit Distribution/i)).toBeInTheDocument();
  });
});


