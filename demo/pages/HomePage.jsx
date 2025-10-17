import React, { useState } from 'react';
import { TextInput, Select, Checkbox, TextArea } from '../../src/components/Form';
import Card from '../../src/components/Card';
import Hero from '../../src/components/Hero';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false
  });

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
    <>
      {/* Hero Section - Full width at top */}
      <Hero 
        backgroundImage="https://picsum.photos/1920/1080?random=hero"
        title="Acme UI Components Library"
        subtitle="Beautiful, reusable React components for modern web applications"
        variant="static"
        height="70vh"
      >
        <button className="demo-button primary" style={{ marginTop: '1rem' }}>
          Get Started
        </button>
      </Hero>

      <div style={{ 
        padding: '2rem', 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: 'var(--page-background, transparent)',
        color: 'var(--text-primary, #2c3e50)'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem', 
            color: 'var(--text-primary, #2c3e50)' 
          }}>
            Component Showcase
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary, #7f8c8d)', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            Explore our comprehensive collection of UI components with live examples
          </p>
        </header>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: 'var(--text-primary, #2c3e50)'
        }}>
          Navigation Components
        </h2>
        <Card title="Navigation Variants">
          <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Experience different navigation styles positioned around the page:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <strong>Left Sidebar</strong>
              <p>Expandable sidebar navigation (currently active)</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>
                Click the hamburger menu in the top-left corner
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <strong>Right Sidebar</strong>
              <p>Mirror navigation on the right side</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>
                Check the top-right corner
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <strong>Top Dropdown</strong>
              <p>Center-aligned dropdown navigation</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>
                Look at the top-center of the page
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: 'var(--text-primary, #2c3e50)'
        }}>
          Hero Components
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <Card title="Homepage Hero">
            <p>The hero section displayed above - a classic full-width banner with background image.</p>
            <p><strong>Features:</strong> Full viewport width, overlay support, call-to-action buttons</p>
            <button 
              className="demo-button primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Scroll to Top Hero
            </button>
          </Card>

          <Card title="Static Hero">
            <p>Traditional hero section that stays in place while content scrolls.</p>
            <p><strong>Features:</strong> Fixed positioning, standard layout, mobile-friendly</p>
            <button 
              className="demo-button primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => window.location.href = '/static-hero'}
            >
              View Static Hero Demo
            </button>
          </Card>
          
          <Card title="Sticky Third Hero">
            <p>Advanced hero that becomes sticky at one-third height when scrolling with instant transitions.</p>
            <p><strong>Features:</strong> Instant scroll transitions, full-width stretch, dynamic sticky behavior</p>
            <button 
              className="demo-button primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => window.location.href = '/sticky-hero'}
            >
              View Sticky Hero Demo
            </button>
          </Card>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: 'var(--text-primary, #2c3e50)'
        }}>
          Component Categories
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <Card title="Form Components">
            <p>Comprehensive form inputs for building interactive user interfaces.</p>
            <p><strong>Includes:</strong> TextInput, Select, Checkbox, TextArea</p>
            <button 
              className="demo-button primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => window.location.href = '/forms'}
            >
              Explore Form Components
            </button>
          </Card>

          <Card title="UI Components">
            <p>Essential building blocks for modern user interfaces and layouts.</p>
            <p><strong>Includes:</strong> Card, Buttons, Typography, Containers</p>
            <button 
              className="demo-button primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => window.location.href = '/ui-components'}
            >
              Explore UI Components
            </button>
          </Card>

          <Card title="Layout Components">
            <p>Navigation and layout components for structuring your application.</p>
            <p><strong>Includes:</strong> Navigation, Hero sections, Footers</p>
            <button 
              className="demo-button primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => window.location.href = '/gallery'}
            >
              Explore Layout Components
            </button>
          </Card>

          <Card title="Community Components">
            <p>Interactive components for building community features and engagement.</p>
            <p><strong>Includes:</strong> Forum, Comments, User profiles, Reactions</p>
            <button 
              className="demo-button primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => window.location.href = '/forum'}
            >
              Explore Community Components
            </button>
          </Card>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: 'var(--text-primary, #2c3e50)'
        }}>
          Form Components
        </h2>
        <Card title="Interactive Form Example">
          <div style={{ display: 'grid', gap: '1rem' }}>
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
              rows={4}
            />

            <Checkbox
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange('newsletter')}
            />

            <button className="demo-button primary" style={{ marginTop: '1rem' }}>
              Submit Form
            </button>
          </div>
        </Card>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: 'var(--text-primary, #2c3e50)'
        }}>
          Getting Started
        </h2>
        <Card title="Installation & Usage">
          <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Install the library and start building with our organized component collections
          </p>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4>Installation</h4>
            <pre className="code-block">npm install acme-ui</pre>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4>Component Categories</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                background: 'var(--card-background, #f8f9fa)', 
                borderRadius: '8px',
                border: '1px solid var(--border-color, #ddd)'
              }}>
                <strong style={{ color: 'var(--text-primary, #2c3e50)' }}>Form Components</strong>
                <p style={{ 
                  fontSize: '0.9rem', 
                  margin: '0.5rem 0 0 0',
                  color: 'var(--text-secondary, #7f8c8d)'
                }}>
                  TextInput, Select, Checkbox, TextArea
                </p>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                background: 'var(--card-background, #f8f9fa)', 
                borderRadius: '8px',
                border: '1px solid var(--border-color, #ddd)'
              }}>
                <strong style={{ color: 'var(--text-primary, #2c3e50)' }}>UI Components</strong>
                <p style={{ 
                  fontSize: '0.9rem', 
                  margin: '0.5rem 0 0 0',
                  color: 'var(--text-secondary, #7f8c8d)'
                }}>
                  Card, Typography, Containers
                </p>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                background: 'var(--card-background, #f8f9fa)', 
                borderRadius: '8px',
                border: '1px solid var(--border-color, #ddd)'
              }}>
                <strong style={{ color: 'var(--text-primary, #2c3e50)' }}>Layout Components</strong>
                <p style={{ 
                  fontSize: '0.9rem', 
                  margin: '0.5rem 0 0 0',
                  color: 'var(--text-secondary, #7f8c8d)'
                }}>
                  Navigation, Hero, ImageGallery
                </p>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                background: 'var(--card-background, #f8f9fa)', 
                borderRadius: '8px',
                border: '1px solid var(--border-color, #ddd)'
              }}>
                <strong style={{ color: 'var(--text-primary, #2c3e50)' }}>Community</strong>
                <p style={{ 
                  fontSize: '0.9rem', 
                  margin: '0.5rem 0 0 0',
                  color: 'var(--text-secondary, #7f8c8d)'
                }}>
                  Forum, Reactions, Profiles
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4>Basic Usage</h4>
            <pre className="code-block">
{`// Import specific component categories
import { TextInput, Select, Checkbox } from 'acme-ui/forms';
import { Card } from 'acme-ui/ui';
import { Navigation, Hero } from 'acme-ui/layout';
import { Forum } from 'acme-ui/community';

// Or import everything
import { Navigation, Card, Hero, Forum, TextInput } from 'acme-ui';

function App() {
  return (
    <>
      <Navigation 
        companyName="Your Company" 
        links={navigationLinks}
        position="left"
        variant="sidebar"
      />
      
      <Hero 
        backgroundImage="/hero.jpg"
        title="Welcome"
        variant="sticky-third"
      />
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Card title="Forms">
          <TextInput label="Name" placeholder="Enter name" />
          <Select label="Country" options={countryOptions} />
        </Card>
        
        <Card title="Community">
          <Forum user={userInfo} message="Hello world!" />
        </Card>
      </div>
    </>
  );
}`}
            </pre>
          </div>
        </Card>
      </section>
    </div>
    </>
  );
};

export default HomePage;