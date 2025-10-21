import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge, { BadgeWrapper } from '../Badge';

describe('Badge', () => {
  describe('Basic Rendering', () => {
    it('renders text content', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders numeric content', () => {
      render(<Badge>5</Badge>);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('applies default variant and size classes', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('acme-badge', 'default', 'medium');
    });

    it('does not render when content is empty and not a dot', () => {
      const { container } = render(<Badge></Badge>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Variants', () => {
    it('applies primary variant', () => {
      render(<Badge variant="primary">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('primary');
    });

    it('applies secondary variant', () => {
      render(<Badge variant="secondary">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('secondary');
    });

    it('applies success variant', () => {
      render(<Badge variant="success">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('success');
    });

    it('applies warning variant', () => {
      render(<Badge variant="warning">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('warning');
    });

    it('applies danger variant', () => {
      render(<Badge variant="danger">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('danger');
    });
  });

  describe('Sizes', () => {
    it('applies small size', () => {
      render(<Badge size="small">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('small');
    });

    it('applies medium size by default', () => {
      render(<Badge>Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('medium');
    });

    it('applies large size', () => {
      render(<Badge size="large">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('large');
    });
  });

  describe('Colors', () => {
    it('applies custom color class', () => {
      render(<Badge color="blue">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('color-blue');
    });

    it('does not apply color class when color is null', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge.className).not.toMatch(/color-/);
    });
  });

  describe('Dot Badge', () => {
    it('renders dot badge without content', () => {
      render(<Badge dot />);
      const badge = document.querySelector('.acme-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('dot');
      expect(badge).toBeEmptyDOMElement();
    });

    it('renders dot badge with variant', () => {
      render(<Badge dot variant="danger" />);
      const badge = document.querySelector('.acme-badge');
      expect(badge).toHaveClass('dot', 'danger');
    });

    it('ignores content when dot is true', () => {
      render(<Badge dot>Should not show</Badge>);
      const badge = document.querySelector('.acme-badge');
      expect(badge).toBeEmptyDOMElement();
    });
  });

  describe('Numeric Badges', () => {
    it('displays number as-is when under max', () => {
      render(<Badge>{5}</Badge>);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('displays max+ when number exceeds max', () => {
      render(<Badge max={99}>{150}</Badge>);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('uses custom max value', () => {
      render(<Badge max={10}>{15}</Badge>);
      expect(screen.getByText('10+')).toBeInTheDocument();
    });

    it('hides zero by default', () => {
      const { container } = render(<Badge>{0}</Badge>);
      expect(container.firstChild).toBeNull();
    });

    it('shows zero when showZero is true', () => {
      render(<Badge showZero>{0}</Badge>);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles negative numbers', () => {
      render(<Badge>{-5}</Badge>);
      expect(screen.getByText('-5')).toBeInTheDocument();
    });

    it('handles decimal numbers', () => {
      render(<Badge>{5.5}</Badge>);
      expect(screen.getByText('5.5')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<Badge className="custom-badge">Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('custom-badge');
    });

    it('forwards additional props', () => {
      render(<Badge data-testid="custom-badge">Test</Badge>);
      expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
    });

    it('forwards aria attributes', () => {
      render(<Badge aria-label="Notification count">5</Badge>);
      expect(screen.getByLabelText('Notification count')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders as span element', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge.tagName).toBe('SPAN');
    });

    it('supports aria-label for screen readers', () => {
      render(<Badge aria-label="5 notifications">{5}</Badge>);
      expect(screen.getByLabelText('5 notifications')).toBeInTheDocument();
    });
  });
});

describe('BadgeWrapper', () => {
  describe('Basic Rendering', () => {
    it('renders children and badge', () => {
      render(
        <BadgeWrapper badge={<Badge>5</Badge>}>
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('creates Badge from non-element badge prop', () => {
      render(
        <BadgeWrapper badge="New">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders without badge when badge prop is null', () => {
      render(
        <BadgeWrapper badge={null}>
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.queryByText('New')).not.toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    it('applies default top-right position', () => {
      const { container } = render(
        <BadgeWrapper badge="New">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(container.firstChild).toHaveClass('top-right');
    });

    it('applies custom position', () => {
      const { container } = render(
        <BadgeWrapper badge="New" position="bottom-left">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(container.firstChild).toHaveClass('bottom-left');
    });

    it('applies top-left position', () => {
      const { container } = render(
        <BadgeWrapper badge="New" position="top-left">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(container.firstChild).toHaveClass('top-left');
    });

    it('applies bottom-right position', () => {
      const { container } = render(
        <BadgeWrapper badge="New" position="bottom-right">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(container.firstChild).toHaveClass('bottom-right');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(
        <BadgeWrapper badge="New" className="custom-wrapper">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(container.firstChild).toHaveClass('custom-wrapper');
    });

    it('forwards additional props', () => {
      render(
        <BadgeWrapper badge="New" data-testid="wrapper">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works with dot badges', () => {
      render(
        <BadgeWrapper badge={<Badge dot variant="danger" />}>
          <button>Notifications</button>
        </BadgeWrapper>
      );
      
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      const badge = document.querySelector('.acme-badge.dot.danger');
      expect(badge).toBeInTheDocument();
    });

    it('works with numeric badges', () => {
      render(
        <BadgeWrapper badge={<Badge>{99}</Badge>}>
          <div>Icon</div>
        </BadgeWrapper>
      );
      
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('handles complex children', () => {
      render(
        <BadgeWrapper badge="3">
          <div>
            <span>Complex</span>
            <span>Content</span>
          </div>
        </BadgeWrapper>
      );
      
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('maintains proper DOM structure', () => {
      const { container } = render(
        <BadgeWrapper badge="New">
          <button>Messages</button>
        </BadgeWrapper>
      );
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('acme-badge-wrapper');
      expect(wrapper.querySelector('button')).toBeInTheDocument();
      expect(wrapper.querySelector('.badge-container')).toBeInTheDocument();
      expect(wrapper.querySelector('.acme-badge')).toBeInTheDocument();
    });
  });
});