import { z } from 'zod';

/**
 * Authentication request/response types
 * These mirror the DTOs from acme-auth-service
 */

// Signup Request
export const SignupRequestSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  tenantSlug: z.string().min(1, 'Organization slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
});

export type SignupRequest = z.infer<typeof SignupRequestSchema>;

// Login Request
export const LoginRequestSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Refresh Token Request
export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().uuid(),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

// Auth Response
export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string().default('Bearer'),
  expiresIn: z.number(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// User Response
export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  enabled: z.boolean(),
  tenantId: z.string().uuid().optional(),
  roles: z.array(z.string()).optional(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

// JWT Token Payload (decoded)
export interface JWTPayload {
  sub: string; // email
  iat: number; // issued at
  exp: number; // expiration
  tenantId?: string;
  roles?: string[];
  scopes?: string[];
}

// Auth Error Response (matching acme-contracts)
export const AuthErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
        code: z.string(),
      })
    )
    .optional(),
  timestamp: z.string(),
  path: z.string().optional(),
  requestId: z.string().uuid().optional(),
});

export type AuthErrorResponse = z.infer<typeof AuthErrorResponseSchema>;
