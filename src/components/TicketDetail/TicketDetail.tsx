import React, { useState, useEffect } from 'react';
import type { Ticket, UpdateTicketRequest } from '../../types/contracts';
import './TicketDetail.css';

export interface TicketDetailProps {
  /**
   * Ticket to display (controlled mode)
   */
  ticket?: Ticket;
  /**
   * Ticket ID to fetch (uncontrolled mode)
   */
  ticketId?: string;
  /**
   * API endpoint for fetching ticket details
   */
  apiEndpoint?: string;
  /**
   * Callback when ticket is updated
   */
  onUpdate?: (ticket: Ticket) => void;
  /**
   * Whether the ticket can be edited
   */
  editable?: boolean;
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

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket: controlledTicket,
  ticketId,
  apiEndpoint,
  onUpdate,
  editable = false,
  isLoading: controlledLoading,
  error: controlledError,
  className = '',
}) => {
  const [ticket, setTicket] = useState<Ticket | null>(controlledTicket || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdateTicketRequest>({});

  useEffect(() => {
    // If ticket is provided as prop (controlled mode), use it
    if (controlledTicket) {
      setTicket(controlledTicket);
      return;
    }

    // Otherwise, fetch from API (uncontrolled mode)
    if (!ticketId || !apiEndpoint) return;

    const fetchTicket = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiEndpoint}/${ticketId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Ticket = await response.json();
        setTicket(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch ticket'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [controlledTicket, ticketId, apiEndpoint]);

  const handleEdit = () => {
    if (ticket) {
      setEditForm({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!ticket || !apiEndpoint) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiEndpoint}/${ticket.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTicket: Ticket = await response.json();
      setTicket(updatedTicket);
      setIsEditing(false);
      setEditForm({});

      if (onUpdate) {
        onUpdate(updatedTicket);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update ticket'));
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: Ticket['priority']): string => {
    switch (priority) {
      case 'critical':
        return 'priority-critical';
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusColor = (status: Ticket['status']): string => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'in_progress':
        return 'status-in-progress';
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const loading = controlledLoading !== undefined ? controlledLoading : isLoading;
  const err = controlledError !== undefined ? controlledError : error;

  if (loading && !ticket) {
    return (
      <div className={`acme-ticket-detail loading ${className}`}>
        <div className="loading-spinner">Loading ticket details...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className={`acme-ticket-detail error ${className}`}>
        <div className="error-message">
          <strong>Error:</strong> {err.message}
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className={`acme-ticket-detail empty ${className}`}>
        <div className="empty-state">
          <p>No ticket selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`acme-ticket-detail ${className}`}>
      <div className="ticket-detail-header">
        <div className="header-top">
          <div className="ticket-meta">
            <span className="ticket-id">#{ticket.id.substring(0, 8)}</span>
            <div className="ticket-badges">
              {isEditing ? (
                <>
                  <select
                    value={editForm.priority || ticket.priority}
                    onChange={(e) =>
                      setEditForm({ ...editForm, priority: e.target.value as Ticket['priority'] })
                    }
                    className={`badge priority ${getPriorityColor(
                      editForm.priority || ticket.priority
                    )}`}
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                    <option value="critical">critical</option>
                  </select>
                  <select
                    value={editForm.status || ticket.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value as Ticket['status'] })
                    }
                    className={`badge status ${getStatusColor(editForm.status || ticket.status)}`}
                  >
                    <option value="open">open</option>
                    <option value="in_progress">in progress</option>
                    <option value="resolved">resolved</option>
                    <option value="closed">closed</option>
                  </select>
                </>
              ) : (
                <>
                  <span className={`badge priority ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <span className={`badge status ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </>
              )}
            </div>
          </div>
          {editable && (
            <div className="ticket-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
                    Save
                  </button>
                  <button onClick={handleCancel} className="btn btn-secondary">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} className="btn btn-secondary">
                  Edit
                </button>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editForm.title || ticket.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="ticket-title-edit"
            placeholder="Ticket title"
          />
        ) : (
          <h1 className="ticket-title">{ticket.title}</h1>
        )}
      </div>

      <div className="ticket-detail-body">
        {isEditing ? (
          <textarea
            value={editForm.description || ticket.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="ticket-description-edit"
            placeholder="Ticket description"
            rows={10}
          />
        ) : (
          <div className="ticket-description">{ticket.description}</div>
        )}
      </div>

      <div className="ticket-detail-footer">
        <div className="timestamp">
          <strong>Created:</strong> {formatDate(ticket.createdAt)}
        </div>
        <div className="timestamp">
          <strong>Last Updated:</strong> {formatDate(ticket.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
