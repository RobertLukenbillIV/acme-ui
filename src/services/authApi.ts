import type {
  SignupRequest,
  LoginRequest,
  RefreshTokenRequest,
  AuthResponse,
  UserResponse,
  AuthErrorResponse,
} from '../types/contracts/auth';

/**
 * Auth API Service
 * Handles all authentication-related API calls to acme-auth-service
 */

// Detect if we're running in a GitHub Codespace
const getAuthApiUrl = (): string => {
  // Check if running in a Codespace by looking at the current URL
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If we're in a Codespace (hostname like: turbo-couscous-9qpvxx65757h74x4-3001.app.github.dev)
    if (hostname.includes('.app.github.dev')) {
      // Replace the port number in the hostname with 8080 for the auth service
      // Pattern: name-hash-PORT.app.github.dev -> name-hash-8080.app.github.dev
      const authHostname = hostname.replace(/-\d+\.app\.github\.dev/, '-8080.app.github.dev');
      const protocol = window.location.protocol;
      return `${protocol}//${authHostname}/api/auth`;
    }
  }
  
  // Default to localhost for local development
  return 'http://localhost:8080/api/auth';
};

const DEFAULT_AUTH_API_URL = getAuthApiUrl();

export class AuthApiError extends Error {
  code: string;
  details?: Array<{ field: string; message: string; code: string }>;
  statusCode: number;

  constructor(error: AuthErrorResponse, statusCode: number) {
    super(error.message);
    this.name = 'AuthApiError';
    this.code = error.code;
    this.details = error.details;
    this.statusCode = statusCode;
  }
}

export class AuthApiService {
  private baseUrl: string;

  constructor(baseUrl: string = DEFAULT_AUTH_API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * User signup
   */
  async signup(request: SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error: AuthErrorResponse = await response.json();
      throw new AuthApiError(error, response.status);
    }

    return await response.json();
  }

  /**
   * User login
   */
  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error: AuthErrorResponse = await response.json();
      throw new AuthApiError(error, response.status);
    }

    return await response.json();
  }

  /**
   * Refresh access token
   */
  async refreshToken(request: RefreshTokenRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error: AuthErrorResponse = await response.json();
      throw new AuthApiError(error, response.status);
    }

    return await response.json();
  }

  /**
   * Get current user
   */
  async getCurrentUser(accessToken: string): Promise<UserResponse> {
    const response = await fetch(`${this.baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error: AuthErrorResponse = await response.json();
      throw new AuthApiError(error, response.status);
    }

    return await response.json();
  }

  /**
   * Logout (client-side only - clears tokens)
   * Note: acme-auth-service doesn't have a logout endpoint,
   * so this is handled client-side by clearing tokens
   */
  logout(): void {
    // This is just a helper method for consistency
    // Actual logout logic is in AuthContext
  }
}

// Export singleton instance
export const authApi = new AuthApiService();

// Export factory function for custom base URL
export const createAuthApi = (baseUrl: string) => new AuthApiService(baseUrl);
