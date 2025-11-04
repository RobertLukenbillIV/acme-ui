import { z } from 'zod';

/**
 * Base timestamp fields for all entities
 * Mirrors @acme/base from acme-contracts
 */
export const TimestampSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Timestamp = z.infer<typeof TimestampSchema>;

/**
 * Base entity with ID and timestamps
 */
export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  ...TimestampSchema.shape,
});

export type BaseEntity = z.infer<typeof BaseEntitySchema>;

/**
 * Common status enum
 */
export const StatusSchema = z.enum(['active', 'inactive', 'archived', 'deleted']);

export type Status = z.infer<typeof StatusSchema>;

/**
 * Common priority levels
 */
export const PrioritySchema = z.enum(['low', 'medium', 'high', 'critical']);

export type Priority = z.infer<typeof PrioritySchema>;
