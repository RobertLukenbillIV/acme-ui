import React, { useState } from 'react';
import TicketList from '../../src/components/TicketList/TicketList';
import TicketDetail from '../../src/components/TicketDetail/TicketDetail';
import CommentThread from '../../src/components/CommentThread/CommentThread';
import type { Ticket, Comment } from '../../src/types/contracts';

const TicketsPage = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Mock data for demonstration
  const mockTickets: Ticket[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Login page not loading correctly',
      description: 'When users try to access the login page, they see a blank white screen instead of the login form. This issue started happening after the latest deployment.',
      status: 'open',
      priority: 'critical',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      title: 'Improve dashboard performance',
      description: 'The main dashboard takes too long to load when there are many data points. We should implement pagination or lazy loading.',
      status: 'in_progress',
      priority: 'high',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      title: 'Add dark mode support',
      description: 'Users have requested dark mode support throughout the application for better viewing in low-light environments.',
      status: 'resolved',
      priority: 'medium',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      title: 'Update documentation for API v2',
      description: 'The API documentation needs to be updated to reflect the changes in version 2 of our API.',
      status: 'closed',
      priority: 'low',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const mockComments: Comment[] = [
    {
      id: '660e8400-e29b-41d4-a716-446655440001',
      ticketId: '550e8400-e29b-41d4-a716-446655440001',
      authorId: '770e8400-e29b-41d4-a716-446655440001',
      authorName: 'Sarah Chen',
      content: 'I can reproduce this issue in production. It seems to be affecting all users.',
      isInternal: false,
      createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440002',
      ticketId: '550e8400-e29b-41d4-a716-446655440001',
      authorId: '770e8400-e29b-41d4-a716-446655440002',
      authorName: 'Mike Johnson',
      content: 'Looking into this now. Initial investigation suggests it might be related to the recent authentication changes.',
      isInternal: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440003',
      ticketId: '550e8400-e29b-41d4-a716-446655440001',
      authorId: '770e8400-e29b-41d4-a716-446655440003',
      authorName: 'Emily Davis',
      content: 'Found the issue - there\'s a missing redirect in the new auth flow. Working on a fix.',
      isInternal: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
  ];

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    console.log('Ticket updated:', updatedTicket);
    setSelectedTicket(updatedTicket);
  };

  const handleCommentAdded = (comment: Comment) => {
    console.log('Comment added:', comment);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Ticket Management System</h1>
        <p>
          This page demonstrates the TypeScript ticket components that consume types from the
          acme-contracts package. The components support both controlled and uncontrolled modes,
          with full type safety.
        </p>
      </div>

      <section className="section">
        <h2>Component Features</h2>
        <ul>
          <li>
            <strong>TicketList:</strong> Displays paginated list of tickets with status and
            priority badges
          </li>
          <li>
            <strong>TicketDetail:</strong> Shows full ticket details with inline editing
            capabilities
          </li>
          <li>
            <strong>CommentThread:</strong> Manages comments with add/delete functionality
          </li>
          <li>
            <strong>Type Safety:</strong> All components use Zod schemas from acme-contracts
          </li>
          <li>
            <strong>Responsive Design:</strong> Mobile-friendly layouts with dark mode support
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Ticket List (Controlled Mode)</h2>
        <p>Click a ticket to view details below:</p>
        <TicketList
          tickets={mockTickets}
          onTicketClick={handleTicketSelect}
        />
      </section>

      {selectedTicket && (
        <>
          <section className="section">
            <h2>Ticket Detail (Editable)</h2>
            <TicketDetail
              ticket={selectedTicket}
              onUpdate={handleTicketUpdate}
              editable={true}
            />
          </section>

          <section className="section">
            <h2>Comment Thread</h2>
            <CommentThread
              comments={mockComments.filter((c) => c.ticketId === selectedTicket.id)}
              ticketId={selectedTicket.id}
              onCommentAdded={handleCommentAdded}
              allowComments={true}
              allowDelete={true}
              currentUserId="770e8400-e29b-41d4-a716-446655440002"
            />
          </section>
        </>
      )}

      {!selectedTicket && (
        <section className="section">
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <p>Select a ticket from the list above to view details and comments.</p>
          </div>
        </section>
      )}

      <section className="section">
        <h2>API Integration</h2>
        <p>
          These components can also work in <strong>uncontrolled mode</strong> by providing API
          endpoints:
        </p>
        <pre style={{ 
          background: 'var(--background-secondary)', 
          padding: '1rem', 
          borderRadius: '6px',
          overflow: 'auto'
        }}>
{`// Fetch from API
<TicketList 
  apiEndpoint="/api/tickets"
  onTicketSelect={handleSelect} 
/>

<TicketDetail 
  ticketId={selectedId}
  apiEndpoint="/api/tickets"
  editable={true}
/>

<CommentThread 
  ticketId={selectedId}
  apiEndpoint="/api/comments"
  allowComments={true}
/>`}
        </pre>
      </section>

      <section className="section">
        <h2>Type Definitions</h2>
        <p>
          The components use TypeScript types mirroring the acme-contracts repository structure:
        </p>
        <ul>
          <li>
            <code>@acme/base</code> - Base entity schema with id, createdAt, updatedAt
          </li>
          <li>
            <code>@acme/errors</code> - Error response schemas with standardized error codes
          </li>
          <li>
            <code>@acme/pagination</code> - Pagination query and response types
          </li>
          <li>
            <code>@acme/tickets</code> - Ticket schemas with status, priority, CRUD operations
          </li>
          <li>
            <code>@acme/comments</code> - Comment schemas for ticket discussions
          </li>
        </ul>
        <p>
          Once the acme-contracts packages are published to npm, import statements can be updated
          from local types to the published packages.
        </p>
      </section>
    </div>
  );
};

export default TicketsPage;
