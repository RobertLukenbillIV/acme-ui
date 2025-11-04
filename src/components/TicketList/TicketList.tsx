import React, { useState, useEffect } from 'react';
import type { Ticket, PaginatedResponse, PaginationQuery } from '../../types/contracts';
import './TicketList.css';

export interface TicketListProps {
  /**
   * Optional array of tickets (for controlled mode)
   */
  tickets?: Ticket[];
  /**
   * API endpoint for fetching tickets (for uncontrolled mode)
   */
  apiEndpoint?: string;
  /**
   * Pagination configuration
   */
  pagination?: Partial<PaginationQuery>;
  /**
   * Callback when a ticket is clicked
   */
  onTicketClick?: (ticket: Ticket) => void;
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

const TicketList: React.FC<TicketListProps> = ({
  tickets: controlledTickets,
  apiEndpoint,
  pagination = {},
  onTicketClick,
  isLoading: controlledLoading,
  error: controlledError,
  className = '',
}) => {
  const [tickets, setTickets] = useState<Ticket[]>(controlledTickets || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [paginationMeta, setPaginationMeta] = useState<PaginatedResponse<Ticket>['meta'] | null>(null);
  
  const {
    page = 1,
    limit = 20,
    sortBy,
    sortOrder = 'asc',
  } = pagination;

  useEffect(() => {
    // If tickets are provided as props (controlled mode), use them
    if (controlledTickets) {
      setTickets(controlledTickets);
      return;
    }

    // Otherwise, fetch from API (uncontrolled mode)
    if (!apiEndpoint) return;

    const fetchTickets = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sortOrder,
          ...(sortBy && { sortBy }),
        });

        const response = await fetch(`${apiEndpoint}?${queryParams}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PaginatedResponse<Ticket> = await response.json();
        setTickets(data.data);
        setPaginationMeta(data.meta);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tickets'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [controlledTickets, apiEndpoint, page, limit, sortBy, sortOrder]);

  const handleTicketClick = (ticket: Ticket) => {
    if (onTicketClick) {
      onTicketClick(ticket);
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
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const loading = controlledLoading !== undefined ? controlledLoading : isLoading;
  const err = controlledError !== undefined ? controlledError : error;

  if (loading) {
    return (
      <div className={`acme-ticket-list loading ${className}`}>
        <div className="loading-spinner">Loading tickets...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className={`acme-ticket-list error ${className}`}>
        <div className="error-message">
          <strong>Error:</strong> {err.message}
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className={`acme-ticket-list empty ${className}`}>
        <div className="empty-state">
          <div className="empty-icon">🎫</div>
          <p>No tickets found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`acme-ticket-list ${className}`}>
      <div className="ticket-list-container">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="ticket-item"
            onClick={() => handleTicketClick(ticket)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTicketClick(ticket);
              }
            }}
          >
            <div className="ticket-header">
              <h3 className="ticket-title">{ticket.title}</h3>
              <div className="ticket-badges">
                <span className={`badge priority ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className={`badge status ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <p className="ticket-description">
              {ticket.description.length > 150
                ? `${ticket.description.substring(0, 150)}...`
                : ticket.description}
            </p>
            
            <div className="ticket-footer">
              <span className="ticket-id">#{ticket.id.substring(0, 8)}</span>
              <span className="ticket-date">{formatDate(ticket.updatedAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {paginationMeta && (
        <div className="pagination-info">
          <span>
            Page {paginationMeta.page} of {paginationMeta.totalPages}
          </span>
          <span>
            {tickets.length} of {paginationMeta.total} tickets
          </span>
        </div>
      )}
    </div>
  );
};

export default TicketList;
