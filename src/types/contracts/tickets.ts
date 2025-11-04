import { z } from 'zod';
import { BaseEntitySchema, PrioritySchema } from './base';

/**
 * Ticket status enum
 * Mirrors @acme/tickets from acme-contracts
 */
export const TicketStatusSchema = z.enum(['open', 'in_progress', 'resolved', 'closed']);

export type TicketStatus = z.infer<typeof TicketStatusSchema>;

/**
 * Ticket schema
 */
export const TicketSchema = BaseEntitySchema.extend({
  title: z.string().min(1).max(200),
  description: z.string().max(5000),
  status: TicketStatusSchema,
  priority: PrioritySchema,
});

export type Ticket = z.infer<typeof TicketSchema>;

/**
 * Create ticket request
 */
export const CreateTicketRequestSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000),
  priority: PrioritySchema.default('medium'),
});

export type CreateTicketRequest = z.infer<typeof CreateTicketRequestSchema>;

/**
 * Update ticket request
 */
export const UpdateTicketRequestSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  status: TicketStatusSchema.optional(),
  priority: PrioritySchema.optional(),
});

export type UpdateTicketRequest = z.infer<typeof UpdateTicketRequestSchema>;
