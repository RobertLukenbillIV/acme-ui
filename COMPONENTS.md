# Acme UI Components Documentation

## Overview
This is a React component library built for multi-repo projects, providing reusable UI components with consistent styling.

## Components

### Navigation
**File**: `src/components/Navigation/Navigation.jsx`

A left-aligned expandable navigation sidebar with a hamburger menu toggle.

**Props**:
- `companyName` (string, default: "Acme Corp") - The company name displayed when expanded
- `links` (array) - Array of navigation link objects with `label` and `href` properties

**Example**:
```jsx
<Navigation 
  companyName="Acme Corp" 
  links={[
    { label: 'Home', href: '/home' },
    { label: 'Products', href: '/products' }
  ]} 
/>
```

**Features**:
- Fixed left-side positioning
- Collapsed width: 60px
- Expanded width: 250px
- Smooth animations
- Dark theme (#2c3e50 background)

---

### TextInput
**File**: `src/components/Form/TextInput.jsx`

A text input field with label and validation support.

**Props**:
- `label` (string) - Field label
- `value` (string) - Input value
- `onChange` (function) - Change handler
- `placeholder` (string) - Placeholder text
- `type` (string, default: "text") - Input type (text, email, password, etc.)
- `required` (boolean, default: false) - Whether field is required
- `error` (string) - Error message to display

**Example**:
```jsx
<TextInput
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="your.email@example.com"
  required
  error="Please enter a valid email"
/>
```

---

### Select
**File**: `src/components/Form/Select.jsx`

A dropdown select component.

**Props**:
- `label` (string) - Field label
- `value` (string) - Selected value
- `onChange` (function) - Change handler
- `options` (array) - Array of option objects with `value` and `label` properties
- `required` (boolean, default: false) - Whether field is required
- `error` (string) - Error message to display

**Example**:
```jsx
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

---

### Checkbox
**File**: `src/components/Form/Checkbox.jsx`

A checkbox input with label.

**Props**:
- `label` (string) - Checkbox label
- `checked` (boolean) - Checked state
- `onChange` (function) - Change handler
- `required` (boolean, default: false) - Whether field is required

**Example**:
```jsx
<Checkbox
  label="I agree to terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  required
/>
```

---

### TextArea
**File**: `src/components/Form/TextArea.jsx`

A multi-line text input.

**Props**:
- `label` (string) - Field label
- `value` (string) - Input value
- `onChange` (function) - Change handler
- `placeholder` (string) - Placeholder text
- `rows` (number, default: 4) - Number of visible rows
- `required` (boolean, default: false) - Whether field is required
- `error` (string) - Error message to display

**Example**:
```jsx
<TextArea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Enter your message..."
  rows={6}
/>
```

---

### Card
**File**: `src/components/Card/Card.jsx`

A card container for organizing content.

**Props**:
- `title` (string) - Card title (displays in header)
- `children` (node) - Card content
- `footer` (node) - Footer content
- `className` (string) - Additional CSS classes

**Example**:
```jsx
<Card 
  title="User Profile"
  footer={<button>Edit Profile</button>}
>
  <p>User information goes here</p>
</Card>
```

**Features**:
- White background with subtle shadow
- Hover effect (increased shadow)
- Optional header and footer sections
- Rounded corners (8px)

---

## Styling

All components include their own CSS files with scoped class names prefixed with `acme-`:
- Navigation: `.acme-navigation`
- Form components: `.acme-form-*`
- Card: `.acme-card`

This prevents style conflicts when used in other projects.

## Building

Build the library:
```bash
npm run build
```

Output files:
- `dist/acme-ui.es.js` - ES module format
- `dist/acme-ui.umd.js` - UMD format
- `dist/acme-ui.css` - All component styles

## Development

Run the demo page:
```bash
npm run dev
```

This starts a development server at http://localhost:3000 with live examples of all components.
