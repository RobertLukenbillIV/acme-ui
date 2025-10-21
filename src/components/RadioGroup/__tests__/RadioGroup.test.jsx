import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '../RadioGroup';

describe('RadioGroup', () => {
  const basicOptions = ['Option 1', 'Option 2', 'Option 3'];
  const objectOptions = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' }
  ];

  describe('Basic Rendering', () => {
    it('renders with string options', () => {
      render(<RadioGroup options={basicOptions} />);
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('renders with object options', () => {
      render(<RadioGroup options={objectOptions} />);
      
      expect(screen.getByText('First Option')).toBeInTheDocument();
      expect(screen.getByText('Second Option')).toBeInTheDocument();
      expect(screen.getByText('Third Option')).toBeInTheDocument();
    });

    it('renders without options gracefully', () => {
      const { container } = render(<RadioGroup />);
      expect(container.querySelector('.radio-options')).toBeInTheDocument();
      expect(container.querySelectorAll('.radio-option')).toHaveLength(0);
    });

    it('generates unique group name when not provided', () => {
      render(<RadioGroup options={basicOptions} />);
      const radioInputs = screen.getAllByRole('radio');
      
      radioInputs.forEach(input => {
        expect(input).toHaveAttribute('name');
        expect(input.name).toMatch(/^radio-group-/);
      });
    });

    it('uses provided name for group', () => {
      render(<RadioGroup options={basicOptions} name="test-group" />);
      const radioInputs = screen.getAllByRole('radio');
      
      radioInputs.forEach(input => {
        expect(input).toHaveAttribute('name', 'test-group');
      });
    });
  });

  describe('Selection and Value', () => {
    it('selects the correct option based on value', () => {
      render(<RadioGroup options={basicOptions} value="Option 2" />);
      
      const option1 = screen.getByDisplayValue('Option 1');
      const option2 = screen.getByDisplayValue('Option 2');
      const option3 = screen.getByDisplayValue('Option 3');
      
      expect(option1).not.toBeChecked();
      expect(option2).toBeChecked();
      expect(option3).not.toBeChecked();
    });

    it('works with object options and values', () => {
      render(<RadioGroup options={objectOptions} value="option2" />);
      
      const option1 = screen.getByDisplayValue('option1');
      const option2 = screen.getByDisplayValue('option2');
      const option3 = screen.getByDisplayValue('option3');
      
      expect(option1).not.toBeChecked();
      expect(option2).toBeChecked();
      expect(option3).not.toBeChecked();
    });

    it('shows no selection when value does not match any option', () => {
      render(<RadioGroup options={basicOptions} value="Non-existent" />);
      
      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(input => {
        expect(input).not.toBeChecked();
      });
    });
  });

  describe('User Interaction', () => {
    it('calls onChange when option is selected', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<RadioGroup options={basicOptions} onChange={handleChange} name="test" />);
      
      const option2 = screen.getByDisplayValue('Option 2');
      await user.click(option2);
      
      expect(handleChange).toHaveBeenCalledWith({
        target: {
          name: 'test',
          value: 'Option 2'
        }
      });
    });

    it('calls onChange with object option value', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<RadioGroup options={objectOptions} onChange={handleChange} name="test" />);
      
      const option2 = screen.getByDisplayValue('option2');
      await user.click(option2);
      
      expect(handleChange).toHaveBeenCalledWith({
        target: {
          name: 'test',
          value: 'option2'
        }
      });
    });

    it('can be controlled - selection updates when value prop changes', () => {
      const { rerender } = render(<RadioGroup options={basicOptions} value="Option 1" />);
      
      expect(screen.getByDisplayValue('Option 1')).toBeChecked();
      expect(screen.getByDisplayValue('Option 2')).not.toBeChecked();
      
      rerender(<RadioGroup options={basicOptions} value="Option 2" />);
      
      expect(screen.getByDisplayValue('Option 1')).not.toBeChecked();
      expect(screen.getByDisplayValue('Option 2')).toBeChecked();
    });

    it('supports keyboard navigation between options', async () => {
      const user = userEvent.setup();
      
      render(<RadioGroup options={basicOptions} />);
      
      const option1 = screen.getByDisplayValue('Option 1');
      const option2 = screen.getByDisplayValue('Option 2');
      
      option1.focus();
      await user.keyboard('{ArrowDown}');
      
      expect(document.activeElement).toBe(option2);
    });
  });

  describe('Disabled State', () => {
    it('disables all options when disabled prop is true', () => {
      render(<RadioGroup options={basicOptions} disabled />);
      
      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(input => {
        expect(input).toBeDisabled();
      });
    });

    it('applies disabled class to wrapper when disabled', () => {
      const { container } = render(<RadioGroup options={basicOptions} disabled />);
      expect(container.firstChild).toHaveClass('disabled');
    });

    it('disables individual options when option.disabled is true', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' }
      ];
      
      render(<RadioGroup options={optionsWithDisabled} />);
      
      expect(screen.getByDisplayValue('option1')).not.toBeDisabled();
      expect(screen.getByDisplayValue('option2')).toBeDisabled();
      expect(screen.getByDisplayValue('option3')).not.toBeDisabled();
    });

    it('does not call onChange when disabled option is clicked', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<RadioGroup options={basicOptions} disabled onChange={handleChange} />);
      
      const option1 = screen.getByDisplayValue('Option 1');
      await user.click(option1);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Labels and Text', () => {
    it('renders group label', () => {
      render(<RadioGroup options={basicOptions} label="Choose an option" />);
      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('renders group description', () => {
      render(<RadioGroup options={basicOptions} label="Choose option" description="Select one of the following options" />);
      expect(screen.getByText('Select one of the following options')).toBeInTheDocument();
    });

    it('renders both label and description', () => {
      render(
        <RadioGroup 
          options={basicOptions} 
          label="Choose option" 
          description="Select carefully" 
        />
      );
      expect(screen.getByText('Choose option')).toBeInTheDocument();
      expect(screen.getByText('Select carefully')).toBeInTheDocument();
    });

    it('renders option descriptions for object options', () => {
      const optionsWithDescription = [
        { value: 'option1', label: 'Option 1', description: 'First choice' },
        { value: 'option2', label: 'Option 2', description: 'Second choice' }
      ];
      
      render(<RadioGroup options={optionsWithDescription} />);
      
      expect(screen.getByText('First choice')).toBeInTheDocument();
      expect(screen.getByText('Second choice')).toBeInTheDocument();
    });

    it('shows required indicator when required', () => {
      render(<RadioGroup options={basicOptions} label="Choose" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Direction and Layout', () => {
    it('applies vertical direction by default', () => {
      const { container } = render(<RadioGroup options={basicOptions} />);
      expect(container.firstChild).toHaveClass('vertical');
    });

    it('applies horizontal direction', () => {
      const { container } = render(<RadioGroup options={basicOptions} direction="horizontal" />);
      expect(container.firstChild).toHaveClass('horizontal');
    });
  });

  describe('Sizes', () => {
    it('applies small size', () => {
      const { container } = render(<RadioGroup options={basicOptions} size="small" />);
      expect(container.firstChild).toHaveClass('small');
    });

    it('applies medium size by default', () => {
      const { container } = render(<RadioGroup options={basicOptions} />);
      expect(container.firstChild).toHaveClass('medium');
    });

    it('applies large size', () => {
      const { container } = render(<RadioGroup options={basicOptions} size="large" />);
      expect(container.firstChild).toHaveClass('large');
    });
  });

  describe('Error State', () => {
    it('displays error message', () => {
      render(<RadioGroup options={basicOptions} error="Please select an option" />);
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('applies error class when error is present', () => {
      const { container } = render(<RadioGroup options={basicOptions} error="Error message" />);
      expect(container.firstChild).toHaveClass('error');
    });

    it('does not show error section when no error', () => {
      const { container } = render(<RadioGroup options={basicOptions} />);
      expect(container.querySelector('.radio-group-error')).not.toBeInTheDocument();
    });
  });

  describe('Required State', () => {
    it('adds required attribute to radio inputs when required', () => {
      render(<RadioGroup options={basicOptions} required />);
      
      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(input => {
        expect(input).toBeRequired();
      });
    });

    it('does not add required attribute when not required', () => {
      render(<RadioGroup options={basicOptions} />);
      
      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(input => {
        expect(input).not.toBeRequired();
      });
    });
  });

  describe('Accessibility', () => {
    it('associates labels with radio inputs correctly', () => {
      render(<RadioGroup options={basicOptions} name="test" />);
      
      const option1Input = screen.getByDisplayValue('Option 1');
      const option1Label = screen.getByText('Option 1');
      
      expect(option1Input).toHaveAttribute('id');
      expect(option1Label.closest('label')).toHaveAttribute('for', option1Input.id);
    });

    it('groups radio buttons with the same name', () => {
      render(<RadioGroup options={basicOptions} name="test-group" />);
      
      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(input => {
        expect(input).toHaveAttribute('name', 'test-group');
      });
    });

    it('maintains focus management for keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(<RadioGroup options={basicOptions} />);
      
      const radioInputs = screen.getAllByRole('radio');
      
      radioInputs[0].focus();
      expect(document.activeElement).toBe(radioInputs[0]);
      
      await user.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(radioInputs[1]);
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<RadioGroup options={basicOptions} className="custom-radio" />);
      expect(container.firstChild).toHaveClass('custom-radio');
    });

    it('forwards additional props', () => {
      render(<RadioGroup options={basicOptions} data-testid="radio-group" />);
      expect(screen.getByTestId('radio-group')).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('maintains proper DOM structure', () => {
      const { container } = render(
        <RadioGroup 
          options={basicOptions} 
          label="Test Label" 
          description="Test Description"
          error="Test Error"
        />
      );
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('acme-radio-group');
      expect(wrapper.querySelector('.radio-group-header')).toBeInTheDocument();
      expect(wrapper.querySelector('.radio-group-label')).toBeInTheDocument();
      expect(wrapper.querySelector('.radio-group-description')).toBeInTheDocument();
      expect(wrapper.querySelector('.radio-options')).toBeInTheDocument();
      expect(wrapper.querySelector('.radio-group-error')).toBeInTheDocument();
    });

    it('renders radio indicator and dot elements', () => {
      render(<RadioGroup options={basicOptions} />);
      
      expect(document.querySelector('.radio-indicator')).toBeInTheDocument();
      expect(document.querySelector('.radio-dot')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      const { container } = render(<RadioGroup options={[]} />);
      expect(container.querySelector('.radio-options')).toBeInTheDocument();
      expect(container.querySelectorAll('.radio-option')).toHaveLength(0);
    });

    it('handles options with special characters', () => {
      const specialOptions = ['Option & More', 'Option < Less', 'Option > Greater'];
      render(<RadioGroup options={specialOptions} />);
      
      expect(screen.getByText('Option & More')).toBeInTheDocument();
      expect(screen.getByText('Option < Less')).toBeInTheDocument();
      expect(screen.getByText('Option > Greater')).toBeInTheDocument();
    });

    it('handles missing onChange gracefully', () => {
      render(<RadioGroup options={basicOptions} />);
      
      const option1 = screen.getByDisplayValue('Option 1');
      expect(() => {
        fireEvent.click(option1);
      }).not.toThrow();
    });

    it('handles undefined value', () => {
      render(<RadioGroup options={basicOptions} value={undefined} />);
      
      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(input => {
        expect(input).not.toBeChecked();
      });
    });
  });

  describe('Visual State Classes', () => {
    it('applies checked class to selected option container', () => {
      render(<RadioGroup options={basicOptions} value="Option 2" />);
      
      const options = document.querySelectorAll('.radio-option');
      expect(options[0]).not.toHaveClass('checked');
      expect(options[1]).toHaveClass('checked');
      expect(options[2]).not.toHaveClass('checked');
    });

    it('applies disabled class to disabled option containers', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true }
      ];
      
      render(<RadioGroup options={optionsWithDisabled} />);
      
      const options = document.querySelectorAll('.radio-option');
      expect(options[0]).not.toHaveClass('disabled');
      expect(options[1]).toHaveClass('disabled');
    });
  });
});