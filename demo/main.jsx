import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from '../src/components/Navigation';
import { TextInput, Select, Checkbox, TextArea } from '../src/components/Form';
import Card from '../src/components/Card';
import './demo.css';

const Demo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false
  });

  const navigationLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' }
  ];

  const handleInputChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="demo-container">
      <Navigation companyName="Acme Corp" links={navigationLinks} />
      
      <div className="demo-content">
        <header className="demo-header">
          <h1>Acme UI Components Library</h1>
          <p>A collection of reusable UI components for multi-repo projects</p>
        </header>

        <section className="demo-section">
          <h2>Navigation Component</h2>
          <p>Click the 3-line menu button on the left to expand/collapse the navigation bar.</p>
        </section>

        <section className="demo-section">
          <h2>Card Component</h2>
          <div className="card-grid">
            <Card title="Welcome Card">
              <p>This is a basic card component with a title and content.</p>
              <p>Cards are great for organizing content in a clean, contained format.</p>
            </Card>

            <Card 
              title="Card with Footer" 
              footer={<button className="demo-button">Action Button</button>}
            >
              <p>This card includes a footer section for actions or additional information.</p>
            </Card>

            <Card>
              <p>This is a card without a title, showing the flexible nature of the component.</p>
            </Card>
          </div>
        </section>

        <section className="demo-section">
          <h2>Form Components</h2>
          <Card title="Sample Form">
            <TextInput
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Enter your name"
              required
            />

            <TextInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="your.email@example.com"
              required
            />

            <Select
              label="Country"
              value={formData.country}
              onChange={handleInputChange('country')}
              options={countryOptions}
              required
            />

            <TextArea
              label="Message"
              value={formData.message}
              onChange={handleInputChange('message')}
              placeholder="Enter your message here..."
              rows={5}
            />

            <Checkbox
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange('newsletter')}
            />

            <button className="demo-button primary">Submit Form</button>
          </Card>
        </section>

        <section className="demo-section">
          <h2>Usage</h2>
          <Card title="How to Use">
            <p>Import components from the acme-ui package:</p>
            <pre className="code-block">
{`import { Navigation, Card, TextInput, Select, Checkbox, TextArea } from 'acme-ui';

// Use the Navigation component
<Navigation 
  companyName="Your Company" 
  links={[
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' }
  ]} 
/>

// Use Card component
<Card title="My Card">
  <p>Card content goes here</p>
</Card>

// Use Form components
<TextInput 
  label="Name" 
  value={name} 
  onChange={handleChange}
  required 
/>`}
            </pre>
          </Card>
        </section>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Demo />);
