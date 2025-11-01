import React, { useState } from 'react';
import { AuthForm, UserAvatarMenu, ThemeToggle, ErrorBoundary, LoadingScreen } from '../../src';
import Card from '../../src/components/Card';
import { useTheme } from '../theme.jsx';

const AuthPageExample = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [authMode, setAuthMode] = useState('login');

  return (
    <div className="page">
      <div className="container">
        <h1>Authentication & Utility Components</h1>
        <p>
          Complete set of authentication and utility components with proper Card layout.
        </p>

        {/* Demo Controls - Using Card */}
        <Card title="Component Demos">
          <p>Interactive demonstrations of all authentication and utility components.</p>
          
          <div className="demo-controls">
            <div className="control-group">
              <h3>Authentication Mode</h3>
              <div className="mode-controls">
                <button 
                  onClick={() => setAuthMode('login')}
                  className={`mode-button ${authMode === 'login' ? 'active' : ''}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => setAuthMode('signup')}
                  className={`mode-button ${authMode === 'signup' ? 'active' : ''}`}
                >
                  Signup
                </button>
                <button 
                  onClick={() => setAuthMode('forgot')}
                  className={`mode-button ${authMode === 'forgot' ? 'active' : ''}`}
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* AuthForm Demo - Using Card */}
        <Card title="AuthForm Component">
          <p>
            Complete authentication form with login, signup, and password reset modes.
            Use <code>error@example.com</code> to trigger an error state.
          </p>

          <div className="auth-demo-container">
            <AuthForm
              mode={authMode}
              onSubmit={(formData) => console.log('Form submitted:', formData)}
              onModeChange={setAuthMode}
              socialProviders={[
                { name: 'google', label: 'Google', icon: '🔍' },
                { name: 'github', label: 'GitHub', icon: '🐙' }
              ]}
            />
          </div>
        </Card>

        {/* UserAvatarMenu Demo - Using Card */}
        <Card title="UserAvatarMenu Component">
          <p>
            User profile menu with avatar, status indicator, and customizable actions.
            Available in different sizes and variants.
          </p>

          <div className="component-demo-grid">
            <div className="demo-item">
              <h4>Default</h4>
              <UserAvatarMenu
                user={{
                  name: 'Alice Johnson',
                  email: 'alice@example.com',
                  avatar: 'https://picsum.photos/100/100?random=person1',
                  role: 'Admin',
                  isOnline: true
                }}
                menuItems={[
                  { id: 'profile', label: 'View Profile', icon: '👤' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' },
                  { type: 'divider' },
                  { id: 'logout', label: 'Sign Out', icon: '🚪', variant: 'danger' }
                ]}
                onMenuItemClick={(item) => console.log('Menu clicked:', item)}
              />
            </div>
          </div>
        </Card>

        {/* ThemeToggle Demo - Using Card */}
        <Card title="ThemeToggle Component">
          <p>
            Theme switcher with multiple variants supporting light, dark, and system themes.
            Changes are persistent and respect system preferences.
          </p>

          <div className="component-demo-grid">
            <div className="demo-item">
              <h4>Button Variant</h4>
              <ThemeToggle
                variant="button"
                onChange={(theme, effectiveTheme) => {
                  if (effectiveTheme === 'dark' && !isDarkMode) {
                    toggleTheme();
                  } else if (effectiveTheme === 'light' && isDarkMode) {
                    toggleTheme();
                  }
                }}
                storageKey="darkMode"
                defaultTheme={isDarkMode ? 'dark' : 'light'}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPageExample;