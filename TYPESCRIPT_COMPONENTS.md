# TypeScript Ticket System Components

This document outlines the TypeScript-based ticket management components built for the acme-ui library that consume types from the acme-contracts repository.

## Overview

Three new TypeScript components have been added to provide a complete ticket management system with type safety using Zod schemas that mirror the acme-contracts package structure.

## Components

### 1. TicketList (`src/components/TicketList/`)

A paginated list component for displaying tickets with status and priority badges.

**Features:**
- Controlled and uncontrolled modes
- API integration with pagination support
- Status badges (open, in_progress, resolved, closed)
- Priority badges (critical, high, medium, low)
- Keyboard navigation
- Loading and error states
- Responsive design
- Dark mode support

**Props:**
```typescript
interface TicketListProps {
  tickets?: Ticket[];              // Controlled mode
  apiEndpoint?: string;            // Uncontrolled mode with API
  pagination?: PaginationQuery;    // Pagination config
  onTicketClick?: (ticket: Ticket) => void;
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
}
```

**Usage:**
```tsx
// Controlled mode
<TicketList tickets={tickets} onTicketClick={handleClick} />

// Uncontrolled mode with API
<TicketList apiEndpoint="/api/tickets" onTicketClick={handleClick} />
```

### 2. TicketDetail (`src/components/TicketDetail/`)

Displays full ticket details with inline editing capabilities.

**Features:**
- View and edit ticket details
- Status and priority editing with dropdowns
- Title and description editing
- Timestamps (created/updated)
- CRUD operations via API
- Loading and error states
- Responsive design
- Dark mode support

**Props:**
```typescript
interface TicketDetailProps {
  ticket?: Ticket;                 // Controlled mode
  ticketId?: string;               // Uncontrolled mode
  apiEndpoint?: string;            // API endpoint
  onUpdate?: (ticket: Ticket) => void;
  editable?: boolean;              // Enable editing
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
}
```

**Usage:**
```tsx
// View only
<TicketDetail ticket={ticket} />

// Editable with callback
<TicketDetail 
  ticket={ticket} 
  editable={true} 
  onUpdate={handleUpdate} 
/>

// Fetch from API
<TicketDetail 
  ticketId={selectedId} 
  apiEndpoint="/api/tickets"
  editable={true}
/>
```

### 3. CommentThread (`src/components/CommentThread/`)

Manages comments on tickets with add/delete functionality.

**Features:**
- Display paginated comments
- Add new comments
- Delete comments (permission-based)
- Author information with avatars
- Relative time formatting (e.g., "2 hours ago")
- Real-time updates
- Loading and error states
- Responsive design
- Dark mode support

**Props:**
```typescript
interface CommentThreadProps {
  comments?: Comment[];            // Controlled mode
  ticketId?: string;               // For API fetching
  apiEndpoint?: string;            // API endpoint
  onCommentAdded?: (comment: Comment) => void;
  onCommentDeleted?: (commentId: string) => void;
  allowComments?: boolean;         // Enable adding comments
  allowDelete?: boolean;           // Enable delete button
  currentUserId?: string;          // For permission checks
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
}
```

**Usage:**
```tsx
// Display only
<CommentThread comments={comments} />

// With add/delete
<CommentThread 
  ticketId={ticketId}
  apiEndpoint="/api/comments"
  allowComments={true}
  allowDelete={true}
  currentUserId={userId}
  onCommentAdded={handleAdded}
  onCommentDeleted={handleDeleted}
/>
```

## Type Definitions

All components use TypeScript types mirroring the acme-contracts repository structure located in `src/types/contracts/`:

### Base Types (`base.ts`)
- `BaseEntity` - Common fields for all entities (id, createdAt, updatedAt)
- `Priority` - Priority levels (low, medium, high, critical)

### Error Types (`errors.ts`)
- `ErrorResponse` - Standardized error response structure
- `ErrorCode` - Common error codes

### Pagination Types (`pagination.ts`)
- `PaginationQuery` - Query parameters for pagination
- `PaginationMeta` - Metadata about paginated results
- `PaginatedResponse<T>` - Generic paginated response wrapper

### Ticket Types (`tickets.ts`)
- `Ticket` - Complete ticket entity
- `TicketStatus` - Status values (open, in_progress, resolved, closed)
- `CreateTicketRequest` - Request body for creating tickets
- `UpdateTicketRequest` - Request body for updating tickets

### Comment Types (`comments.ts`)
- `Comment` - Comment entity with author info
- `CreateCommentRequest` - Request body for creating comments
- `UpdateCommentRequest` - Request body for updating comments

## Demo Page

A comprehensive demo page is available at `/tickets` showcasing all three components:

**Features:**
- Mock ticket data with realistic scenarios
- Interactive ticket selection
- Inline ticket editing
- Comment management
- API integration examples
- Type safety demonstrations

**Location:** `demo/pages/TicketsPage.tsx`

## API Integration

All components support both controlled and uncontrolled modes:

### Controlled Mode (Client-side state)
```tsx
const [tickets, setTickets] = useState([]);
const [selectedTicket, setSelectedTicket] = useState(null);
const [comments, setComments] = useState([]);

<TicketList tickets={tickets} onTicketClick={setSelectedTicket} />
<TicketDetail ticket={selectedTicket} onUpdate={updateTicket} />
<CommentThread comments={comments} ticketId={selectedTicket?.id} />
```

### Uncontrolled Mode (API-driven)
```tsx
<TicketList 
  apiEndpoint="/api/tickets" 
  onTicketClick={setSelectedTicket} 
/>

<TicketDetail 
  ticketId={selectedTicket?.id}
  apiEndpoint="/api/tickets"
  onUpdate={handleUpdate}
/>

<CommentThread 
  ticketId={selectedTicket?.id}
  apiEndpoint="/api/comments"
/>
```

## Migration Path

Currently, the components use local type definitions that mirror the acme-contracts package structure. When the `@acme/*` packages are published to npm, update imports:

**Current:**
```typescript
import type { Ticket, Comment } from '../types/contracts';
```

**After npm publish:**
```typescript
import type { Ticket } from '@acme/tickets';
import type { Comment } from '@acme/comments';
```

## File Structure

```
src/
├── components/
│   ├── TicketList/
│   │   ├── TicketList.tsx
│   │   ├── TicketList.css
│   │   └── index.ts
│   ├── TicketDetail/
│   │   ├── TicketDetail.tsx
│   │   ├── TicketDetail.css
│   │   └── index.ts
│   └── CommentThread/
│       ├── CommentThread.tsx
│       ├── CommentThread.css
│       └── index.ts
├── types/
│   └── contracts/
│       ├── base.ts
│       ├── errors.ts
│       ├── pagination.ts
│       ├── tickets.ts
│       ├── comments.ts
│       └── index.ts
└── index.js (exports)

demo/
└── pages/
    └── TicketsPage.tsx
```

## Testing

Run the demo server to see the components in action:

```bash
npm run dev
```

Navigate to http://localhost:3000/tickets

## Build Verification

The components are included in the production build:

```bash
npm run build
```

Outputs to `dist/acme-ui.es.js` and `dist/acme-ui.umd.js`

## Styling

All components follow the acme-ui design system:

- **CSS Classes:** `.acme-` prefixed (e.g., `.acme-ticket-list`)
- **Dark Mode:** `[data-theme="dark"]` selectors
- **Responsive:** Mobile-first with breakpoints at 768px
- **Variables:** Uses CSS custom properties for theming

## Next Steps

1. **SDK Integration:** When acme-contracts publishes a TypeScript SDK, replace fetch calls with generated client methods
2. **Real API:** Connect to actual backend endpoints
3. **Authentication:** Add auth tokens to API requests
4. **Optimistic Updates:** Implement optimistic UI updates for better UX
5. **Testing:** Add Jest/RTL tests for each component
6. **Accessibility:** Add ARIA labels and keyboard shortcuts
7. **Advanced Features:** 
   - Ticket filtering and sorting
   - Comment threading/replies
   - File attachments
   - @mentions in comments
   - Real-time updates via WebSocket

## Dependencies

- **TypeScript:** ^5.x
- **React:** ^18.x || ^19.x
- **Zod:** ^3.x (schema validation)
- **@types/react:** Latest
- **@types/react-dom:** Latest

## Exports

All components are exported from the main library entry point:

```typescript
import { 
  TicketList, 
  TicketDetail, 
  CommentThread 
} from 'acme-ui';
```

## License

Same as acme-ui library (check main README.md)
