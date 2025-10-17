# Acme UI

A comprehensive React UI components library for modern web applications. This package provides reusable, accessible, and customizable React components with built-in dark mode support and responsive design.

## ✨ Features

- 🎨 **Modern Design System** - Clean, professional styling with consistent patterns
- 🌙 **Dark Mode Support** - Built-in GitHub-inspired dark theme
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts  
- ♿ **Accessibility** - WCAG 2.1 compliant components
- 🎯 **TypeScript Ready** - Full TypeScript support (coming soon)
- 📦 **Tree Shakeable** - Import only what you need
- 🚀 **Performance Optimized** - Minimal bundle size with fast rendering

## 🚀 Quick Start

```bash
# Install the package
npm install acme-ui

# Import components and styles
import { Navigation, Card, TabbedCard, TextInput } from 'acme-ui';
import 'acme-ui/dist/acme-ui.css';

# Use in your app
<Navigation companyName="My App" />
<Card title="Welcome">
  <TabbedCard tabs={myTabs} />
</Card>
```

## 📖 Live Demo

```bash
npm run dev
```

Visit `http://localhost:3000` to see all components with interactive examples and code snippets.

## 🧩 Components

### 🧭 Navigation
Flexible navigation system with multiple positioning options and smooth animations.

**Features:**
- Corner positioning (left/right) or top dropdown
- Collapsible sidebar with 80x80px compact mode
- Multi-level nested navigation support
- Dark theme compatibility

```jsx
<Navigation 
  companyName="Acme Corp"
  position="left"
  variant="sidebar"
  links={[
    { 
      label: 'Home', 
      href: '/',
      children: [
        { label: 'Overview', href: '/overview' },
        { label: 'Getting Started', href: '/getting-started' }
      ]
    },
    { label: 'Products', href: '/products' }
  ]} 
/>
```

### 🎴 Card
Flexible container component with optional headers and footers.

```jsx
<Card 
  title="Welcome Card"
  footer={
    <div>
      <button className="demo-button">Cancel</button>
      <button className="demo-button primary">Submit</button>
    </div>
  }
>
  <p>Card content with support for any React elements.</p>
</Card>
```

### 📑 TabbedCard
Advanced tabbed interface supporting multiple content panels with rich features.

**Features:**
- Flexible tab system (2, 3, 4, or more tabs)
- Tab icons, badges, and tooltips
- Disabled tab states
- Size variants (compact, default, large)
- Responsive with horizontal scrolling

```jsx
<TabbedCard
  title="User Dashboard"
  tabs={[
    {
      label: 'Overview',
      icon: '📊',
      content: <DashboardOverview />
    },
    {
      label: 'Activity',
      icon: '📈',
      badge: '3',
      content: <ActivityFeed />
    },
    {
      label: 'Settings',
      icon: '⚙️',
      disabled: false,
      tooltip: 'User settings panel',
      content: <UserSettings />
    }
  ]}
  onTabChange={(index, tab) => console.log(`Tab: ${tab.label}`)}
/>
```

### 🎬 Hero
Responsive hero sections with multiple display variants.

**Features:**
- Static, scroll-responsive, and sticky variants
- Full viewport width with instant transitions
- Background image support with overlay
- Customizable height and content positioning

```jsx
<Hero 
  backgroundImage="https://example.com/hero.jpg"
  title="Welcome to Acme UI"
  subtitle="Modern React components for your next project"
  variant="sticky-third"
  height="70vh"
>
  <button className="demo-button primary">Get Started</button>
</Hero>
```

### 📝 Form Components
Comprehensive form inputs with validation and consistent styling.

#### TextInput
```jsx
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

#### Checkbox & TextArea
```jsx
<Checkbox
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>

<TextArea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={5}
/>
```

### 👥 Forum
Interactive community component with user profiles and reactions.

```jsx
<Forum
  user={{
    name: "John Doe",
    avatar: "/avatar.jpg",
    role: "moderator",
    isOnline: true
  }}
  message="Welcome to our community!"
  timestamp="2 hours ago"
  reactions={[
    { emoji: "👍", count: 5 },
    { emoji: "❤️", count: 2 }
  ]}
/>
```

### 🖼️ ImageGallery
Responsive gallery with lightbox functionality.

```jsx
<ImageGallery
  images={[
    { src: '/image1.jpg', caption: 'Beautiful landscape' },
    { src: '/image2.jpg', caption: 'City skyline' }
  ]}
  columns={3}
