import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Avatar />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('renders with image when src is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      expect(image).toHaveAttribute('alt', 'User Avatar');
    });

    it('renders with custom name and generates initials', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders single initial for single name', () => {
      render(<Avatar name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('renders first two initials for multiple names', () => {
      render(<Avatar name="John Michael Doe Smith" />);
      expect(screen.getByText('JM')).toBeInTheDocument();
    });

    it('uses alt text for initials when name is not provided', () => {
      render(<Avatar alt="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders fallback icon when provided', () => {
      const fallbackIcon = <span data-testid="fallback-icon">👤</span>;
      render(<Avatar fallbackIcon={fallbackIcon} />);
      expect(screen.getByTestId('fallback-icon')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies small size class', () => {
      const { container } = render(<Avatar size="small" name="John" />);
      expect(container.firstChild).toHaveClass('small');
    });

    it('applies medium size class by default', () => {
      const { container } = render(<Avatar name="John" />);
      expect(container.firstChild).toHaveClass('medium');
    });

    it('applies large size class', () => {
      const { container } = render(<Avatar size="large" name="John" />);
      expect(container.firstChild).toHaveClass('large');
    });
  });

  describe('Variants', () => {
    it('applies circle variant by default', () => {
      const { container } = render(<Avatar name="John" />);
      expect(container.firstChild).toHaveClass('circle');
    });

    it('applies square variant', () => {
      const { container } = render(<Avatar variant="square" name="John" />);
      expect(container.firstChild).toHaveClass('square');
    });

    it('applies rounded variant', () => {
      const { container } = render(<Avatar variant="rounded" name="John" />);
      expect(container.firstChild).toHaveClass('rounded');
    });
  });

  describe('Status', () => {
    it('renders online status', () => {
      render(<Avatar name="John" status="online" />);
      const statusElement = screen.getByLabelText('Status: online');
      expect(statusElement).toBeInTheDocument();
      expect(statusElement.closest('.acme-avatar')).toHaveClass('status-online');
    });

    it('renders offline status', () => {
      render(<Avatar name="John" status="offline" />);
      const statusElement = screen.getByLabelText('Status: offline');
      expect(statusElement).toBeInTheDocument();
      expect(statusElement.closest('.acme-avatar')).toHaveClass('status-offline');
    });

    it('renders away status', () => {
      render(<Avatar name="John" status="away" />);
      expect(screen.getByLabelText('Status: away')).toBeInTheDocument();
    });

    it('renders busy status', () => {
      render(<Avatar name="John" status="busy" />);
      expect(screen.getByLabelText('Status: busy')).toBeInTheDocument();
    });

    it('does not render status when not provided', () => {
      render(<Avatar name="John" />);
      expect(screen.queryByLabelText(/Status:/)).not.toBeInTheDocument();
    });
  });

  describe('Image Error Handling', () => {
    it('shows fallback when image fails to load', () => {
      render(<Avatar src="invalid-image.jpg" name="John Doe" />);
      const image = screen.getByRole('img');
      
      // Simulate image error
      fireEvent.error(image);
      
      // Image should be hidden
      expect(image).toHaveStyle('display: none');
      
      // Fallback should be visible
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates correct alt text for image', () => {
      render(<Avatar src="avatar.jpg" name="John Doe" />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', "John Doe's avatar");
    });

    it('uses provided alt text for image', () => {
      render(<Avatar src="avatar.jpg" alt="Custom Alt Text" />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Custom Alt Text');
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked and clickable', () => {
      const handleClick = jest.fn();
      const { container } = render(<Avatar name="John" onClick={handleClick} />);
      
      expect(container.firstChild).toHaveClass('clickable');
      
      fireEvent.click(container.firstChild);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not apply clickable class when onClick is not provided', () => {
      const { container } = render(<Avatar name="John" />);
      expect(container.firstChild).not.toHaveClass('clickable');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Avatar name="John" className="custom-avatar" />);
      expect(container.firstChild).toHaveClass('custom-avatar');
    });

    it('forwards additional props', () => {
      render(<Avatar name="John" data-testid="custom-avatar" />);
      expect(screen.getByTestId('custom-avatar')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper alt text for images', () => {
      render(<Avatar src="avatar.jpg" name="John Doe" />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', "John Doe's avatar");
    });

    it('provides aria-label for status', () => {
      render(<Avatar name="John" status="online" />);
      expect(screen.getByLabelText('Status: online')).toBeInTheDocument();
    });

    it('maintains semantic structure', () => {
      const { container } = render(<Avatar name="John" status="online" />);
      const avatar = container.firstChild;
      
      expect(avatar).toHaveClass('acme-avatar');
      expect(avatar.querySelector('.avatar-content')).toBeInTheDocument();
      expect(avatar.querySelector('.avatar-status')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty name gracefully', () => {
      render(<Avatar name="" />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('handles null name gracefully', () => {
      render(<Avatar name={null} />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('handles special characters in name', () => {
      render(<Avatar name="José María" />);
      expect(screen.getByText('JM')).toBeInTheDocument();
    });

    it('handles lowercase names', () => {
      render(<Avatar name="john doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles single character names', () => {
      render(<Avatar name="J" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });
  });
});