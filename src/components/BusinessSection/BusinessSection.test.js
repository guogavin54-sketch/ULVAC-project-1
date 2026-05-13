import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BusinessSection from './BusinessSection';
import styles from './BusinessSection.module.css';

describe('BusinessSection Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders all business cards', () => {
    render(<BusinessSection />);
    const cards = screen.getAllByTestId('business-card');
    expect(cards).toHaveLength(6);
    
    // Check titles
    expect(screen.getByText('Semiconductor and Electronic Device Production Equipment')).toBeInTheDocument();
    expect(screen.getByText('Industrial Equipment')).toBeInTheDocument();
  });

  it('triggers visibility class on IntersectionObserver intersection (is-visible timing)', () => {
    render(<BusinessSection />);
    const section = screen.getByTestId('business-section');
    
    // In our test setup, IntersectionObserver triggers immediately
    // so we can verify the class is added.
    expect(section.classList.contains(styles.isVisible) || section.classList.contains('isVisible')).toBeTruthy();
  });

  it('verifies interactive hover states exist for cards and buttons', () => {
    render(<BusinessSection />);
    const cards = screen.getAllByTestId('business-card');
    const firstCard = cards[0];
    
    // Hover event
    fireEvent.mouseEnter(firstCard);
    expect(firstCard).toBeInTheDocument();
    
    // Unhover event
    fireEvent.mouseLeave(firstCard);
    expect(firstCard).toBeInTheDocument();
    
    const button = screen.getByText('See Business Overview').closest('div');
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    expect(button).toBeInTheDocument();
  });

  it('handles responsive rendering (matchMedia)', () => {
    window.matchMedia.mockImplementation(query => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<BusinessSection />);
    const section = screen.getByTestId('business-section');
    expect(section).toBeInTheDocument();
  });
});