/>
```

### 📄 Footnote
Flexible footer component for page footers or contained cards.

```jsx
<Footnote
  variant="footer"
  content="Built with React for modern web applications."
  socialLinks={[
    { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
    { label: 'Twitter', href: 'https://twitter.com', icon: '🐦' }
  ]}
  pageLinks={[
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ]}
/>
```

## 🎨 Dark Mode & Theming

Acme UI includes built-in dark mode with GitHub-inspired colors. All components automatically adapt.

```jsx
import { ThemeProvider } from 'acme-ui';

function App() {
  return (
    <ThemeProvider>
      <YourApplication />
    </ThemeProvider>
  );
}
```

## 📋 Complete Example

```jsx
import React from 'react';
import { 
  Navigation, 
  Hero,
  Card, 
  TabbedCard,
  TextInput,
  Footnote,
  ThemeProvider 
} from 'acme-ui';
import 'acme-ui/dist/acme-ui.css';

function App() {
  const tabs = [
    { label: 'Overview', icon: '📊', content: <div>Dashboard content</div> },
    { label: 'Settings', icon: '⚙️', content: <div>Settings panel</div> }
  ];

  return (
    <ThemeProvider>
      <Navigation 
        companyName="My Company"
        position="left"
        variant="sidebar"
        links={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' }
        ]}
      />
      
      <Hero 
        title="Welcome to My App"
        subtitle="Built with Acme UI components"
        variant="static"
        height="60vh"
      />
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Card title="Dashboard">
          <TabbedCard 
            title="User Portal"
            tabs={tabs}
          />
        </Card>
        
        <Card title="Contact Form">
          <TextInput 
            label="Your Name" 
            placeholder="Enter your name"
          />
        </Card>
      </main>
      
      <Footnote
        variant="footer"
        content="Powered by Acme UI"
      />
    </ThemeProvider>
  );
}

export default App;
```

## 🛠️ Development

### Scripts
```bash
npm run dev          # Start demo development server
npm run build        # Build library for distribution
npm run test         # Run test suite
npm run test:coverage # Run tests with coverage
```

### Project Structure
```
acme-ui/
├── src/
│   ├── components/           # Component source files
│   │   ├── Navigation/       # Navigation component
│   │   ├── Card/            # Card component  
│   │   ├── TabbedCard/      # Tabbed card component
│   │   ├── Form/            # Form input components
│   │   ├── Hero/            # Hero section component
│   │   ├── Forum/           # Forum/community component
│   │   ├── ImageGallery/    # Image gallery component
│   │   └── Footnote/        # Footer component
│   └── index.js             # Main export file
├── demo/                    # Demo application
│   ├── pages/               # Demo pages
│   ├── main.jsx            # Demo app entry
│   └── theme.jsx           # Theme provider
└── dist/                    # Built library files
```

## 📊 Component APIs

### TabbedCard Props
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | - | Optional card title |
| `tabs` | Array<Tab> | [] | Array of tab objects |
| `defaultTab` | number | 0 | Initially active tab index |
| `variant` | string | 'default' | Size: 'compact', 'default', 'large' |
| `onTabChange` | function | - | Tab change callback: (index, tab) => void |
| `className` | string | '' | Additional CSS classes |

### Tab Object
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | ✓ | Tab button text |
| `content` | ReactNode | ✓ | Tab content |
| `icon` | string | - | Optional icon (emoji/text) |
| `badge` | string/number | - | Optional badge/counter |
| `title` | string | - | Optional content title |
| `footer` | ReactNode | - | Optional tab footer |
| `disabled` | boolean | - | Disable tab |
| `tooltip` | string | - | Tab button tooltip |

### Card Props
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | - | Optional card title |
| `children` | ReactNode | - | Card content |
| `footer` | ReactNode | - | Optional footer content |
| `className` | string | '' | Additional CSS classes |

### Navigation Props
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `companyName` | string | - | Company/app name |
| `links` | Array | [] | Navigation link objects |
| `position` | string | 'left' | Position: 'left', 'right', 'top' |
| `variant` | string | 'sidebar' | Variant: 'sidebar', 'dropdown' |

## 🔧 Requirements

- **React** 16.8+ (Hooks support required)
- **React DOM** 16.8+
- **Modern Browser** - IE11+, Chrome, Firefox, Safari, Edge

## 📦 Bundle Information

- **ES Module**: `dist/acme-ui.es.js`
- **UMD**: `dist/acme-ui.umd.js` 
- **Styles**: `dist/acme-ui.css`
- **Bundle Size**: ~45KB (minified + gzipped)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC - See LICENSE file for details

---

Built with ❤️ for modern React applications

## 🧩 Components

### Navigation
A flexible navigation system with multiple positioning options and smooth animations.

**Features:**
- Corner positioning (left/right) or top dropdown
- Collapsible sidebar navigation with 80x80px compact mode
- Smooth expand/collapse animations
- Multi-level nested navigation support
- Dark theme compatibility

**Usage:**
```jsx
import { Navigation } from 'acme-ui';

