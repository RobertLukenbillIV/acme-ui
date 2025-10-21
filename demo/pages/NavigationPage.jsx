import React from 'react';
import Navigation from '../../src/components/Navigation';
import Card from '../../src/components/Card';

const NavigationPage = () => {
  const sampleLinks = [
    { 
      label: 'Home', 
      href: '/',
      children: [
        { label: 'Overview', href: '/' },
        { label: 'Getting Started', href: '#getting-started' }
      ]
    },
    { 
      label: 'Components', 
      href: '#components',
      children: [
        { label: 'Forms', href: '/forms' },
        { label: 'UI Components', href: '/ui-components' },
        { label: 'Community', href: '/forum' }
      ]
    },
    { 
      label: 'Layout', 
      href: '#layout',
      children: [
        { label: 'Hero Variants', href: '#heroes', children: [
          { label: 'Static Hero', href: '/static-hero' },
          { label: 'Sticky Hero', href: '/sticky-hero' }
        ]},
        { label: 'Navigation', href: '#navigation' },
        { label: 'Gallery Examples', href: '/gallery' }
      ]
    }
  ];

  const quickAccessLinks = [
    { label: 'Forms', href: '/forms' },
    { label: 'UI Components', href: '/ui-components' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Community', href: '/forum' }
  ];

  const dropdownLinks = [
    { 
      label: 'Heroes', 
      href: '#heroes', 
      children: [
        { label: 'Static', href: '/static-hero' },
        { label: 'Sticky', href: '/sticky-hero' }
      ]
    },
    { 
      label: 'Component Types', 
      href: '#components', 
      children: [
        { label: 'Forms', href: '/forms' },
        { label: 'UI Components', href: '/ui-components' },
        { label: 'Community', href: '/forum' }
      ]
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Navigation Components</h1>
      <p>Explore the different navigation variants and positions available in Acme UI.</p>

      <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
        
        <Card title="Left Sidebar Navigation">
          <p><strong>Features:</strong></p>
          <ul>
            <li>Fixed position in top-left corner</li>
            <li>Collapsible 80x80px compact mode</li>
            <li>Expandable to 280px width</li>
            <li>Multi-level nested navigation</li>
            <li>Click outside to close</li>
            <li>Entire collapsed area is clickable</li>
          </ul>
          <p><strong>Usage:</strong></p>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px',
            fontSize: '0.9rem',
            overflow: 'auto'
          }}>{`<Navigation 
  companyName="Acme UI" 
  links={navigationLinks}
  position="left"
  variant="sidebar"
/>`}</pre>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            <em>The left navigation in this demo is an example of this variant.</em>
          </p>
        </Card>

        <Card title="Right Sidebar Navigation">
          <p><strong>Features:</strong></p>
          <ul>
            <li>Fixed position in top-right corner</li>
            <li>Same collapsible behavior as left sidebar</li>
            <li>Perfect for secondary navigation or quick access</li>
            <li>Click outside to close</li>
            <li>Entire collapsed area is clickable</li>
          </ul>
          <p><strong>Usage:</strong></p>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px',
            fontSize: '0.9rem',
            overflow: 'auto'
          }}>{`<Navigation 
  companyName="Quick Access" 
  links={quickAccessLinks}
  position="right"
  variant="sidebar"
/>`}</pre>
          
          {/* Live Example - Right Navigation */}
          <div style={{ position: 'relative', height: '300px', marginTop: '1rem' }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              right: 0,
              zIndex: 999 // Lower than main nav but visible
            }}>
              <Navigation 
                companyName="Quick Access" 
                links={quickAccessLinks}
                position="right"
                variant="sidebar"
              />
            </div>
            <div style={{ 
              background: '#f8f9fa', 
              border: '2px dashed #dee2e6',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              color: '#6c757d',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Live Example</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Right sidebar navigation is positioned in the top-right corner →
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Top Dropdown Navigation">
          <p><strong>Features:</strong></p>
          <ul>
            <li>Fixed position at top-center of screen</li>
            <li>Dropdown-style expansion</li>
            <li>Compact 80px width when collapsed</li>
            <li>300px width when expanded</li>
            <li>Click outside to close</li>
            <li>Entire collapsed area is clickable</li>
          </ul>
          <p><strong>Usage:</strong></p>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px',
            fontSize: '0.9rem',
            overflow: 'auto'
          }}>{`<Navigation 
  companyName="Examples" 
  links={dropdownLinks}
  position="top"
  variant="dropdown"
/>`}</pre>
          
          {/* Live Example - Top Navigation */}
          <div style={{ position: 'relative', height: '300px', marginTop: '1rem' }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 998 // Lower than main nav but visible
            }}>
              <Navigation 
                companyName="Examples" 
                links={dropdownLinks}
                position="top"
                variant="dropdown"
              />
            </div>
            <div style={{ 
              background: '#f8f9fa', 
              border: '2px dashed #dee2e6',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              color: '#6c757d',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '80px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Live Example</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  ↑ Top dropdown navigation is positioned at the top-center
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Navigation Behavior Features">
          <h4>Enhanced User Experience</h4>
          <ul>
            <li><strong>Click Outside to Close:</strong> Navigation automatically closes when you click anywhere outside of it</li>
            <li><strong>Fully Clickable Collapsed State:</strong> The entire collapsed navigation area (not just the hamburger icon) is clickable to expand</li>
            <li><strong>Smooth Animations:</strong> All state transitions include smooth CSS animations</li>
            <li><strong>Nested Navigation Support:</strong> Unlimited levels of nested navigation with visual hierarchy</li>
            <li><strong>Responsive Design:</strong> Adapts to different screen sizes and orientations</li>
            <li><strong>Dark Mode Support:</strong> Full compatibility with the application's dark theme</li>
          </ul>

          <h4 style={{ marginTop: '2rem' }}>Keyboard Accessibility</h4>
          <ul>
            <li>Tab navigation through all interactive elements</li>
            <li>Enter/Space to activate navigation toggles</li>
            <li>Escape key to close expanded navigation (coming soon)</li>
            <li>Screen reader friendly with proper ARIA labels</li>
          </ul>

          <h4 style={{ marginTop: '2rem' }}>Technical Implementation</h4>
          <ul>
            <li><strong>React Hooks:</strong> Uses useState for state management and useEffect for click-outside detection</li>
            <li><strong>CSS Classes:</strong> Follows the .acme- prefix convention with BEM-style naming</li>
            <li><strong>Event Handling:</strong> Proper event propagation control for nested interactions</li>
            <li><strong>Performance:</strong> Efficient re-renders with proper dependency arrays</li>
          </ul>
        </Card>

        <Card title="Navigation Props API">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Prop</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Type</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Default</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}><code>companyName</code></td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>string</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>"Acme Corp"</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>Company or application name displayed in the navigation</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}><code>links</code></td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>Array</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>[]</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>Array of navigation link objects with label, href, and optional children</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}><code>position</code></td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>string</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>"left"</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>Position: "left", "right", or "top"</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}><code>variant</code></td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>string</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>"sidebar"</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>Variant: "sidebar" or "dropdown"</td>
              </tr>
            </tbody>
          </table>
        </Card>

      </div>
    </div>
  );
};

export default NavigationPage;