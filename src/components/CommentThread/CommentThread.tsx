import React, { useState, useEffect, useRef } from 'react';
import type { Comment, CreateCommentRequest, PaginatedResponse } from '../../types/contracts';
import './CommentThread.css';

export interface CommentThreadProps {
  /**
   * Comments to display (controlled mode)
   */
  comments?: Comment[];
  /**
   * Ticket ID to fetch comments for (uncontrolled mode)
   */
  ticketId?: string;
  /**
   * API endpoint for comments
   */
  apiEndpoint?: string;
  /**
   * Callback when a new comment is added
   */
  onCommentAdded?: (comment: Comment) => void;
  /**
   * Callback when a comment is deleted
   */
  onCommentDeleted?: (commentId: string) => void;
  /**
   * Whether comments can be added
   */
  allowComments?: boolean;
  /**
   * Whether comments can be deleted
   */
  allowDelete?: boolean;
  /**
   * Current user ID (for determining ownership)
   */
  currentUserId?: string;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Error state
   */
  error?: Error | null;
  /**
   * Custom className
   */
  className?: string;
}

const CommentThread: React.FC<CommentThreadProps> = ({
  comments: controlledComments,
  ticketId,
  apiEndpoint,
  onCommentAdded,
  onCommentDeleted,
  allowComments = true,
  allowDelete = false,
  currentUserId,
  isLoading: controlledLoading,
  error: controlledError,
  className = '',
}) => {
  const [comments, setComments] = useState<Comment[]>(controlledComments || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // If comments are provided as prop (controlled mode), use them
    if (controlledComments) {
      setComments(controlledComments);
      return;
    }

    // Otherwise, fetch from API (uncontrolled mode)
    if (!ticketId || !apiEndpoint) return;

    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiEndpoint}?ticketId=${ticketId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PaginatedResponse<Comment> = await response.json();
        setComments(data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch comments'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [controlledComments, ticketId, apiEndpoint]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim() || !ticketId || !apiEndpoint) return;

    setIsSubmitting(true);
    setError(null);

    const request: CreateCommentRequest = {
      ticketId,
      content: newComment.trim(),
      isInternal: false,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const comment: Comment = await response.json();
      setComments((prev) => [...prev, comment]);
      setNewComment('');

      if (onCommentAdded) {
        onCommentAdded(comment);
      }

      // Focus back on the input after successful submission
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to post comment'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!apiEndpoint) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiEndpoint}/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setComments((prev) => prev.filter((c) => c.id !== commentId));

      if (onCommentDeleted) {
        onCommentDeleted(commentId);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete comment'));
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    }).format(date);
  };

  const loading = controlledLoading !== undefined ? controlledLoading : isLoading;
  const err = controlledError !== undefined ? controlledError : error;

  return (
    <div className={`acme-comment-thread ${className}`}>
      <div className="comment-thread-header">
        <h3 className="comment-count">
          {comments.length} Comment{comments.length !== 1 ? 's' : ''}
        </h3>
      </div>

      {err && (
        <div className="error-message">
          <strong>Error:</strong> {err.message}
        </div>
      )}

      {loading && comments.length === 0 ? (
        <div className="loading-state">
          <div className="loading-spinner">Loading comments...</div>
        </div>
      ) : (
        <div className="comment-list">
          {comments.length === 0 ? (
            <div className="empty-state">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-author">
                    <div className="author-avatar">
                      {comment.authorName.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="author-name">{comment.authorName}</span>
                  </div>
                  <div className="comment-meta">
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                    {allowDelete && currentUserId === comment.authorId && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="delete-btn"
                        title="Delete comment"
                        disabled={loading}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="comment-body">
                  <p className="comment-content">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {allowComments && (
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <div className="comment-input-wrapper">
            <textarea
              ref={commentInputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="comment-form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={!newComment.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentThread;
