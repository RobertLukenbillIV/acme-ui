import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Hero from '../Hero';

// Mock window.scrollY and related methods
const mockScrollY = (value) => {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: value,
  });
};

const mockInnerHeight = (value) => {
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: value,
  });
};

// Clean up scroll listeners after each test
afterEach(() => {
  window.removeEventListener('scroll', jest.fn());
  jest.clearAllMocks();
});

describe('Hero', () => {
  beforeEach(() => {
    mockScrollY(0);
    mockInnerHeight(1000);
  });

  describe('Basic Rendering', () => {
    it('renders without props', () => {
      const { container } = render(<Hero />);
      expect(container.firstChild).toHaveClass('acme-hero');
    });

    it('renders with title only', () => {
      render(<Hero title="Welcome" />);
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome');
    });

    it('renders with subtitle only', () => {
      render(<Hero subtitle="This is a subtitle" />);
      expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
    });

    it('renders with both title and subtitle', () => {
      render(<Hero title="Main Title" subtitle="Supporting text" />);
      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(screen.getByText('Supporting text')).toBeInTheDocument();
    });

    it('renders with children content', () => {
      render(
        <Hero>
          <button>Call to Action</button>
          <p>Additional content</p>
        </Hero>
      );
      expect(screen.getByText('Call to Action')).toBeInTheDocument();
      expect(screen.getByText('Additional content')).toBeInTheDocument();
    });

    it('renders hero content container', () => {
      const { container } = render(<Hero title="Test" />);
      expect(container.querySelector('.hero-content')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies static variant by default', () => {
      const { container } = render(<Hero />);
      expect(container.firstChild).toHaveClass('static');
    });

    it('applies scroll-responsive variant', () => {
      const { container } = render(<Hero variant="scroll-responsive" />);
      expect(container.firstChild).toHaveClass('scroll-responsive');
    });

    it('applies sticky-third variant', () => {
      const { container } = render(<Hero variant="sticky-third" />);
      expect(container.firstChild).toHaveClass('sticky-third');
    });

    it('shows scroll indicator for scroll-responsive variant', () => {
      const { container } = render(<Hero variant="scroll-responsive" />);
      expect(container.querySelector('.scroll-indicator')).toBeInTheDocument();
      expect(screen.getByText('↓')).toBeInTheDocument();
      expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
    });

    it('does not show scroll indicator for static variant', () => {
      const { container } = render(<Hero variant="static" />);
      expect(container.querySelector('.scroll-indicator')).not.toBeInTheDocument();
    });

    it('does not show scroll indicator for sticky-third variant', () => {
      const { container } = render(<Hero variant="sticky-third" />);
      expect(container.querySelector('.scroll-indicator')).not.toBeInTheDocument();
    });
  });

  describe('Background and Styling', () => {
    it('applies background image', () => {
      const { container } = render(<Hero backgroundImage="/test-image.jpg" />);
      const hero = container.firstChild;
      expect(hero.style.backgroundImage).toBe('url("/test-image.jpg")');
    });

    it('sets no background image when not provided', () => {
      const { container } = render(<Hero />);
      const hero = container.firstChild;
      expect(hero.style.backgroundImage).toBe('none');
    });

    it('applies custom height', () => {
      const { container } = render(<Hero height="500px" />);
      const hero = container.firstChild;
      expect(hero.style.getPropertyValue('--hero-height')).toBe('500px');
    });

    it('applies default height', () => {
      const { container } = render(<Hero />);
      const hero = container.firstChild;
      expect(hero.style.getPropertyValue('--hero-height')).toBe('100vh');
    });

    it('applies custom overlay opacity', () => {
      const { container } = render(<Hero overlayOpacity={0.7} />);
      const hero = container.firstChild;
      expect(hero.style.getPropertyValue('--overlay-opacity')).toBe('0.7');
    });

    it('applies default overlay opacity', () => {
      const { container } = render(<Hero />);
      const hero = container.firstChild;
      expect(hero.style.getPropertyValue('--overlay-opacity')).toBe('0.4');
    });
  });

  describe('Overlay', () => {
    it('renders overlay by default', () => {
      const { container } = render(<Hero />);
      expect(container.querySelector('.hero-overlay')).toBeInTheDocument();
    });

    it('renders overlay when explicitly enabled', () => {
      const { container } = render(<Hero overlay={true} />);
      expect(container.querySelector('.hero-overlay')).toBeInTheDocument();
    });

    it('does not render overlay when disabled', () => {
      const { container } = render(<Hero overlay={false} />);
      expect(container.querySelector('.hero-overlay')).not.toBeInTheDocument();
    });
  });

  describe('Scroll Behavior - Scroll Responsive', () => {
    beforeEach(() => {
      mockInnerHeight(1000);
    });

    it('adds scroll event listener for scroll-responsive variant', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      render(<Hero variant="scroll-responsive" />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });

    it('does not add scroll event listener for static variant', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      render(<Hero variant="static" />);
      
      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });

    it('applies parallax transform on scroll for scroll-responsive variant', () => {
      const { container } = render(<Hero variant="scroll-responsive" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(100);
        fireEvent.scroll(window);
      });
      
      expect(hero.style.transform).toBe('translateY(50px)'); // 100 * 0.5
    });

    it('adds scrolled class when scrolled past threshold', () => {
      const { container } = render(<Hero variant="scroll-responsive" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(400); // > 1000 * 0.3 = 300
        fireEvent.scroll(window);
      });
      
      expect(hero).toHaveClass('scrolled');
    });

    it('does not add scrolled class when below threshold', () => {
      const { container } = render(<Hero variant="scroll-responsive" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(200); // < 1000 * 0.3 = 300
        fireEvent.scroll(window);
      });
      
      expect(hero).not.toHaveClass('scrolled');
    });
  });

  describe('Scroll Behavior - Sticky Third', () => {
    beforeEach(() => {
      mockInnerHeight(1000);
    });

    it('adds scroll event listener for sticky-third variant', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      render(<Hero variant="sticky-third" />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });

    it('adds sticky class when scrolled past sticky threshold', () => {
      const { container } = render(<Hero variant="sticky-third" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(800); // > 1000 * 0.7 = 700
        fireEvent.scroll(window);
      });
      
      expect(hero).toHaveClass('sticky');
    });

    it('does not add sticky class when below sticky threshold', () => {
      const { container } = render(<Hero variant="sticky-third" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(600); // < 1000 * 0.7 = 700
        fireEvent.scroll(window);
      });
      
      expect(hero).not.toHaveClass('sticky');
    });

    it('does not apply parallax transform for sticky-third variant', () => {
      const { container } = render(<Hero variant="sticky-third" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(100);
        fireEvent.scroll(window);
      });
      
      expect(hero.style.transform).toBe('');
    });

    it('adds scrolled class for sticky-third variant', () => {
      const { container } = render(<Hero variant="sticky-third" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(400); // > 1000 * 0.3 = 300
        fireEvent.scroll(window);
      });
      
      expect(hero).toHaveClass('scrolled');
    });
  });

  describe('Event Listener Cleanup', () => {
    it('removes scroll event listener on unmount for scroll-responsive', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = render(<Hero variant="scroll-responsive" />);
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('removes scroll event listener on unmount for sticky-third', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = render(<Hero variant="sticky-third" />);
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('does not remove scroll listener for static variant', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = render(<Hero variant="static" />);
      
      unmount();
      
      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Hero className="custom-hero" />);
      expect(container.firstChild).toHaveClass('custom-hero');
    });

    it('combines multiple classes correctly', () => {
      const { container } = render(
        <Hero variant="scroll-responsive" className="custom-hero" />
      );
      const hero = container.firstChild;
      expect(hero).toHaveClass('acme-hero');
      expect(hero).toHaveClass('scroll-responsive');
      expect(hero).toHaveClass('custom-hero');
    });

    it('applies empty className gracefully', () => {
      const { container } = render(<Hero className="" />);
      expect(container.firstChild).toHaveClass('acme-hero');
    });
  });

  describe('Content Structure', () => {
    it('wraps title in h1 element', () => {
      render(<Hero title="Test Title" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Test Title');
      expect(heading).toHaveClass('hero-title');
    });

    it('wraps subtitle in paragraph element', () => {
      render(<Hero subtitle="Test Subtitle" />);
      const subtitle = screen.getByText('Test Subtitle');
      expect(subtitle.tagName).toBe('P');
      expect(subtitle).toHaveClass('hero-subtitle');
    });

    it('wraps children in hero-children div', () => {
      const { container } = render(
        <Hero>
          <span>Child content</span>
        </Hero>
      );
      const childrenWrapper = container.querySelector('.hero-children');
      expect(childrenWrapper).toBeInTheDocument();
      expect(childrenWrapper).toContainHTML('<span>Child content</span>');
    });

    it('does not render title element when title is not provided', () => {
      const { container } = render(<Hero subtitle="Only subtitle" />);
      expect(container.querySelector('.hero-title')).not.toBeInTheDocument();
    });

    it('does not render subtitle element when subtitle is not provided', () => {
      const { container } = render(<Hero title="Only title" />);
      expect(container.querySelector('.hero-subtitle')).not.toBeInTheDocument();
    });

    it('does not render children wrapper when children not provided', () => {
      const { container } = render(<Hero title="Title only" />);
      expect(container.querySelector('.hero-children')).not.toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('initializes with correct default state', () => {
      const { container } = render(<Hero variant="scroll-responsive" />);
      const hero = container.firstChild;
      
      expect(hero).not.toHaveClass('scrolled');
      expect(hero).not.toHaveClass('sticky');
    });

    it('updates multiple state values on scroll', () => {
      const { container } = render(<Hero variant="sticky-third" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(800); // triggers both scrolled and sticky
        fireEvent.scroll(window);
      });
      
      expect(hero).toHaveClass('scrolled');
      expect(hero).toHaveClass('sticky');
    });
  });

  describe('Edge Cases', () => {
    it('handles zero overlay opacity', () => {
      const { container } = render(<Hero overlayOpacity={0} />);
      const hero = container.firstChild;
      expect(hero.style.getPropertyValue('--overlay-opacity')).toBe('0');
    });

    it('handles maximum overlay opacity', () => {
      const { container } = render(<Hero overlayOpacity={1} />);
      const hero = container.firstChild;
      expect(hero.style.getPropertyValue('--overlay-opacity')).toBe('1');
    });

    it('handles empty background image string', () => {
      const { container } = render(<Hero backgroundImage="" />);
      const hero = container.firstChild;
      expect(hero.style.backgroundImage).toBe('none');
    });

    it('handles zero height', () => {
      const { container } = render(<Hero height="0" />);
      const hero = container.firstChild;
      expect(hero.style.getPropertyValue('--hero-height')).toBe('0');
    });

    it('handles very small window height', () => {
      mockInnerHeight(100);
      const { container } = render(<Hero variant="scroll-responsive" />);
      
      act(() => {
        mockScrollY(50); // > 100 * 0.3 = 30
        fireEvent.scroll(window);
      });
      
      expect(container.firstChild).toHaveClass('scrolled');
    });

    it('handles negative scroll values gracefully', () => {
      const { container } = render(<Hero variant="scroll-responsive" />);
      const hero = container.firstChild;
      
      act(() => {
        mockScrollY(-100);
        fireEvent.scroll(window);
      });
      
      expect(hero.style.transform).toBe('translateY(-50px)');
    });
  });

  describe('Accessibility', () => {
    it('renders as section element', () => {
      const { container } = render(<Hero />);
      expect(container.firstChild.tagName).toBe('SECTION');
    });

    it('provides proper heading hierarchy', () => {
      render(<Hero title="Main Hero Title" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('maintains content structure for screen readers', () => {
      render(
        <Hero title="Title" subtitle="Subtitle">
          <button>Action</button>
        </Hero>
      );
      
      const title = screen.getByRole('heading', { level: 1 });
      const subtitle = screen.getByText('Subtitle');
      const action = screen.getByRole('button');
      
      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
      expect(action).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('uses passive scroll listener', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      render(<Hero variant="scroll-responsive" />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });

    it('does not register scroll listeners unnecessarily', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      render(<Hero variant="static" />);
      
      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });
  });
});