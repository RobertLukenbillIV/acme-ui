import React, { useState } from 'react';
import Card from '../../src/components/Card';
import Hero from '../../src/components/Hero';
import { TextInput, Select, Checkbox, TextArea } from '../../src/components/Form';

const FormsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false,
    feedback: '',
    category: '',
    priority: '',
    terms: false,
    marketing: false
  });

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' }
  ];

  const categoryOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (formType) => (e) => {
    e.preventDefault();
    alert(`${formType} form submitted! (This is just a demo)`);
  };

  return (
    <>
      <Hero 
        backgroundImage="https://picsum.photos/1920/600?random=forms"
        title="Form Components"
        subtitle="Comprehensive collection of form inputs for modern web applications"
        variant="static"
        height="50vh"
      >
        <p style={{ 
          fontSize: '1.1rem', 
          marginTop: '1rem',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          Build beautiful, accessible forms with our React form components
        </p>
      </Hero>
      
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '4rem' }}>
          <Card title="Form Component Features">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4>📝 Text Inputs</h4>
                <p>Flexible text inputs with validation, placeholders, and multiple types</p>
              </div>
              <div>
                <h4>📋 Select Dropdowns</h4>
                <p>Customizable select components with option groups and search</p>
              </div>
              <div>
                <h4>☑️ Checkboxes</h4>
                <p>Styled checkboxes with custom labels and accessibility support</p>
              </div>
              <div>
                <h4>📄 Text Areas</h4>
                <p>Multi-line text inputs with resizable and auto-sizing options</p>
              </div>
            </div>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Basic Form Example</h2>
          <Card title="Contact Form">
            <form onSubmit={handleSubmit('Contact')} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
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
              </div>

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
                rows={4}
                required
              />

              <Checkbox
                label="Subscribe to newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange('newsletter')}
              />

              <button type="submit" className="demo-button primary">
                Submit Contact Form
              </button>
            </form>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Advanced Form Example</h2>
          <Card title="Support Ticket Form">
            <form onSubmit={handleSubmit('Support Ticket')} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <Select
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange('category')}
                  options={categoryOptions}
                  required
                />

                <Select
                  label="Priority Level"
                  value={formData.priority}
                  onChange={handleInputChange('priority')}
                  options={priorityOptions}
                  required
                />
              </div>

              <TextArea
                label="Issue Description"
                value={formData.feedback}
                onChange={handleInputChange('feedback')}
                placeholder="Please describe the issue in detail..."
                rows={6}
                required
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Checkbox
                  label="I agree to the terms and conditions"
                  checked={formData.terms}
                  onChange={handleInputChange('terms')}
                />

                <Checkbox
                  label="I would like to receive marketing communications"
                  checked={formData.marketing}
                  onChange={handleInputChange('marketing')}
                />
              </div>

              <button type="submit" className="demo-button primary">
                Submit Support Ticket
              </button>
            </form>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Input Type Variations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Card title="Text Input Types">
              <div style={{ display: 'grid', gap: '1rem' }}>
                <TextInput
                  label="Standard Text"
                  placeholder="Standard text input"
                />
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                />
                <TextInput
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                />
                <TextInput
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </Card>

            <Card title="Text Area Variations">
              <div style={{ display: 'grid', gap: '1rem' }}>
                <TextArea
                  label="Small Text Area"
                  placeholder="Short description..."
                  rows={2}
                />
                <TextArea
                  label="Medium Text Area"
                  placeholder="Medium description..."
                  rows={4}
                />
                <TextArea
                  label="Large Text Area"
                  placeholder="Detailed description..."
                  rows={6}
                />
              </div>
            </Card>
          </div>
        </section>

        <section>
          <Card title="Form Component API Reference">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color, #ddd)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Component</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Key Props</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>TextInput</code></td>
                    <td style={{ padding: '0.75rem' }}>label, type, value, onChange, placeholder, required</td>
                    <td style={{ padding: '0.75rem' }}>Single-line text input with various types (text, email, password, etc.)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>Select</code></td>
                    <td style={{ padding: '0.75rem' }}>label, value, onChange, options, required</td>
                    <td style={{ padding: '0.75rem' }}>Dropdown select with customizable options</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>Checkbox</code></td>
                    <td style={{ padding: '0.75rem' }}>label, checked, onChange</td>
                    <td style={{ padding: '0.75rem' }}>Styled checkbox with custom label</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}><code>TextArea</code></td>
                    <td style={{ padding: '0.75rem' }}>label, value, onChange, rows, placeholder</td>
                    <td style={{ padding: '0.75rem' }}>Multi-line text input with adjustable height</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
};

export default FormsPage;
