import React from 'react';
import Card from '../../src/components/Card';
import TabbedCard from '../../src/components/TabbedCard';
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
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Tabbed Card Component</h2>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>2-Tab Example</h3>
            <TabbedCard
              title="User Dashboard"
              tabs={[
                {
                  label: 'Overview',
                  icon: '📊',
                  content: (
                    <div>
                      <p>Welcome to your dashboard! Here's a quick overview of your account activity.</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--card-background, #f8f9fa)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>24</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>Projects</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--card-background, #f8f9fa)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>156</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>Tasks Done</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  label: 'Activity',
                  icon: '📈',
                  badge: '3',
                  content: (
                    <div>
                      <p><strong>Recent Activity</strong></p>
                      <ul style={{ margin: '1rem 0', paddingLeft: '1.5rem' }}>
                        <li>Completed project "Website Redesign" - 2 hours ago</li>
                        <li>Updated task "API Integration" - 4 hours ago</li>
                        <li>Created new project "Mobile App" - Yesterday</li>
                      </ul>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>
                        Last updated: Just now
                      </p>
                    </div>
                  )
                }
              ]}
            />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>3-Tab Example</h3>
            <TabbedCard
              title="Product Information"
              tabs={[
                {
                  label: 'Description',
                  icon: '📝',
                  content: (
                    <div>
                      <p><strong>Premium React Component Library</strong></p>
                      <p>A comprehensive collection of modern, accessible, and customizable React components designed to accelerate your development workflow.</p>
                      <h4>Key Features:</h4>
                      <ul>
                        <li>50+ Production-ready components</li>
                        <li>Full TypeScript support</li>
                        <li>Dark mode compatibility</li>
                        <li>Responsive design</li>
                        <li>Accessibility compliance (WCAG 2.1)</li>
                      </ul>
                    </div>
                  )
                },
                {
                  label: 'Specifications',
                  icon: '⚙️',
                  content: (
                    <div>
                      <h4>Technical Requirements</h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0' }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>React Version</td>
                            <td style={{ padding: '0.5rem 0' }}>16.8+ (Hooks support required)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Bundle Size</td>
                            <td style={{ padding: '0.5rem 0' }}>~45KB (minified + gzipped)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Browser Support</td>
                            <td style={{ padding: '0.5rem 0' }}>IE11+, Chrome, Firefox, Safari, Edge</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Dependencies</td>
                            <td style={{ padding: '0.5rem 0' }}>React, ReactDOM (peer dependencies only)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )
                },
                {
                  label: 'Reviews',
                  icon: '⭐',
                  badge: '12',
                  content: (
                    <div>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <div style={{ fontSize: '2rem' }}>⭐⭐⭐⭐⭐</div>
                          <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.8/5</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>Based on 127 reviews</div>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ borderLeft: '3px solid #3498db', paddingLeft: '1rem', marginBottom: '1rem' }}>
                        <p><em>"Excellent component library! Clean design and easy to integrate."</em></p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>- Sarah J., Frontend Developer</p>
                      </div>
                      
                      <div style={{ borderLeft: '3px solid #27ae60', paddingLeft: '1rem' }}>
                        <p><em>"Great documentation and responsive support team. Highly recommended!"</em></p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>- Mike R., Full Stack Developer</p>
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>4-Tab Example</h3>
            <TabbedCard
              title="Project Management"
              tabs={[
                {
                  label: 'Tasks',
                  icon: '✓',
                  badge: '8',
                  content: (
                    <div>
                      <p><strong>Active Tasks</strong></p>
                      <div style={{ margin: '1rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', background: 'var(--card-background, #f8f9fa)', borderRadius: '6px', marginBottom: '0.5rem' }}>
                          <input type="checkbox" style={{ marginRight: '0.75rem' }} />
                          <span>Implement user authentication</span>
                          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary, #7f8c8d)' }}>High Priority</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', background: 'var(--card-background, #f8f9fa)', borderRadius: '6px', marginBottom: '0.5rem' }}>
                          <input type="checkbox" style={{ marginRight: '0.75rem' }} />
                          <span>Design new landing page</span>
                          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary, #7f8c8d)' }}>Medium</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', background: 'var(--card-background, #f8f9fa)', borderRadius: '6px' }}>
                          <input type="checkbox" checked style={{ marginRight: '0.75rem' }} />
                          <span style={{ textDecoration: 'line-through' }}>Setup project structure</span>
                          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#27ae60' }}>Completed</span>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  label: 'Team',
                  icon: '👥',
                  content: (
                    <div>
                      <p><strong>Team Members</strong></p>
                      <div style={{ display: 'grid', gap: '1rem', margin: '1rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                          }}>
                            JS
                          </div>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>John Smith</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>Project Lead</div>
                          </div>
                          <div style={{ marginLeft: 'auto', padding: '0.25rem 0.5rem', background: '#27ae60', color: 'white', borderRadius: '12px', fontSize: '0.8rem' }}>
                            Online
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                          }}>
                            AD
                          </div>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>Alice Davis</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)' }}>UI/UX Designer</div>
                          </div>
                          <div style={{ marginLeft: 'auto', padding: '0.25rem 0.5rem', background: '#f39c12', color: 'white', borderRadius: '12px', fontSize: '0.8rem' }}>
                            Away
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  label: 'Timeline',
                  icon: '📅',
                  content: (
                    <div>
                      <p><strong>Project Timeline</strong></p>
                      <div style={{ margin: '1rem 0' }}>
                        <div style={{ borderLeft: '2px solid #3498db', paddingLeft: '1rem', marginBottom: '1rem' }}>
                          <div style={{ fontWeight: 'bold', color: '#3498db' }}>Week 1-2: Planning & Setup</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)', margin: '0.25rem 0' }}>
                            Project initialization, team setup, requirements gathering
                          </div>
                          <div style={{ fontSize: '0.8rem', background: '#27ae60', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '10px', display: 'inline-block' }}>
                            Completed
                          </div>
                        </div>
                        <div style={{ borderLeft: '2px solid #f39c12', paddingLeft: '1rem', marginBottom: '1rem' }}>
                          <div style={{ fontWeight: 'bold', color: '#f39c12' }}>Week 3-4: Development</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)', margin: '0.25rem 0' }}>
                            Core feature implementation and testing
                          </div>
                          <div style={{ fontSize: '0.8rem', background: '#f39c12', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '10px', display: 'inline-block' }}>
                            In Progress
                          </div>
                        </div>
                        <div style={{ borderLeft: '2px solid #95a5a6', paddingLeft: '1rem' }}>
                          <div style={{ fontWeight: 'bold', color: '#95a5a6' }}>Week 5-6: Testing & Launch</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #7f8c8d)', margin: '0.25rem 0' }}>
                            Quality assurance, bug fixes, and deployment
                          </div>
                          <div style={{ fontSize: '0.8rem', background: '#95a5a6', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '10px', display: 'inline-block' }}>
                            Upcoming
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  label: 'Files',
                  icon: '📁',
                  badge: '15',
                  content: (
                    <div>
                      <p><strong>Project Files</strong></p>
                      <div style={{ margin: '1rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid var(--border-color, #eee)' }}>
                          <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>📄</span>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>project-requirements.pdf</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #7f8c8d)' }}>2.3 MB • Modified 2 days ago</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid var(--border-color, #eee)' }}>
                          <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>🎨</span>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>ui-mockups.figma</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #7f8c8d)' }}>15.7 MB • Modified 1 day ago</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                          <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>💻</span>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>source-code.zip</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #7f8c8d)' }}>8.1 MB • Modified 3 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Usage Examples</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <Card title="Basic Card Usage">
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
            </Card>

            <Card title="TabbedCard Usage">
              <pre className="code-block">
{`import { TabbedCard } from 'acme-ui';

// Basic tabbed card
<TabbedCard
  title="My Dashboard"
  tabs={[
    {
      label: 'Overview',
      icon: '📊',
      content: <p>Overview content</p>
    },
    {
      label: 'Settings', 
      icon: '⚙️',
      badge: '2',
      content: <p>Settings content</p>
    }
  ]}
/>

// With custom handlers
<TabbedCard
  tabs={tabs}
  defaultTab={1}
  onTabChange={(index, tab) => {
    console.log('Tab changed:', tab.label);
  }}
/>`}
              </pre>
            </Card>
          </div>

          <Card title="Advanced Styling Examples">
            <h4>Custom Card Styling</h4>
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

            <h4 style={{ marginTop: '2rem' }}>TabbedCard Advanced Features</h4>
            <pre className="code-block">
{`// Complex tab content with rich data
const tabs = [
  {
    label: 'Dashboard',
    icon: '📊',
    content: (
      <div>
        <h4>Welcome Back!</h4>
        <p>Here's your activity summary...</p>
      </div>
    ),
    footer: <button>View Details</button>
  },
  {
    label: 'Messages',
    icon: '📧',
    badge: '5',
    disabled: false,
    tooltip: 'View your messages',
    content: 'You have 5 unread messages'
  }
];

<TabbedCard
  title="User Portal"
  tabs={tabs}
  variant="large"
  className="custom-tabbed-card"
/>`}
            </pre>
          </Card>
        </section>

        <section>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Component APIs</h2>
          
          <div style={{ display: 'grid', gap: '2rem' }}>
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

            <Card title="TabbedCard Component API">
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
                      <td style={{ padding: '0.75rem' }}><code>tabs</code></td>
                      <td style={{ padding: '0.75rem' }}>Array&lt;Tab&gt;</td>
                      <td style={{ padding: '0.75rem' }}>[]</td>
                      <td style={{ padding: '0.75rem' }}>Array of tab objects (see Tab Object structure below)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>defaultTab</code></td>
                      <td style={{ padding: '0.75rem' }}>number</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                      <td style={{ padding: '0.75rem' }}>Index of the initially active tab</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>variant</code></td>
                      <td style={{ padding: '0.75rem' }}>string</td>
                      <td style={{ padding: '0.75rem' }}>'default'</td>
                      <td style={{ padding: '0.75rem' }}>Size variant: 'default', 'compact', 'large'</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>onTabChange</code></td>
                      <td style={{ padding: '0.75rem' }}>function</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem' }}>Callback fired when tab changes: (index, tabData) =&gt; void</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}><code>className</code></td>
                      <td style={{ padding: '0.75rem' }}>string</td>
                      <td style={{ padding: '0.75rem' }}>''</td>
                      <td style={{ padding: '0.75rem' }}>Additional CSS classes for custom styling</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 style={{ marginTop: '2rem' }}>Tab Object Structure</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color, #ddd)' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Property</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Type</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Required</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>label</code></td>
                      <td style={{ padding: '0.75rem' }}>string</td>
                      <td style={{ padding: '0.75rem' }}>✓</td>
                      <td style={{ padding: '0.75rem' }}>Text displayed on the tab button</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>content</code></td>
                      <td style={{ padding: '0.75rem' }}>ReactNode</td>
                      <td style={{ padding: '0.75rem' }}>✓</td>
                      <td style={{ padding: '0.75rem' }}>Content displayed when tab is active</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>icon</code></td>
                      <td style={{ padding: '0.75rem' }}>string</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem' }}>Optional icon displayed before label (emoji or text)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>badge</code></td>
                      <td style={{ padding: '0.75rem' }}>string|number</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem' }}>Optional badge/counter displayed after label</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>title</code></td>
                      <td style={{ padding: '0.75rem' }}>string</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem' }}>Optional title displayed in content area</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>footer</code></td>
                      <td style={{ padding: '0.75rem' }}>ReactNode</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem' }}>Optional footer content for the tab</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                      <td style={{ padding: '0.75rem' }}><code>disabled</code></td>
                      <td style={{ padding: '0.75rem' }}>boolean</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem' }}>Whether the tab is disabled</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}><code>tooltip</code></td>
                      <td style={{ padding: '0.75rem' }}>string</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem' }}>Optional tooltip text for the tab button</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default UIComponentsPage;