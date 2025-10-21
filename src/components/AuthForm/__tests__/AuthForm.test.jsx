import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '../AuthForm';

describe('AuthForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnModeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login mode', () => {
    it('renders login form correctly', () => {
      render(<AuthForm mode="login" />);
      
      expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
      expect(screen.getByText('Welcome back! Please sign in to your account.')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });

    it('shows remember me checkbox by default', () => {
      render(<AuthForm mode="login" />);
      expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    });

    it('hides remember me checkbox when showRememberMe is false', () => {
      render(<AuthForm mode="login" showRememberMe={false} />);
      expect(screen.queryByLabelText('Remember me')).not.toBeInTheDocument();
    });

    it('shows forgot password link by default', () => {
      render(<AuthForm mode="login" onModeChange={mockOnModeChange} />);
      expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
    });

    it('hides forgot password link when showForgotPassword is false', () => {
      render(<AuthForm mode="login" showForgotPassword={false} />);
      expect(screen.queryByText('Forgot your password?')).not.toBeInTheDocument();
    });

    it('validates required fields', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      await user.click(submitButton);
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('validates email format', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);
      
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('submits form with valid data', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const rememberMeInput = screen.getByLabelText('Remember me');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(rememberMeInput);
      await user.click(submitButton);
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        rememberMe: true
      });
    });
  });

  describe('Signup mode', () => {
    it('renders signup form correctly', () => {
      render(<AuthForm mode="signup" />);
      
      expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
      expect(screen.getByText('Join us today! Create your account to get started.')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    });

    it('validates all required fields', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: 'Create Account' });
      await user.click(submitButton);
      
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Please confirm your password')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('validates password length', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Create Account' });
      
      await user.type(passwordInput, 'short');
      await user.click(submitButton);
      
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    });

    it('validates password confirmation', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      const submitButton = screen.getByRole('button', { name: 'Create Account' });
      
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'different');
      await user.click(submitButton);
      
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    it('shows password strength indicator', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="signup" />);
      
      const passwordInput = screen.getByLabelText('Password');
      await user.type(passwordInput, 'weak');
      
      // Expect "Weak" for a 4-character lowercase password (scores 1 point for lowercase)
      expect(screen.getByText('Weak')).toBeInTheDocument();
      
      await user.clear(passwordInput);
      await user.type(passwordInput, 'StrongPassword123!');
      
      // For "StrongPassword123!" we expect all 5 criteria:
      // 1. Length >= 8 ✓
      // 2. Lowercase ✓ 
      // 3. Uppercase ✓
      // 4. Numbers ✓
      // 5. Special chars ✓
      // But we cap at 4, so strength should be 4 = "Strong"
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });

    it('submits form with valid data', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText('First Name'), 'John');
      await user.type(screen.getByLabelText('Last Name'), 'Doe');
      await user.type(screen.getByLabelText('Email Address'), 'john@example.com');
      await user.type(screen.getByLabelText('Password'), 'password123');
      await user.type(screen.getByLabelText('Confirm Password'), 'password123');
      await user.click(screen.getByRole('button', { name: 'Create Account' }));
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        rememberMe: false
      });
    });
  });

  describe('Forgot password mode', () => {
    it('renders forgot password form correctly', () => {
      render(<AuthForm mode="forgot-password" />);
      
      expect(screen.getByText('Reset Password')).toBeInTheDocument();
      expect(screen.getByText('Enter your email to receive reset instructions.')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Send Reset Email' })).toBeInTheDocument();
    });

    it('validates email for forgot password', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="forgot-password" onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: 'Send Reset Email' });
      await user.click(submitButton);
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Password toggle', () => {
    it('toggles password visibility', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" />);
      
      const passwordInput = screen.getByLabelText('Password');
      const toggleButton = screen.getByLabelText('Show password');
      
      expect(passwordInput).toHaveAttribute('type', 'password');
      
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
      
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Mode switching', () => {
    it('switches from login to signup', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" onModeChange={mockOnModeChange} />);
      
      const signupLink = screen.getByText('Sign up');
      await user.click(signupLink);
      
      expect(mockOnModeChange).toHaveBeenCalledWith('signup');
    });

    it('switches from signup to login', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="signup" onModeChange={mockOnModeChange} />);
      
      const signinLink = screen.getByText('Sign in');
      await user.click(signinLink);
      
      expect(mockOnModeChange).toHaveBeenCalledWith('login');
    });

    it('switches to forgot password', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" onModeChange={mockOnModeChange} />);
      
      const forgotLink = screen.getByText('Forgot your password?');
      await user.click(forgotLink);
      
      expect(mockOnModeChange).toHaveBeenCalledWith('forgot-password');
    });
  });

  describe('Social authentication', () => {
    const socialProviders = [
      { name: 'google', label: 'Google', icon: '🔍' },
      { name: 'github', label: 'GitHub', icon: '🐙' }
    ];

    it('renders social authentication buttons', () => {
      render(<AuthForm mode="login" socialProviders={socialProviders} />);
      
      expect(screen.getByText('Continue with Google')).toBeInTheDocument();
      expect(screen.getByText('Continue with GitHub')).toBeInTheDocument();
      expect(screen.getByText('or')).toBeInTheDocument();
    });

    it('handles social authentication', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" socialProviders={socialProviders} onSubmit={mockOnSubmit} />);
      
      const googleButton = screen.getByText('Continue with Google');
      await user.click(googleButton);
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        provider: 'google',
        socialAuth: true
      });
    });

    it('does not show social auth in forgot password mode', () => {
      render(<AuthForm mode="forgot-password" socialProviders={socialProviders} />);
      
      expect(screen.queryByText('Continue with Google')).not.toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('shows loading state', () => {
      render(<AuthForm mode="login" loading={true} />);
      
      const submitButton = screen.getByRole('button', { name: 'Processing...' });
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    it('disables inputs during loading', () => {
      render(<AuthForm mode="login" loading={true} />);
      
      expect(screen.getByLabelText('Email Address')).toBeDisabled();
      expect(screen.getByLabelText('Password')).toBeDisabled();
    });
  });

  describe('Error handling', () => {
    it('displays error message', () => {
      render(<AuthForm mode="login" error="Invalid credentials" />);
      
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Field error clearing', () => {
    it('clears field errors when user starts typing', async () => {
      const user = userEvent.setup();
      render(<AuthForm mode="login" onSubmit={mockOnSubmit} />);
      
      // Trigger validation error
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      await user.click(submitButton);
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      
      // Start typing in email field
      const emailInput = screen.getByLabelText('Email Address');
      await user.type(emailInput, 't');
      
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<AuthForm mode="signup" />);
      
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    });

    it('has proper form validation', () => {
      render(<AuthForm mode="login" />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('required');
      expect(emailInput.closest('form')).toHaveAttribute('noValidate');
    });

    it('announces errors with role="alert"', () => {
      render(<AuthForm mode="login" error="Test error" />);
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent('Test error');
    });
  });
});