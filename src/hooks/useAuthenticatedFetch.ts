import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface UseAuthenticatedFetchOptions extends RequestInit {
  /**
   * Skip auto-retry on 401 (token refresh)
   */
  skipRetry?: boolean;
}

/**
 * Hook for making authenticated API requests
 * Automatically includes JWT token in Authorization header
 * Handles token refresh on 401 errors
 */
export const useAuthenticatedFetch = () => {
  const { accessToken, refreshAccessToken, logout } = useAuth();

  const authenticatedFetch = useCallback(
    async (url: string, options: UseAuthenticatedFetchOptions = {}): Promise<Response> => {
      const { skipRetry = false, headers, ...restOptions } = options;

      if (!accessToken) {
        throw new Error('No access token available');
      }

      // Add Authorization header
      const authHeaders = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await fetch(url, {
          ...restOptions,
          headers: authHeaders,
        });

        // Handle 401 Unauthorized - try to refresh token and retry
        if (response.status === 401 && !skipRetry) {
          try {
            await refreshAccessToken();
            // Retry request with new token
            return authenticatedFetch(url, { ...options, skipRetry: true });
          } catch (refreshError) {
            // Refresh failed, logout user
            logout();
            throw new Error('Session expired. Please login again.');
          }
        }

        return response;
      } catch (error) {
        console.error('Authenticated fetch error:', error);
        throw error;
      }
    },
    [accessToken, refreshAccessToken, logout]
  );

  return authenticatedFetch;
};

/**
 * Hook for making authenticated JSON requests
 * Returns parsed JSON response
 */
export const useAuthenticatedJson = () => {
  const authenticatedFetch = useAuthenticatedFetch();

  const authenticatedJson = useCallback(
    async <T = any>(url: string, options: UseAuthenticatedFetchOptions = {}): Promise<T> => {
      const response = await authenticatedFetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          code: 'UNKNOWN_ERROR',
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        throw error;
      }

      return await response.json();
    },
    [authenticatedFetch]
  );

  return authenticatedJson;
};
