import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Roles required to access this route (any of these roles)
   */
  requiredRoles?: string[];
  /**
   * Scopes required to access this route (any of these scopes)
   */
  requiredScopes?: string[];
  /**
   * Require all roles instead of any
   */
  requireAllRoles?: boolean;
  /**
   * Require all scopes instead of any
   */
  requireAllScopes?: boolean;
  /**
   * Custom fallback component when not authorized
   */
  fallback?: React.ReactNode;
  /**
   * Redirect path when not authenticated
   */
  redirectTo?: string;
}

/**
 * ProtectedRoute component
 * Renders children only if user is authenticated and has required permissions
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredScopes = [],
  requireAllRoles = false,
  requireAllScopes = false,
  fallback,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading, hasAnyRole, hasAllRoles, hasAnyScope, hasAllScopes } =
    useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="protected-route-loading">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  // Not authenticated - redirect or show fallback
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Redirect to login
    window.location.href = redirectTo;
    return null;
  }

  // Check role permissions
  if (requiredRoles.length > 0) {
    const hasPermission = requireAllRoles
      ? hasAllRoles(requiredRoles)
      : hasAnyRole(requiredRoles);

    if (!hasPermission) {
      return (
        <div className="protected-route-forbidden">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this resource.</p>
          <p>Required roles: {requiredRoles.join(', ')}</p>
        </div>
      );
    }
  }

  // Check scope permissions
  if (requiredScopes.length > 0) {
    const hasPermission = requireAllScopes
      ? hasAllScopes(requiredScopes)
      : hasAnyScope(requiredScopes);

    if (!hasPermission) {
      return (
        <div className="protected-route-forbidden">
          <h2>Access Denied</h2>
          <p>You don't have permission to perform this action.</p>
          <p>Required scopes: {requiredScopes.join(', ')}</p>
        </div>
      );
    }
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
};

export interface RequireRoleProps {
  children: React.ReactNode;
  /**
   * Required roles (any of these)
   */
  roles: string[];
  /**
   * Require all roles instead of any
   */
  requireAll?: boolean;
  /**
   * Fallback content when user doesn't have permission
   */
  fallback?: React.ReactNode;
}

/**
 * RequireRole component
 * Conditionally renders children based on user roles
 */
export const RequireRole: React.FC<RequireRoleProps> = ({
  children,
  roles,
  requireAll = false,
  fallback = null,
}) => {
  const { hasAnyRole, hasAllRoles } = useAuth();

  const hasPermission = requireAll ? hasAllRoles(roles) : hasAnyRole(roles);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export interface RequireScopeProps {
  children: React.ReactNode;
  /**
   * Required scopes (any of these)
   */
  scopes: string[];
  /**
   * Require all scopes instead of any
   */
  requireAll?: boolean;
  /**
   * Fallback content when user doesn't have permission
   */
  fallback?: React.ReactNode;
}

/**
 * RequireScope component
 * Conditionally renders children based on user scopes
 */
export const RequireScope: React.FC<RequireScopeProps> = ({
  children,
  scopes,
  requireAll = false,
  fallback = null,
}) => {
  const { hasAnyScope, hasAllScopes } = useAuth();

  const hasPermission = requireAll ? hasAllScopes(scopes) : hasAnyScope(scopes);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export interface AuthGuardProps {
  children: React.ReactNode;
  /**
   * Show login form instead of redirecting
   */
  showLogin?: boolean;
  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;
}

/**
 * AuthGuard component
 * Simple authentication check without role/scope requirements
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  showLogin = false,
  loadingComponent,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return (
      <div className="auth-guard-loading">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showLogin) {
      // This would render the login form
      // For now, just redirect
      window.location.href = '/login';
      return null;
    }
    
    window.location.href = '/login';
    return null;
  }

  return <>{children}</>;
};
