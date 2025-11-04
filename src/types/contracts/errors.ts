import { z } from 'zod';

/**
 * Error code enum
 * Mirrors @acme/errors from acme-contracts
 */
export const ErrorCodeSchema = z.enum([
  'VALIDATION_ERROR',
  'NOT_FOUND',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'CONFLICT',
  'INTERNAL_ERROR',
  'BAD_REQUEST',
  'RATE_LIMITED',
]);

export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

/**
 * Validation error detail
 */
export const ValidationErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

export type ValidationErrorDetail = z.infer<typeof ValidationErrorDetailSchema>;

/**
 * Base error response
 */
export const ErrorResponseSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
  details: z.array(ValidationErrorDetailSchema).optional(),
  timestamp: z.string().datetime(),
  path: z.string().optional(),
  requestId: z.string().uuid().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * Validation error response
 */
export const ValidationErrorResponseSchema = ErrorResponseSchema.extend({
  code: z.literal('VALIDATION_ERROR'),
  details: z.array(ValidationErrorDetailSchema),
});

export type ValidationErrorResponse = z.infer<typeof ValidationErrorResponseSchema>;
