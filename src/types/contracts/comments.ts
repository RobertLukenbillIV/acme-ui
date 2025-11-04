import { z } from 'zod';
import { BaseEntitySchema } from './base';

/**
 * Comment schema for tickets
 * This follows the acme-contracts pattern
 */
export const CommentSchema = BaseEntitySchema.extend({
  ticketId: z.string().uuid(),
  authorId: z.string().uuid(),
  authorName: z.string(),
  content: z.string().min(1).max(2000),
  isInternal: z.boolean().default(false),
});

export type Comment = z.infer<typeof CommentSchema>;

/**
 * Create comment request
 */
export const CreateCommentRequestSchema = z.object({
  ticketId: z.string().uuid(),
  content: z.string().min(1).max(2000),
  isInternal: z.boolean().optional().default(false),
});

export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>;

/**
 * Update comment request
 */
export const UpdateCommentRequestSchema = z.object({
  content: z.string().min(1).max(2000),
});

export type UpdateCommentRequest = z.infer<typeof UpdateCommentRequestSchema>;
