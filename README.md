# acme-ui

UI components library for multi-repo projects. This package provides reusable React components that can be easily integrated into other projects.

## Components

### Navigation
A left-aligned expandable navigation bar with a hamburger menu toggle.

**Features:**
- Collapsible sidebar navigation
- 3-line hamburger menu button
- Smooth expand/collapse animations
- Fixed positioning on the left side
- Dark theme styling

**Usage:**
```jsx
import { Navigation } from 'acme-ui';

<Navigation 
  companyName="Acme Corp" 
  links={[
    { label: 'Home', href: '/home' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' }
  ]} 
/>
```

### Form Components
Various form input components with consistent styling and validation support.

#### TextInput
Standard text input field with label and error handling.

```jsx
import { TextInput } from 'acme-ui';

<TextInput
  label="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter your name"
  required
  error="This field is required"
/>
```

#### Select
Dropdown select component with customizable options.

```jsx
import { Select } from 'acme-ui';

<Select
  label="Country"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ]}
  required
/>
```

#### Checkbox
Checkbox input with label support.

```jsx
import { Checkbox } from 'acme-ui';

<Checkbox
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>
```

#### TextArea
Multi-line text input for longer content.

```jsx
import { TextArea } from 'acme-ui';

<TextArea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Enter your message..."
  rows={5}
/>
```

### Card
Card component for displaying content in a clean, contained format.

**Features:**
- Optional header with title
- Optional footer section
- Hover effects
- Shadow styling

```jsx
import { Card } from 'acme-ui';

<Card 
  title="Welcome Card"
  footer={<button>Action</button>}
>
  <p>Card content goes here</p>
</Card>
```

## Installation

```bash
npm install acme-ui
```

## Development

### Running the Demo
To see all components in action:

```bash
npm run dev
```

This will start a development server at `http://localhost:3000` with a demo page showcasing all components.

### Building the Library

```bash
npm run build
```

This creates the distributable files in the `dist` directory.

## Usage in Other Projects

1. Install the package in your project
2. Import the components you need
3. Use them in your React application

```jsx
import { Navigation, Card, TextInput } from 'acme-ui';

function App() {
  return (
    <div>
      <Navigation 
        companyName="My Company" 
        links={[/* your links */]} 
      />
      <Card title="Content">
        <TextInput label="Name" />
      </Card>
    </div>
  );
}
```

## Requirements

- React 18.0.0 or higher
- React DOM 18.0.0 or higher

## License

ISC
