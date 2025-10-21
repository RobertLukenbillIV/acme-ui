import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner, { LoadingWrapper } from '../Spinner';

describe('Spinner', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('acme-spinner', 'medium', 'primary', 'circular');
    });

    it('renders with default label', () => {
      render(<Spinner />);
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<Spinner label="Please wait..." />);
      expect(screen.getByLabelText('Please wait...')).toBeInTheDocument();
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Spinner className="custom-spinner" />);
      expect(screen.getByRole('status')).toHaveClass('custom-spinner');
    });

    it('forwards additional props', () => {
      render(<Spinner data-testid="spinner" />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies small size', () => {
      render(<Spinner size="small" />);
      expect(screen.getByRole('status')).toHaveClass('small');
    });

    it('applies medium size by default', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toHaveClass('medium');
    });

    it('applies large size', () => {
      render(<Spinner size="large" />);
      expect(screen.getByRole('status')).toHaveClass('large');
    });

    it('applies extra large size', () => {
      render(<Spinner size="xl" />);
      expect(screen.getByRole('status')).toHaveClass('xl');
    });
  });

  describe('Colors', () => {
    it('applies primary color by default', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toHaveClass('primary');
    });

    it('applies secondary color', () => {
      render(<Spinner color="secondary" />);
      expect(screen.getByRole('status')).toHaveClass('secondary');
    });

    it('applies success color', () => {
      render(<Spinner color="success" />);
      expect(screen.getByRole('status')).toHaveClass('success');
    });

    it('applies warning color', () => {
      render(<Spinner color="warning" />);
      expect(screen.getByRole('status')).toHaveClass('warning');
    });

    it('applies danger color', () => {
      render(<Spinner color="danger" />);
      expect(screen.getByRole('status')).toHaveClass('danger');
    });

    it('applies custom color', () => {
      render(<Spinner color="blue" />);
      expect(screen.getByRole('status')).toHaveClass('blue');
    });
  });

  describe('Variants', () => {
    it('renders circular variant by default', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('circular');
      expect(spinner.querySelector('.spinner-circular svg')).toBeInTheDocument();
    });

    it('renders dots variant', () => {
      render(<Spinner variant="dots" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('dots');
      
      const dotsContainer = spinner.querySelector('.spinner-dots');
      expect(dotsContainer).toBeInTheDocument();
      expect(dotsContainer.querySelectorAll('.dot')).toHaveLength(3);
    });

    it('renders pulse variant', () => {
      render(<Spinner variant="pulse" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('pulse');
      expect(spinner.querySelector('.spinner-pulse')).toBeInTheDocument();
    });

    it('renders bars variant', () => {
      render(<Spinner variant="bars" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('bars');
      
      const barsContainer = spinner.querySelector('.spinner-bars');
      expect(barsContainer).toBeInTheDocument();
      expect(barsContainer.querySelectorAll('.bar')).toHaveLength(4);
    });

    it('falls back to circular for unknown variant', () => {
      render(<Spinner variant="unknown" />);
      const spinner = screen.getByRole('status');
      expect(spinner.querySelector('.spinner-circular svg')).toBeInTheDocument();
    });
  });

  describe('SVG Structure', () => {
    it('renders SVG with correct attributes for circular variant', () => {
      render(<Spinner variant="circular" />);
      const svg = screen.getByRole('status').querySelector('svg');
      
      expect(svg).toHaveAttribute('viewBox', '0 0 50 50');
      
      const circle = svg.querySelector('circle');
      expect(circle).toHaveAttribute('cx', '25');
      expect(circle).toHaveAttribute('cy', '25');
      expect(circle).toHaveAttribute('r', '20');
      expect(circle).toHaveAttribute('fill', 'none');
      expect(circle).toHaveAttribute('stroke', 'currentColor');
      expect(circle).toHaveAttribute('stroke-width', '4');
      expect(circle).toHaveAttribute('stroke-linecap', 'round');
    });
  });

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-label', () => {
      render(<Spinner label="Loading content" />);
      expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
    });

    it('has screen reader text', () => {
      render(<Spinner label="Loading content" />);
      const srText = screen.getByText('Loading content');
      expect(srText).toHaveClass('sr-only');
    });

    it('supports custom aria attributes', () => {
      render(<Spinner aria-describedby="loading-description" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-describedby', 'loading-description');
    });
  });

  describe('Combinations', () => {
    it('combines size, color, and variant classes', () => {
      render(<Spinner size="large" color="success" variant="dots" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('acme-spinner', 'large', 'success', 'dots');
    });

    it('renders dots variant with custom size and color', () => {
      render(<Spinner size="small" color="warning" variant="dots" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('small', 'warning', 'dots');
      expect(spinner.querySelector('.spinner-dots')).toBeInTheDocument();
    });
  });
});

describe('LoadingWrapper', () => {
  describe('Basic Rendering', () => {
    it('renders children without loading state', () => {
      render(
        <LoadingWrapper>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('renders children with loading state', () => {
      render(
        <LoadingWrapper loading>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('applies loading class when loading', () => {
      const { container } = render(
        <LoadingWrapper loading>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(container.firstChild).toHaveClass('loading-wrapper', 'loading');
    });

    it('does not apply loading class when not loading', () => {
      const { container } = render(
        <LoadingWrapper>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(container.firstChild).toHaveClass('loading-wrapper');
      expect(container.firstChild).not.toHaveClass('loading');
    });
  });

  describe('Overlay', () => {
    it('renders overlay by default when loading', () => {
      const { container } = render(
        <LoadingWrapper loading>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      const overlay = container.querySelector('.loading-overlay');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass('with-overlay');
    });

    it('renders without overlay when overlay is false', () => {
      const { container } = render(
        <LoadingWrapper loading overlay={false}>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      const overlay = container.querySelector('.loading-overlay');
      expect(overlay).toBeInTheDocument();
      expect(overlay).not.toHaveClass('with-overlay');
    });

    it('does not render overlay when not loading', () => {
      const { container } = render(
        <LoadingWrapper overlay={false}>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(container.querySelector('.loading-overlay')).not.toBeInTheDocument();
    });
  });

  describe('Custom Spinner', () => {
    it('renders default spinner when not provided', () => {
      render(
        <LoadingWrapper loading>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('acme-spinner');
    });

    it('renders custom spinner when provided', () => {
      render(
        <LoadingWrapper loading spinner={<Spinner variant="dots" color="success" />}>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('dots', 'success');
    });

    it('accepts non-Spinner elements as spinner', () => {
      render(
        <LoadingWrapper loading spinner={<div data-testid="custom-loader">Loading...</div>}>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(
        <LoadingWrapper className="custom-wrapper">
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(container.firstChild).toHaveClass('custom-wrapper');
    });

    it('forwards additional props', () => {
      render(
        <LoadingWrapper data-testid="wrapper">
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('maintains proper DOM structure', () => {
      const { container } = render(
        <LoadingWrapper loading>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('loading-wrapper');
      expect(wrapper.querySelector('div')).toHaveTextContent('Content');
      expect(wrapper.querySelector('.loading-overlay')).toBeInTheDocument();
      expect(wrapper.querySelector('.acme-spinner')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works with complex children', () => {
      render(
        <LoadingWrapper loading>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button>Action</button>
          </div>
        </LoadingWrapper>
      );
      
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('toggles loading state correctly', () => {
      const { rerender } = render(
        <LoadingWrapper loading={false}>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      
      rerender(
        <LoadingWrapper loading={true}>
          <div>Content</div>
        </LoadingWrapper>
      );
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});