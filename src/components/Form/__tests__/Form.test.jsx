import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput, Select, Checkbox, TextArea } from '../';

describe('Form Components', () => {
  describe('TextInput', () => {
    test('renders text input with label', () => {
      render(<TextInput label="Name" value="" onChange={() => {}} />);
      
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('shows error message when provided', () => {
      render(
        <TextInput 
          label="Email" 
          value="" 
          onChange={() => {}} 
          error="This field is required" 
        />
      );
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    test('calls onChange when value changes', async () => {
      const mockOnChange = jest.fn();
      const user = userEvent.setup();
      
      render(<TextInput label="Name" value="" onChange={mockOnChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'John');
      
      expect(mockOnChange).toHaveBeenCalledTimes(4); // J, o, h, n
    });

    test('shows placeholder text', () => {
      render(
        <TextInput 
          label="Name" 
          value="" 
          onChange={() => {}} 
          placeholder="Enter your name" 
        />
      );
      
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    });

    test('shows required star when required', () => {
      render(<TextInput label="Name" value="" onChange={() => {}} required />);
      
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    test('applies error class when error is provided', () => {
      render(
        <TextInput 
          label="Email" 
          value="" 
          onChange={() => {}} 
          error="Invalid email" 
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('error');
    });
  });

  describe('Select', () => {
    const options = [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' }
    ];

    test('renders select with options', () => {
      render(<Select label="Country" value="" onChange={() => {}} options={options} />);
      
      expect(screen.getByText('Country')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });

    test('calls onChange when selection changes', async () => {
      const mockOnChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Select label="Country" value="" onChange={mockOnChange} options={options} />);
      
      const select = screen.getByRole('combobox');
      await user.selectOptions(select, 'us');
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    test('shows error message when provided', () => {
      render(
        <Select 
          label="Country" 
          value="" 
          onChange={() => {}} 
          options={options}
          error="Please select a country" 
        />
      );
      
      expect(screen.getByText('Please select a country')).toBeInTheDocument();
    });
  });

  describe('Checkbox', () => {
    test('renders checkbox with label', () => {
      render(<Checkbox label="Subscribe" checked={false} onChange={() => {}} />);
      
      expect(screen.getByText('Subscribe')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    test('calls onChange when clicked', async () => {
      const mockOnChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Checkbox label="Subscribe" checked={false} onChange={mockOnChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    test('reflects checked state', () => {
      render(<Checkbox label="Subscribe" checked={true} onChange={() => {}} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });

  describe('TextArea', () => {
    test('renders textarea with label', () => {
      render(<TextArea label="Message" value="" onChange={() => {}} />);
      
      expect(screen.getByText('Message')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('calls onChange when value changes', async () => {
      const mockOnChange = jest.fn();
      const user = userEvent.setup();
      
      render(<TextArea label="Message" value="" onChange={mockOnChange} />);
      
      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');
      
      expect(mockOnChange).toHaveBeenCalledTimes(5); // H, e, l, l, o
    });

    test('shows placeholder text', () => {
      render(
        <TextArea 
          label="Message" 
          value="" 
          onChange={() => {}} 
          placeholder="Enter your message" 
        />
      );
      
      expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
    });

    test('respects rows prop', () => {
      render(<TextArea label="Message" value="" onChange={() => {}} rows={5} />);
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });
});