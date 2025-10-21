import React, { useState } from 'react';
import { AuthForm, UserAvatarMenu, ThemeToggle, ErrorBoundary, LoadingScreen, Button } from '../../src';
import Card from '../../src/components/Card';
import { useTheme } from '../theme.jsx';

const AuthPage = () => {
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
              <div className="mode-controls" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button 
                  onClick={() => setAuthMode('login')}
                  variant={authMode === 'login' ? 'primary' : 'secondary'}
                  size="small"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setAuthMode('signup')}
                  variant={authMode === 'signup' ? 'primary' : 'secondary'}
                  size="small"
                >
                  Signup
                </Button>
                <Button 
                  onClick={() => setAuthMode('forgot')}
                  variant={authMode === 'forgot' ? 'primary' : 'secondary'}
                  size="small"
                >
                  Forgot Password
                </Button>
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
        <Card title="UserAvatarMenu Component" className="has-dropdown">
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
                placement="bottom-left"
                onItemClick={(item) => console.log('Menu clicked:', item)}
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
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ThemeToggle
                  variant="button"
                  size="small"
                  showLabel={false}
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
          </div>
        </Card>

        {/* ErrorBoundary Demo - Using Card */}
        <Card title="ErrorBoundary Component">
          <p>
            Error boundary component for graceful error handling with retry functionality.
            Click the button below to trigger an error and see the boundary in action.
          </p>

          <div className="component-demo-grid">
            <div className="demo-item">
              <h4>Error Boundary Demo</h4>
              <ErrorBoundary
                fallback={({ error, retry }) => (
                  <div style={{ padding: '1rem', textAlign: 'center', border: '2px dashed #ff6b6b', borderRadius: '8px' }}>
                    <h4>Something went wrong!</h4>
                    <p>{error?.message}</p>
                    <button onClick={retry} style={{ marginTop: '0.5rem' }}>
                      Try Again
                    </button>
                  </div>
                )}
              >
                <div style={{ padding: '1rem' }}>
                  <p>This component is working normally.</p>
                  <p>Error boundaries protect your app from crashes.</p>
                </div>
              </ErrorBoundary>
            </div>
          </div>
        </Card>

        {/* LoadingScreen Demo - Using Card */}
        <Card title="LoadingScreen Component">
          <p>
            Loading states with multiple variants for different use cases.
            Supports inline, fullscreen, and overlay modes.
          </p>

          <div className="component-demo-grid">
            <div className="demo-item">
              <h4>Spinner Variant</h4>
              <div className="loading-demo-container">
                <LoadingScreen
                  variant="spinner"
                  size="medium"
                  message="Loading..."
                  mode="inline"
                />
              </div>
            </div>
            <div className="demo-item">
              <h4>Dots Variant</h4>
              <div className="loading-demo-container">
                <LoadingScreen
                  variant="dots"
                  size="medium"
                  message="Please wait..."
                  mode="inline"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;