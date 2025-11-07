import type { JWTPayload } from '../types/contracts/auth';

/**
 * Secure Token Storage
 * Handles JWT token storage and retrieval
 */

const ACCESS_TOKEN_KEY = 'acme_access_token';
const REFRESH_TOKEN_KEY = 'acme_refresh_token';

export class TokenStorage {
  /**
   * Store access token
   */
  static setAccessToken(token: string): void {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store access token:', error);
    }
  }

  /**
   * Get access token
   */
  static getAccessToken(): string | null {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
      return null;
    }
  }

  /**
   * Store refresh token
   */
  static setRefreshToken(token: string): void {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store refresh token:', error);
    }
  }

  /**
   * Get refresh token
   */
  static getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error);
      return null;
    }
  }

  /**
   * Clear all tokens
   */
  static clearTokens(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }

  /**
   * Decode JWT token (without verification - for client-side only)
   * Note: Always verify tokens on the server side!
   */
  static decodeToken(token: string): JWTPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));
      return decoded as JWTPayload;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp * 1000 < Date.now();
  }

  /**
   * Check if token will expire soon (within 5 minutes)
   */
  static isTokenExpiringSoon(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const fiveMinutes = 5 * 60 * 1000;
    return decoded.exp * 1000 < Date.now() + fiveMinutes;
  }

  /**
   * Get roles from token
   */
  static getRolesFromToken(token: string): string[] {
    const decoded = this.decodeToken(token);
    return decoded?.roles || [];
  }

  /**
   * Get scopes from token
   */
  static getScopesFromToken(token: string): string[] {
    const decoded = this.decodeToken(token);
    return decoded?.scopes || [];
  }

  /**
   * Get tenant ID from token
   */
  static getTenantIdFromToken(token: string): string | null {
    const decoded = this.decodeToken(token);
    return decoded?.tenantId || null;
  }

  /**
   * Get email from token
   */
  static getEmailFromToken(token: string): string | null {
    const decoded = this.decodeToken(token);
    return decoded?.sub || null;
  }
}
