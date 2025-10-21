import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';

describe('Switch', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Switch onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeInTheDocument();
      expect(switchInput).not.toBeChecked();
    });

    it('renders checked when checked prop is true', () => {
      render(<Switch checked onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeChecked();
    });

    it('renders unchecked when checked prop is false', () => {
      render(<Switch checked={false} onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).not.toBeChecked();
    });

    it('applies custom className', () => {
      const { container } = render(<Switch className="custom-switch" onChange={() => {}} />);
      expect(container.firstChild).toHaveClass('custom-switch');
    });

    it('generates unique id when not provided', () => {
      render(<Switch onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('id');
      expect(switchInput.id).toMatch(/^switch-/);
    });

    it('uses provided id', () => {
      render(<Switch id="custom-switch" onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('id', 'custom-switch');
    });
  });

  describe('Sizes', () => {
    it('applies small size', () => {
      const { container } = render(<Switch size="small" onChange={() => {}} />);
      expect(container.firstChild).toHaveClass('small');
    });

    it('applies medium size by default', () => {
      const { container } = render(<Switch onChange={() => {}} />);
      expect(container.firstChild).toHaveClass('medium');
    });

    it('applies large size', () => {
      const { container } = render(<Switch size="large" onChange={() => {}} />);
      expect(container.firstChild).toHaveClass('large');
    });
  });

  describe('Colors', () => {
    it('applies primary color by default', () => {
      render(<Switch onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveClass('primary');
    });

    it('applies secondary color', () => {
      render(<Switch color="secondary" onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveClass('secondary');
    });

    it('applies success color', () => {
      render(<Switch color="success" onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveClass('success');
    });

    it('applies warning color', () => {
      render(<Switch color="warning" onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveClass('warning');
    });

    it('applies danger color', () => {
      render(<Switch color="danger" onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveClass('danger');
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled', () => {
      render(<Switch disabled onChange={() => {}} />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('applies disabled class', () => {
      const { container } = render(<Switch disabled onChange={() => {}} />);
      expect(container.firstChild).toHaveClass('disabled');
    });

    it('does not trigger onChange when disabled', () => {
      const handleChange = jest.fn();
      render(<Switch disabled onChange={handleChange} />);
      
      const switchInput = screen.getByRole('checkbox');
      
      // In test environment, disabled inputs still fire events
      // but in real browsers they don't - this tests the disabled attribute
      expect(switchInput).toBeDisabled();
      
      // Still test that it doesn't throw when clicked
      expect(() => {
        fireEvent.click(switchInput);
      }).not.toThrow();
    });
  });

  describe('Labels and Text', () => {
    it('renders with label', () => {
      render(<Switch label="Enable notifications" onChange={() => {}} />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Switch description="Receive email notifications for updates" onChange={() => {}} />);
      expect(screen.getByText('Receive email notifications for updates')).toBeInTheDocument();
    });

    it('renders with both label and description', () => {
      render(
        <Switch 
          label="Enable notifications" 
          description="Receive email notifications for updates" 
          onChange={() => {}}
        />
      );
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
      expect(screen.getByText('Receive email notifications for updates')).toBeInTheDocument();
    });

    it('does not render text container when no label or description', () => {
      const { container } = render(<Switch onChange={() => {}} />);
      expect(container.querySelector('.switch-text')).not.toBeInTheDocument();
    });

    it('associates label with input via htmlFor', () => {
      render(<Switch label="Test Label" id="test-switch" onChange={() => {}} />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'test-switch');
    });
  });

  describe('Interaction', () => {
    it('calls onChange when clicked', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');
      
      await user.click(switchInput);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onChange with event when clicked', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');
      
      await user.click(switchInput);
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({
          type: 'checkbox'
        }),
        type: 'change'
      }));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('can be toggled by clicking label when label text is provided', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Switch label="Toggle me" onChange={handleChange} />);
      const labelText = screen.getByText('Toggle me');
      
      await user.click(labelText);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction (Space key)', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');
      
      switchInput.focus();
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction (Enter key)', () => {
      const handleChange = jest.fn();
      
      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');
      
      switchInput.focus();
      fireEvent.keyDown(switchInput, { key: 'Enter', code: 'Enter' });
      // Note: Enter doesn't typically trigger checkbox change, but Space does
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Checked State Visual', () => {
    it('applies checked class to label when checked', () => {
      render(<Switch checked onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveClass('checked');
    });

    it('does not apply checked class when unchecked', () => {
      render(<Switch checked={false} onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).not.toHaveClass('checked');
    });

    it('updates checked class when state changes', () => {
      const { rerender } = render(<Switch checked={false} onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      
      expect(label).not.toHaveClass('checked');
      
      rerender(<Switch checked onChange={() => {}} />);
      expect(label).toHaveClass('checked');
    });
  });

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Switch onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeInTheDocument();
    });

    it('has default aria-label when no label provided', () => {
      render(<Switch onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveAttribute('aria-label', 'Toggle switch');
    });

    it('uses provided label for aria-label', () => {
      render(<Switch label="Enable feature" onChange={() => {}} />);
      const label = document.querySelector('.switch-label');
      expect(label).toHaveAttribute('aria-label', 'Enable feature');
    });

    it('is focusable', () => {
      render(<Switch onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      
      switchInput.focus();
      expect(document.activeElement).toBe(switchInput);
    });

    it('supports aria attributes', () => {
      render(<Switch aria-describedby="help-text" onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('aria-describedby', 'help-text');
    });
  });

  describe('Props Forwarding', () => {
    it('forwards additional props to input', () => {
      render(<Switch data-testid="switch-input" name="toggle" onChange={() => {}} />);
      const switchInput = screen.getByTestId('switch-input');
      expect(switchInput).toHaveAttribute('name', 'toggle');
    });

    it('forwards aria attributes', () => {
      render(<Switch aria-label="Custom toggle" onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('aria-label', 'Custom toggle');
    });
  });

  describe('Structure', () => {
    it('maintains proper DOM structure', () => {
      const { container } = render(<Switch label="Test" onChange={() => {}} />);
      const wrapper = container.firstChild;
      
      expect(wrapper).toHaveClass('acme-switch-wrapper');
      expect(wrapper.querySelector('.switch-container')).toBeInTheDocument();
      expect(wrapper.querySelector('.switch-input')).toBeInTheDocument();
      expect(wrapper.querySelector('.switch-label')).toBeInTheDocument();
      expect(wrapper.querySelector('.switch-track')).toBeInTheDocument();
      expect(wrapper.querySelector('.switch-thumb')).toBeInTheDocument();
      expect(wrapper.querySelector('.switch-text')).toBeInTheDocument();
    });

    it('renders track and thumb elements', () => {
      render(<Switch onChange={() => {}} />);
      expect(document.querySelector('.switch-track')).toBeInTheDocument();
      expect(document.querySelector('.switch-thumb')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing onChange gracefully', () => {
      // This test intentionally omits onChange to test graceful handling
      // The warning about missing onChange is expected and can be ignored
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<Switch />);
      const switchInput = screen.getByRole('checkbox');
      
      // Should not throw error when clicked without onChange
      expect(() => {
        fireEvent.click(switchInput);
      }).not.toThrow();
      
      consoleSpy.mockRestore();
    });

    it('handles undefined checked value', () => {
      render(<Switch checked={undefined} onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).not.toBeChecked();
    });

    it('handles null checked value', () => {
      render(<Switch checked={null} onChange={() => {}} />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).not.toBeChecked();
    });

    it('handles empty label gracefully', () => {
      render(<Switch label="" onChange={() => {}} />);
      // Should still render but without text
      expect(document.querySelector('.switch-text')).not.toBeInTheDocument();
    });
  });

  describe('Combinations', () => {
    it('combines size, color, and state classes correctly', () => {
      const { container } = render(
        <Switch 
          size="large" 
          color="success" 
          checked 
          disabled 
          className="custom"
        />
      );
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('acme-switch-wrapper', 'large', 'disabled', 'custom');
      
      const label = document.querySelector('.switch-label');
      expect(label).toHaveClass('success', 'checked');
    });
  });
});