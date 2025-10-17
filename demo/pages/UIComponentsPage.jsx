import React from 'react';
import Card from '../../src/components/Card';
import Hero from '../../src/components/Hero';

const UIComponentsPage = () => {
  return (
    <>
      <Hero 
        backgroundImage="https://picsum.photos/1920/600?random=ui"
        title="UI Components"
        subtitle="Essential building blocks for modern user interfaces"
        variant="static"
        height="50vh"
      >
        <p style={{ 
          fontSize: '1.1rem', 
          marginTop: '1rem',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          Flexible and reusable UI components designed for consistency and accessibility
        </p>
      </Hero>
      
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '4rem' }}>
          <Card title="UI Component Features">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4>🎴 Cards</h4>
                <p>Flexible container components with headers, content, and footer areas</p>
              </div>
              <div>
                <h4>🎨 Consistent Design</h4>
                <p>Unified design system with consistent spacing, colors, and typography</p>
              </div>
              <div>
                <h4>📱 Responsive</h4>
                <p>Components that adapt seamlessly to different screen sizes</p>
              </div>
              <div>
                <h4>♿ Accessible</h4>
                <p>Built with accessibility in mind, following WCAG guidelines</p>
              </div>
            </div>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Card Component Variations</h2>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Basic Cards</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <Card title="Simple Card">
                <p>This is a basic card component with a title and content area.</p>
                <p>Cards are perfect for organizing information into digestible sections.</p>
              </Card>

              <Card>
                <h4>Card Without Title</h4>
                <p>Sometimes you don't need a predefined title area and want full control over the content structure.</p>
                <p>This card demonstrates that flexibility.</p>
              </Card>

              <Card title="Card with Rich Content">
                <p>Cards can contain any type of content including:</p>
                <ul>
                  <li>Text and paragraphs</li>
                  <li>Lists and bullets</li>
                  <li>Images and media</li>
                  <li>Interactive elements</li>
                </ul>
                <p><strong>Note:</strong> Content automatically adapts to the card container.</p>
              </Card>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Cards with Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <Card 
                title="Card with Footer" 
                footer={
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="demo-button primary">Primary Action</button>
                    <button className="demo-button">Secondary</button>
                  </div>
                }
              >
                <p>This card includes a footer section for actions or additional information.</p>
                <p>The footer can contain buttons, links, or any other content.</p>
              </Card>

              <Card 
                title="Product Card" 
                footer={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color, #2c3e50)' }}>
                      $29.99
                    </span>
                    <button className="demo-button primary">Add to Cart</button>
                  </div>
                }
              >
                <p><strong>Premium Component Library</strong></p>
                <p>Access to all components with advanced features and premium support.</p>
                <ul style={{ margin: '1rem 0' }}>
                  <li>50+ Components</li>
                  <li>TypeScript Support</li>
                  <li>Premium Themes</li>
                  <li>Priority Support</li>
                </ul>
              </Card>

              <Card 
                title="Notification Card" 
                footer={
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="demo-button" style={{ flex: 1 }}>Dismiss</button>
                    <button className="demo-button primary" style={{ flex: 1 }}>View Details</button>
                  </div>
                }
              >
                <p><strong>New Update Available!</strong></p>
                <p>Version 2.1.0 includes new components and bug fixes.</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--secondary-color, #7f8c8d)' }}>
                  Released 2 hours ago
                </p>
              </Card>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Specialized Cards</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <Card title="Stats Card">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color, #2c3e50)' }}>
                      1,234
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color, #7f8c8d)' }}>
                      Total Users
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color, #27ae60)' }}>
                      89%
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color, #7f8c8d)' }}>
                      Satisfaction
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color, #f39c12)' }}>
                      42
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color, #7f8c8d)' }}>
                      Components
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--info-color, #3498db)' }}>
                      24/7
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color, #7f8c8d)' }}>
                      Support
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Feature Card">
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                  <h4 style={{ margin: '0 0 1rem 0' }}>Lightning Fast</h4>
                  <p>Optimized for performance with minimal bundle size and fast rendering.</p>
                  <div style={{ marginTop: '1.5rem' }}>
                    <span style={{ 
                      background: 'var(--primary-color, #2c3e50)', 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem' 
                    }}>
                      New Feature
                    </span>
                  </div>
                </div>
              </Card>

              <Card title="Profile Card">
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    margin: '0 auto 1rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}>
                    JD
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>John Doe</h4>
                  <p style={{ color: 'var(--secondary-color, #7f8c8d)', margin: '0 0 1rem 0' }}>
                    Senior Developer
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button className="demo-button" style={{ fontSize: '0.8rem' }}>Follow</button>
                    <button className="demo-button primary" style={{ fontSize: '0.8rem' }}>Message</button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Usage Examples</h2>
          <Card title="Implementation Guide">
            <h4>Basic Card Usage</h4>
            <pre className="code-block">
{`import { Card } from 'acme-ui';

// Simple card
<Card title="My Card">
  <p>Card content goes here</p>
</Card>

// Card with footer
<Card 
  title="Action Card"
  footer={<button>Click me</button>}
>
  <p>Content with actions</p>
</Card>

// Card without title
<Card>
  <h3>Custom Header</h3>
  <p>Full control over content</p>
</Card>`}
            </pre>

            <h4 style={{ marginTop: '2rem' }}>Advanced Styling</h4>
            <pre className="code-block">
{`// Custom className for styling
<Card 
  title="Styled Card" 
  className="custom-card"
  style={{ border: '2px solid blue' }}
>
  <p>Custom styled card</p>
</Card>

// Nested cards
<Card title="Container">
  <Card title="Nested Card">
    <p>Cards can be nested for complex layouts</p>
  </Card>
</Card>`}
            </pre>
          </Card>
        </section>

        <section>
          <Card title="Card Component API">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color, #ddd)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Property</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Type</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Default</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>title</code></td>
                    <td style={{ padding: '0.75rem' }}>string</td>
                    <td style={{ padding: '0.75rem' }}>-</td>
                    <td style={{ padding: '0.75rem' }}>Optional title displayed in the card header</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>children</code></td>
                    <td style={{ padding: '0.75rem' }}>ReactNode</td>
                    <td style={{ padding: '0.75rem' }}>-</td>
                    <td style={{ padding: '0.75rem' }}>Main content of the card</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>footer</code></td>
                    <td style={{ padding: '0.75rem' }}>ReactNode</td>
                    <td style={{ padding: '0.75rem' }}>-</td>
                    <td style={{ padding: '0.75rem' }}>Optional footer content (buttons, actions, etc.)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>className</code></td>
                    <td style={{ padding: '0.75rem' }}>string</td>
                    <td style={{ padding: '0.75rem' }}>''</td>
                    <td style={{ padding: '0.75rem' }}>Additional CSS classes for custom styling</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}><code>style</code></td>
                    <td style={{ padding: '0.75rem' }}>CSSProperties</td>
                    <td style={{ padding: '0.75rem' }}>-</td>
                    <td style={{ padding: '0.75rem' }}>Inline styles for custom appearance</td>
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

export default UIComponentsPage;