<Navigation 
  companyName="Acme Corp"
  position="left"
  variant="sidebar"
  links={[
    { 
      label: 'Home', 
      href: '/',
      children: [
        { label: 'Overview', href: '/overview' },
        { label: 'Getting Started', href: '/getting-started' }
      ]
    },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' }
  ]} 
/>
```

### Hero
Responsive hero sections with multiple display variants and scroll behaviors.

**Features:**
- Static, scroll-responsive, and sticky variants
- Full viewport width with instant transitions
- Background image support with overlay
- Customizable height and content positioning

**Usage:**
```jsx
import { Hero } from 'acme-ui';

<Hero 
  backgroundImage="https://example.com/hero.jpg"
  title="Welcome to Acme UI"
  subtitle="Modern React components for your next project"
  variant="sticky-third"
  height="70vh"
>
  <button className="demo-button primary">Get Started</button>
</Hero>
```

### Form Components
Comprehensive form input components with validation, error handling, and consistent styling.

#### TextInput
Standard text input field with label, validation, and error states.

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
Dropdown select component with customizable options and search support.

```jsx
import { Select } from 'acme-ui';

<Select
  label="Country"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ]}
  required
/>
```

#### Checkbox
Checkbox input with custom styling and label support.

```jsx
import { Checkbox } from 'acme-ui';

<Checkbox
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>
```

#### TextArea
Multi-line text input with auto-resize and character counting options.

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
Flexible card component for content organization with optional headers and footers.

**Features:**
- Optional header with title
- Optional footer section for actions
- Hover effects and animations
- Dark mode support
- Nested card capability

```jsx
import { Card } from 'acme-ui';

<Card 
  title="Welcome Card"
  footer={
    <div>
      <button className="demo-button">Cancel</button>
      <button className="demo-button primary">Submit</button>
    </div>
  }
>
  <p>Card content goes here</p>
  <p>Cards can contain any type of content including text, images, and other components.</p>
</Card>
```

### TabbedCard
Advanced tabbed interface component supporting multiple content panels with rich tab features.

**Features:**
- Flexible tab system (2, 3, 4, or more tabs)
- Tab icons, badges, and tooltips
- Disabled tab states
- Smooth animations and transitions
- Responsive design with horizontal scrolling
- Size variants (compact, default, large)

```jsx
import { TabbedCard } from 'acme-ui';

<TabbedCard
  title="User Dashboard"
  tabs={[
    {
      label: 'Overview',
      icon: '📊',
      content: <DashboardOverview />
    },
    {
      label: 'Activity',
      icon: '📈',
      badge: '3',
      content: <ActivityFeed />
    },
    {
      label: 'Settings',
      icon: '⚙️',
      content: <UserSettings />
    }
  ]}
  onTabChange={(index, tab) => {
    console.log(`Switched to ${tab.label}`);
  }}
/>
```

### Forum
Interactive forum/message component for community features.

**Features:**
- User profiles with avatars
- Message reactions and interactions
- Timestamp and status indicators
- Action buttons (reply, react, forward, report)
- Responsive design

```jsx
import { Forum } from 'acme-ui';

<Forum
  user={{
    name: "John Doe",
    avatar: "/avatar.jpg",
    role: "moderator",
    isOnline: true
  }}
  message="Welcome to our community! Feel free to ask questions."
  timestamp="2 hours ago"
  reactions={[
    { emoji: "👍", count: 5 },
    { emoji: "❤️", count: 2 }
  ]}
/>
```

### ImageGallery
Responsive image gallery with lightbox functionality.

**Features:**
- Grid layout with customizable columns
- Lightbox modal with navigation
- Image captions and metadata
- Keyboard navigation support
- Touch/swipe gestures on mobile

```jsx
import { ImageGallery } from 'acme-ui';

<ImageGallery
  images={[
    { src: '/image1.jpg', caption: 'Beautiful landscape' },
    { src: '/image2.jpg', caption: 'City skyline' },
    { src: '/image3.jpg', caption: 'Ocean view' }
  ]}
  columns={3}
/>
```

### Footnote
Flexible footer component that can be used as a page footer or contained card.

**Features:**
- Social media links with icons
- Page navigation links
- Company information
- Responsive reverse-pyramid layout
- Dark mode support

```jsx
import { Footnote } from 'acme-ui';

