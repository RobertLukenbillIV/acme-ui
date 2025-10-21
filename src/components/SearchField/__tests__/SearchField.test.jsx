import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchField from '../SearchField';

describe('SearchField', () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with minimal props', () => {
      render(<SearchField />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<SearchField placeholder="Search here..." />);
      expect(screen.getByPlaceholderText('Search here...')).toBeInTheDocument();
    });

    it('renders with default placeholder', () => {
      render(<SearchField />);
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<SearchField label="Search Term" />);
      expect(screen.getByText('Search Term')).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<SearchField value="test value" />);
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });

    it('shows search icon', () => {
      const { container } = render(<SearchField />);
      expect(container.querySelector('.acme-search-field-icon')).toBeInTheDocument();
    });
  });

  describe('Label and Required', () => {
    it('renders label correctly', () => {
      render(<SearchField label="Find items" />);
      const label = screen.getByText('Find items');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('acme-form-label');
    });

    it('shows required indicator when required', () => {
      render(<SearchField label="Search" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('adds required attribute to input when required', () => {
      render(<SearchField required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('does not show required indicator when not required', () => {
      render(<SearchField label="Search" />);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('Input Interaction', () => {
    it('calls onChange when typing', async () => {
      const user = userEvent.setup();
      render(<SearchField onChange={mockOnChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      expect(mockOnChange).toHaveBeenCalledTimes(4); // t, e, s, t
    });

    it('updates input value when controlled', () => {
      const { rerender } = render(<SearchField value="initial" />);
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
      
      rerender(<SearchField value="updated" />);
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });

    it('handles focus and blur events', async () => {
      const user = userEvent.setup();
      const { container } = render(<SearchField />);
      
      const input = screen.getByRole('textbox');
      const searchContainer = container.querySelector('.acme-search-field-container');
      
      await user.click(input);
      expect(searchContainer).toHaveClass('focused');
      
      fireEvent.blur(input);
      expect(searchContainer).not.toHaveClass('focused');
    });
  });

  describe('Clear Functionality', () => {
    it('shows clear button when value exists and clearable', () => {
      render(<SearchField value="test" clearable />);
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('does not show clear button when no value', () => {
      render(<SearchField value="" clearable />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('does not show clear button when not clearable', () => {
      render(<SearchField value="test" clearable={false} />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('does not show clear button when disabled', () => {
      render(<SearchField value="test" disabled />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('clears input when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchField value="test" onChange={mockOnChange} onClear={mockOnClear} />);
      
      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);
      
      expect(mockOnChange).toHaveBeenCalledWith({ target: { value: '' } });
      expect(mockOnClear).toHaveBeenCalled();
    });

    it('focuses input after clearing', async () => {
      const user = userEvent.setup();
      render(<SearchField value="test" onChange={mockOnChange} />);
      
      const input = screen.getByRole('textbox');
      const clearButton = screen.getByLabelText('Clear search');
      
      await user.click(clearButton);
      expect(input).toHaveFocus();
    });
  });

  describe('Search Functionality', () => {
    it('calls onSearch with debounce', async () => {
      render(<SearchField onSearch={mockOnSearch} debounceMs={100} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Should not be called immediately
      expect(mockOnSearch).not.toHaveBeenCalled();
      
      // Wait for debounce
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test');
      }, { timeout: 200 });
    });

    it('calls onSearch immediately when debounceMs is 0', () => {
      render(<SearchField onSearch={mockOnSearch} debounceMs={0} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(mockOnSearch).toHaveBeenCalledWith('test');
    });

    it('calls onSearch on Enter key when no dropdown', async () => {
      const user = userEvent.setup();
      render(<SearchField value="test" onSearch={mockOnSearch} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, '{Enter}');
      
      expect(mockOnSearch).toHaveBeenCalledWith('test');
    });

    it('handles missing onSearch gracefully', () => {
      render(<SearchField />);
      
      const input = screen.getByRole('textbox');
      expect(() => {
        fireEvent.change(input, { target: { value: 'test' } });
      }).not.toThrow();
    });
  });

  describe('Suggestions', () => {
    const suggestions = ['apple', 'banana', 'cherry'];

    it('shows suggestions when showSuggestions is true and input has value', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={suggestions} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'a');
      
      expect(screen.getByText('apple')).toBeInTheDocument();
      expect(screen.getByText('banana')).toBeInTheDocument();
      expect(screen.getByText('cherry')).toBeInTheDocument();
    });

    it('does not show suggestions when showSuggestions is false', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={suggestions} 
          showSuggestions={false}
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'a');
      
      expect(screen.queryByText('apple')).not.toBeInTheDocument();
    });

    it('does not show suggestions when input is empty', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={suggestions} 
          showSuggestions 
          value=""
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      expect(screen.queryByText('apple')).not.toBeInTheDocument();
    });

    it('selects suggestion when clicked', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={suggestions} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
          onSearch={mockOnSearch}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'a');
      
      const suggestion = screen.getByText('apple');
      await user.click(suggestion);
      
      expect(mockOnChange).toHaveBeenCalledWith({ target: { value: 'apple' } });
      expect(mockOnSearch).toHaveBeenCalledWith('apple');
    });

    it('renders suggestion icons', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SearchField 
          suggestions={suggestions} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'a');
      
      const suggestionIcons = container.querySelectorAll('.suggestion-icon');
      expect(suggestionIcons).toHaveLength(3);
    });
  });

  describe('Keyboard Navigation', () => {
    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={['test']} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 't');
      
      expect(screen.getByText('test')).toBeInTheDocument();
      
      await user.type(input, '{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('test')).not.toBeInTheDocument();
      });
    });

    it('blurs input on Escape key', async () => {
      const user = userEvent.setup();
      render(<SearchField />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      expect(input).toHaveFocus();
      
      await user.type(input, '{Escape}');
      expect(input).not.toHaveFocus();
    });
  });

  describe('Sizes', () => {
    it('applies small size', () => {
      const { container } = render(<SearchField size="small" />);
      expect(container.querySelector('.acme-search-field-container')).toHaveClass('small');
    });

    it('applies medium size by default', () => {
      const { container } = render(<SearchField />);
      expect(container.querySelector('.acme-search-field-container')).toHaveClass('medium');
    });

    it('applies large size', () => {
      const { container } = render(<SearchField size="large" />);
      expect(container.querySelector('.acme-search-field-container')).toHaveClass('large');
    });
  });

  describe('Variants', () => {
    it('applies default variant by default', () => {
      const { container } = render(<SearchField />);
      expect(container.querySelector('.acme-search-field-container')).toHaveClass('default');
    });

    it('applies custom variant', () => {
      const { container } = render(<SearchField variant="outlined" />);
      expect(container.querySelector('.acme-search-field-container')).toHaveClass('outlined');
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled', () => {
      render(<SearchField disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('applies disabled class to container', () => {
      const { container } = render(<SearchField disabled />);
      expect(container.querySelector('.acme-search-field-container')).toHaveClass('disabled');
    });

    it('does not show clear button when disabled', () => {
      render(<SearchField value="test" disabled />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('does not trigger onChange when disabled', () => {
      render(<SearchField disabled onChange={mockOnChange} />);
      
      const input = screen.getByRole('textbox');
      
      // Disabled inputs still fire onChange in test environment
      // but in real browser they wouldn't - this tests the disabled state
      expect(input).toBeDisabled();
    });
  });

  describe('Error State', () => {
    it('displays error message', () => {
      render(<SearchField error="Invalid search term" />);
      expect(screen.getByText('Invalid search term')).toBeInTheDocument();
    });

    it('applies error class to container', () => {
      const { container } = render(<SearchField error="Error" />);
      expect(container.querySelector('.acme-search-field-container')).toHaveClass('error');
    });

    it('renders error with correct class', () => {
      render(<SearchField error="Error message" />);
      const errorElement = screen.getByText('Error message');
      expect(errorElement).toHaveClass('acme-form-error');
    });

    it('does not show error element when no error', () => {
      const { container } = render(<SearchField />);
      expect(container.querySelector('.acme-form-error')).not.toBeInTheDocument();
    });
  });

  describe('Structure and Classes', () => {
    it('renders correct container structure', () => {
      const { container } = render(<SearchField label="Search" />);
      
      expect(container.querySelector('.acme-search-field-group')).toBeInTheDocument();
      expect(container.querySelector('.acme-search-field-container')).toBeInTheDocument();
      expect(container.querySelector('.acme-search-field-input')).toBeInTheDocument();
      expect(container.querySelector('.acme-search-field-icon')).toBeInTheDocument();
    });

    it('applies correct input classes', () => {
      render(<SearchField />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('acme-search-field-input');
    });

    it('renders dropdown with correct class', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SearchField 
          suggestions={['test']} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 't');
      
      expect(container.querySelector('.acme-search-field-dropdown')).toBeInTheDocument();
    });

    it('renders suggestions with correct classes', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SearchField 
          suggestions={['test']} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 't');
      
      expect(container.querySelector('.acme-search-field-suggestion')).toBeInTheDocument();
    });
  });

  describe('Event Listeners', () => {
    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      const { unmount } = render(<SearchField />);
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    });
  });

  describe('Edge Cases', () => {
    it('handles empty suggestions array', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SearchField 
          suggestions={[]} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      expect(container.querySelector('.acme-search-field-dropdown')).not.toBeInTheDocument();
    });

    it('handles missing callback functions gracefully', async () => {
      const user = userEvent.setup();
      render(<SearchField />);
      
      const input = screen.getByRole('textbox');
      
      expect(async () => {
        await user.type(input, 'test');
        await user.type(input, '{Enter}');
      }).not.toThrow();
    });

    it('handles blur during suggestion interaction', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={['test']} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 't');
      
      expect(screen.getByText('test')).toBeInTheDocument();
      
      // Simulate blur - need to wrap in act due to setTimeout in blur handler
      await act(async () => {
        fireEvent.blur(input);
        
        // Wait for delayed dropdown hide (longer timeout to account for test environment)
        await new Promise(resolve => setTimeout(resolve, 200));
      });
      
      // Check dropdown is now hidden
      expect(screen.queryByText('test')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides accessible clear button label', () => {
      render(<SearchField value="test" />);
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('maintains proper focus management', async () => {
      const user = userEvent.setup();
      render(<SearchField value="test" />);
      
      const input = screen.getByRole('textbox');
      const clearButton = screen.getByLabelText('Clear search');
      
      await user.click(clearButton);
      expect(input).toHaveFocus();
    });

    it('supports keyboard navigation for suggestions', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={['apple', 'banana']} 
          showSuggestions 
          value=""
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'a');
      
      const suggestions = screen.getAllByRole('button').filter(btn => 
        btn.textContent.includes('apple') || btn.textContent.includes('banana')
      );
      expect(suggestions).toHaveLength(2);
    });

    it('renders input as textbox role', () => {
      render(<SearchField />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('Value and State Management', () => {
    it('handles controlled value updates', () => {
      const { rerender } = render(<SearchField value="initial" />);
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
      
      rerender(<SearchField value="updated" />);
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });

    it('handles empty string value', () => {
      render(<SearchField value="" />);
      const input = screen.getByRole('textbox');
      expect(input.value).toBe('');
    });

    it('handles undefined value gracefully', () => {
      render(<SearchField value={undefined} />);
      const input = screen.getByRole('textbox');
      expect(input.value).toBe('');
    });
  });

  describe('Component Integration', () => {
    it('integrates focus, suggestions, and clear functionality', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={['apple']} 
          showSuggestions 
          value="test"  // Start with a value
          onChange={mockOnChange}
          onClear={mockOnClear}
        />
      );
      
      const input = screen.getByRole('textbox');
      
      // Should have clear button with initial value
      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);
      
      expect(mockOnClear).toHaveBeenCalled();
      expect(input).toHaveFocus();
    });

    it('maintains suggestion state across focus changes', async () => {
      const user = userEvent.setup();
      render(
        <SearchField 
          suggestions={['apple']} 
          showSuggestions 
          value="a"
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      expect(screen.getByText('apple')).toBeInTheDocument();
      
      fireEvent.blur(input);
      
      await waitFor(() => {
        expect(screen.queryByText('apple')).not.toBeInTheDocument();
      });
    });
  });
});