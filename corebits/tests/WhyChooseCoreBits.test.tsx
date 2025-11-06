import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhyChooseCoreBits from '@/components/WhyChooseCoreBits';

describe('WhyChooseCoreBits', () => {
  it('renders the section header and cards', () => {
    render(<WhyChooseCoreBits />);
    expect(screen.getByText(/Why Choose/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure Cloud Mining/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily Profit Distribution/i)).toBeInTheDocument();
  });
});
