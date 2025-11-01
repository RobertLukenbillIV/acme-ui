import React, { useState } from 'react';
import './AuthForm.css';

/**
 * AuthForm component - Standardized authentication UI for login and signup
 * 
 * Features:
 * - Login and signup modes with form validation
 * - Accessible form controls with proper labeling
 * - Loading states and error handling
 * - Social authentication options
 * - Password strength indicator
 * - Remember me and forgot password functionality
 */
const AuthForm = ({
  mode = 'login', // 'login' | 'signup' | 'forgot-password'
  onSubmit,
  onModeChange,
  loading = false,
  error = null,
  socialProviders = [],
  showRememberMe = true,
  showForgotPassword = true,
  className = '',
  ...props
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 4); // Cap at 4 for array index safety
  };

  // Handle input changes
  const handleInputChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: null }));
    }

    // Calculate password strength for signup mode
    if (field === 'password' && mode === 'signup') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (mode === 'signup' && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation (signup only)
    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      // Name validation for signup
      if (!formData.firstName) {
        errors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        errors.lastName = 'Last name is required';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'forgot-password') {
      if (!formData.email) {
        setFieldErrors({ email: 'Email is required' });
        return;
      }
      if (!validateEmail(formData.email)) {
        setFieldErrors({ email: 'Please enter a valid email address' });
        return;
      }
    } else if (!validateForm()) {
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Handle social authentication
  const handleSocialAuth = (provider) => {
    if (onSubmit) {
      onSubmit({ provider, socialAuth: true });
    }
  };

  const formClasses = [
    'acme-auth-form',
    `acme-auth-form-${mode}`,
    loading && 'acme-auth-form-loading',
    className
  ].filter(Boolean).join(' ');

  const getPasswordStrengthLabel = () => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[passwordStrength] || 'Very Weak';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['error', 'warning', 'warning', 'success', 'success'];
    return colors[passwordStrength] || 'error';
  };

  return (
    <div className={formClasses} {...props}>
      <div className="acme-auth-form-header">
        <h2 className="acme-auth-form-title">
          {mode === 'login' && 'Sign In'}
          {mode === 'signup' && 'Create Account'}
          {mode === 'forgot-password' && 'Reset Password'}
        </h2>
        <p className="acme-auth-form-subtitle">
          {mode === 'login' && 'Welcome back! Please sign in to your account.'}
          {mode === 'signup' && 'Join us today! Create your account to get started.'}
          {mode === 'forgot-password' && 'Enter your email to receive reset instructions.'}
        </p>
      </div>

      {error && (
        <div className="acme-auth-form-error" role="alert">
          <span className="acme-auth-form-error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Social Authentication */}
      {socialProviders.length > 0 && mode !== 'forgot-password' && (
        <div className="acme-auth-form-social">
          {socialProviders.map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="acme-auth-form-social-button"
              onClick={() => handleSocialAuth(provider.name)}
              disabled={loading}
            >
              {provider.icon && <span className="acme-auth-form-social-icon">{provider.icon}</span>}
              Continue with {provider.label || provider.name}
            </button>
          ))}
          <div className="acme-auth-form-divider">
            <span>or</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="acme-auth-form-fields" noValidate>
        {/* Name fields for signup */}
        {mode === 'signup' && (
          <div className="acme-auth-form-row">
            <div className="acme-auth-form-field">
              <label htmlFor="firstName" className="acme-auth-form-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                className={`acme-auth-form-input ${fieldErrors.firstName ? 'error' : ''}`}
                disabled={loading}
                autoComplete="given-name"
                required
              />
              {fieldErrors.firstName && (
                <span className="acme-auth-form-field-error">{fieldErrors.firstName}</span>
              )}
            </div>
            <div className="acme-auth-form-field">
              <label htmlFor="lastName" className="acme-auth-form-label">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                className={`acme-auth-form-input ${fieldErrors.lastName ? 'error' : ''}`}
                disabled={loading}
                autoComplete="family-name"
                required
              />
              {fieldErrors.lastName && (
                <span className="acme-auth-form-field-error">{fieldErrors.lastName}</span>
              )}
            </div>
          </div>
        )}

        {/* Email field */}
        <div className="acme-auth-form-field">
          <label htmlFor="email" className="acme-auth-form-label">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            className={`acme-auth-form-input ${fieldErrors.email ? 'error' : ''}`}
            disabled={loading}
            autoComplete="email"
            required
          />
          {fieldErrors.email && (
            <span className="acme-auth-form-field-error">{fieldErrors.email}</span>
          )}
        </div>

        {/* Password field */}
        {mode !== 'forgot-password' && (
          <div className="acme-auth-form-field">
            <label htmlFor="password" className="acme-auth-form-label">
              Password
            </label>
            <div className="acme-auth-form-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                className={`acme-auth-form-input ${fieldErrors.password ? 'error' : ''}`}
                disabled={loading}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
              <button
                type="button"
                className="acme-auth-form-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {fieldErrors.password && (
              <span className="acme-auth-form-field-error">{fieldErrors.password}</span>
            )}
            
            {/* Password strength indicator for signup */}
            {mode === 'signup' && formData.password && (
              <div className="acme-auth-form-password-strength">
                <div className="acme-auth-form-strength-bar">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`acme-auth-form-strength-segment ${
                        level <= passwordStrength ? `strength-${getPasswordStrengthColor()}` : ''
                      }`}
                    />
                  ))}
                </div>
                <span className={`acme-auth-form-strength-label strength-${getPasswordStrengthColor()}`}>
                  {getPasswordStrengthLabel()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Confirm password field for signup */}
        {mode === 'signup' && (
          <div className="acme-auth-form-field">
            <label htmlFor="confirmPassword" className="acme-auth-form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              className={`acme-auth-form-input ${fieldErrors.confirmPassword ? 'error' : ''}`}
              disabled={loading}
              autoComplete="new-password"
              required
            />
            {fieldErrors.confirmPassword && (
              <span className="acme-auth-form-field-error">{fieldErrors.confirmPassword}</span>
            )}
          </div>
        )}

        {/* Remember me checkbox for login */}
        {mode === 'login' && showRememberMe && (
          <div className="acme-auth-form-field">
            <label className="acme-auth-form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange('rememberMe')}
                className="acme-auth-form-checkbox"
                disabled={loading}
              />
              <span className="acme-auth-form-checkbox-text">Remember me</span>
            </label>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="acme-auth-form-submit"
          disabled={loading}
        >
          {loading ? (
            <span className="acme-auth-form-loading-spinner">
              <span className="acme-spinner"></span>
              Processing...
            </span>
          ) : (
            <>
              {mode === 'login' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot-password' && 'Send Reset Email'}
            </>
          )}
        </button>
      </form>

      {/* Footer links */}
      <div className="acme-auth-form-footer">
        {mode === 'login' && showForgotPassword && (
          <button
            type="button"
            className="acme-auth-form-link"
            onClick={() => onModeChange && onModeChange('forgot-password')}
            disabled={loading}
          >
            Forgot your password?
          </button>
        )}
        
        {mode === 'login' && (
          <p className="acme-auth-form-footer-text">
            Don't have an account?{' '}
            <button
              type="button"
              className="acme-auth-form-link"
              onClick={() => onModeChange && onModeChange('signup')}
              disabled={loading}
            >
              Sign up
            </button>
          </p>
        )}
        
        {mode === 'signup' && (
          <p className="acme-auth-form-footer-text">
            Already have an account?{' '}
            <button
              type="button"
              className="acme-auth-form-link"
              onClick={() => onModeChange && onModeChange('login')}
              disabled={loading}
            >
              Sign in
            </button>
          </p>
        )}
        
        {mode === 'forgot-password' && (
          <p className="acme-auth-form-footer-text">
            Remember your password?{' '}
            <button
              type="button"
              className="acme-auth-form-link"
              onClick={() => onModeChange && onModeChange('login')}
              disabled={loading}
            >
              Back to sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;