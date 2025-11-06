import { useState } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';
import type { SignupRequest, LoginRequest } from '../../src/types/contracts/auth';
import { RequireRole, RequireScope } from '../../src/components/Auth';
import './AuthDemoPage.css';

const AuthDemoPage = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    roles,
    scopes,
    tenantId,
    signup,
    login,
    logout,
    hasRole,
    hasScope,
  } = useAuth();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    tenantSlug: 'default', // Use the default tenant pre-seeded in the database
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      if (authMode === 'signup') {
        const request: SignupRequest = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          tenantSlug: formData.tenantSlug,
        };
        await signup(request);
      } else {
        const request: LoginRequest = {
          email: formData.email,
          password: formData.password,
        };
        await login(request);
      }
    } catch (err: any) {
      setLocalError(err.message || 'Authentication failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="page">
        <div className="auth-demo-loading">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Authentication Demo</h1>
        <p>
          This page demonstrates the acme-auth-service integration with JWT-based authentication,
          role-based access control (RBAC), and secure token management.
        </p>
      </div>

      {!isAuthenticated ? (
        <section className="section">
          <div className="auth-demo-form-container">
            <div className="auth-demo-tabs">
              <button
                className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>
              <button
                className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-demo-form">
              {authMode === 'signup' && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={authMode === 'signup'}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tenantSlug">Organization Slug</label>
                    <input
                      type="text"
                      id="tenantSlug"
                      name="tenantSlug"
                      value={formData.tenantSlug}
                      onChange={handleChange}
                      required={authMode === 'signup'}
                      placeholder="my-organization"
                      pattern="[a-z0-9\-]+"
                      title="Only lowercase letters, numbers, and hyphens allowed"
                    />
                    <small className="form-hint">A unique identifier for your organization (e.g., "acme-corp")</small>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="user@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                  minLength={8}
                />
              </div>

              {(error || localError) && (
                <div className="auth-demo-error">
                  <strong>Error:</strong> {localError || error?.message}
                  {error?.details && (
                    <ul>
                      {error.details.map((detail, idx) => (
                        <li key={idx}>
                          {detail.field}: {detail.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <button type="submit" className="auth-demo-submit" disabled={isLoading}>
                {isLoading
                  ? 'Processing...'
                  : authMode === 'signup'
                  ? 'Create Account'
                  : 'Sign In'}
              </button>
            </form>

            <div className="auth-demo-info">
              <h3>Test Credentials</h3>
              <p>
                Create a new account or use test credentials if acme-auth-service is running
                with test data.
              </p>
              <code>
                Email: test@example.com
                <br />
                Password: password123
              </code>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="section">
            <h2>User Profile</h2>
            <div className="auth-demo-profile">
              <div className="profile-info">
                <div className="profile-item">
                  <strong>Email:</strong> {user?.email}
                </div>
                <div className="profile-item">
                  <strong>Name:</strong> {user?.name}
                </div>
                <div className="profile-item">
                  <strong>User ID:</strong> <code>{user?.id}</code>
                </div>
                {tenantId && (
                  <div className="profile-item">
                    <strong>Tenant ID:</strong> <code>{tenantId}</code>
                  </div>
                )}
                <div className="profile-item">
                  <strong>Account Created:</strong>{' '}
                  {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                </div>
                <div className="profile-item">
                  <strong>Status:</strong>{' '}
                  <span className={`status ${user?.enabled ? 'enabled' : 'disabled'}`}>
                    {user?.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </div>
          </section>

          <section className="section">
            <h2>Roles & Permissions</h2>
            <div className="permissions-grid">
              <div className="permission-card">
                <h3>Roles</h3>
                {roles.length > 0 ? (
                  <ul className="permission-list">
                    {roles.map((role) => (
                      <li key={role} className="permission-badge role-badge">
                        {role}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No roles assigned</p>
                )}
              </div>

              <div className="permission-card">
                <h3>Scopes</h3>
                {scopes.length > 0 ? (
                  <ul className="permission-list">
                    {scopes.map((scope) => (
                      <li key={scope} className="permission-badge scope-badge">
                        {scope}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No scopes assigned</p>
                )}
              </div>
            </div>
          </section>

          <section className="section">
            <h2>Conditional Rendering Examples</h2>

            <div className="demo-examples">
              <div className="example-card">
                <h3>Role-Based Rendering</h3>
                <RequireRole roles={['ROLE_ADMIN']} fallback={<p>❌ Admin access required</p>}>
                  <p>✅ You have admin access!</p>
                </RequireRole>
              </div>

              <div className="example-card">
                <h3>Scope-Based Rendering</h3>
                <RequireScope
                  scopes={['tickets:write']}
                  fallback={<p>❌ Write access required</p>}
                >
                  <p>✅ You can create/edit tickets!</p>
                </RequireScope>
              </div>

              <div className="example-card">
                <h3>Permission Checks</h3>
                <ul>
                  <li>
                    Has ROLE_USER: {hasRole('ROLE_USER') ? '✅ Yes' : '❌ No'}
                  </li>
                  <li>
                    Has ROLE_ADMIN: {hasRole('ROLE_ADMIN') ? '✅ Yes' : '❌ No'}
                  </li>
                  <li>
                    Has tickets:read: {hasScope('tickets:read') ? '✅ Yes' : '❌ No'}
                  </li>
                  <li>
                    Has tickets:write: {hasScope('tickets:write') ? '✅ Yes' : '❌ No'}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>Integration Features</h2>
            <ul>
              <li>✅ JWT-based authentication with acme-auth-service</li>
              <li>✅ Automatic token refresh when expired</li>
              <li>✅ Secure token storage in localStorage</li>
              <li>✅ Role-Based Access Control (RBAC)</li>
              <li>✅ Scope-based permissions</li>
              <li>✅ Protected routes and components</li>
              <li>✅ Authenticated API requests with auto-retry</li>
              <li>✅ TypeScript type safety with Zod schemas</li>
              <li>✅ Multi-tenant support (tenant ID in token)</li>
            </ul>
          </section>

          <section className="section">
            <h2>Usage Example</h2>
            <pre style={{ background: 'var(--background-secondary)', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Wrap app with AuthProvider
import { AuthProvider } from 'acme-ui';

<AuthProvider authApiUrl="http://localhost:8080/api/auth">
  <App />
</AuthProvider>

// Use authentication in components
import { useAuth, ProtectedRoute, RequireRole } from 'acme-ui';

function MyComponent() {
  const { user, logout, hasRole } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
      
      {hasRole('ROLE_ADMIN') && (
        <AdminPanel />
      )}
    </div>
  );
}

// Protected routes
<ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
  <AdminPage />
</ProtectedRoute>

// Conditional rendering
<RequireRole roles={['ROLE_MODERATOR']}>
  <ModeratorTools />
</RequireRole>

// Authenticated API requests
import { useAuthenticatedJson } from 'acme-ui';

function TicketsList() {
  const fetchJson = useAuthenticatedJson();
  
  const tickets = await fetchJson('/api/tickets');
  // JWT automatically included in Authorization header
}`}
            </pre>
          </section>
        </>
      )}
    </div>
  );
};

export default AuthDemoPage;
