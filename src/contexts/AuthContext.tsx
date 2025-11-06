import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { SignupRequest, LoginRequest, UserResponse, AuthResponse } from '../types/contracts/auth';
import { authApi, AuthApiError } from '../services/authApi';
import { TokenStorage } from '../utils/tokenStorage';

export interface AuthContextType {
  user: UserResponse | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthApiError | null;
  roles: string[];
  scopes: string[];
  tenantId: string | null;
  
  // Auth actions
  signup: (request: SignupRequest) => Promise<void>;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  
  // Permission checks
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  hasScope: (scope: string) => boolean;
  hasAnyScope: (scopes: string[]) => boolean;
  hasAllScopes: (scopes: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
  /**
   * Custom auth API base URL
   */
  authApiUrl?: string;
  /**
   * Auto-refresh token when it's about to expire
   */
  autoRefresh?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authApiUrl,
  autoRefresh = true,
}) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthApiError | null>(null);

  // Set custom API URL if provided
  useEffect(() => {
    if (authApiUrl) {
      // This would require updating authApi to be configurable
      // For now, using the default instance
    }
  }, [authApiUrl]);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!autoRefresh || !accessToken) return;

    const checkTokenExpiry = () => {
      if (TokenStorage.isTokenExpiringSoon(accessToken)) {
        refreshAccessToken();
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60 * 1000);
    
    return () => clearInterval(interval);
  }, [accessToken, autoRefresh]);

  /**
   * Load user from stored token
   */
  const loadUser = async () => {
    const token = TokenStorage.getAccessToken();
    
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Check if token is expired
    if (TokenStorage.isTokenExpired(token)) {
      // Try to refresh
      try {
        await refreshAccessToken();
      } catch (err) {
        TokenStorage.clearTokens();
        setIsLoading(false);
      }
      return;
    }

    try {
      const userData = await authApi.getCurrentUser(token);
      setUser(userData);
      setAccessToken(token);
      setError(null);
    } catch (err) {
      console.error('Failed to load user:', err);
      if (err instanceof AuthApiError && err.code === 'UNAUTHORIZED') {
        // Try to refresh token
        try {
          await refreshAccessToken();
        } catch (refreshErr) {
          TokenStorage.clearTokens();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * User signup
   */
  const signup = async (request: SignupRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const authResponse: AuthResponse = await authApi.signup(request);
      
      // Store tokens
      TokenStorage.setAccessToken(authResponse.accessToken);
      TokenStorage.setRefreshToken(authResponse.refreshToken);
      
      // Load user data
      const userData = await authApi.getCurrentUser(authResponse.accessToken);
      setUser(userData);
      setAccessToken(authResponse.accessToken);
    } catch (err) {
      if (err instanceof AuthApiError) {
        setError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * User login
   */
  const login = async (request: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const authResponse: AuthResponse = await authApi.login(request);
      
      // Store tokens
      TokenStorage.setAccessToken(authResponse.accessToken);
      TokenStorage.setRefreshToken(authResponse.refreshToken);
      
      // Load user data
      const userData = await authApi.getCurrentUser(authResponse.accessToken);
      setUser(userData);
      setAccessToken(authResponse.accessToken);
    } catch (err) {
      if (err instanceof AuthApiError) {
        setError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * User logout
   */
  const logout = useCallback(() => {
    TokenStorage.clearTokens();
    setUser(null);
    setAccessToken(null);
    setError(null);
  }, []);

  /**
   * Refresh access token
   */
  const refreshAccessToken = async (): Promise<void> => {
    const refreshToken = TokenStorage.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const authResponse: AuthResponse = await authApi.refreshToken({ refreshToken });
      
      // Store new access token (refresh token stays the same)
      TokenStorage.setAccessToken(authResponse.accessToken);
      
      // Load user data with new token
      const userData = await authApi.getCurrentUser(authResponse.accessToken);
      setUser(userData);
      setAccessToken(authResponse.accessToken);
      setError(null);
    } catch (err) {
      console.error('Failed to refresh token:', err);
      logout();
      throw err;
    }
  };

  // Extract roles, scopes, and tenant from token
  const roles = accessToken ? TokenStorage.getRolesFromToken(accessToken) : [];
  const scopes = accessToken ? TokenStorage.getScopesFromToken(accessToken) : [];
  const tenantId = accessToken ? TokenStorage.getTenantIdFromToken(accessToken) : null;

  // Permission check helpers
  const hasRole = useCallback((role: string): boolean => {
    return roles.includes(role);
  }, [roles]);

  const hasAnyRole = useCallback((requiredRoles: string[]): boolean => {
    return requiredRoles.some((role) => roles.includes(role));
  }, [roles]);

  const hasAllRoles = useCallback((requiredRoles: string[]): boolean => {
    return requiredRoles.every((role) => roles.includes(role));
  }, [roles]);

  const hasScope = useCallback((scope: string): boolean => {
    return scopes.includes(scope);
  }, [scopes]);

  const hasAnyScope = useCallback((requiredScopes: string[]): boolean => {
    return requiredScopes.some((scope) => scopes.includes(scope));
  }, [scopes]);

  const hasAllScopes = useCallback((requiredScopes: string[]): boolean => {
    return requiredScopes.every((scope) => scopes.includes(scope));
  }, [scopes]);

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: !!user && !!accessToken,
    isLoading,
    error,
    roles,
    scopes,
    tenantId,
    signup,
    login,
    logout,
    refreshAccessToken,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasScope,
    hasAnyScope,
    hasAllScopes,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth hook to access auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