<Footnote
  variant="footer"
  content="Built with React for modern web applications. Open source and customizable."
  socialLinks={[
    { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
    { label: 'Twitter', href: 'https://twitter.com', icon: '🐦' }
  ]}
  pageLinks={[
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ]}
/>
```

## 🚀 Installation

```bash
npm install acme-ui
```

## 🎨 Dark Mode & Theming

Acme UI includes built-in dark mode support with a GitHub-inspired color palette. The theme system automatically adapts all components for optimal contrast and readability.

```jsx
import { ThemeProvider } from 'acme-ui';

function App() {
  return (
    <ThemeProvider>
      <YourApplication />
    </ThemeProvider>
  );
}
```

## 📖 Development

### Running the Demo
To see all components in action with live examples:

```bash
npm run dev
```

This starts a comprehensive demo application at `http://localhost:3000` featuring:
- **Component Showcase** - Interactive examples of all components
- **Form Components Page** - Comprehensive form examples and validation
- **UI Components Page** - Card and TabbedCard demonstrations  
- **Layout Components Page** - Navigation and Hero component variants
- **Community Page** - Forum and social interaction components

### Building the Library

```bash
npm run build
```

This creates optimized distributable files in the `dist` directory:
- `dist/acme-ui.es.js` - ES module format
- `dist/acme-ui.umd.js` - UMD format for browser usage
- `dist/acme-ui.css` - All component styles bundled

### Running Tests

```bash
npm test
```

Runs the test suite with coverage reporting:

```bash
npm run test:coverage
```

## 📱 Usage in Projects

### Basic Setup
1. Install the package in your project
2. Import the components you need
3. Include the CSS styles
4. Use components in your React application

```jsx
import { 
  Navigation, 
  Card, 
  TabbedCard,
  TextInput, 
  Select,
  Checkbox,
  TextArea,
  Hero,
  Forum,
  ImageGallery,
  Footnote 
} from 'acme-ui';
import 'acme-ui/dist/acme-ui.css';

function App() {
  return (
    <div>
      <Navigation 
        companyName="My Company"
        position="left"
        variant="sidebar"
        links={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'About', href: '/about' }
        ]} 
      />
      
      <main style={{ padding: '2rem' }}>
        <Card title="Welcome">
          <p>Welcome to our application!</p>
        </Card>
        
        <TabbedCard
          title="User Profile"
          tabs={[
            { label: 'Info', content: <UserInfo /> },
            { label: 'Settings', content: <UserSettings /> }
          ]}
        />
      </main>
    </div>
  );
}
```

### Advanced Usage with Routing

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation, Hero, ThemeProvider } from 'acme-ui';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navigation 
          companyName="Acme Corp"
          position="left"
          variant="sidebar"
          links={navigationLinks}
        />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero 
                backgroundImage="/hero.jpg"
                title="Welcome to Acme"
                variant="sticky-third"
              />
              <HomePage />
            </>
          } />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

## 🛠️ Requirements

- **React** 16.8+ (Hooks support required)
- **React DOM** 16.8+
- **Modern Browser** - IE11+, Chrome, Firefox, Safari, Edge

## 📁 Project Structure

```
acme-ui/
├── src/
│   ├── components/           # Component source files
│   │   ├── Navigation/       # Navigation component
│   │   ├── Card/            # Card component  
│   │   ├── TabbedCard/      # Tabbed card component
│   │   ├── Form/            # Form input components
│   │   ├── Hero/            # Hero section component
│   │   ├── Forum/           # Forum/community component
│   │   ├── ImageGallery/    # Image gallery component
│   │   └── Footnote/        # Footer component
│   └── index.js             # Main export file
├── demo/                    # Demo application
│   ├── pages/               # Demo pages
│   ├── main.jsx            # Demo app entry
│   └── theme.jsx           # Theme provider
├── dist/                    # Built library files
└── docs/                    # Documentation
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on:
- Code style and standards
- Component development patterns
- Testing requirements  
- Documentation updates

## 📝 Component Categories

- **📝 Forms** - TextInput, Select, Checkbox, TextArea
- **🎴 UI Components** - Card, TabbedCard, Buttons
- **🧭 Layout** - Navigation, Hero, ImageGallery, Footnote  
- **👥 Community** - Forum, Comments, User interactions

## 🔗 Links

- **Demo Site**: [Live Examples](http://localhost:3000)
- **Documentation**: [Component Docs](./COMPONENTS.md)
- **GitHub**: [Source Code](https://github.com/RobertLukenbillIV/acme-ui)

## 📄 License

ISC - See LICENSE file for details

---

Built with ❤️ for modern React applications
